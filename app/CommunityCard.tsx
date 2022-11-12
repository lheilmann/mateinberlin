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

export default function CommunityCard() {
  return (
    <>
      <div className="flex flex-col p-4 rounded-lg border border-zinc-700 bg-zinc-800">
        <span className="flex text-zinc-500 uppercase tracking-wider">
          Community
        </span>
        <div className="flex flex-col items-start justify-center py-4 gap-4">
          <div className="flex flex-1 items-end justify-start gap-2">
            <span className="text-6xl">1</span>
            <span className="text-zinc-500">Turnier</span>
          </div>
          <div className="flex flex-1 items-end justify-start gap-2">
            <span className="text-6xl">26</span>
            <span className="text-zinc-500">Spieler*innen</span>
          </div>
        </div>
      </div>
    </>
  );
}
