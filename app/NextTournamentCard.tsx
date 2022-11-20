"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { format, setHours } from "date-fns";
import { de } from "date-fns/locale";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  CalendarIcon,
  ClockIcon,
  RocketLaunchIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import useProfile from "~hooks/useProfile";
import Skeleton from "~components/Skeleton";

type Props = {
  nextTournament: any;
};
export default function NextTournamentCard(props: Props) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-primary-700 bg-primary-800 p-4">
      <h3 className="uppercase tracking-wider text-primary-400">
        Nächstes Turnier
      </h3>
      {props.nextTournament ? (
        <NextTournament nextTournament={props.nextTournament} />
      ) : (
        <h2 className="text-2xl italic text-primary-100">tba</h2>
      )}
    </div>
  );
}

function NextTournament(props: Props) {
  const { profile } = useProfile();

  const [hours] = props.nextTournament.time.split(":");
  const date = format(new Date(props.nextTournament.date), "PPP", {
    locale: de,
  });
  const time = format(
    setHours(new Date(props.nextTournament.date), hours),
    "HH:mm",
    {
      locale: de,
    }
  );

  return (
    <>
      <h2 className="inline-flex items-center gap-3 text-2xl">
        <CalendarIcon width={24} height={24} className="text-primary-400" />
        <span className="text-primary-100">{date}</span>
      </h2>
      <h2 className="inline-flex items-center gap-3 text-2xl">
        <ClockIcon width={24} height={24} className="text-primary-400" />
        <span className="text-primary-100">{time}</span>
      </h2>
      {profile ? (
        <>
          <ManageParticipation
            nextTournament={props.nextTournament}
            profile={profile}
          />
        </>
      ) : (
        <p className="text-primary-400">
          Lust dabei zu sein? Dann melde dich an oder erstell dir ein eigenes
          Profil.
        </p>
      )}
    </>
  );
}

type ManageParticipationProps = Props & {
  profile: any;
};
function ManageParticipation(props: ManageParticipationProps) {
  const supabaseClient = useSupabaseClient();
  const [participates, setParticipates] = useState<boolean | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    supabaseClient
      .from("profile_tournament")
      .select()
      .eq("profile_id", props.profile.id)
      .eq("tournament_id", props.nextTournament.id)
      .limit(1)
      .then((res) => {
        if (res.data.length > 0) {
          const profileTournament = res.data[0];
          setParticipates(profileTournament.participates);
        }
      });
    setLoading(false);
  }, []);

  const refuse = async () => {
    setLoading(true);
    setParticipates(false);
    await supabaseClient.from("profile_tournament").upsert({
      profile_id: props.profile.id,
      tournament_id: props.nextTournament.id,
      participates: false,
      has_board: null,
    });
    setLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton backgroundTone={700} className="h-16 rounded" />
        <Skeleton backgroundTone={700} className="h-16 rounded" />
      </div>
    );
  }

  // Has not responded yet
  if (participates === null) {
    return (
      <div className="flex flex-col gap-2">
        <ParticipateDialog
          nextTournament={props.nextTournament}
          profile={props.profile}
          setParticipates={setParticipates}
          trigger={
            <button className="group mt-2 flex h-16 w-full items-center justify-center gap-3 rounded border border-primary-600 bg-primary-700 text-lg font-medium text-primary-100 transition hover:bg-primary-800 hover:text-primary-200">
              <span>Ich bin dabei</span>
              <RocketLaunchIcon className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          }
        />
        <button
          className="group mt-2 flex h-16 w-full items-center justify-center gap-2 rounded border border-primary-600 bg-primary-800 text-lg font-medium text-primary-200 transition hover:bg-primary-900 hover:text-primary-100"
          onClick={refuse}
          disabled={isLoading}
        >
          <span>Diesmal nicht</span>
          <XMarkIcon className="h-6 w-6 transition-transform group-hover:scale-125" />
        </button>
      </div>
    );
  }

  // Can participate
  if (participates) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-primary-400">Du hast zugesagt. Bis bald!</p>
        <button
          className="group mt-2 flex h-16 w-full items-center justify-center gap-2 rounded border border-primary-600 bg-primary-800 text-lg font-medium text-primary-200 transition hover:bg-primary-900 hover:text-primary-100"
          onClick={refuse}
          disabled={isLoading}
        >
          <span>Ich kann doch nicht</span>
          <XMarkIcon className="h-6 w-6 transition-transform group-hover:scale-125" />
        </button>
      </div>
    );
  }

  // Cannot participate
  return (
    <div className="flex flex-col gap-2">
      <p className="text-primary-400">
        Du hast abgesagt. Die nächsten Turniere werden hier angezeigt, sobald du
        dich eintragen kannst.
      </p>
      <ParticipateDialog
        nextTournament={props.nextTournament}
        profile={props.profile}
        setParticipates={setParticipates}
        trigger={
          <button className="group mt-2 flex h-16 w-full items-center justify-center gap-3 rounded border border-primary-600 bg-primary-700 text-lg font-medium text-primary-100 transition hover:bg-primary-800 hover:text-primary-200">
            <span>Ich bin doch dabei</span>
            <RocketLaunchIcon className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        }
      />
    </div>
  );
}

type ParticipateDialogProps = ManageParticipationProps & {
  setParticipates: (participates: boolean) => void;
  trigger: any;
};

function ParticipateDialog(props: ParticipateDialogProps) {
  const supabaseClient = useSupabaseClient();
  const [open, setOpen] = useState(false);

  const participate = async (options: { hasBoard: boolean }) => {
    setOpen(false);
    props.setParticipates(true);
    await supabaseClient.from("profile_tournament").upsert({
      profile_id: props.profile.id,
      tournament_id: props.nextTournament.id,
      participates: true,
      has_board: options.hasBoard,
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{props.trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-primary-900/95 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
        <Dialog.Content className="fixed top-2/4 left-2/4 flex min-w-[360px] -translate-x-2/4 -translate-y-2/4 flex-col gap-4 rounded-lg bg-primary-800 p-4 shadow-2xl data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out md:min-w-[400px]">
          <Dialog.Title className="text-lg font-medium text-primary-100 md:text-xl">
            Bringst du ein Schachbrett mit?
          </Dialog.Title>
          <div className="flex">
            <button
              className="inline-flex flex-1 justify-center rounded-l-md border border-primary-600 bg-primary-700 p-2 font-medium text-primary-100 transition hover:bg-primary-800 hover:text-primary-200"
              onClick={() => participate({ hasBoard: true })}
            >
              Ja
            </button>
            <button
              className="inline-flex flex-1 justify-center rounded-r-md border border-l-0 border-primary-600 bg-primary-700 p-2 font-medium text-primary-100 transition hover:bg-primary-800 hover:text-primary-200"
              onClick={() => participate({ hasBoard: false })}
            >
              Nein
            </button>
          </div>
          <Dialog.Close asChild>
            <button
              className="hover:primray-200 absolute top-2.5 right-2.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-700 text-primary-100 hover:bg-primary-600"
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
