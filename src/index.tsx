import { Trigger, customEvent } from "@trigger.dev/sdk";
import { z } from "zod";
import * as resend from "@trigger.dev/resend";
import TipsEmail from "./emails/tipsEmail";
import WelcomeEmail from "./emails/welcomeEmail";

const FROM_EMAIL =
  process.env.FROM_EMAIL ?? "Trigger.dev <hello@email.trigger.dev>";
const REPLY_TO_EMAIL =
  process.env.REPLY_TO_EMAIL ?? "Trigger.dev <hello@trigger.dev>";

new Trigger({
  // Give your Trigger a stable ID
  id: "resend-welcome-drip-campaign",
  name: "Resend.com: Welcome Drip Campaign",
  // Trigger on a custom event, see https://docs.trigger.dev/triggers/custom-events
  on: customEvent({
    name: "new.user",
    // Use zod to verify event payload. See https://docs.trigger.dev/guides/zod
    schema: z.object({ id: z.string(), email: z.string(), name: z.string() }),
  }),
  // The run functions gets called once per "new.user" event
  async run(event, ctx) {
    // Send the initial welcome email. See https://docs.trigger.dev/integrations/apis/resend/actions/send-email
    await resend.sendEmail("📧 welcome", {
      from: FROM_EMAIL,
      replyTo: REPLY_TO_EMAIL,
      to: event.email,
      subject: "Welcome to Acme!",
      react: <WelcomeEmail name={event.name} />,
    });

    // Wait for 1 hour. See https://docs.trigger.dev/functions/delays
    await ctx.waitFor("⏲", { hours: 1 });

    // Send a tips email
    await resend.sendEmail("📧 tips", {
      from: FROM_EMAIL,
      replyTo: REPLY_TO_EMAIL,
      to: event.email,
      subject: "3 tips to get the most out of Acme",
      react: <TipsEmail name={event.name} />,
    });

    return event;
  },
}).listen();
