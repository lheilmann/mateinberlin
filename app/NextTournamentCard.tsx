"use client";

import { Field, Form, Formik } from "formik";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import supabase from "../supabase";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function NextTournamentCard() {
  const user = useUser();

  // useSessionContext

  return (
    <>
      <div className="p-4 rounded-lg border border-onyx-700 bg-onyx-800">
        <h2>Nächstes Turnier 3. November</h2>
        <CreateParticipantForm />
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
    name: "",
    board: false,
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <div className="flex items-center justify-center">
            <form
              className="flex flex-col gap-6 max-w-sm"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-row gap-4 ">
                <div className="flex flex-col flex-grow items-start gap-1">
                  <input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                    className="appearance-none p-2 rounded text-onyx-900"
                  />
                </div>
              </div>
              <div className="flex flex-row flex-grow items-center gap-1">
                <input
                  name="board"
                  id="board"
                  type="checkbox"
                  checked={values.board}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <label
                  className="inline-block text-sm cursor-pointer ml-2"
                  htmlFor="board"
                >
                  Ich bringe ein Schachbrett mit
                </label>
              </div>
              <div className="flex flex-row">
                <button
                  id="confetti"
                  type="submit"
                  className="border border-gray-400 px-3 py-2 rounded hover:border-gray-200 transition"
                >
                  Attacke
                </button>
              </div>
            </form>
          </div>
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
