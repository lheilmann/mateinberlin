import supabase from "../../supabase";

export const revalidate = 0;

export default async function Page() {
  const { data: participants, error } = await supabase
    .from("participants")
    .select();

  if (error) throw error;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">Teilnehmer</h1>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id}>{participant.name}</li>
        ))}
      </ul>
    </div>
  );
}
