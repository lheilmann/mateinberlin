"use client";

import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";

export default function Header() {
  const user = useUser();
  return (
    <header className="w-full h-20 p-6 flex flex-row items-center justify-end">
      <nav>
        <ul className="flex flex-row gap-4">
          <li>
            <Link
              className="text-gray-100 hover:text-white hover:bg-gray-800 px-3 py-2 rounded transition tracking-wide"
              href="/"
            >
              Startseite
            </Link>
          </li>
          <li>
            <Link
              className="text-gray-100 hover:text-white hover:bg-gray-800 px-3 py-2 rounded transition tracking-wide"
              href="/participants"
            >
              Teilnehmer
            </Link>
          </li>
          {user && (
            <li>
              <Link
                className="text-gray-100 hover:text-white hover:bg-gray-800 px-3 py-2 rounded transition tracking-wide"
                href="/profile"
              >
                Profil
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
