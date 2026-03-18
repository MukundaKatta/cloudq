export type CloudProvider = "aws" | "gcp" | "azure";

export type IaCTool = "terraform" | "cloudformation" | "pulumi";

export type DiagramType = "mermaid" | "d3";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  metadata?: {
    provider?: CloudProvider;
    tool?: string;
    codeBlocks?: CodeBlock[];
  };
}

export interface CodeBlock {
  language: string;
  code: string;
  filename?: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  category: ToolCategory;
}

export type ToolCategory =
  | "chat"
  | "iac-generator"
  | "architecture"
  | "cost-estimator"
  | "security-scanner"
  | "migration"
  | "cli-helper"
  | "best-practices"
  | "incident-response"
  | "runbooks"
  | "service-compare";

export interface IaCRequest {
  description: string;
  tool: IaCTool;
  provider: CloudProvider;
  resources: string[];
}

export interface IaCResult {
  code: string;
  language: string;
  filename: string;
  explanation: string;
  resources: ResourceInfo[];
}

export interface ResourceInfo {
  name: string;
  type: string;
  provider: CloudProvider;
  estimatedCost?: CostEstimate;
}

export interface CostEstimate {
  monthly: number;
  yearly: number;
  currency: string;
  breakdown: CostBreakdownItem[];
}

export interface CostBreakdownItem {
  service: string;
  description: string;
  monthlyCost: number;
  provider: CloudProvider;
  tier?: string;
}

export interface SecurityFinding {
  id: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  title: string;
  description: string;
  resource: string;
  line?: number;
  recommendation: string;
  reference?: string;
}

export interface SecurityScanResult {
  findings: SecurityFinding[];
  score: number;
  summary: string;
  scannedAt: Date;
}

export interface MigrationPlan {
  id: string;
  sourceProvider: CloudProvider;
  targetProvider: CloudProvider;
  services: MigrationService[];
  estimatedEffort: string;
  risks: string[];
  steps: MigrationStep[];
}

export interface MigrationService {
  source: string;
  target: string;
  complexity: "low" | "medium" | "high";
  notes: string;
}

export interface MigrationStep {
  order: number;
  title: string;
  description: string;
  duration: string;
  dependencies: number[];
}

export interface ArchitectureDiagram {
  id: string;
  title: string;
  type: DiagramType;
  code: string;
  description: string;
}

export interface CLICommand {
  command: string;
  description: string;
  provider: CloudProvider;
  examples: string[];
  flags?: CLIFlag[];
}

export interface CLIFlag {
  flag: string;
  description: string;
  required: boolean;
}

export interface BestPractice {
  id: string;
  pillar: WellArchitectedPillar;
  title: string;
  description: string;
  recommendation: string;
  provider: CloudProvider;
  severity: "critical" | "high" | "medium" | "low";
}

export type WellArchitectedPillar =
  | "operational-excellence"
  | "security"
  | "reliability"
  | "performance"
  | "cost-optimization"
  | "sustainability";

export interface IncidentResponse {
  id: string;
  severity: "P1" | "P2" | "P3" | "P4";
  title: string;
  symptoms: string[];
  diagnosis: string[];
  resolution: string[];
  prevention: string[];
  runbookId?: string;
}

export interface Runbook {
  id: string;
  title: string;
  description: string;
  triggers: string[];
  steps: RunbookStep[];
  rollback: string[];
  owner: string;
}

export interface RunbookStep {
  order: number;
  action: string;
  command?: string;
  expectedOutput?: string;
  onFailure?: string;
}

export interface ServiceComparison {
  category: string;
  services: ServiceComparisonEntry[];
}

export interface ServiceComparisonEntry {
  aws: string;
  gcp: string;
  azure: string;
  description: string;
  keyDifferences: string[];
}
