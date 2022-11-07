import CreateParticipantForm from "./CreateParticipantForm";
import SignInForm from "./SignInForm";

export const revalidate = 0;

export default async function Page() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex items-center justify-center w-full">
        <h1 className="text-8xl font-semibold tracking-wider text-gray-100 uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300 drop-shadow-[0_0_12px_rgba(147, 197, 253, 0.6)]">
          Mate in Berlin
        </h1>
      </section>
      {/*<section className="flex gap-6 items-center justify-center w-full">*/}
      {/*  <div className="relative w-96 h-96">*/}
      {/*    <div className="grid grid-cols-8 w-96 h-96 box-shadow-[0_0_12px_rgba(255,255,255,0.4)]">*/}
      {/*      {Array.from({ length: 64 }, (_, i) => i).map((index) => {*/}
      {/*        const bgColor = () => {*/}
      {/*          const row = Math.floor(index / 8);*/}
      {/*          if (row % 2) return index % 2 ? "bg-white" : "bg-onyx-900";*/}
      {/*          return index % 2 ? "bg-onyx-900" : "bg-white";*/}
      {/*        };*/}
      {/*        return (*/}
      {/*          <div*/}
      {/*            key={index}*/}
      {/*            className={clsx(bgColor(), "hover:shadow-lg")}*/}
      {/*          ></div>*/}
      {/*        );*/}
      {/*      })}*/}
      {/*    </div>*/}
      {/*    <div className="absolute inset-0 grid grid-cols-8 w-96 h-96 overflow-hidden">*/}
      {/*      <div className="column" style={{ gridArea: "1 / 1 / 1 / 9" }}></div>*/}
      {/*      <div className="" style={{ gridArea: "2 / 1 / 2 / 9" }}></div>*/}
      {/*      <div className="z-10" style={{ gridArea: "3 / 1 / 3 / 9" }}></div>*/}
      {/*      <div className="z-10" style={{ gridArea: "4 / 1 / 4 / 9" }}></div>*/}
      {/*      <div className="z-10" style={{ gridArea: "5 / 1 / 5 / 9" }}></div>*/}
      {/*      <div className="z-10" style={{ gridArea: "6 / 1 / 6 / 9" }}></div>*/}
      {/*      <div className="z-10" style={{ gridArea: "7 / 1 / 7 / 9" }}></div>*/}
      {/*      <div className="z-10" style={{ gridArea: "8 / 1 / 8 / 9" }}></div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 rounded border border-transparent hover:border-gray-400 transition">
          <SignInForm />
        </div>
        <div className="p-4 rounded border border-transparent hover:border-gray-400 transition">
          <h2>Nächstes Turnier 3. November</h2>
          <CreateParticipantForm />
        </div>
      </section>
    </div>
  );
}
