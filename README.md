## ✨ Trigger.dev Welcome Drip Campaign with Resend.com

This repo contains a [customEvent](https://docs.trigger.dev/triggers/custom-events) Trigger that will send an example drip email campaign using [Resend.com](https://resend.com/) and [react.email](https://react.email/)

> Resend.com is currently in private beta, but if you signup for their waitlist, give us a shout on [our Discord](https://discord.gg/CzBqJnYq9r) and we'll help you get in.

```ts
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
      subject: "Welcome to Acme.dev!",
      react: <WelcomeEmail name={event.name} />,
    });

    // Wait for 1 hour. See https://docs.trigger.dev/functions/delays
    await ctx.waitFor("⏲", { hours: 1 });

    // Send a tips email
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
```

## ✍️ Customize

We've included two example emails that you should customize to your needs. You can use the react.email preview server locally to preview the emails and live edit them.

First clone the repo and install the dependencies:

```sh
git clone https://github.com/triggerdotdev/resend-welcome-drip-campaign.git
cd resend-welcome-drip-campaign
npm install
```

Then you can run the email preview server and visit [http://localhost:3000](http://localhost:3000):

```sh
npm run emails
```

You can now edit the emails:

- [welcomeEmail.tsx](src/emails/welcomeEmail.tsx)
- [tipsEmail.tsx](src/emails/tipsEmail.tsx)

### From, Reply To, and Subject lines

You can customize the `from` and `replyTo` options by setting the `FROM_EMAIL` and `REPLY_TO_EMAIL` environment variables:

```
FROM_EMAIL="Trigger.dev <eric@email.trigger.dev>"
REPLY_TO_EMAIL="Eric <eric@trigger.dev>"
```

To customize the subject lines, edit the [index.tsx](src/index.tsx) file.

### Customize the drippiness

You can customize the delays between emails by editing the `ctx.waitFor` call:

```ts
await ctx.waitFor("⏲", { hours: 1 });
```

You can also make your drip campaigns smarter by connecting to your own database and conditionally sending different emails depending on what the user does. To see an example of that check out our [resend example](https://github.com/triggerdotdev/trigger.dev-examples/blob/main/src/examples/resend.tsx).

## 💻 Run locally

First, in your terminal of choice, clone the repo and install dependencies:

```sh
git clone https://github.com/triggerdotdev/resend-welcome-drip-campaign.git
cd resend-welcome-drip-campaign
npm install
```

Then execute the following command to create a `.env` file with your development Trigger.dev API Key:

```sh
echo "TRIGGER_API_KEY=<APIKEY>" >> .env
```

And finally you are ready to run the process:

```sh
npm run dev
```

You should see a message output in your terminal like the following:

```
[trigger.dev]  ✨ Connected and listening for events [resend-welcome-drip-campaign]
```

## 🧪 Test it

After successfully running this template locally, head over to your [Trigger.dev Dashboard](https://app.trigger.dev) and you should see your newly created workflow:

![workflow list](https://imagedelivery.net/3TbraffuDZ4aEf8KWOmI_w/c84a7d7c-8cf4-48e9-475d-9bcb30f3c300/width=1200)

Click on the workflow in the list and you should come to the Workflow overview page:

![workflow overview](https://imagedelivery.net/3TbraffuDZ4aEf8KWOmI_w/8ce61584-6ad9-411b-41a8-2dae9d612400/width=1200)

Click on the "Test your workflow" button and fill in the JSON needed for [this workflow's](src/index.tsx#L14) customEvent Trigger:

![workflow test](https://imagedelivery.net/3TbraffuDZ4aEf8KWOmI_w/64367e7d-2aa0-43a1-f1db-ac84e02e4f00/width=1200)

After click "Run Test" you'll be redirected to the Run Details page and you should see a prompt for entering your Resend.com API Key:

> Resend.com is currently in private beta, but if you signup for their waitlist, give us a shout on [our Discord](https://discord.gg/CzBqJnYq9r) and we'll help you get in.

![api key](https://imagedelivery.net/3TbraffuDZ4aEf8KWOmI_w/c4914a82-32b0-4edc-f046-124213c3df00/width=1200)

After hitting "Save" the Run will pickup where it left off and make the request to Resend.com to send your email. You can even see a preview of the email right inside the step:

![preview](https://imagedelivery.net/3TbraffuDZ4aEf8KWOmI_w/e5cc5b2a-cf4b-476b-73c4-217cf98ffc00/width=1200)

## 🚀 Deploy

We've made it really easy to deploy this repo to Render.com, if you don't already have a Node.js server to host your triggers.

[Render.com](https://render.com) is a super-fast way to deploy webapps and servers (think of it like a modern Heroku)

<a href="https://render.com/deploy?repo=https://github.com/triggerdotdev/resend-welcome-drip-campaign">
  <img width="144px" src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render">
</a>

> **Note** Make sure you use your "live" trigger.dev API Key when deploying to a server

## 📺 Go Live

After you are happy with your campaign and deploy it live to Render.com (or some other hosting service), you can send custom events that Trigger your workflow using the [sendEvent](https://docs.trigger.dev/reference/send-event) function from the `@trigger.dev/sdk`, or simply by making requests to our [`events`](https://docs.trigger.dev/api-reference/events/sendEvent) API endpoint.

Here is an example of sending the custom event to trigger the workflow contained in this repo using `fetch`:

```ts
const eventId = ulid();
const event = {
  name: "new.user",
  payload: {
    id: "user_1234",
    email: "eric@trigger.dev",
    name: "Eric",
  },
};

const response = await fetch("https://app.trigger.dev/api/v1/events", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.TRIGGER_API_KEY}`,
  },
  body: JSON.stringify({
    id: eventId,
    event,
  }),
});
```
