"use client";

import { useAppStore } from "@/lib/store";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import ChatPanel from "@/components/chat/ChatPanel";
import IaCGenerator from "@/components/iac/IaCGenerator";
import ArchitectureDiagram from "@/components/architecture/ArchitectureDiagram";
import CostEstimator from "@/components/cost/CostEstimator";
import SecurityScanner from "@/components/security/SecurityScanner";
import MigrationAssistant from "@/components/migration/MigrationAssistant";
import CLIHelper from "@/components/cli/CLIHelper";
import BestPractices from "@/components/practices/BestPractices";
import IncidentResponse from "@/components/incident/IncidentResponse";
import RunbookGenerator from "@/components/runbooks/RunbookGenerator";
import ServiceCompare from "@/components/compare/ServiceCompare";

const toolComponents: Record<string, React.ComponentType> = {
  chat: () => (
    <ChatPanel
      placeholder="Ask about any cloud service, architecture pattern, or DevOps practice..."
      welcomeMessage="Hello! I'm CloudQ, your AI cloud infrastructure assistant. I can help with AWS, GCP, Azure, DevOps, IaC, architecture, cost optimization, security, and more. What would you like to know?"
    />
  ),
  "iac-generator": IaCGenerator,
  architecture: ArchitectureDiagram,
  "cost-estimator": CostEstimator,
  "security-scanner": SecurityScanner,
  migration: MigrationAssistant,
  "cli-helper": CLIHelper,
  "best-practices": BestPractices,
  "incident-response": IncidentResponse,
  runbooks: RunbookGenerator,
  "service-compare": ServiceCompare,
};

export default function Home() {
  const { activeTool } = useAppStore();

  const ActiveComponent = toolComponents[activeTool] || toolComponents.chat;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <Header />
        <div className="flex-1 overflow-hidden">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
