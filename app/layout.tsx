import "./global.css";
import React from "react";
import Link from "next/link";

import { Inter } from "@next/font/google";
import clsx from "clsx";
import Provider from "./Provider";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
};
export default async function RootLayout(props: Props) {
  // const res = await fetch("http://localhost:3000/api/user");
  // const data = await res.json();
  //
  // console.log({ data });

  return (
    <html lang="de" className={clsx("p-0 m-0", inter.className)}>
      <head>
        <title>Mate In Berlin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="p-0 m-0 bg-onyx-900 text-white">
        <Provider>
          <header className="w-full h-20 p-6 flex flex-row items-center justify-end">
            <nav>
              <ul className="flex flex-row gap-4">
                <li>
                  <Link
                    className="text-gray-100 hover:text-white hover:bg-gray-800 px-3 py-2 rounded transition tracking-wide"
                    href="/"
                  >
                    Home
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
              </ul>
            </nav>
          </header>
          <main className="px-10">{props.children}</main>
          <footer></footer>
        </Provider>
      </body>
    </html>
  );
}
