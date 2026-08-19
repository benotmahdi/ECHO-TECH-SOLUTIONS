import { langOptions, useLang } from "@/lib/i18n";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-border bg-secondary/60 p-1 ${className}`}
      role="group"
      aria-label="Language"
    >
      {langOptions.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLang(option.code)}
          aria-pressed={lang === option.code}
          title={option.label}
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-200 ${
            lang === option.code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span aria-hidden>{option.flag}</span>
          {option.short}
        </button>
      ))}
    </div>
  );
}