"use client";

import { sendGAEvent } from "@next/third-parties/google";

export const ANALYTICS_CONSENT_STORAGE_KEY = "iahl-analytics-consent";

export function trackAnalyticsEvent(
  eventName: string,
  eventParameters: Record<string, string | number | boolean> = {},
) {
  try {
    if (
      window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY) !==
      "accepted"
    ) {
      return false;
    }
  } catch {
    return false;
  }

  sendGAEvent("event", eventName, eventParameters);
  return true;
}
