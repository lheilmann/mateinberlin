"use client";

import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { isAdmin } from "../lib/supabase/utils";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import useProfile from "../hooks/useProfile";

function Header() {
  const { profile, user } = useProfile();
  const supabaseClient = useSupabaseClient();

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    window.location.reload();
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
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-lila-400 hover:bg-lila-800 hover:text-lila-100">
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
                          className="text-lila-300 hover:bg-lila-800 hover:text-lila-100 px-3 py-2 rounded transition font-medium tracking-wide"
                          href="/"
                        >
                          Startseite
                        </Link>
                        <Link
                          className="text-lila-300 hover:bg-lila-800 hover:text-lila-100 px-3 py-2 rounded transition font-medium tracking-wide"
                          href="/tournaments"
                        >
                          Turniere
                        </Link>
                      </>
                    )}
                  </div>
                  {user && profile && (
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <div className="flex">
                          <span className="text-lila-300 hover:bg-lila-800 hover:text-lila-100 px-3 py-2 rounded transition tracking-wide font-medium cursor-pointer">
                            {profile.name}
                          </span>
                        </div>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          className="w-max transition rounded-md bg-lila-800 py-1"
                          align="end"
                          sideOffset={5}
                        >
                          <DropdownMenu.Item
                            className="flex appearance-none flex flex-row items-center hover:bg-lila-700 text-lila-200 hover:text-lila-100 transition px-4 py-2 cursor-pointer"
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
                  className="text-lila-300 hover:bg-lila-800 hover:text-lila-100 block px-3 py-2 rounded text-base font-medium tracking-wide"
                  aria-current="page"
                >
                  Startseite
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  href="/tournaments"
                  className="text-lila-300 hover:bg-lila-800 hover:text-lila-100 block px-3 py-2 rounded text-base font-medium tracking-wide"
                  aria-current="page"
                >
                  Turniere
                </Disclosure.Button>
                <Disclosure.Button
                  onClick={signOut}
                  className="w-full inline-flex justify-start text-lila-300 hover:bg-lila-800 hover:text-lila-100 px-3 py-2 rounded text-base font-medium tracking-wide"
                  aria-current="page"
                >
                  Ausloggen
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
}

export default Header;
