"use client";

import Link from "next/link";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function Header() {
  const sessionContext = useSessionContext();
  const supabaseClient = useSupabaseClient();

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
  };

  return (
    <header className="w-full h-20 p-6 flex flex-row items-center justify-end">
      <nav>
        <ul className="flex flex-row gap-4">
          <li>
            <Link
              className="text-gray-100 hover:text-white hover:bg-zinc-700 px-3 py-2 rounded transition tracking-wide"
              href="/"
            >
              Startseite
            </Link>
          </li>
          <li>
            <Link
              className="text-gray-100 hover:text-white hover:bg-zinc-700 px-3 py-2 rounded transition tracking-wide"
              href="/participants"
            >
              Teilnehmer
            </Link>
          </li>
          {!sessionContext.isLoading && sessionContext.session && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <li>
                  <span className="text-gray-100 hover:text-white hover:bg-zinc-700 px-3 py-2 rounded transition tracking-wide cursor-pointer">
                    {sessionContext.session.user.email}
                  </span>
                </li>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="w-max transition rounded-md bg-zinc-700 py-1"
                  align="end"
                  sideOffset={5}
                >
                  <DropdownMenu.Item
                    className="flex appearance-none flex flex-row items-center hover:bg-zinc-800 text-white transition px-4 py-2 cursor-pointer"
                    onClick={signOut}
                  >
                    Ausloggen
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )}
        </ul>
      </nav>
    </header>
  );
}
