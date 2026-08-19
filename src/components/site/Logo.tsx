import logoAsset from "@/assets/echo-logo.png.asset.json";

export function Logo({ className = "h-9" }: { className?: string }) {
  return <img src="/logo.png" alt="ECHO" className={`${className} w-auto object-contain`} />;
}