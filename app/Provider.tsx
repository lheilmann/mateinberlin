"use client";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
  // initialSession: Session;
};
export default function Provider(props: Props) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  // console.log("props", props.initialSession);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      // initialSession={props.initialSession}
    >
      {props.children}
    </SessionContextProvider>
  );
}
