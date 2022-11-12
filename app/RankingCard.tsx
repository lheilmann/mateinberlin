"use client";

import { Field, Form, Formik } from "formik";
import {
  useUser,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import supabase from "../supabase";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function RankingCard() {
  return (
    <>
      <div className="flex flex-col p-4 rounded-lg border border-zinc-700 bg-zinc-800">
        <span className="flex text-zinc-500 uppercase tracking-wider">
          Ranking
        </span>
        <div className="flex flex-col items-start justify-center py-4 gap-4">
          <span>Name 1</span>
          <span>Name 2</span>
          <span>Name 3</span>
        </div>
      </div>
    </>
  );
}
