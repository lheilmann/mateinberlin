"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Script from "next/script";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { useEffect, useState } from "react";
import useProfile from "../hooks/useProfile";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  Cross2Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Field, Formik } from "formik";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";

type Props = {
  nextTournament: any;
};
export default function NextTournamentCard(props: Props) {
  return (
    <>
      <div className="flex flex-col gap-2 p-4 rounded-lg border border-emerald-700 bg-emerald-800">
        <h3 className="text-emerald-500 uppercase tracking-wider">
          Nächstes Turnier
        </h3>
        {props.nextTournament ? (
          <NextTournament nextTournament={props.nextTournament} />
        ) : (
          <h2 className="text-2xl italic">tba</h2>
        )}
      </div>
    </>
  );
}

function NextTournament(props: Props) {
  const { profile } = useProfile();

  return (
    <>
      <h2 className="inline-flex items-center gap-3 text-2xl">
        <CalendarIcon width={24} height={24} className="text-emerald-400" />
        <span>
          {format(new Date(props.nextTournament.date), "PPP", {
            locale: de,
          })}
        </span>
      </h2>
      <h2 className="inline-flex items-center gap-3 text-2xl">
        <ClockIcon width={24} height={24} className="text-emerald-400" />
        <span>
          {format(
            new Date(
              props.nextTournament.date + " " + props.nextTournament.time
            ),
            "HH:mm",
            {
              locale: de,
            }
          )}
        </span>
      </h2>
      {profile ? (
        <CreateParticipantDialog
          nextTournament={props.nextTournament}
          profile={profile}
        />
      ) : (
        <p className="text-emerald-500">
          Lust dabei zu sein? Dann melde dich an oder erstell dir ein eigenes
          Profil.
        </p>
      )}
    </>
  );
}

type DialogProps = Props & {
  profile: any;
};
function CreateParticipantDialog(props: DialogProps) {
  const [open, setOpen] = useState(false);
  const supabaseClient = useSupabaseClient();

  const participate = async (withBoard: boolean) => {
    await supabaseClient.from("participants").insert({
      profile_id: props.profile.id,
      tournament_id: props.nextTournament.id,
      board: withBoard,
    });
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {/*<button className="flex items-center justify-center gap-2 w-full bg-emerald-900 text-white text-lg h-16 rounded font-medium hover:text-emerald-400 transition mt-2 backlight">*/}
        {/*  <span>Ich bin dabei</span>*/}
        {/*  <ArrowRightIcon width={24} height={24} />*/}
        {/*</button>*/}
        <button className="group flex items-center justify-center gap-2 w-full bg-emerald-700 text-white text-lg h-16 rounded font-medium hover:text-emerald-100 hover:bg-emerald-800 transition mt-2 border border-emerald-600">
          <span>Ich bin dabei</span>
          <ArrowSmallRightIcon className="h-6 w-6 text-white group-hover:translate-x-2 transition" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-emerald-900/95 fixed inset-0" />
        <Dialog.Content className="flex flex-col gap-4 bg-emerald-800 rounded-lg shadow-2xl fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 p-4 min-w-[360px]">
          <Dialog.Title className="text-white text-xl font-medium">
            Bringst du ein Schachbrett mit?
          </Dialog.Title>
          <div className="flex">
            <button
              className="inline-flex flex-1 justify-center border border-emerald-600 p-2 font-medium rounded-l-md bg-emerald-700 hover:bg-emerald-800 hover:text-emerald-300 transition"
              onClick={() => participate(true)}
            >
              Ja
            </button>
            <button
              className="inline-flex flex-1 justify-center border border-emerald-600 p-2 font-medium rounded-r-md bg-emerald-700 border-l-0 hover:bg-emerald-800 hover:text-emerald-300 transition hover:shadow-inner"
              onClick={() => participate(false)}
            >
              Nein
            </button>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-emerald-100 absolute top-2.5 right-2.5 rounded-full h-5 w-5 inline-flex items-center justify-center bg-emerald-700"
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
