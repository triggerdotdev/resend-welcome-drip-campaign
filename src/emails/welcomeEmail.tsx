import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Link } from "@react-email/link";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import { main, paragraph, anchor, bullets } from "./styles";

export default function WelcomeEmail({ name }: { name?: string }) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Acme.dev, thanks for giving us a try!</Preview>
      <Section style={main}>
        <Text style={paragraph}>Hey {name ?? "there"},</Text>
        <Text style={paragraph}>
          I’m Sam, CEO of{" "}
          <Link style={anchor} href="https://acme.dev/">
            Acme.dev
          </Link>
          .
        </Text>
        <Text style={paragraph}>
          Our goal is to give you the tools you need to build your next project
          using the latest technologies.
        </Text>

        <Text style={paragraph}>Check out our docs:</Text>

        <Text style={bullets}>
          • Our{" "}
          <Link style={anchor} href="https://docs.acme.dev/getting-started">
            quickstart guide
          </Link>{" "}
          to get you up and running in minutes
        </Text>

        <Text style={bullets}>
          • Explore our{" "}
          <Link style={anchor} href="https://docs.acme.dev/">
            docs
          </Link>{" "}
          for a full overview of the product and it’s features{" "}
        </Text>

        <Text style={paragraph}>
          Feel free to drop me a message if you have any further questions!
        </Text>

        <Text style={bullets}>Best,</Text>
        <Text style={bullets}>Sam</Text>
        <Text style={paragraph}>CEO, Acme.dev</Text>
      </Section>
    </Html>
  );
}
