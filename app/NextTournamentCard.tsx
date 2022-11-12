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

export default function NextTournamentCard() {
  const sessionContext = useSessionContext();
  const user =
    !sessionContext.isLoading &&
    sessionContext.session &&
    sessionContext.session.user;

  return (
    <>
      <div className="p-4 rounded-lg border border-zinc-700 bg-zinc-800">
        <span className="text-zinc-500 uppercase tracking-wider">
          Nächstes Turnier
        </span>
        <h2 className="text-2xl">3. November 2022</h2>
        {user ? <CreateParticipantForm /> : <div></div>}
      </div>
    </>
  );
}

function CreateParticipantForm() {
  const router = useRouter();

  const onSubmit = async (values, { resetForm }) => {
    await supabase.from("participants").insert({
      ...values,
    });
    router.refresh();
    resetForm();
  };

  const initialValues = {
    board: false,
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values }) => (
          <Form className="flex flex-col gap-6 max-w-sm">
            <div className="flex flex-row flex-grow items-center gap-1">
              <Field
                name="board"
                type="checkbox"
                checked={values.board}
                className="cursor-pointer"
              />
              <label
                className="inline-block text-sm cursor-pointer ml-2"
                htmlFor="board"
              >
                Ich bringe ein Schachbrett mit
              </label>
            </div>
            <button
              id="confetti"
              type="submit"
              className="border border-gray-400 px-3 py-2 rounded hover:border-gray-200 transition"
            >
              Attacke
            </button>
          </Form>
        )}
      </Formik>
      <Script
        src="confetti.min.js"
        onReady={() => {
          // @ts-ignore
          let confetti = new Confetti("confetti");
          confetti.setCount(75);
          confetti.setSize(1);
          confetti.setPower(25);
          confetti.setFade(false);
          confetti.destroyTarget(true);
        }}
      />
    </>
  );
}
