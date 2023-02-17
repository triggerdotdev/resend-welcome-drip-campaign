import { Trigger, customEvent } from "@trigger.dev/sdk";
import { z } from "zod";
import * as resend from "@trigger.dev/resend";
import TipsEmail from "./emails/tipsEmail";
import WelcomeEmail from "./emails/welcomeEmail";

const FROM_EMAIL =
  process.env.FROM_EMAIL ?? "Trigger.dev <hello@email.trigger.dev>";
const REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL ?? "Hi <hello@trigger.dev>";

new Trigger({
  id: "resend-welcome-drip-campaign",
  name: "Resend.com: Welcome Drip Campaign",
  on: customEvent({
    name: "new.user",
    schema: z.object({ id: z.string(), email: z.string(), name: z.string() }),
  }),
  async run(event, ctx) {
    await resend.sendEmail("📧 welcome", {
      from: FROM_EMAIL,
      replyTo: REPLY_TO_EMAIL,
      to: event.email,
      subject: "Welcome to Acme.dev!",
      react: <WelcomeEmail name={event.name} />,
    });

    await ctx.waitFor("⏲", { hours: 1 });

    await resend.sendEmail("📧 tips", {
      from: FROM_EMAIL,
      replyTo: REPLY_TO_EMAIL,
      to: event.email,
      subject: "3 tips to get the most out of Acme.dev",
      react: <TipsEmail name={event.name} />,
    });

    return event;
  },
}).listen();
