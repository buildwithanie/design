import { Resend } from "resend";

import {
  renderNewsletterTemplate,
  renderNewsletterTemplateText,
  type NewsletterTemplateContent,
} from "../lib/newsletter/resend-template.ts";

const TEMPLATE_ALIAS = "iahl-newsletter-base";
const TEMPLATE_NAME = "IAHL Newsletter Base";
const TEMPLATE_FROM =
  "IAHL Updates <newsletter@updates.innovateaihealthlab.co.ke>";

const templateContent: NewsletterTemplateContent = {
  previewText:
    "Research news, publications and project updates from Innovate AI HealthLab.",
  issueLabel: "IAHL Updates",
  title: "Newsletter headline",
  introduction:
    "Introduce this edition in one or two concise sentences. Tell readers what is most useful or timely without repeating the stories below.",
  siteUrl: "https://innovateaihealthlab.co.ke",
  items: [
    {
      label: "News, project or publication",
      title: "Lead with the most important update",
      summary:
        "Summarise why this matters in two short sentences, then direct readers to the complete story or resource on the IAHL website.",
      url: "https://innovateaihealthlab.co.ke/media",
      linkLabel: "Read more",
    },
    {
      label: "News, project or publication",
      title: "Add another useful update",
      summary:
        "Keep each item focused. The newsletter should introduce the work while the website holds the complete content and downloadable resources.",
      url: "https://innovateaihealthlab.co.ke/projects",
      linkLabel: "Explore the work",
    },
  ],
  closing:
    "Visit the IAHL website for more research news, publications and opportunities to work with us.",
  websiteLabel: "Visit IAHL",
};

function requireEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const resend = new Resend(requireEnvironmentVariable("RESEND_API_KEY"));
const template = {
  name: TEMPLATE_NAME,
  alias: TEMPLATE_ALIAS,
  from: TEMPLATE_FROM,
  subject: "IAHL newsletter subject",
  html: renderNewsletterTemplate(templateContent),
  text: renderNewsletterTemplateText(templateContent),
};

const { data: existingTemplate, error: lookupError } =
  await resend.templates.get(TEMPLATE_ALIAS);

if (lookupError && lookupError.statusCode !== 404) {
  console.error(
    "Resend could not check the IAHL newsletter template.",
    lookupError,
  );
  process.exitCode = 1;
} else if (existingTemplate) {
  const { error: updateError } = await resend.templates.update(
    existingTemplate.id,
    template,
  );

  if (updateError) {
    console.error(
      "Resend could not update the IAHL newsletter template.",
      updateError,
    );
    process.exitCode = 1;
  } else {
    const { error: publishError } = await resend.templates.publish(
      existingTemplate.id,
    );

    if (publishError) {
      console.error(
        "Resend could not publish the IAHL newsletter template.",
        publishError,
      );
      process.exitCode = 1;
    } else {
      console.log(`Updated and published "${TEMPLATE_NAME}" in Resend.`);
    }
  }
} else {
  const { data: createdTemplate, error: createError } =
    await resend.templates.create(template);

  if (createError) {
    console.error(
      "Resend could not create the IAHL newsletter template.",
      createError,
    );
    process.exitCode = 1;
  } else if (createdTemplate) {
    const { error: publishError } = await resend.templates.publish(
      createdTemplate.id,
    );

    if (publishError) {
      console.error(
        "The template was created but Resend could not publish it.",
        publishError,
      );
      process.exitCode = 1;
    } else {
      console.log(`Created and published "${TEMPLATE_NAME}" in Resend.`);
    }
  } else {
    console.error("Resend did not return the created newsletter template.");
    process.exitCode = 1;
  }
}
