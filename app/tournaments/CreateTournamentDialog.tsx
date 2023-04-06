"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Field, Form, Formik } from "formik";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function CreateTournamentDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const onSubmit = async (values, { resetForm }) => {
    await supabaseClient.from("tournaments").insert({
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
        <div className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-primary-700 bg-primary-900 p-6 tracking-wide text-primary-300 transition hover:border-primary-300 hover:text-primary-100">
          <PlusIcon strokeWidth="2px" width={20} height={20} />
          <span>Turnier erstellen</span>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-primary-900/70" />
        <Dialog.Content className="fixed top-2/4 left-2/4 flex min-w-[300px] -translate-x-2/4 -translate-y-2/4 flex-col gap-4 rounded-lg bg-white p-4 shadow-2xl">
          <Dialog.Title className="text-xl font-medium text-primary-900">
            Neues Turnier erstellen
          </Dialog.Title>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className="flex max-w-sm flex-col gap-6">
              <fieldset className="flex flex-col gap-1">
                <label className="text-sm text-primary-700" htmlFor="date">
                  Datum
                </label>
                <Field
                  name="date"
                  type="date"
                  className="rounded border border-primary-200 p-2 text-primary-900 hover:border-primary-400"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-1">
                <label className="text-sm text-primary-700" htmlFor="date">
                  Uhrzeit
                </label>
                <Field
                  name="time"
                  type="time"
                  className="rounded border border-primary-200 p-2 text-primary-900 hover:border-primary-400"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-1">
                <label className="text-sm text-primary-700" htmlFor="date">
                  Location
                </label>
                <Field
                  name="location"
                  type="text"
                  className="rounded border border-primary-200 p-2 text-primary-900 hover:border-primary-400"
                />
              </fieldset>
              <div className="flex flex-row justify-end">
                {/*<Dialog.Close asChild>*/}
                <button
                  type="submit"
                  className="w-max rounded border border-primary-400 px-3 py-2 text-primary-900 transition hover:border-primary-200"
                >
                  Erstellen
                </button>
                {/*</Dialog.Close>*/}
              </div>
            </Form>
          </Formik>
          <Dialog.Close asChild>
            <button
              className="absolute top-2.5 right-2.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-200 text-primary-900"
              aria-label="Close"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
