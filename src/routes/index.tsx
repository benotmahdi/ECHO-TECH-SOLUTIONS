import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { Suspense, lazy, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Calculator,
  Check,
  ClipboardList,
  CloudOff,
  DatabaseBackup,
  Fingerprint,
  Flower2,
  Hand,
  Infinity as InfinityIcon,
  Languages,
  MessageCircle,
  Notebook,
  Percent,
  Receipt,
  ScanBarcode,
  Scissors,
  ShieldCheck,
  Sparkles,
  UserSquare2,
  Users,
  Wallet,
  Workflow,
  Zap,
} from "lucide-react";

import { Header } from "@/components/site/Header";
import { Logo } from "@/components/site/Logo";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { AppMockup } from "@/components/site/AppMockup";
import { Reveal } from "@/components/site/Reveal";
import { TiltCard } from "@/components/site/TiltCard";
import { LeadModal, type LeadKind } from "@/components/site/LeadModal";
import { LanguageProvider, useLang, useT } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site-config";

const HeroScene = lazy(() => import("@/components/site/HeroScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ECHO — Salon & Barbershop Management Software | Offline POS" },
      {
        name: "description",
        content:
          "ECHO is an offline POS and business management software for barbershops, beauty salons, nail studios and spas. Sales, staff, clients, inventory and cash in one app.",
      },
      { property: "og:title", content: "ECHO — Your Business. Under Control." },
      {
        property: "og:description",
        content:
          "Manage sales, staff, clients, inventory and cash flow from one powerful application — even without internet. Available in English, French and Arabic.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: IndexRoute,
});

function IndexRoute() {
  return (
    <LanguageProvider>
      <SiteContent />
    </LanguageProvider>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-gradient sm:text-4xl md:text-[2.75rem]">
      {children}
    </h2>
  );
}

function SiteContent() {
  const t = useT();
  const { dir } = useLang();
  const [lead, setLead] = useState<LeadKind>(null);
  const v3 = t.v3;

  const moduleIcons = [ScanBarcode, Users, UserSquare2, Boxes, Wallet, BarChart3];
  const businessIcons = [Scissors, Sparkles, Hand, Flower2];
  const problemIcons = [Notebook, Receipt, Calculator, Wallet, Percent, ClipboardList, Boxes];
  const securityIcons = [ShieldCheck, Users, Fingerprint, DatabaseBackup];
  const valueIcons = [Zap, InfinityIcon, Workflow];
  const variantIcons = [Scissors, Sparkles, Flower2];

  return (
    <div dir={dir} className="min-h-screen bg-background font-body text-foreground">
      <Header />

      {/* HERO */}
      <section id="home" className="relative overflow-hidden pb-20 pt-28 sm:pt-36">
        {/* Animated Mesh Gradient Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute left-1/4 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/20 opacity-50 blur-[120px] animate-blob-1" />
          <div className="absolute right-0 top-1/4 h-[500px] w-[500px] translate-x-1/3 rounded-full bg-primary-glow/20 opacity-50 blur-[100px] animate-blob-2" />
          <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/3 rounded-full bg-primary/10 opacity-40 blur-[80px] animate-blob-1" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
            <Reveal>
              <Kicker>{v3.hero.badge}</Kicker>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] text-gradient sm:text-6xl lg:text-[4.25rem]">
                {v3.hero.title}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-silver-dim sm:text-lg">{v3.hero.sub}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLead("order")}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-fire px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_20px_50px_-20px_var(--color-primary)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {v3.hero.order}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => setLead("demo")}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  {v3.hero.demo}
                </button>
                <a
                  href={whatsappLink(t.hero.cta)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-silver-dim transition-colors hover:text-foreground"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t.hero.whatsapp}
                </a>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative h-[340px] w-full sm:h-[440px]">
                <ClientOnly fallback={<div className="h-full w-full rounded-3xl border border-border bg-card/40" />}>
                  <Suspense fallback={<div className="h-full w-full rounded-3xl border border-border bg-card/40" />}>
                    <HeroScene />
                  </Suspense>
                </ClientOnly>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VARIANTS */}
      <section id="variants" className="border-t border-border/60 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Kicker>{v3.variants.kicker}</Kicker>
            <SectionTitle>{v3.variants.title}</SectionTitle>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {v3.variants.items.map((item, i) => {
              const Icon = variantIcons[i]!;
              return (
                <Reveal key={item.name} delay={i * 80}>
                  <TiltCard>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold text-foreground">{item.name}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{item.tag}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    <button
                      type="button"
                      onClick={() => setLead("order")}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      {v3.hero.order}
                      <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </button>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="border-t border-border/60 bg-portal-bg py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Kicker>{v3.values.kicker}</Kicker>
            <SectionTitle>{v3.values.title}</SectionTitle>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {v3.values.items.map((item, i) => {
              const Icon = valueIcons[i]!;
              return (
                <Reveal key={item.name} delay={i * 80}>
                  <TiltCard>
                    <Icon className="h-6 w-6 text-primary" />
                    <h3 className="mt-5 text-lg font-semibold text-foreground">{item.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* BUSINESSES */}
      <section id="businesses" className="border-t border-border/60 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Kicker>{t.businesses.kicker}</Kicker>
            <SectionTitle>{t.businesses.title}</SectionTitle>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.businesses.items.map((item, i) => {
              const Icon = businessIcons[i]!;
              return (
                <Reveal key={item} delay={i * 70}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-5 text-lg font-semibold text-foreground">{item}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="border-t border-border/60 bg-portal-bg py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Kicker>{t.problem.kicker}</Kicker>
            <SectionTitle>{t.problem.title}</SectionTitle>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {t.problem.items.map((item, i) => {
              const Icon = problemIcons[i]!;
              return (
                <Reveal key={item} delay={i * 50}>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-silver-dim">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    {item}
                  </span>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={120}>
            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.28em] text-gradient-fire sm:text-base">
              {t.problem.bridge}
            </p>
          </Reveal>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="features" className="border-t border-border/60 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Kicker>{t.solution.kicker}</Kicker>
            <SectionTitle>{t.solution.title}</SectionTitle>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {t.solution.modules.map((mod, i) => {
              const Icon = moduleIcons[i]!;
              return (
                <Reveal key={mod.name} delay={i * 60}>
                  <article className="h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-foreground">{mod.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{mod.desc}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* OFFLINE */}
      <section id="why" className="border-t border-border/60 bg-portal-bg py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <Kicker>{t.offline.kicker}</Kicker>
              <SectionTitle>{t.offline.title}</SectionTitle>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-silver-dim">{t.offline.body}</p>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex items-center justify-center rounded-3xl border border-border bg-card p-12">
                <CloudOff className="h-24 w-24 text-primary" strokeWidth={1.1} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHATSAPP */}
      <section className="border-t border-border/60 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <Kicker>{t.whatsapp.kicker}</Kicker>
              <SectionTitle>{t.whatsapp.title}</SectionTitle>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-silver-dim">{t.whatsapp.body}</p>
              <ul className="mt-6 space-y-3">
                {t.whatsapp.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="h-4 w-4 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex items-center justify-center rounded-3xl border border-border bg-card p-12">
                <MessageCircle className="h-24 w-24 text-primary" strokeWidth={1.1} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="border-t border-border/60 bg-portal-bg py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Kicker>{t.security.kicker}</Kicker>
            <SectionTitle>{t.security.title}</SectionTitle>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.security.items.map((item, i) => {
              const Icon = securityIcons[i]!;
              return (
                <Reveal key={item} delay={i * 70}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6">
                    <Icon className="h-6 w-6 text-primary" />
                    <p className="mt-4 text-sm font-medium text-foreground">{item}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* LANGUAGES */}
      <section className="border-t border-border/60 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Kicker>{t.languages.kicker}</Kicker>
            <SectionTitle>{t.languages.title}</SectionTitle>
            <p className="mt-5 max-w-xl text-base text-silver-dim">{t.languages.body}</p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            {t.languages.list.map((item, i) => (
              <Reveal key={item} delay={i * 50}>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">
                  <Languages className="h-4 w-4 text-primary" />
                  {item}
                </span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="mt-6 text-sm text-muted-foreground">{t.languages.site}</p>
          </Reveal>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="border-t border-border/60 bg-portal-bg py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Kicker>{t.workflow.kicker}</Kicker>
            <SectionTitle>{t.workflow.title}</SectionTitle>
          </Reveal>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {t.workflow.steps.map((step, i) => (
              <Reveal key={step} delay={i * 45}>
                <li className="h-full rounded-2xl border border-border bg-card p-5">
                  <span className="text-xs font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-3 text-sm font-medium text-foreground">{step}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-t border-border/60 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Kicker>{t.benefits.kicker}</Kicker>
            <SectionTitle>{t.benefits.title}</SectionTitle>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {t.benefits.items.map((item, i) => (
              <Reveal key={item} delay={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <Check className="h-5 w-5 text-primary" />
                  <p className="mt-4 text-sm font-medium text-foreground">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="border-t border-border/60 bg-portal-bg py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Kicker>{t.showcase.kicker}</Kicker>
            <SectionTitle>{t.showcase.title}</SectionTitle>
            <p className="mt-5 max-w-xl text-base text-silver-dim">{t.showcase.sub}</p>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <AppMockup />
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="border-t border-border/60 py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="text-3xl font-semibold leading-tight text-gradient sm:text-5xl">{t.finalCta.title}</h2>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setLead("order")}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-fire px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_20px_50px_-20px_var(--color-primary)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {v3.hero.order}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => setLead("demo")}
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                {v3.hero.demo}
              </button>
              <a
                href={whatsappLink(t.finalCta.cta)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <MessageCircle className="h-4 w-4" />
                {t.finalCta.whatsapp}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo className="h-12" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.footer.tagline}</p>
          </div>
          <div className="flex flex-col gap-4">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-silver-dim">
              <a href="#home" className="transition-colors hover:text-foreground">{t.nav.home}</a>
              <a href="#features" className="transition-colors hover:text-foreground">{t.nav.features}</a>
              <a href="#businesses" className="transition-colors hover:text-foreground">{t.nav.businesses}</a>
              <a href="#why" className="transition-colors hover:text-foreground">{t.nav.why}</a>
              <a href="#contact" className="transition-colors hover:text-foreground">{t.nav.contact}</a>
            </nav>
            <LanguageSwitcher className="self-start" />
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-7xl px-5 text-xs text-muted-foreground sm:px-8">
          © {new Date().getFullYear()} ECHO. {t.footer.rights}
        </p>
      </footer>

      <LeadModal kind={lead} onClose={() => setLead(null)} />
    </div>
  );
}
