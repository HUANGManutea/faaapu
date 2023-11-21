import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";
import { Guide } from "../model/guide";
import { GuideUpsertDto } from "../model/guide-upsert-dto";

async function consolidateGuideWithImage(supabase: SupabaseClient<Database>, guide: Guide) {
  const imageUrl = supabase.storage
    .from('guides')
    .getPublicUrl(`images/${guide.imageUrl}`);
  guide.imageUrl = imageUrl.data.publicUrl;
}

async function consolidateGuideWithContent(supabase: SupabaseClient<Database>, guide: Guide) {
  const contentRawFile = await supabase.storage
    .from('guides')
    .download(`contents/${guide.contentUrl}`);
  if (contentRawFile.error) {
    console.log(`failed to get markdown content for guide id: ${guide.id}`);
  } else {
    guide.content = await contentRawFile.data.text();
  }
}

export async function deleteImage(supabase: SupabaseClient<Database>, imageUrl: string): Promise<boolean> {
  const result = await supabase.storage
      .from('guides')
      .remove([`images/${imageUrl}`]);
  if (result.error) {
    console.error(`failed to delete image ${imageUrl}`);
  }
  return result.error == null;
}

export async function uploadImage(supabase: SupabaseClient<Database>, file: File): Promise<string> {
  const result = await supabase.storage
      .from('guides')
      .upload(`images/${file.name}`, file);
  if (result.error) {
    console.error(`failed to create image ${file.name}`);
    return '';
  }
  return file.name;
}

export async function deleteContent(supabase: SupabaseClient<Database>, filename: string): Promise<boolean> {
  const result = await supabase.storage
      .from('guides')
      .remove([`contents/${filename}`]);
  if (result.error) {
    console.error(`failed to delete content ${filename}`);
  }
  return result.error == null;
}

export async function uploadContent(supabase: SupabaseClient<Database>, content: string, filename: string, isUpload: boolean): Promise<string> {
  const blob = new Blob([content as BlobPart], { type: "text/markdown" });
  const file = new File([blob], filename, { type: "text/markdown" });
  const result = await supabase.storage
      .from('guides')
      .upload(`contents/${filename}`, file, {
        upsert: isUpload
      });
  if (result.error) {
    console.error(`failed to create content ${file.name}`);
    return '';
  }
  return file.name;
}

export async function getGuide(supabase: SupabaseClient<Database>, id: number): Promise<Guide | null> {
  let guide: Guide | null = null;
  const { data } = await supabase.from('guide').select(`
  id,
  title,
  subtitle,
  image_url,
  content_url`).eq('id', id).single();

  if (data) {
    guide = {
      id: data.id,
      title: data.title,
      subtitle: data.subtitle,
      imageUrl: data.image_url,
      contentUrl: data.content_url,
    };

    await consolidateGuideWithImage(supabase, guide);
    await consolidateGuideWithContent(supabase, guide);
  }

  return guide;
}

export async function upsertGuide(supabase: SupabaseClient<Database>, dto: GuideUpsertDto): Promise<boolean> {
  const upsertResult = await supabase.from('guide').upsert({
    id: dto.id,
    title: dto.title,
    subtitle: dto.subtitle,
    image_url: dto.imageUrl,
    content_url: dto.contentUrl
  }).select('id').single();
  return upsertResult.data != null;
}

export async function getRangeGuides(supabase: SupabaseClient<Database>, start: number, end: number): Promise<Guide[]> {
  let guides: Guide[] = [];
  const { data } = await supabase.from('guide').select(`
  id,
  title,
  subtitle,
  image_url,
  content_url`).range(start, end);
  if (data) {
    for (let element of data) {
      let guide: Guide = {
        id: element.id,
        title: element.title,
        subtitle: element.subtitle,
        imageUrl: element.image_url,
        contentUrl: element.content_url,
      }

      await consolidateGuideWithImage(supabase, guide);
      await consolidateGuideWithContent(supabase, guide);
      guides.push(guide);
    }
  };

  return guides;
}

export async function countNbGuides(supabase: SupabaseClient<Database>): Promise<number | null> {
  const { count, error } = await supabase.from('guide').select('*', { count: 'exact', head: true });
  if (error) {
    console.log(error);
    return null;
  } else {
    return count;
  }
}