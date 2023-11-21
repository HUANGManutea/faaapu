import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "../../../types/supabase"
import Navbar from "../components/navbar"
import AccountForm from "./account-form"
import AlertProvider from "../contexts/alert-context"

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <main className="flex min-h-screen flex-col">
    <Navbar prevRoute={{ href: "/home", label: "Accueil" }}></Navbar>
      <div className="flex h-full flex-col items-center p-10">
        <AlertProvider>
          <h1>Compte</h1>
          <AccountForm session={session} />
        </AlertProvider>
      </div>
    </main>
  )
}