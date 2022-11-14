import { User, useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

type ReturnProps =
  | {
      isLoading: true;
      user: null;
      profile: null;
      error: null;
    }
  | {
      isLoading: false;
      user: User;
      profile: null;
      error: Error;
    }
  | {
      isLoading: false;
      user: User;
      profile: Object;
      error: null;
    }
  | {
      isLoading: false;
      user: null;
      profile: null;
      error: Error;
    };
export default function useProfile(): ReturnProps {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const sessionContext = useSessionContext();

  useEffect(() => {
    setIsLoading(sessionContext.isLoading);
  }, [sessionContext.isLoading]);

  useEffect(() => {
    setError(sessionContext.error);
  }, [sessionContext.error]);

  useEffect(() => {
    if (
      sessionContext.session &&
      sessionContext.session.user &&
      profile === null
    ) {
      setUser(sessionContext.session.user);

      sessionContext.supabaseClient
        .from("profiles")
        .select()
        .eq("user_id", sessionContext.session.user.id)
        .then((res) => {
          if (res.data.length === 0) throw new Error("Profile not found");
          setProfile(res.data[0]);
        });
    }
  }, [sessionContext.session]);

  console.log({ isLoading, user, profile, error });

  return { isLoading, user, profile, error };
}
