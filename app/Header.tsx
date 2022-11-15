"use client";

import Link from "next/link";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { isAdmin } from "../lib/supabase/utils";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function Header2() {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
  };

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-10">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                {user && isAdmin(user) && (
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                )}
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div className="flex space-x-4">
                    {user && isAdmin(user) && (
                      <>
                        <Link
                          className="text-zinc-300 hover:bg-zinc-800 hover:text-white px-3 py-2 rounded transition font-medium tracking-wide"
                          href="/"
                        >
                          Startseite
                        </Link>
                        <Link
                          className="text-zinc-300 hover:bg-zinc-800 hover:text-white px-3 py-2 rounded transition font-medium tracking-wide"
                          href="/tournaments"
                        >
                          Turniere
                        </Link>
                      </>
                    )}
                  </div>
                  {user && (
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <div className="flex">
                          <span className="text-zinc-300 hover:bg-zinc-800 hover:text-white px-3 py-2 rounded transition tracking-wide font-medium cursor-pointer">
                            {user.email}
                          </span>
                        </div>
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
                </div>
              </div>
            </div>
          </div>

          {user && isAdmin(user) && (
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                <Disclosure.Button
                  as={Link}
                  href="/"
                  className="text-zinc-300 hover:bg-zinc-800 hover:text-white block px-3 py-2 rounded text-base font-medium tracking-wide"
                  aria-current="page"
                >
                  Startseite
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  href="/tournaments"
                  className="text-zinc-300 hover:bg-zinc-700 hover:text-white block px-3 py-2 rounded text-base font-medium tracking-wide"
                  aria-current="page"
                >
                  Turniere
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
}

export default Header2;
