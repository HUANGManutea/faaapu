'use client';
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Database } from "../../../types/supabase";
import { PrevRoute } from "../model/prev-route";
import { userContext } from "../contexts/user-context";

type NavbarProps = {
  prevRoute?: PrevRoute
}

export default function Navbar({ prevRoute }: NavbarProps) {
  const router = useRouter();
  const context = userContext();
  const supabase = createClientComponentClient<Database>();

  if (!context) {
    router.push('/');
  }


  const handleSignOut = async () => {
    const logoutResult = await supabase.auth.signOut();
    if (logoutResult.error) {
      console.error(logoutResult.error);
    } else {
      router.push('/');
    }
  }

  return (
    <div className="navbar bg-green-900 text-white">
      <div className="navbar-start">
        {prevRoute ? <Link href={prevRoute.href} className="btn btn-ghost">{`< ${prevRoute.label}`}</Link> : <></>}
      </div>
      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost text-xl">Fa'a'apu</Link>
      </div>
      <div className="navbar-end flex flex-row gap-5">
      <Link href={"/account"} className="btn btn-ghost">{context?.userProfile?.username ? context.userProfile.username : "Veuillez cliquer ici pour renseigner votre pseudo"}</Link>
        <button onClick={() => handleSignOut()} className="btn btn-ghost flex flex-row gap-2 items-center">
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
}