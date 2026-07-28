import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "react-email";

type NewsletterConfirmationEmailProps = {
  confirmationUrl: string;
  siteUrl: string;
};

export function NewsletterConfirmationEmail({
  confirmationUrl,
  siteUrl,
}: NewsletterConfirmationEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Confirm your IAHL newsletter subscription</Preview>

      <Body style={body}>
        <Container style={container}>
          <Link href={siteUrl}>
            <Img
              src={`${siteUrl}/images/iahl-logo.jpeg`}
              alt="Innovate AI HealthLab"
              width="80"
              height="59"
              style={logo}
            />
          </Link>

          <Text style={organization}>Innovate AI HealthLab</Text>

          <Hr />

          <Heading as="h1" style={heading}>
            Confirm your subscription
          </Heading>

          <Text style={introduction}>
            Confirm that you would like to receive IAHL research news,
            publications, project updates and opportunities.
          </Text>

          <Button href={confirmationUrl} style={button}>
            Confirm subscription
          </Button>

          <Text style={expiry}>
            This confirmation link expires in 24 hours. If you did not request
            this subscription, you can ignore this email.
          </Text>

          <Hr />

          <Text style={footer}>
            Innovate AI HealthLab ·{" "}
            <Link href={siteUrl}>innovateaihealthlab.co.ke</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  margin: "0",
  padding: "24px 12px",
  fontFamily: "Arial, Helvetica, sans-serif",
};

const container = {
  width: "100%",
  maxWidth: "620px",
  margin: "0 auto",
};

const logo = {
  display: "block",
  margin: "0 0 12px",
};

const organization = {
  margin: "0 0 20px",
  fontSize: "16px",
  fontWeight: "700",
};

const heading = {
  margin: "28px 0 0",
  fontSize: "28px",
  lineHeight: "1.25",
};

const introduction = {
  margin: "14px 0 26px",
  fontSize: "16px",
  lineHeight: "1.65",
};

const button = {
  borderRadius: "6px",
  backgroundColor: "#f26622",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "700",
  padding: "12px 20px",
};

const expiry = {
  margin: "28px 0",
  fontSize: "13px",
  lineHeight: "1.6",
};

const footer = {
  margin: "20px 0 0",
  fontSize: "12px",
  lineHeight: "1.5",
};
