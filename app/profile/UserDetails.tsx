"use client";

import { useUser } from "@supabase/auth-helpers-react";

export default function UserDetails() {
  const user = useUser();

  if (!user) return null;

  return (
    <dl className="flex gap-4">
      <dt>Email</dt>
      <dd>{user.email}</dd>
    </dl>
  );
}
