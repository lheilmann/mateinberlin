import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(req, res) {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient({ req, res });

  // Check if we have a session
  const { data } = await supabase.auth.getSession();

  console.log({ data });

  // if (!session)
  //   return res.status(401).json({
  //     error: "not_authenticated",
  //     description:
  //       "The user does not have an active session or is not authenticated",
  //   });

  res.status(200).json({
    initialSession: data.session,
    user: data.session ? data.session.user : null,
  });
}
