"use client";

import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import useProfile from "~hooks/useProfile";
import { isAdmin } from "~supabase/utils";

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
          <div className="mx-auto max-w-7xl px-4 sm:px-10">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                {user && isAdmin(user) && (
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-primary-400 hover:bg-primary-800 hover:text-primary-100">
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
                          className="rounded px-3 py-2 font-medium tracking-wide text-primary-300 transition hover:bg-primary-800 hover:text-primary-100"
                          href="/"
                        >
                          Startseite
                        </Link>
                        <Link
                          className="rounded px-3 py-2 font-medium tracking-wide text-primary-300 transition hover:bg-primary-800 hover:text-primary-100"
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
                          <span className="cursor-pointer rounded px-3 py-2 font-medium tracking-wide text-primary-300 transition hover:bg-primary-800 hover:text-primary-100">
                            {profile.username}
                          </span>
                        </div>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          className="w-max rounded-md bg-primary-800 py-1 transition"
                          align="end"
                          sideOffset={5}
                        >
                          <DropdownMenu.Item
                            className="flex cursor-pointer appearance-none flex-row items-center px-4 py-2 text-primary-200 transition hover:bg-primary-700 hover:text-primary-100"
                            onClick={signOut}
                          >
                            Abmelden
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
                  className="block rounded px-3 py-2 text-base font-medium tracking-wide text-primary-300 hover:bg-primary-800 hover:text-primary-100"
                  aria-current="page"
                >
                  Startseite
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  href="/tournaments"
                  className="block rounded px-3 py-2 text-base font-medium tracking-wide text-primary-300 hover:bg-primary-800 hover:text-primary-100"
                  aria-current="page"
                >
                  Turniere
                </Disclosure.Button>
                <Disclosure.Button
                  onClick={signOut}
                  className="inline-flex w-full justify-start rounded px-3 py-2 text-base font-medium tracking-wide text-primary-300 hover:bg-primary-800 hover:text-primary-100"
                  aria-current="page"
                >
                  Abmelden
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
