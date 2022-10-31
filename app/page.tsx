import Form from "./Form";
import {supabase} from "../supabase/client";

async function getParticipants() {
    let { data: participants, error } = await supabase
        .from('participants')
        .select('*');
    if (error) {
        throw error;
    }
    return participants;
}
export default async function Page() {
    const participants = await getParticipants();

    return (
      <div className="flex flex-col gap-10">
      <section className="flex items-center justify-center w-full">
          <h1 className="text-8xl font-light tracking-wider text-white uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
              Mate in Berlin
          </h1>
      </section>
      <section className="flex flex-col gap-6">
          <h2>Nächstes Turnier 3. November</h2>
          <Form />
          <div className="flex flex-col gap-4">
              <h3 className="text-lg">Teilnehmer</h3>
              <ul>
              {participants.map(participant => (<li key={participant.id}>{participant.name}</li>)
              )}
              </ul>
          </div>
      </section>
      </div>
    )
}
