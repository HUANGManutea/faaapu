import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import LoginForm from './login-form'
import { Database } from '../../../types/supabase'

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <h1>Fa'a'apu</h1>
      <div className="card w-96 bg-green-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Connexion</h2>
          <LoginForm session={session} />
        </div>
      </div>
    </main>
  );
}