"use client";

import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";

export default function SignInForm() {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const session = useSession();

  console.log({ user, session });

  const onSubmit = async (values) => {
    await supabaseClient.auth.signInWithOtp({
      email: values.email,
    });
  };

  const initialValues = {
    email: "",
  };

  const validate = (values) => {
    let errors: any = {};
    if (!values.email) {
      errors.email = "Tell us your email address to sign in";
    }
    return errors;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        <Form className="flex flex-col gap-6 max-w-sm">
          <div className="flex flex-row gap-4 ">
            <div className="flex flex-col flex-grow items-start gap-1">
              <Field
                name="email"
                type="email"
                placeholder="E-mail"
                className="appearance-none p-2 rounded text-onyx-900"
              />
            </div>
          </div>
          <div className="flex flex-row">
            <button
              type="submit"
              className="border border-gray-400 px-3 py-2 rounded hover:border-gray-200 transition"
            >
              Link senden
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}
