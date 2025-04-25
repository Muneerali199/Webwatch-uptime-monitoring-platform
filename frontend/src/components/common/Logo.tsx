import { Activity } from "lucide-react";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className="flex items-center">
      <div className="relative h-8 w-8 mr-2">
        <Activity className={`text-primary ${className}`} size={32} strokeWidth={2.5} />
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse" />
      </div>
      <span className="font-bold text-xl tracking-tight">BetterUptime</span>
    </div>
  );
}