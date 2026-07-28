import "server-only";

import nodemailer from "nodemailer";

function requireEnvironmentVariable(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const smtpHost = requireEnvironmentVariable("SMTP_HOST");
const smtpPortValue = requireEnvironmentVariable("SMTP_PORT");
const smtpPort = Number(smtpPortValue);

if (!Number.isInteger(smtpPort) || smtpPort <= 0) {
  throw new Error("SMTP_PORT must be a valid port number.");
}

export function createSmtpTransport(username: string, password: string) {
  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: username,
      pass: password,
    },
    tls: {
      minVersion: "TLSv1.2",
    },
  });
}

export function getRequiredEmailEnvironmentVariable(name: string) {
  return requireEnvironmentVariable(name);
}
