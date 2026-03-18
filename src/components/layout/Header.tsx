"use client";

import { useAppStore } from "@/lib/store";
import type { CloudProvider } from "@/types";
import Badge from "@/components/ui/Badge";

const providerOptions: { id: CloudProvider; label: string; variant: "aws" | "gcp" | "azure" }[] = [
  { id: "aws", label: "AWS", variant: "aws" },
  { id: "gcp", label: "GCP", variant: "gcp" },
  { id: "azure", label: "Azure", variant: "azure" },
];

const toolLabels: Record<string, string> = {
  chat: "Infrastructure Chat",
  "iac-generator": "IaC Code Generator",
  architecture: "Architecture Diagrams",
  "cost-estimator": "Cost Estimator",
  "security-scanner": "Security Scanner",
  migration: "Migration Assistant",
  "cli-helper": "CLI Command Helper",
  "best-practices": "Best Practices Checker",
  "incident-response": "Incident Response",
  runbooks: "Runbook Generator",
  "service-compare": "Service Comparison",
};

export default function Header() {
  const { activeTool, selectedProvider, setSelectedProvider } = useAppStore();

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-sm">
      <div>
        <h2 className="text-lg font-semibold text-white">{toolLabels[activeTool]}</h2>
        <p className="text-xs text-gray-500">AI-powered cloud infrastructure assistant</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">Provider:</span>
        <div className="flex gap-1.5">
          {providerOptions.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProvider(p.id)}
              className="transition-all"
            >
              <Badge
                variant={selectedProvider === p.id ? p.variant : "default"}
                size="md"
              >
                {p.label}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
