'use client';

import { Guide } from "@/app/model/guide"
import { ChangeEvent, FormEvent, useState } from "react";
import ContentView from "../content-view";
import Image from 'next/image';
import { GuideUpsertDto } from "@/app/model/guide-upsert-dto";
import { GuideUploadResult } from "@/app/model/guide-upload-result";
import { useAlert } from "@/app/contexts/alert-context";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../types/supabase";
import { deleteContent, deleteImage, uploadContent, uploadImage, upsertGuide } from "@/app/db/guide-repository";
import { AlertType } from "../alert";

type UpsertGuideFormProps = {
  guide?: Guide
}

export default function UpsertGuideForm({ guide }: UpsertGuideFormProps) {
  const [title, setTitle] = useState(guide?.title ?? '');
  const [subtitle, setSubtitle] = useState(guide?.subtitle ?? '');
  const [imageUrl, setImageUrl] = useState(guide?.imageUrl ?? '');
  const [uploadedImage, setUploadedImage] = useState<File>();
  const [contentUrl, setContentUrl] = useState(guide?.contentUrl ?? '');
  const [content, setContent] = useState<string>(guide?.content ?? '');
  const supabase = createClientComponentClient<Database>();
  const { showAlert } = useAlert();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const uploadResult = await uploadNewData();
    if (uploadResult.error) {
      showAlert({text: uploadResult.error, type: AlertType.ERROR});
    } else {
      const dto: GuideUpsertDto = {
        id: guide?.id,
        title: title,
        subtitle: subtitle,
        imageUrl: imageUrl,
        contentUrl: contentUrl
      };
      const upsertResult = await upsertGuide(supabase, dto);
      if (upsertResult) {
        showAlert({ text: "Changements enregistrés !", type: AlertType.SUCCESS });
      } else {
        showAlert({ text: "Impossible d'enregistrer les changements", type: AlertType.ERROR });
      }
    }
  }

  
  const uploadNewData = async () => {
    const uploadResult: GuideUploadResult = {
    };
    if (uploadedImage) {
      // remove previous image
      if (guide?.imageUrl) {
        await deleteImage(supabase, guide.imageUrl);
      }
      // upload image
      uploadResult.imageUrl = await uploadImage(supabase, uploadedImage);
    }
    if (content && content !== guide?.content) {
      const isUpdate = contentUrl === guide?.content;
      await deleteContent(supabase, contentUrl);
      const createdFileName = await uploadContent(supabase, content, contentUrl, isUpdate);
      if (createdFileName !== '') {
        uploadResult.contentUrl = createdFileName;
      } else {
        uploadResult.error = "failed to upload content";
        return uploadResult;
      }
    }
    return uploadResult;
  }

  const loadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (imageUrl.startsWith('blob')) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl('');
    }
    const files = e.target.files;
    if (files && files.length > 0) {
      // get the file
      const file: File = files[0];
      setImageUrl(URL.createObjectURL(file));
      setUploadedImage(file);
    }
  }

  return (
    <form className="flex flex-col grow h-full w-full gap-5" method="POST" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex flex-col grow h-full w-full">
        <div className="flex flex-col">
          <h2>Caractéristiques</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mx-auto">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Titre</span>
              </label>
              <input type="text" className="input input-bordered w-full max-w-xs" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Sous-titre</span>
              </label>
              <input type="text" className="input input-bordered w-full max-w-xs" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <input type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered w-full max-w-xs" onChange={loadImage} />
              </div>
              {(imageUrl && imageUrl !== '') ? <Image src={imageUrl} alt={title} width={200} height={200} className="rounded"></Image> : <></>}
            </div>
          </div>
        </div>
        <div className="flex grow flex-col h-full w-full">
          <h2>Contenu</h2>
          <div className="flex flex-col w-full grow">
            <ContentView content={content} onContentChanged={(c) => setContent(c)}></ContentView>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <input type="submit" className="btn btn-primary max-w-xs" value={guide ? 'Modifier' : 'Créer'} />
      </div>
    </form>
  );
}