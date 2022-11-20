"use client";

import { Field, Form, Formik } from "formik";
import {
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import * as Tabs from "@radix-ui/react-tabs";
import { useRouter } from "next/navigation";
import {
  ArrowLeftOnRectangleIcon,
  ExclamationTriangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function AuthCard() {
  const sessionContext = useSessionContext();

  if (sessionContext.isLoading) return null;
  if (sessionContext.session?.user) return null;

  return (
    <Tabs.Root
      className="flex flex-col rounded-lg border border-primary-700 bg-primary-800"
      defaultValue="sign-in"
    >
      <Tabs.List className="flex shrink-0" aria-label="Verwalte dein Profil">
        <Tabs.Trigger
          className="flex flex-1 items-center justify-center gap-2 border-b border-primary-700 py-3 text-primary-400 transition hover:text-primary-300 data-[state=active]:border-primary-100 data-[state=active]:text-primary-100"
          value="sign-in"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          <span>Anmelden</span>
        </Tabs.Trigger>
        <Tabs.Trigger
          className="flex flex-1 items-center justify-center gap-2 border-b border-primary-700 py-3 text-primary-400 transition hover:text-primary-300 data-[state=active]:border-primary-100 data-[state=active]:text-primary-100"
          value="register"
        >
          <UserPlusIcon className="h-5 w-5" />
          <span>Registrieren</span>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="p-4" value="sign-in">
        <div className="flex flex-col gap-4">
          <p className="text-primary-400">
            Du hast schon ein Profil? Dann melde dich hier an.
          </p>
          <SignInForm />
        </div>
      </Tabs.Content>
      <Tabs.Content className="p-4" value="register">
        <div className="flex flex-col gap-4">
          <p className="text-primary-400">
            Du bist neu? Registrier dich hier und mach mit!
          </p>
          <SignUpForm />
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}

type SignInFormValues = {
  email: string;
  password: string;
};

function SignInForm() {
  const supabaseClient = useSupabaseClient();

  const onSubmit = async (values: SignInFormValues) => {
    await supabaseClient.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
  };

  const initialValues: SignInFormValues = {
    email: "",
    password: "",
  };

  const validate = (values: SignInFormValues) => {
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
      validateOnChange={false}
      validateOnMount={false}
    >
      {(form) => (
        <Form className="flex max-w-sm flex-col gap-5">
          <fieldset
            className={clsx(
              "flex flex-col gap-1",
              form.touched.email && form.errors.email && "-mb-2"
            )}
          >
            <Field
              name="email"
              type="email"
              placeholder="E-Mail-Adresse"
              className="w-full appearance-none rounded border border-primary-700 bg-primary-900 p-2 text-primary-100 placeholder:text-primary-300 hover:border-primary-600"
            />
            {form.touched.email && form.errors.email && (
              <span className="inline-flex items-center gap-1 text-sm text-primary-400">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <span>{form.errors.email}</span>
              </span>
            )}
          </fieldset>
          <fieldset
            className={clsx(
              "flex flex-col gap-1",
              form.touched.password && form.errors.password && "-mb-2"
            )}
          >
            <Field
              name="password"
              type="password"
              placeholder="Passwort"
              className="w-full appearance-none rounded border border-primary-700 bg-primary-900 p-2 text-primary-100 placeholder:text-primary-300 hover:border-primary-600"
            />
            {form.touched.password && form.errors.password && (
              <span className="inline-flex items-center gap-1 text-sm text-primary-400">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <span>{form.errors.password}</span>
              </span>
            )}
          </fieldset>
          <button
            type="submit"
            disabled={form.isSubmitting}
            className="group flex h-12 w-full items-center justify-center gap-3 rounded border border-primary-600 bg-primary-700 font-medium text-primary-100 transition hover:bg-primary-800 hover:text-primary-200"
          >
            <span>Anmelden</span>
          </button>
        </Form>
      )}
    </Formik>
  );
}

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
};

function SignUpForm() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const onSubmit = async (values: SignUpFormValues) => {
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

  const initialValues: SignUpFormValues = {
    name: "",
    email: "",
    password: "",
  };

  const validate = (values: SignUpFormValues) => {
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
      validateOnChange={false}
      validateOnMount={false}
    >
      {(form) => (
        <Form className="flex max-w-sm flex-col gap-5">
          <fieldset
            className={clsx(
              "flex flex-col gap-1",
              form.touched.name && form.errors.name && "-mb-2"
            )}
          >
            <Field
              name="name"
              type="text"
              placeholder="Benutzername (mind. 6 Zeichen)"
              className="w-full appearance-none rounded border border-primary-700 bg-primary-900 p-2 text-primary-100 placeholder:text-primary-300 hover:border-primary-600"
            />
            {form.touched.name && form.errors.name && (
              <span className="inline-flex items-center gap-1 text-sm text-primary-400">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <span>{form.errors.name}</span>
              </span>
            )}
          </fieldset>
          <fieldset
            className={clsx(
              "flex flex-col gap-1",
              form.touched.email && form.errors.email && "-mb-2"
            )}
          >
            <Field
              name="email"
              type="email"
              placeholder="E-Mail"
              className="w-full appearance-none rounded border border-primary-700 bg-primary-900 p-2 text-primary-100 placeholder:text-primary-300 hover:border-primary-600"
            />
            {form.touched.email && form.errors.email && (
              <span className="inline-flex items-center gap-1 text-sm text-primary-400">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <span>{form.errors.email}</span>
              </span>
            )}
          </fieldset>
          <fieldset
            className={clsx(
              "flex flex-col gap-1",
              form.touched.password && form.errors.password && "-mb-2"
            )}
          >
            <Field
              name="password"
              type="password"
              placeholder="Passwort (mind. 6 Zeichen)"
              className="w-full appearance-none rounded border border-primary-700 bg-primary-900 p-2 text-primary-100 placeholder:text-primary-300 hover:border-primary-600"
            />
            {form.touched.password && form.errors.password && (
              <span className="inline-flex items-center gap-1 text-sm text-primary-400">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <span>{form.errors.password}</span>
              </span>
            )}
          </fieldset>
          <button
            type="submit"
            disabled={form.isSubmitting}
            className="group flex h-12 w-full items-center justify-center gap-3 rounded border border-primary-600 bg-primary-700 font-medium text-primary-100 transition hover:bg-primary-800 hover:text-primary-200"
          >
            <span>Registrieren</span>
          </button>
        </Form>
      )}
    </Formik>
  );
}
