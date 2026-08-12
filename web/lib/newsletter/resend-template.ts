const DEFAULT_SITE_URL = "https://innovateaihealthlab.co.ke";

export type NewsletterTemplateItem = {
  title: string;
  summary: string;
  url: string;
  label?: string;
  linkLabel?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type NewsletterTemplateContent = {
  previewText: string;
  issueLabel: string;
  title: string;
  introduction: string;
  items: NewsletterTemplateItem[];
  siteUrl?: string;
  closing?: string;
  websiteLabel?: string;
};

function escapeHtml(value: string) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function requireText(value: unknown, fieldName: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Newsletter field "${fieldName}" is required.`);
  }

  return value.trim();
}

function optionalText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function requireHttpUrl(value: unknown, fieldName: string): string {
  const url = new URL(requireText(value, fieldName));

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`Newsletter field "${fieldName}" must be an HTTP URL.`);
  }

  return url.toString();
}

function renderItem(item: NewsletterTemplateItem, index: number): string {
  const title = requireText(item.title, `items[${index}].title`);
  const summary = requireText(item.summary, `items[${index}].summary`);
  const url = requireHttpUrl(item.url, `items[${index}].url`);
  const label = optionalText(item.label);
  const linkLabel = optionalText(item.linkLabel) ?? "Read more";
  const imageUrl = optionalText(item.imageUrl);
  const imageAlt = optionalText(item.imageAlt) ?? "";

  return `
    <tr>
      <td style="padding:32px 0;border-top:1px solid #dedede;">
        ${
          imageUrl
            ? `<a href="${escapeHtml(url)}" style="text-decoration:none;">
                <img src="${escapeHtml(requireHttpUrl(imageUrl, `items[${index}].imageUrl`))}" width="600" alt="${escapeHtml(imageAlt)}" style="display:block;width:100%;max-width:600px;height:auto;margin:0 0 24px;border:0;" />
              </a>`
            : ""
        }
        ${
          label
            ? `<p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#5f6064;">${escapeHtml(label)}</p>`
            : ""
        }
        <h2 style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:1.28;font-weight:700;color:#35363a;">${escapeHtml(title)}</h2>
        <p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.65;color:#56575b;">${escapeHtml(summary)}</p>
        <a href="${escapeHtml(url)}" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;font-weight:700;color:#d95316;text-decoration:underline;text-underline-offset:3px;">${escapeHtml(linkLabel)}</a>
      </td>
    </tr>
  `;
}

export function renderNewsletterTemplate(
  newsletter: NewsletterTemplateContent,
): string {
  const previewText = requireText(newsletter.previewText, "previewText");
  const issueLabel = requireText(newsletter.issueLabel, "issueLabel");
  const title = requireText(newsletter.title, "title");
  const introduction = requireText(newsletter.introduction, "introduction");
  const siteUrl = requireHttpUrl(
    optionalText(newsletter.siteUrl) ?? DEFAULT_SITE_URL,
    "siteUrl",
  ).replace(/\/$/, "");
  const closing = optionalText(newsletter.closing);
  const websiteLabel = optionalText(newsletter.websiteLabel) ?? "Visit IAHL";
  const items = Array.isArray(newsletter.items) ? newsletter.items : [];

  if (items.length === 0) {
    throw new Error('Newsletter field "items" must contain at least one item.');
  }

  const itemRows = items.map(renderItem).join("");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
      @media only screen and (max-width: 620px) {
        .email-shell { padding: 24px 18px !important; }
        .email-title { font-size: 30px !important; line-height: 1.18 !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(previewText)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#ffffff;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;">
            <tr>
              <td class="email-shell" style="padding:36px 20px 24px;">
                <a href="${escapeHtml(siteUrl)}" style="text-decoration:none;">
                  <img src="${escapeHtml(siteUrl)}/images/iahl-logo.jpeg" width="80" height="59" alt="Innovate AI HealthLab" style="display:block;width:80px;height:59px;border:0;" />
                </a>
                <p style="margin:18px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#d95316;">${escapeHtml(issueLabel)}</p>
                <h1 class="email-title" style="margin:14px 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:38px;line-height:1.18;font-weight:700;color:#35363a;">${escapeHtml(title)}</h1>
                <p style="margin:0 0 32px;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.7;color:#56575b;">${escapeHtml(introduction)}</p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  ${itemRows}
                </table>

                ${
                  closing
                    ? `<p style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.65;color:#56575b;">${escapeHtml(closing)}</p>`
                    : ""
                }
                <p style="margin:0 0 36px;">
                  <a href="${escapeHtml(siteUrl)}" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;font-weight:700;color:#d95316;text-decoration:underline;text-underline-offset:3px;">${escapeHtml(websiteLabel)}</a>
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding:24px 0 0;border-top:1px solid #dedede;">
                      <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#66676b;">
                        Innovate AI HealthLab<br />
                        P.O. Box 408 – 10200, Murang’a, Kenya
                      </p>
                      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#66676b;">
                        <a href="${escapeHtml(siteUrl)}" style="color:#4f5054;text-decoration:underline;">innovateaihealthlab.co.ke</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function renderNewsletterTemplateText(
  newsletter: NewsletterTemplateContent,
): string {
  const title = requireText(newsletter.title, "title");
  const introduction = requireText(newsletter.introduction, "introduction");
  const siteUrl = requireHttpUrl(
    optionalText(newsletter.siteUrl) ?? DEFAULT_SITE_URL,
    "siteUrl",
  );
  const items = Array.isArray(newsletter.items) ? newsletter.items : [];

  const itemText = items
    .map((item, index) => {
      const itemTitle = requireText(item.title, `items[${index}].title`);
      const summary = requireText(item.summary, `items[${index}].summary`);
      const url = requireHttpUrl(item.url, `items[${index}].url`);

      return `${itemTitle}\n${summary}\n${url}`;
    })
    .join("\n\n");

  return `${title}

${introduction}

${itemText}

Visit IAHL:
${siteUrl}

Innovate AI HealthLab
P.O. Box 408 – 10200, Murang’a, Kenya
${siteUrl}`;
}
