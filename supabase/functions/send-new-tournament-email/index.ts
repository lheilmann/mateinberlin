// @ts-nocheck

// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";

console.log(`Function "send-new-tournament-email" up and running!`);

const client = new SmtpClient();

serve(async (req) => {
  await client.connectTLS({
    hostname: Deno.env.get("SMTP_HOSTNAME")!,
    port: Number(Deno.env.get("SMTP_PORT")!),
    username: Deno.env.get("SMTP_USERNAME")!,
    password: Deno.env.get("SMTP_PASSWORD")!,
  });

  try {
    await client.send({
      from: Deno.env.get("SMTP_FROM")!,
      to: "lukas@familieheilmann.de",
      subject: `Hello from Supabase Edge Functions`,
      content: `Hello Functions \o/`,
      html: "<p>Hello Functions...</p>",
    });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }

  await client.close();

  return new Response(
    JSON.stringify({
      done: true,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
