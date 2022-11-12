import "./global.css";
import React from "react";

import { Inter } from "@next/font/google";
import clsx from "clsx";
import Provider from "./Provider";
import Header from "./Header";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
};
export default async function RootLayout(props: Props) {
  return (
    <html lang="de" className={clsx("p-0 m-0", inter.className)}>
      <head>
        <title>Mate In Berlin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="p-0 m-0 bg-zinc-900 text-white">
        <Provider>
          <Header />
          <main className="px-4 sm:px-10">{props.children}</main>
          <footer></footer>
        </Provider>
      </body>
    </html>
  );
}
