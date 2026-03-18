import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function extractCodeBlocks(
  content: string
): { language: string; code: string }[] {
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  const blocks: { language: string; code: string }[] = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    blocks.push({
      language: match[1] || "text",
      code: match[2].trim(),
    });
  }

  return blocks;
}

export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    critical: "text-red-500 bg-red-500/10 border-red-500/30",
    high: "text-orange-500 bg-orange-500/10 border-orange-500/30",
    medium: "text-yellow-500 bg-yellow-500/10 border-yellow-500/30",
    low: "text-blue-500 bg-blue-500/10 border-blue-500/30",
    info: "text-gray-400 bg-gray-500/10 border-gray-500/30",
    P1: "text-red-500 bg-red-500/10 border-red-500/30",
    P2: "text-orange-500 bg-orange-500/10 border-orange-500/30",
    P3: "text-yellow-500 bg-yellow-500/10 border-yellow-500/30",
    P4: "text-blue-500 bg-blue-500/10 border-blue-500/30",
  };
  return colors[severity] || "text-gray-400 bg-gray-500/10 border-gray-500/30";
}

export function getProviderColor(provider: string): string {
  const colors: Record<string, string> = {
    aws: "text-[#FF9900]",
    gcp: "text-[#4285F4]",
    azure: "text-[#0078D4]",
  };
  return colors[provider] || "text-gray-400";
}

export function getProviderBgColor(provider: string): string {
  const colors: Record<string, string> = {
    aws: "bg-[#FF9900]/10 border-[#FF9900]/30",
    gcp: "bg-[#4285F4]/10 border-[#4285F4]/30",
    azure: "bg-[#0078D4]/10 border-[#0078D4]/30",
  };
  return colors[provider] || "bg-gray-500/10 border-gray-500/30";
}

export function generateId(): string {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
}
