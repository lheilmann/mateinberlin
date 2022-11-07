"use client";

import { Field, Form, Formik } from "formik";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function AccountCard() {
  const user = useUser();
  return (
    <div className="p-4 rounded border border-transparent hover:border-gray-400 transition">
      {user ? <div>Signed in as {user.email}</div> : <SignInForm />}
    </div>
  );
}

function SignInForm() {
  const supabaseClient = useSupabaseClient();

  const onSubmit = async (values) => {
    const res = await supabaseClient.auth.signInWithOtp({
      email: values.email,
      options: {
        data: {
          name: values.name,
        },
      },
    });
    console.log(res);
  };

  const initialValues = {
    email: "",
    name: "",
  };

  const validate = (values) => {
    let errors: any = {};
    if (!values.email) {
      errors.email = "Tell us your email address to sign in";
    }
    if (!values.name) {
      errors.name = "Tell us your name";
    }
    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      <Form className="flex flex-col gap-6 max-w-sm">
        <Field
          name="email"
          type="email"
          placeholder="E-mail"
          className="appearance-none p-2 rounded text-onyx-900"
        />
        <Field
          name="name"
          type="text"
          placeholder="Name"
          className="appearance-none p-2 rounded text-onyx-900"
        />
        <button
          type="submit"
          className="border border-gray-400 px-3 py-2 rounded hover:border-gray-200 transition"
        >
          Link senden
        </button>
      </Form>
    </Formik>
  );
}
