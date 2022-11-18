"use client";

import { Field, Form, Formik } from "formik";
import {
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import * as Tabs from "@radix-ui/react-tabs";
import { useRouter } from "next/navigation";

export default function AuthCard() {
  const sessionContext = useSessionContext();

  if (sessionContext.isLoading) return null;
  if (sessionContext.session?.user) return null;

  return (
    <Tabs.Root
      className="flex flex-col rounded-lg border border-lila-700 bg-lila-800"
      defaultValue="sign-in"
    >
      <Tabs.List className="flex shrink-0" aria-label="Verwalte dein Profil">
        <Tabs.Trigger
          className="transition flex flex-1 items-center justify-center py-3 border-b border-lila-700 data-[state=active]:border-lila-100 text-lila-400 data-[state=active]:text-lila-100"
          value="sign-in"
        >
          Anmelden
        </Tabs.Trigger>
        <Tabs.Trigger
          className="transition flex flex-1 items-center justify-center py-3 border-b border-lila-700 data-[state=active]:border-lila-100 text-lila-400 data-[state=active]:text-lila-100"
          value="register"
        >
          Registrieren
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="p-4" value="sign-in">
        <div className="flex flex-col gap-4">
          <p className="text-lila-400">
            Du hast schon einen Account? Dann melde dich hier an.
          </p>
          <SignInForm />
        </div>
      </Tabs.Content>
      <Tabs.Content className="p-4" value="register">
        <div className="flex flex-col gap-4">
          <p className="text-lila-400">
            Du bist neu? Registrier dich hier und mach mit!
          </p>
          <SignUpForm />
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}

function SignInForm() {
  const supabaseClient = useSupabaseClient();

  const onSubmit = async (values) => {
    await supabaseClient.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    let errors: any = {};
    if (!values.email) {
      errors.email = "Deine E-Mail-Addresse fehlt";
    }
    if (
      values.email &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
    ) {
      errors.email = "Deine E-Mail-Addresse sieht komisch aus";
    }
    if (!values.password) {
      errors.password = "Dein Passwort fehlt";
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
          placeholder="E-Mail"
          className="appearance-none p-2 rounded text-lila-900 placeholder:text-lila-700"
        />
        <Field
          name="password"
          type="password"
          placeholder="Passwort"
          className="appearance-none p-2 rounded text-lila-900 placeholder:text-lila-700"
        />
        <button
          type="submit"
          className="border border-lila-400 px-3 py-2 rounded hover:border-lila-200 transition text-lila-100"
        >
          Anmelden
        </button>
      </Form>
    </Formik>
  );
}

function SignUpForm() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const onSubmit = async (values) => {
    const { data } = await supabaseClient.auth.signUp({
      email: values.email,
      password: values.password,
    });
    await supabaseClient
      .from("profiles")
      .update({ name: values.name })
      .eq("id", data.user.id);
    router.refresh();
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validate = (values) => {
    let errors: any = {};
    if (!values.name) {
      errors.name = "Dein Name fehlt";
    }
    if (values.name && values.name.length < 6) {
      errors.name = "Dein Name muss mindestens 6 Zeichen lang sein";
    }
    if (!values.email) {
      errors.email = "Deine E-Mail-Addresse fehlt";
    }
    if (
      values.email &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
    ) {
      errors.email = "Deine E-Mail-Addresse sieht komisch aus";
    }
    if (!values.password) {
      errors.password = "Dein Passwort fehlt";
    }
    if (values.password && values.password.length < 6) {
      errors.password = "Dein Password muss mindestens 6 Zeichen lang sein";
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
          name="name"
          type="text"
          placeholder="Benutzername (mind. 6 Zeichen)"
          className="appearance-none p-2 rounded text-lila-900 placeholder:text-lila-700"
        />
        <Field
          name="email"
          type="email"
          placeholder="E-Mail"
          className="appearance-none p-2 rounded text-lila-900 placeholder:text-lila-700"
        />
        <Field
          name="password"
          type="password"
          placeholder="Passwort (mind. 6 Zeichen)"
          className="appearance-none p-2 rounded text-lila-900 placeholder:text-lila-700"
        />
        <button
          type="submit"
          className="border border-lila-400 px-3 py-2 rounded hover:border-lila-200 transition text-lila-100"
        >
          Registrieren
        </button>
      </Form>
    </Formik>
  );
}
