"use client";

import { Button } from "@tachyon-webstore/ui/components/button";
import { Input } from "@tachyon-webstore/ui/components/input";
import { Label } from "@tachyon-webstore/ui/components/label";
import { useState } from "react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      return;
    }
    toast.success("You're on the list — welcome aboard.");
    setEmail("");
  }

  return (
    <section className="border-t bg-muted/40">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Stay in the loop</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Early access to drops, member pricing, and zero spam.
        </p>
        <form
          onSubmit={onSubmit}
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <div className="flex-1 space-y-1.5 text-left">
            <Label htmlFor="newsletter-email" className="sr-only">
              Email address
            </Label>
            <Input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9"
            />
          </div>
          <Button type="submit" className="h-9">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
