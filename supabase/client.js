import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function customFetch(url, options) {
  const customOptions = {
    cache: "no-store",
    ...options
  }
  return fetch(url, customOptions);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, { fetch: customFetch})

