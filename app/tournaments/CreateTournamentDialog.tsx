"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { Field, Form, Formik } from "formik";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateTournamentDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const onSubmit = async (values, { resetForm }) => {
    const res = await supabaseClient.from("tournaments").insert({
      ...values,
    });
    router.refresh();
    setOpen(false);
    resetForm();
  };

  const initialValues = {
    date: "",
    time: "19:00",
    location: "",
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <div className="flex items-center justify-center gap-2 rounded-lg border border-lila-700 bg-transparent p-6 w-full cursor-pointer hover:border-lila-300 border-dashed text-lila-300 hover:text-lila-100 transition tracking-wide">
          <PlusIcon strokeWidth="2px" width={20} height={20} />
          <span>Turnier erstellen</span>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-lila-900/70 fixed inset-0" />
        <Dialog.Content className="flex flex-col gap-4 bg-white rounded-lg shadow-2xl fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 p-4 min-w-[300px]">
          <Dialog.Title className="text-lila-900 text-xl font-medium">
            Neues Turnier erstellen
          </Dialog.Title>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className="flex flex-col gap-6 max-w-sm">
              <fieldset className="flex flex-col gap-1">
                <label className="text-sm text-lila-700" htmlFor="date">
                  Datum
                </label>
                <Field
                  name="date"
                  type="date"
                  className="p-2 rounded text-lila-900 border border-lila-200 hover:border-lila-400"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-1">
                <label className="text-sm text-lila-700" htmlFor="date">
                  Uhrzeit
                </label>
                <Field
                  name="time"
                  type="time"
                  className="p-2 rounded text-lila-900 border border-lila-200 hover:border-lila-400"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-1">
                <label className="text-sm text-lila-700" htmlFor="date">
                  Location
                </label>
                <Field
                  name="location"
                  type="text"
                  className="p-2 rounded text-lila-900 border border-lila-200 hover:border-lila-400"
                />
              </fieldset>
              <div className="flex flex-row justify-end">
                {/*<Dialog.Close asChild>*/}
                <button
                  type="submit"
                  className="text-lila-900 border border-lila-400 px-3 py-2 rounded hover:border-lila-200 transition w-max"
                >
                  Erstellen
                </button>
                {/*</Dialog.Close>*/}
              </div>
            </Form>
          </Formik>
          <Dialog.Close asChild>
            <button
              className="text-lila-900 absolute top-2.5 right-2.5 rounded-full h-5 w-5 inline-flex items-center justify-center bg-lila-200"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
