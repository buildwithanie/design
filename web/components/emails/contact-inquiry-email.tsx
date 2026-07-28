import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";

import type { ContactInquiry } from "@/lib/validation/contact-inquiry";

type ContactInquiryEmailProps = {
  inquiry: ContactInquiry;
  submittedAt: Date;
};

const interestLabels: Record<ContactInquiry["interest"], string> = {
  research: "Research collaboration",
  community: "Community partnership",
  institutional: "Institutional support",
  general: "General inquiry",
};

export function ContactInquiryEmail({
  inquiry,
  submittedAt,
}: ContactInquiryEmailProps) {
  const formattedDate = new Intl.DateTimeFormat("en-KE", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Africa/Nairobi",
  }).format(submittedAt);

  return (
    <Html lang="en">
      <Head />

      <Preview>
        New inquiry from {inquiry.name} through the IAHL website
      </Preview>

      <Body style={body}>
        <Container style={container}>
          <Link href="https://innovateaihealthlab.co.ke">
            <Img
              src="https://innovateaihealthlab.co.ke/images/iahl-logo.jpeg"
              alt="Innovate AI HealthLab"
              width="80"
              height="59"
              style={logo}
            />
          </Link>

          <Text style={organization}>Innovate AI HealthLab</Text>

          <Hr />

          <Section style={content}>
            <Text style={label}>New website inquiry</Text>

            <Heading as="h1" style={heading}>
              {interestLabels[inquiry.interest]}
            </Heading>

            <Text style={introduction}>
              {inquiry.name} submitted an inquiry through the IAHL website.
            </Text>

            <Section style={details}>
              <Text style={detail}>
                <strong>Name:</strong> {inquiry.name}
              </Text>

              <Text style={detail}>
                <strong>Email:</strong>{" "}
                <Link href={`mailto:${inquiry.email}`}>{inquiry.email}</Link>
              </Text>

              <Text style={detail}>
                <strong>Organisation:</strong>{" "}
                {inquiry.organization || "Not provided"}
              </Text>

              <Text style={detail}>
                <strong>Area of interest:</strong>{" "}
                {interestLabels[inquiry.interest]}
              </Text>

              <Text style={detail}>
                <strong>Received:</strong> {formattedDate}
              </Text>
            </Section>

            <Hr />

            <Heading as="h2" style={messageHeading}>
              Message
            </Heading>

            <Text style={message}>{inquiry.message}</Text>

            <Text style={reply}>
              <Link href={`mailto:${inquiry.email}`}>
                Reply to {inquiry.name}
              </Link>
            </Text>
          </Section>

          <Hr />

          <Text style={footer}>
            This message was sent through innovateaihealthlab.co.ke.
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

const content = {
  padding: "24px 0",
};

const label = {
  margin: "0 0 10px",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
};

const heading = {
  margin: "0",
  fontSize: "28px",
  lineHeight: "1.25",
};

const introduction = {
  margin: "14px 0 26px",
  fontSize: "16px",
  lineHeight: "1.6",
};

const details = {
  marginBottom: "26px",
};

const detail = {
  margin: "8px 0",
  fontSize: "15px",
  lineHeight: "1.6",
};

const messageHeading = {
  margin: "26px 0 12px",
  fontSize: "18px",
};

const message = {
  margin: "0",
  fontSize: "16px",
  lineHeight: "1.7",
  whiteSpace: "pre-wrap" as const,
};

const reply = {
  margin: "26px 0 0",
  fontSize: "15px",
  fontWeight: "700",
};

const footer = {
  margin: "20px 0 0",
  fontSize: "12px",
  lineHeight: "1.5",
};
