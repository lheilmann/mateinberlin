import './global.css';
import React from "react";

import { Inter } from '@next/font/google'
import clsx from "clsx";

const inter = Inter()

export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang="de" className={clsx("p-0 m-0", inter.className)}>
      <head>
        <title>Mate In Berlin</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="p-0 m-0 bg-onyx-800 text-white">
        <header className="w-full h-20 p-6 flex flex-row items-center justify-end">
            <nav>
                <ul>
                    <li><a className="text-gray-400 hover:text-white transition tracking-wide" href="/tournaments">Turniere</a></li>
                </ul>
            </nav>
        </header>
        <main className="px-10">
            {children}
        </main>
        <footer>

        </footer>
      </body>
    </html>
  );
}
