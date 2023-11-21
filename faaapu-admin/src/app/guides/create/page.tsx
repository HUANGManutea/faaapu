import Navbar from "@/app/components/navbar";
import UpsertGuideForm from "@/app/components/upsert-guide/upsert-guide-form";
import AlertProvider from "@/app/providers/alert-provider";

export default function CreateGuide() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar prevRoute={{ href: "/guides", label: "Guides" }}></Navbar>
      <div className="flex grow flex-col p-10">
        <AlertProvider>
          <h1>Créer un guide</h1>
          <UpsertGuideForm></UpsertGuideForm>
        </AlertProvider>
      </div>
    </main>
  );
}