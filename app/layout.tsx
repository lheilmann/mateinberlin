import "./global.css";
import React from "react";

import { Inter } from "@next/font/google";
import clsx from "clsx";
import Provider from "./Provider";
import Header from "./Header";
import InstagramLogoIcon from "/instagram-icon.svg";
import Footer from "./Footer";

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
      <body className="p-0 m-0 bg-lila-900">
        <Provider>
          <div className="flex flex-col h-screen justify-between">
            <Header />
            <main className="max-w-7xl w-full mx-auto mb-auto px-2 sm:px-10">
              {props.children}
            </main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
