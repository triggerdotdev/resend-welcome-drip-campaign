import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import { paragraph, bullets, main } from "./styles";

export default function TipsEmail({ name }: { name: string }) {
  return (
    <Html>
      <Preview>3 tips to get the most out of Acme.dev</Preview>
      <Section style={main}>
        <Text style={paragraph}>Hi {name ?? "there"},</Text>
        <Text style={paragraph}>
          Thank you for signing up for Aceme.dev! I'm excited to have you on
          board and are confident we can help you streamline your development
          process.
        </Text>
        <Text style={paragraph}>
          To help you get the most out of our platform, I wanted to share a few
          tips with you:
        </Text>
        <Text style={bullets}>
          • Use our CLI to create new projects and deploy them to the cloud
        </Text>
        <Text style={bullets}>
          • Use our API to integrate with your existing tools and services
        </Text>
        <Text style={bullets}>
          • Use our dashboard to manage your projects and resources
        </Text>
        <Text style={paragraph}>
          If you have any questions or need assistance, please do not hesitate
          to contact our support team. We are here to help you make the most of
          our platform.
        </Text>
        <Text style={paragraph}>
          Thank you for choosing acme.dev. We look forward to helping you take
          your development to the next level.
        </Text>
        <Text style={paragraph}>Best regards,</Text>
        <Text style={paragraph}>Sam</Text>
        <Text style={paragraph}>CEO, Acme.dev</Text>
      </Section>
    </Html>
  );
}
