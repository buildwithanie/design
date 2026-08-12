"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { ANALYTICS_CONSENT_STORAGE_KEY } from "@/lib/analytics";

const OPEN_CONSENT_EVENT = "iahl:open-consent-settings";

type ConsentChoice = "accepted" | "declined";
type ConsentSnapshot = ConsentChoice | "loading" | null;

function readStoredChoice(): ConsentSnapshot {
  try {
    const choice = window.localStorage.getItem(
      ANALYTICS_CONSENT_STORAGE_KEY,
    );

    return choice === "accepted" || choice === "declined" ? choice : null;
  } catch {
    return null;
  }
}

function denyLoadedGoogleTag() {
  const consent = {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  };

  window.gtag?.("consent", "update", consent);

  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();

    if (name === "_ga" || name?.startsWith("_ga_")) {
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    }
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function subscribeToConsentChoice(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === ANALYTICS_CONSENT_STORAGE_KEY) {
      onStoreChange();
    }
  };
  const handleLocalChange = () => onStoreChange();

  window.addEventListener("storage", handleStorage);
  window.addEventListener("iahl:consent-change", handleLocalChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("iahl:consent-change", handleLocalChange);
  };
}

export function AnalyticsConsent({ gaId }: { gaId?: string }) {
  const choice = useSyncExternalStore(
    subscribeToConsentChoice,
    readStoredChoice,
    () => "loading",
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const openSettings = () => setIsOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, openSettings);

    return () => window.removeEventListener(OPEN_CONSENT_EVENT, openSettings);
  }, []);

  if (!gaId || choice === "loading") {
    return null;
  }

  const saveChoice = (nextChoice: ConsentChoice) => {
    const wasAccepted = choice === "accepted";

    try {
      window.localStorage.setItem(
        ANALYTICS_CONSENT_STORAGE_KEY,
        nextChoice,
      );
    } catch {
      // The current choice still applies to this page when storage is blocked.
    }

    window.dispatchEvent(new Event("iahl:consent-change"));
    setIsOpen(false);

    if (nextChoice === "declined" && wasAccepted) {
      denyLoadedGoogleTag();
      window.location.reload();
    }
  };

  const showDialog = choice === null || isOpen;

  return (
    <>
      {choice === "accepted" ? <GoogleAnalytics gaId={gaId} /> : null}

      {showDialog ? (
        <section
          aria-label="Analytics privacy settings"
          className="fixed inset-x-3 bottom-3 z-100 mx-auto max-w-2xl border border-border bg-background p-5 shadow-xl sm:inset-x-6 sm:bottom-6 sm:p-6"
        >
          <h2 className="text-xl font-bold">Your privacy choices</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
            IAHL would like to use analytics to understand how this website is
            used and improve its content. Analytics remains off unless you
            accept. Essential site features work either way. Read the{" "}
            <Link
              href="/privacy"
              className="font-semibold text-foreground underline underline-offset-4"
            >
              privacy policy
            </Link>
            .
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              type="button"
              size="lg"
              className="h-11 px-5"
              onClick={() => saveChoice("accepted")}
            >
              Accept analytics
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="h-11 px-5"
              onClick={() => saveChoice("declined")}
            >
              Decline
            </Button>
          </div>
        </section>
      ) : null}
    </>
  );
}

export function openAnalyticsConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
