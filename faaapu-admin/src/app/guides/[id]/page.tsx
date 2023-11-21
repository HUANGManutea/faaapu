import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../../types/supabase";

export default async function GuideDetails({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  if (!params.id || Array.isArray(params.id)) {
    return <div>Error getting guide id</div>;
  }

  return <></>;
}