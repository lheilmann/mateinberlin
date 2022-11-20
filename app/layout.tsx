import "./global.css";
import React from "react";

import { Space_Grotesk } from "@next/font/google";
import clsx from "clsx";
import Provider from "./Provider";
import Header from "./Header";

import Footer from "./Footer";

const font = Space_Grotesk({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
};
export default async function RootLayout(props: Props) {
  return (
    <html lang="de" className={clsx("m-0 p-0", font.className)}>
      <head>
        <title>Mate In Berlin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="m-0 bg-primary-900 p-0">
        <Provider>
          <div className="flex h-screen flex-col justify-between">
            <Header />
            <main className="mx-auto mb-auto w-full max-w-7xl px-4 sm:px-10">
              {props.children}
            </main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
