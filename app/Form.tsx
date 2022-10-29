"use client";

import {supabase} from "../supabase/client";
import { Formik } from "formik";
import { useRouter } from 'next/navigation';

async function createParticipant(values) {
    await supabase
        .from("participants")
        .insert({
            ...values,
        });
}

export default function Form() {
    const router = useRouter();

    const onSubmit = async (values, { resetForm }) => {
        await createParticipant(values);
        router.refresh();
        resetForm();
    }

    const initialValues = {
        name: "",
        board: false
    };

  return (
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ values, handleChange, handleSubmit }) => (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="flex flex-row gap-4">
                      <div className="flex flex-col flex-grow items-start gap-1">
                          <input name="name" id="name" type="text" placeholder="Name" value={values.name} onChange={handleChange} className="appearance-none p-2 rounded text-onyx-900" />
                      </div>
                  </div>
                  <div className="flex flex-row flex-grow items-center gap-1">
                      <input name="board" id="board" type="checkbox" checked={values.board} onChange={handleChange} className="cursor-pointer" />
                      <label className="inline-block text-sm cursor-pointer ml-2" htmlFor="board">
                          Ich bringe ein Schachbrett mit
                      </label>
                  </div>
                  <div className="flex flex-row">
                      <button type="submit" className="border border-gray-400 px-3 py-2 rounded hover:border-gray-200 transition">Attacke</button>
                  </div>
              </form>
          )}
      </Formik>
  )
}
