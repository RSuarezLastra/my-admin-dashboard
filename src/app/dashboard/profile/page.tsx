'use client'

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {

  const { data: session } = useSession();

  useEffect(() => {
    console.log('client side');
  }, [])

  return (
    <div>
      <h1>Page profile</h1>
      <hr />

      <div className="flex flex-col">
      <span>{session?.user?.name ?? 'no name'}</span>
      <span>{session?.user?.email ?? 'no email'} </span>
      </div>
    </div>
  );
}