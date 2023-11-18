'use client';
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { RedirectType, redirect, useRouter } from "next/navigation";
import { Database } from "../../../types/supabase";
import { useEffect, useState } from "react";
import { PrevRoute } from "../model/prev-route";

type NavbarProps = {
  prevRoute?: PrevRoute
}

export default function Navbar(props: NavbarProps) {
  const [loading, setLoading] = useState(true);
  const [initCalled, setInitCalled] = useState(false);

  const [user, setUser] = useState<User>();
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const init = async () => {
    const userResult = await supabase.auth.getUser();
    if (userResult.data && userResult.data.user) {
      setUser(userResult.data.user);
    } else {
      router.push('/');
    }
    setLoading(false);
    setInitCalled(true);
  }

  useEffect(() => {
    if (loading && !initCalled) {
      init();
    }
  }, [loading, initCalled]);


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
        {props.prevRoute ? <Link href={props.prevRoute.href} className="btn btn-ghost">{`< ${props.prevRoute.label}`}</Link> : <></>}
      </div>
      <div className="navbar-center">
        <Link href={'/plants'} className="btn btn-ghost text-xl">Fa'a'apu</Link>
      </div>
      <div className="navbar-end flex flex-row gap-5">
        <label>{user?.email}</label>
        <button onClick={() => handleSignOut()} className="btn btn-ghost flex flex-row gap-2 items-center">
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
}