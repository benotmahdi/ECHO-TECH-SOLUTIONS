import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Check, HelpCircle, Loader2, ShieldCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ---------------------------------------------------------------------------
// TODO: paste your Make.com webhook URL here
const WEBHOOK_URL = "https://hook.make.com/YOUR_WEBHOOK_ID";
// ---------------------------------------------------------------------------

export const Route = createFileRoute("/activate")({
  head: () => ({
    meta: [
      { title: "Activate ECHO — Claim Your Lifetime License" },
      {
        name: "description",
        content:
          "Verify your hardware machine ID and receive your ECHO POS lifetime license key by email in under two minutes.",
      },
      { property: "og:title", content: "Activate ECHO — Claim Your Lifetime License" },
      {
        property: "og:description",
        content:
          "Enter your details and hardware machine ID to generate your ECHO lifetime license key.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ActivatePage,
});

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(80, "Name is too long"),
  businessName: z
    .string()
    .trim()
    .min(2, "Enter your business name")
    .max(80, "Business name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(255, "Email is too long"),
  machineId: z
    .string()
    .trim()
    .length(16, "Machine ID must be exactly 16 characters"),
});

type Fields = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { fullName: "", businessName: "", email: "", machineId: "" };

function ActivatePage() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = (key: keyof Fields) => (event: { target: { value: string } }) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitError(null);
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Fields;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, submittedAt: new Date().toISOString() }),
      });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      setStatus("done");
    } catch {
      setStatus("idle");
      setSubmitError("We couldn't reach the activation server. Please try again.");
    }
  }

  return (
    <TooltipProvider delayDuration={120}>
      <main className="relative min-h-screen overflow-hidden bg-portal-bg text-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-70"
          style={{ background: "var(--gradient-hero)" }}
        />

        <header className="relative z-10 border-b border-portal-line">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="h-6 w-[2px] bg-gradient-gold" />
              <span className="font-display text-lg font-semibold tracking-[0.32em] text-foreground">
                ECHO
              </span>
            </div>
            <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Lifetime License Portal
            </span>
          </div>
        </header>

        <section className="relative z-10 mx-auto flex w-full max-w-xl flex-col px-6 pb-24 pt-14 sm:pt-20">
          <p className="text-center text-[11px] uppercase tracking-[0.34em] text-portal-gold">
            Activation
          </p>
          <h1 className="mt-4 text-center text-3xl font-semibold leading-tight sm:text-4xl">
            Claim Your Lifetime License
          </h1>
          <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
            One-time activation, bound to your machine, yours forever.
          </p>

          <div className="shadow-portal mt-10 rounded-2xl border border-portal-line bg-portal-surface/80 p-6 backdrop-blur-xl sm:p-9">
            {status === "done" ? <SuccessPanel /> : (
              <form onSubmit={onSubmit} noValidate className="space-y-6">
                <Field
                  id="fullName"
                  label="Full Name"
                  value={values.fullName}
                  onChange={set("fullName")}
                  error={errors.fullName}
                  autoComplete="name"
                  placeholder="Alexander Reid"
                />
                <Field
                  id="businessName"
                  label="Business Name"
                  value={values.businessName}
                  onChange={set("businessName")}
                  error={errors.businessName}
                  autoComplete="organization"
                  placeholder="Reid & Co. Barbers"
                />
                <Field
                  id="email"
                  label="Email Address"
                  type="email"
                  value={values.email}
                  onChange={set("email")}
                  error={errors.email}
                  autoComplete="email"
                  placeholder="you@business.com"
                />
                <Field
                  id="machineId"
                  label="Hardware Machine ID"
                  value={values.machineId}
                  onChange={set("machineId")}
                  error={errors.machineId}
                  placeholder="A1B2C3D4E5F6G7H8"
                  maxLength={16}
                  mono
                  hint={`${values.machineId.trim().length}/16`}
                  tooltip="Open the ECHO desktop app, go to Settings → License → Hardware ID, and copy the 16-character code shown there."
                />

                {submitError ? (
                  <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {submitError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="bg-gradient-gold group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-all hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Verifying hardware
                    </>
                  ) : (
                    "Generate & Email License Key"
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 pt-1 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-portal-gold" />
                  Secure · Encrypted · Verified
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
    </TooltipProvider>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  tooltip,
  hint,
  mono,
  ...rest
}: {
  id: keyof Fields;
  label: string;
  value: string;
  onChange: (event: { target: { value: string } }) => void;
  error?: string | undefined;
  tooltip?: string;
  hint?: string;
  mono?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label
          htmlFor={id}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          {label}
          {tooltip ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={`Where to find your ${label}`}
                  className="text-portal-gold/70 transition-colors hover:text-portal-gold"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[16rem] text-xs leading-relaxed">
                {tooltip}
              </TooltipContent>
            </Tooltip>
          ) : null}
        </label>
        {hint ? (
          <span className="font-mono text-[11px] text-muted-foreground">{hint}</span>
        ) : null}
      </div>
      <input
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-xl border bg-background/60 px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-portal-gold focus:ring-1 focus:ring-portal-gold ${
          error ? "border-destructive/70" : "border-portal-line"
        } ${mono ? "font-mono tracking-[0.18em] uppercase" : ""}`}
        {...rest}
      />
      {error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function SuccessPanel() {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="bg-gradient-gold flex h-14 w-14 items-center justify-center rounded-full">
        <Check className="h-7 w-7 text-primary-foreground" strokeWidth={3} />
      </div>
      <h2 className="mt-6 text-xl font-semibold">License request confirmed</h2>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
        Your Hardware ID has been verified. Your lifetime license key will arrive in your email
        inbox within 2 minutes.
      </p>
      <div className="mt-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-portal-gold">
        <ShieldCheck className="h-3.5 w-3.5" />
        Activation secured
      </div>
    </div>
  );
}