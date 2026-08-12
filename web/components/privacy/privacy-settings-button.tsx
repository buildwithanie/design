"use client";

import { openAnalyticsConsentSettings } from "./analytics-consent";

export function PrivacySettingsButton({ enabled }: { enabled: boolean }) {
  if (!enabled) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={openAnalyticsConsentSettings}
      className="text-sm text-white/60 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      Privacy settings
    </button>
  );
}
