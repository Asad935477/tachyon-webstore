"use client";

import { useEffect, useState } from "react";

import { IntroLoader } from "./intro-loader";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Skip the intro on subsequent client-side navigations within the session.
    const dismissed = sessionStorage.getItem("tachyon:intro:dismissed");
    if (dismissed) {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <>
        <IntroLoader
          onDone={() => {
            sessionStorage.setItem("tachyon:intro:dismissed", "1");
            setLoading(false);
          }}
        />
        {children}
      </>
    );
  }

  return children;
}
