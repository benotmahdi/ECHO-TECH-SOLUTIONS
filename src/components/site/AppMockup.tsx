import { useState } from "react";
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  Minus,
  ScanBarcode,
  Search,
  Square,
  Users,
  UserSquare2,
  X,
} from "lucide-react";
import { useT } from "@/lib/i18n";

const tabIcons = [LayoutDashboard, ScanBarcode, Users, UserSquare2, Boxes, BarChart3];

function Bar({ value }: { value: number }) {
  return (
    <div className="flex h-full flex-col justify-end">
      <div className="w-full rounded-t-sm bg-gradient-fire" style={{ height: `${value}%` }} />
    </div>
  );
}

function Row({ cells, muted = false }: { cells: string[]; muted?: boolean }) {
  return (
    <div className="grid grid-cols-4 gap-2 border-b border-border/60 px-3 py-2 text-[11px] last:border-0">
      {cells.map((cell, i) => (
        <span
          key={i}
          dir={i === 0 || muted ? undefined : "ltr"}
          className={i === 0 ? "font-medium text-foreground" : muted ? "text-muted-foreground" : "text-silver-dim rtl:text-end"}
        >
          {cell}
        </span>
      ))}
    </div>
  );
}

export function AppMockup() {
  const t = useT();
  const [tab, setTab] = useState(0);
  const u = t.ui;

  const panels = [
    // Dashboard
    <div key="dash" className="grid gap-3 sm:grid-cols-3">
      {[
        { label: u.revenue, value: "48 500 DA" },
        { label: u.sales, value: "37" },
        { label: u.clients, value: "24" },
      ].map((kpi) => (
        <div key={kpi.label} className="rounded-lg border border-border bg-secondary/40 p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{kpi.label}</p>
          <p dir="ltr" className="mt-1 text-lg font-semibold text-foreground rtl:text-end">{kpi.value}</p>
        </div>
      ))}
      <div className="rounded-lg border border-border bg-secondary/40 p-3 sm:col-span-2">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{u.today}</p>
        <div className="mt-3 grid h-24 grid-cols-12 items-end gap-1">
          {[35, 52, 40, 68, 74, 55, 82, 61, 90, 70, 84, 96].map((v, i) => (
            <Bar key={i} value={v} />
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-border bg-secondary/40 p-3">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{u.cashSession}</p>
        <p className="mt-2 inline-flex items-center gap-2 text-xs text-foreground">
          <span className="h-2 w-2 rounded-full bg-primary" />
          {u.open}
        </p>
        <p className="mt-3 text-[11px] text-muted-foreground">
          {u.expenses}: <span dir="ltr">3 200 DA</span>
        </p>
      </div>
    </div>,
    // POS
    <div key="pos" className="grid gap-3 md:grid-cols-[1.4fr_1fr]">
      <div className="rounded-lg border border-border bg-secondary/40 p-3">
        <div className="mb-3 flex gap-2 text-[11px]">
          <span className="rounded-full bg-primary px-3 py-1 font-semibold text-primary-foreground">{u.services}</span>
          <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">{u.products}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["1 200", "900", "1 500", "600", "2 400", "800"].map((price, i) => (
            <div key={i} className="rounded-md border border-border bg-card p-3 text-center">
              <div className="mx-auto h-6 w-6 rounded bg-primary/20" />
              <p dir="ltr" className="mt-2 text-[11px] font-medium text-foreground">{price} DA</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col rounded-lg border border-border bg-secondary/40 p-3">
        <div className="flex-1 space-y-2 text-[11px]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between border-b border-border/60 pb-2">
              <span className="text-silver-dim">#{i}</span>
              <span dir="ltr" className="font-medium text-foreground">1 200 DA</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{u.total}</span>
          <span dir="ltr" className="font-semibold text-foreground">3 600 DA</span>
        </div>
        <div className="mt-3 rounded-md bg-gradient-fire py-2 text-center text-xs font-semibold text-primary-foreground">
          {u.checkout}
        </div>
      </div>
    </div>,
    // Clients
    <div key="clients" className="rounded-lg border border-border bg-secondary/40">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2 text-[11px] text-muted-foreground">
        <Search className="h-3.5 w-3.5" /> {u.search}
      </div>
      <Row cells={[u.clients, u.visits, u.loyalty, u.total]} muted />
      {[
        ["Amine", "12", "240", "36 000 DA"],
        ["Sarah", "8", "160", "22 400 DA"],
        ["Yacine", "21", "410", "58 900 DA"],
        ["Nadia", "5", "90", "12 100 DA"],
      ].map((r) => (
        <Row key={r[0]} cells={r} />
      ))}
    </div>,
    // Staff
    <div key="staff" className="grid gap-3 sm:grid-cols-2">
      {[
        ["Karim", "35%", "18 200 DA"],
        ["Lina", "30%", "14 750 DA"],
        ["Sofiane", "25%", "9 400 DA"],
        ["Imane", "30%", "11 600 DA"],
      ].map(([name, rate, amount]) => (
        <div key={name} className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 p-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/20" />
            <div>
              <p className="text-xs font-medium text-foreground">{name}</p>
              <p className="text-[10px] text-muted-foreground">
                {u.commission} <span dir="ltr">{rate}</span>
              </p>
            </div>
          </div>
          <span dir="ltr" className="text-xs font-semibold text-primary">{amount}</span>
        </div>
      ))}
    </div>,
    // Inventory
    <div key="inv" className="rounded-lg border border-border bg-secondary/40">
      <Row cells={[u.products, u.stock, u.total, u.lowStock]} muted />
      {[
        ["Shampoo Pro", "24", "2 400 DA", "—"],
        ["Wax Matte", "6", "1 800 DA", u.lowStock],
        ["Beard Oil", "18", "3 600 DA", "—"],
        ["Nail Polish", "4", "1 200 DA", u.lowStock],
      ].map((r) => (
        <Row key={r[0]} cells={r} />
      ))}
    </div>,
    // Reports
    <div key="rep" className="grid gap-3 md:grid-cols-[1fr_1fr]">
      <div className="rounded-lg border border-border bg-secondary/40 p-3">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{u.revenue}</p>
        <div className="mt-3 grid h-28 grid-cols-7 items-end gap-2">
          {[45, 62, 58, 80, 72, 95, 66].map((v, i) => (
            <Bar key={i} value={v} />
          ))}
        </div>
      </div>
      <div className="space-y-2 rounded-lg border border-border bg-secondary/40 p-3 text-[11px]">
        {[
          [u.sales, "132"],
          [u.expenses, "18 400 DA"],
          [u.staff, "4"],
          [u.clients, "86"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
            <span className="text-muted-foreground">{k}</span>
            <span dir="ltr" className="font-medium text-foreground">{v}</span>
          </div>
        ))}
        <div className="mt-2 inline-block rounded-md border border-border px-3 py-1 text-[11px] text-silver-dim">
          {u.export}
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
      {/* Windows-style title bar */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/70 px-3 py-2">
        <span className="text-[11px] font-medium text-silver-dim">ECHO — {t.showcase.tabs[tab]}</span>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Minus className="h-3 w-3" />
          <Square className="h-2.5 w-2.5" />
          <X className="h-3 w-3" />
        </div>
      </div>

      <div className="grid md:grid-cols-[180px_1fr]">
        <div className="flex gap-1 overflow-x-auto border-b border-border bg-background/60 p-2 md:flex-col md:overflow-visible md:border-b-0 md:border-e md:border-border">
          {t.showcase.tabs.map((label, i) => {
            const Icon = tabIcons[i]!;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setTab(i)}
                className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-start text-[11px] font-medium transition-colors ${
                  tab === i ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            );
          })}
        </div>
        <div className="min-h-[300px] p-4">{panels[tab]}</div>
      </div>
    </div>
  );
}