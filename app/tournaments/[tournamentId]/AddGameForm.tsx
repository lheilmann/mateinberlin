"use client";

import { Field, Form, Formik } from "formik";
import LoadingIcon from "~components/LoadingIcon";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type Props = {
  tournamentId: string;
  participants: any[];
  games: any[];
};
export default function AddGameForm(props: Props) {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const onSubmit = async (values, { resetForm }) => {
    console.log(values);
    await supabaseClient.from("games").insert({
      tournament_id: props.tournamentId,
      round: values.round,
      player_white_id: values.playerWhiteId,
      player_black_id: values.playerBlackId,
      result: values.result,
    });
    router.refresh();
    resetForm();
  };

  const initialValues = {
    round: null,
    playerWhiteId: null,
    playerBlackId: null,
    result: null,
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(form) => (
        <Form className="grid grid-cols-12 gap-x-2">
          <Field
            name="round"
            as="select"
            className="col-span-2 truncate rounded border border-primary-700 bg-primary-900 p-2 text-primary-100 hover:border-primary-600"
          >
            <option value={null}>Runde</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Field>
          <Field
            name="playerWhiteId"
            as="select"
            className="col-span-3 truncate rounded border border-primary-700 bg-primary-900 p-2 text-primary-100 hover:border-primary-600"
          >
            <option value={null}>Weiß</option>
            {props.participants.map((participant) => (
              <option
                key={participant.profiles.id}
                value={participant.profiles.id}
              >
                {participant.profiles.username}
              </option>
            ))}
          </Field>
          <Field
            name="playerBlackId"
            as="select"
            className="col-span-3 truncate rounded border border-primary-700 bg-primary-900 p-2 text-primary-100 hover:border-primary-600"
          >
            <option value={null}>Schwarz</option>
            {props.participants.map((participant) => (
              <option
                key={participant.profiles.id}
                value={participant.profiles.id}
              >
                {participant.profiles.username}
              </option>
            ))}
          </Field>
          <Field
            name="result"
            as="select"
            className="col-span-3 truncate rounded border border-primary-700 bg-primary-900 p-2 text-primary-100 hover:border-primary-600"
          >
            <option value={null}>Ergebnis</option>
            <option value="WHITE_WINS">Weiß gewinnt</option>
            <option value="BLACK_WINS">Schwarz gewinnt</option>
            <option value="DRAW">Unentschieden</option>
          </Field>
          <button
            type="submit"
            disabled={form.isSubmitting}
            className="group flex w-full items-center justify-center rounded border border-primary-600 bg-primary-700 font-medium text-primary-100 transition hover:bg-primary-800 hover:text-primary-200"
          >
            {form.isSubmitting ? (
              <LoadingIcon className="h-5 w-5" />
            ) : (
              <PlusIcon className="h-5 w-5" />
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}
