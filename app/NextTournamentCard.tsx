"use client";

import { Field, Form, Formik } from "formik";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { format } from "date-fns";
import { de } from "date-fns/locale";

type Props = {
  nextTournament: any;
};
export default function NextTournamentCard(props: Props) {
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
        {props.nextTournament ? (
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl">
              {format(new Date(props.nextTournament.date), "PPP", {
                locale: de,
              })}
            </h2>
            {user ? <CreateParticipantForm /> : <div></div>}
          </div>
        ) : (
          <h2 className="text-2xl italic">tba</h2>
        )}
      </div>
    </>
  );
}

function CreateParticipantForm() {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const onSubmit = async (values, { resetForm }) => {
    await supabaseClient.from("participants").insert({
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
