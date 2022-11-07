"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function SignOut() {
  const supabaseClient = useSupabaseClient();

  const onClick = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    // refresh();
  };

  return (
    <div>
      <button
        className="border border-gray-400 px-3 py-2 rounded hover:border-gray-200 transition"
        onClick={onClick}
      >
        Log out
      </button>
    </div>
  );
}
