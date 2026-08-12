"use client";

import { useEffect } from "react";

import { trackAnalyticsEvent } from "@/lib/analytics";

const TRACKED_SESSION_KEY = "iahl-newsletter-confirmation-tracked";

export function NewsletterConfirmationAnalytics() {
  useEffect(() => {
    const trackConfirmation = () => {
      try {
        if (window.sessionStorage.getItem(TRACKED_SESSION_KEY)) {
          return;
        }
      } catch {
        // Continue without the duplicate guard when browser storage is blocked.
      }

      const wasTracked = trackAnalyticsEvent("newsletter_subscribe", {
        method: "website",
      });

      if (wasTracked) {
        try {
          window.sessionStorage.setItem(TRACKED_SESSION_KEY, "true");
        } catch {
          // Analytics remains functional when browser storage is blocked.
        }
      }
    };

    trackConfirmation();
    window.addEventListener("iahl:consent-change", trackConfirmation);

    return () =>
      window.removeEventListener("iahl:consent-change", trackConfirmation);
  }, []);

  return null;
}
