import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import { useT } from "@/lib/i18n";
import { FORMSPREE_ENDPOINT, whatsappLink } from "@/lib/site-config";

export type LeadKind = "order" | "demo" | null;

type Fields = { shop: string; phone: string; email: string; os: string };

const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
const phoneOk = (value: string) => value.replace(/[^\d]/g, "").length >= 7;

export function LeadModal({ kind, onClose }: { kind: LeadKind; onClose: () => void }) {
  const t = useT();
  const v3 = t.v3;
  const [values, setValues] = useState<Fields>({ shop: "", phone: "", email: "", os: "BarberOS" });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    if (kind) {
      setValues({ shop: "", phone: "", email: "", os: "BarberOS" });
      setErrors({});
      setStatus("idle");
    }
  }, [kind]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!kind) return null;
  const isOrder = kind === "order";
  const copy = isOrder ? v3.order : v3.demo;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const next: Partial<Record<keyof Fields, string>> = {};
    if (isOrder && !values.shop.trim()) next.shop = v3.form.required;
    if (!phoneOk(values.phone)) next.phone = v3.form.invalidPhone;
    if (!emailOk(values.email)) next.email = v3.form.invalidEmail;
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    const payload = {
      type: kind,
      shop: isOrder ? values.shop : undefined,
      setup: isOrder ? values.os : undefined,
      phone: values.phone,
      email: values.email,
    };

    try {
      // Paste your Formspree form endpoint in src/lib/site-config.ts (FORMSPREE_ENDPOINT).
      if (!FORMSPREE_ENDPOINT) {
        window.open(
          whatsappLink(`${copy.title} — ${payload.email} / ${payload.phone}${payload.shop ? ` / ${payload.shop} (${payload.setup})` : ""}`),
          "_blank",
          "noopener",
        );
        setStatus("done");
        return;
      }
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "mt-2 w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/70";

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={copy.title}
          className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-7 shadow-[0_40px_120px_-40px_hsl(0_0%_0%)]"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={v3.form.close}
            className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-silver-dim transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          {status === "done" ? (
            <div className="py-6 text-center">
              <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Check className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-foreground">{v3.form.successTitle}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v3.form.successBody}</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                {v3.form.close}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h3 className="text-2xl font-semibold text-gradient">{copy.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{copy.sub}</p>

              <div className="mt-6 space-y-4">
                {isOrder ? (
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-silver-dim">{v3.order.shop}</label>
                    <input
                      className={field}
                      value={values.shop}
                      onChange={(e) => setValues((v) => ({ ...v, shop: e.target.value }))}
                    />
                    {errors.shop ? <p className="mt-1.5 text-xs text-destructive">{errors.shop}</p> : null}
                  </div>
                ) : null}

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-silver-dim">{copy.email}</label>
                  <input
                    type="email"
                    className={field}
                    value={values.email}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  />
                  {errors.email ? <p className="mt-1.5 text-xs text-destructive">{errors.email}</p> : null}
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-silver-dim">{copy.phone}</label>
                  <input
                    type="tel"
                    className={field}
                    value={values.phone}
                    onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
                  />
                  {errors.phone ? <p className="mt-1.5 text-xs text-destructive">{errors.phone}</p> : null}
                </div>

                {isOrder ? (
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-silver-dim">{v3.order.os}</label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {["BarberOS", "SalonOS", "SpaOS"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setValues((v) => ({ ...v, os: option }))}
                          className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors ${
                            values.os === option
                              ? "border-primary/70 bg-primary/12 text-primary"
                              : "border-border text-silver-dim hover:text-foreground"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              {status === "error" ? <p className="mt-4 text-xs text-destructive">{v3.form.error}</p> : null}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-7 w-full rounded-full bg-gradient-fire px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60"
              >
                {status === "sending" ? v3.form.sending : copy.submit}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
