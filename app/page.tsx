import { Formik } from "formik";
import Form from "./Form";

export default async function Page() {
    const onSubmit = (values) => {
        console.log(values);
    }

    const initialValues = {};

  return (
      <div className="flex flex-col gap-10">
      <section className="flex items-center justify-center w-full">
          <h1 className="text-8xl font-light tracking-wider text-white uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
              Mate in Berlin
          </h1>
      </section>
      <section className="flex flex-col gap-6">
          <h3>Nächstes Turnier 3. November</h3>
          <Form />
      </section>
      </div>
  )
}
