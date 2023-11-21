'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '../../../types/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Alert, { AlertData, AlertType } from '../components/alert'
import { useAlert } from '../contexts/alert-context'
import { userContext } from '../contexts/user-context'

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const { showAlert } = useAlert();
  const context = userContext();
  const router = useRouter()

  if (!context?.userProfile) {
      router.push('/');
      return <></>;
  }

  useEffect(() => {
    if (context.userProfile) {
      setFullname(context.userProfile.fullName);
      setUsername(context.userProfile.username);
    }
  }, [context]);

  async function updateProfile({
    username,
  }: {
    username: string | null
    fullname: string | null
  }) {
    try {
      setLoading(true)

      let { error } = await supabase.from('profiles').upsert({
        id: context?.userProfile?.id as string,
        full_name: fullname,
        username,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      showAlert({text: 'Compte modifié !', type: AlertType.SUCCESS});
    } catch (error) {
      console.log(error);
      showAlert({text: 'Impossible de modifier le compte', type: AlertType.ERROR});
    } finally {
      setLoading(false)
    }
  }

  const goToHome = async () => {
    await fetch('/auth/signout', {
      method: "POST"
    });
    router.push("/");
  }

  const showDeleteAccountModal = async () => {
    (document.getElementById('deleteAccountModal') as HTMLFormElement).showModal();
  }

  const deleteAccount = async () => {
    if (context.userProfile) {
      const deleteUserResponse = await fetch(`/api/account/${context.userProfile.id}`, {
        method: 'DELETE',
      });
      const deleteUserResult = await deleteUserResponse.json();
      if (deleteUserResult.error) {
        // todo error banner
        console.log('failed to delete user');
        return;
      }
      await goToHome();
    } else {
      console.log("error delete account: no user id");
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full items-center">
      <div className="form-control w-full max-w-sm">
        <label className="label" htmlFor="email">
          <span className="label-text">Email</span>
        </label>
        <input id="email" type="text" value={session?.user.email} placeholder="exemple@mail.com" className='input input-bordered w-full max-w-sm rounded-md' disabled />
      </div>
      <div className="form-control w-full max-w-sm">
        <label className="label" htmlFor="fullName">
          <span className="label-text">Nom et prénom</span>
        </label>
        <input
          id="fullName"
          className='input input-bordered w-full max-w-sm rounded-md'
          type="text"
          placeholder="TETUANUI John"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div className="form-control w-full max-w-sm">
        <label className="label" htmlFor="email">
          <span className="label-text">Pseudo</span>
        </label>
        <input
          id="username"
          className='input input-bordered w-full max-w-sm rounded-md'
          type="text"
          placeholder="strategyKing987"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-5 w-full items-center">
        <button
          className="btn btn-primary w-full max-w-sm rounded-md"
          onClick={() => updateProfile({ fullname, username })}
          disabled={loading}
        >
          {loading ? 'Chargement ...' : 'Sauvegarder'}
        </button>
        <button className="btn btn-secondary w-full max-w-sm rounded-md" onClick={goToHome}>
          Déconnexion
        </button>
        <button className="btn btn-error w-full max-w-sm rounded-md" onClick={showDeleteAccountModal}>
          Supprimer le compte
        </button>
        <dialog id="deleteAccountModal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Confirmation</h3>
            <p className="py-4">Confirmez-vous la suppression de votre compte?</p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-error w-full max-w-sm rounded-md" onClick={() => deleteAccount()}>Supprimer</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  )
}