'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { Session } from '@supabase/auth-helpers-nextjs'

export default function LoginForm({ session }: { session: Session | null }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Check if the user is already authenticated and redirect if necessary
    if (session) {
      router.push('/plants'); // Redirect to "/plants" if the user is authenticated
    }
  }, [session]);

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

  const handleSignIn = async () => {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (response.error && response.error.status) {
      if (response.error.status === 400) {
        setErrorMessage("identifiants incorrects");
      } else {
        setErrorMessage("impossible de se connecter");
        console.error(response.error);
      }
    } else {
      router.refresh()
    }
  }

  // for the `session` to be available on first SSR render, it must be
  // fetched in a Server Component and passed down as a prop
  return (
    <>
      <input
        name="email"
        placeholder="Email"
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => setEmail(e.target.value)}
        value={email} />
      <input
        name="password"
        type="password"
        placeholder="Mot de passe"
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => setPassword(e.target.value)}
        value={password} />
      {errorMessage ? <label className='text-red-500'>{errorMessage}</label> : <></>}
      <button onClick={handleSignIn} className='btn btn-primary'>Sign in</button>
      <button onClick={handleSignUp} className='btn btn-secondary'>Sign up</button>
    </>
  )
}