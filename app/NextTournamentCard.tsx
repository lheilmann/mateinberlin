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
    <div className="flex flex-col gap-2 p-4 rounded-lg border border-primary-700 bg-primary-800">
      <h3 className="text-primary-400 uppercase tracking-wider">
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
        <Skeleton backgroundTone={700} className="rounded h-16" />
        <Skeleton backgroundTone={700} className="rounded h-16" />
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
            <button className="group flex items-center justify-center gap-3 w-full bg-primary-700 text-primary-100 text-lg h-16 rounded font-medium hover:text-primary-200 hover:bg-primary-800 transition mt-2 border border-primary-600">
              <span>Ich bin dabei</span>
              <RocketLaunchIcon className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          }
        />
        <button
          className="group flex items-center justify-center gap-2 w-full bg-primary-800 hover:bg-primary-900 text-primary-200 text-lg h-16 rounded font-medium hover:text-primary-100 transition mt-2 border border-primary-600"
          onClick={refuse}
          disabled={isLoading}
        >
          <span>Diesmal nicht</span>
          <XMarkIcon className="h-6 w-6 group-hover:scale-125 transition-transform" />
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
          className="group flex items-center justify-center gap-2 w-full bg-primary-800 hover:bg-primary-900 text-primary-200 text-lg h-16 rounded font-medium hover:text-primary-100 transition mt-2 border border-primary-600"
          onClick={refuse}
          disabled={isLoading}
        >
          <span>Ich kann doch nicht</span>
          <XMarkIcon className="h-6 w-6 group-hover:scale-125 transition-transform" />
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
          <button className="group flex items-center justify-center gap-3 w-full bg-primary-700 text-primary-100 text-lg h-16 rounded font-medium hover:text-primary-200 hover:bg-primary-800 transition mt-2 border border-primary-600">
            <span>Ich bin doch dabei</span>
            <RocketLaunchIcon className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
        <Dialog.Overlay className="bg-primary-900/95 fixed inset-0 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
        <Dialog.Content className="flex flex-col gap-4 bg-primary-800 rounded-lg shadow-2xl fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 p-4 min-w-[360px] md:min-w-[400px] data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out">
          <Dialog.Title className="text-primary-100 text-lg md:text-xl font-medium">
            Bringst du ein Schachbrett mit?
          </Dialog.Title>
          <div className="flex">
            <button
              className="inline-flex flex-1 justify-center border border-primary-600 p-2 font-medium rounded-l-md bg-primary-700 hover:bg-primary-800 hover:text-primary-200 transition text-primary-100"
              onClick={() => participate({ hasBoard: true })}
            >
              Ja
            </button>
            <button
              className="inline-flex flex-1 justify-center border border-primary-600 p-2 font-medium rounded-r-md bg-primary-700 border-l-0 hover:bg-primary-800 hover:text-primary-200 transition text-primary-100"
              onClick={() => participate({ hasBoard: false })}
            >
              Nein
            </button>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-primary-100 absolute top-2.5 right-2.5 rounded-full h-5 w-5 inline-flex items-center justify-center bg-primary-700"
              aria-label="Close"
            >
              <XMarkIcon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
