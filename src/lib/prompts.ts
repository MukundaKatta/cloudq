import type { CloudProvider, IaCTool } from "@/types";

export const SYSTEM_PROMPT = `You are CloudQ, an expert AI assistant for cloud infrastructure, DevOps, and software development. You have deep knowledge of AWS, Google Cloud Platform (GCP), and Microsoft Azure.

Your capabilities:
1. Infrastructure Chat: Explain cloud concepts, services, and architectures across AWS, GCP, and Azure with code examples
2. IaC Generator: Generate Terraform, CloudFormation, and Pulumi code for infrastructure
3. Architecture Diagrams: Create architecture diagrams using Mermaid syntax
4. Cost Estimation: Compare costs across cloud providers
5. Security Scanner: Analyze IaC code for security vulnerabilities
6. Migration Assistant: Help plan cloud-to-cloud migrations
7. CLI Helper: Provide CLI commands for aws, gcloud, and az
8. Best Practices: Check against Well-Architected Framework pillars
9. Incident Response: Guide through incident diagnosis and resolution
10. Runbook Generation: Create operational runbooks
11. Service Comparison: Compare equivalent services across providers

Guidelines:
- Always provide practical, production-ready code examples
- Include security best practices by default (encryption, least privilege, etc.)
- Mention cost implications when relevant
- Use markdown formatting with code blocks
- When comparing providers, be objective and note trade-offs
- Always suggest monitoring and observability practices`;

export function getIaCPrompt(tool: IaCTool, provider: CloudProvider, description: string): string {
  const toolNames = { terraform: "Terraform (HCL)", cloudformation: "AWS CloudFormation (YAML)", pulumi: "Pulumi (TypeScript)" };
  const providerNames = { aws: "AWS", gcp: "Google Cloud Platform", azure: "Microsoft Azure" };

  return `Generate ${toolNames[tool]} infrastructure as code for ${providerNames[provider]}.

Requirements:
${description}

Guidelines:
- Include all necessary resources and their dependencies
- Follow security best practices (encryption, least privilege IAM, private networking)
- Add appropriate tags/labels
- Include variables for customizable values
- Add comments explaining key decisions
- Output clean, production-ready code

Respond with the complete IaC code in a single code block, followed by a brief explanation of the resources created and any important notes.`;
}

export function getArchitecturePrompt(description: string): string {
  return `Create a Mermaid architecture diagram for the following system:

${description}

Requirements:
- Use Mermaid graph syntax (graph TD or graph LR)
- Include all major components and their connections
- Label connections with protocols/methods
- Group related services using subgraphs
- Use appropriate icons/shapes for different service types
- Add a title

Respond with the Mermaid code in a code block tagged as \`\`\`mermaid, followed by a description of the architecture.`;
}

export function getCostEstimatePrompt(description: string): string {
  return `Estimate the monthly cloud costs for the following infrastructure:

${description}

Provide cost estimates for AWS, GCP, and Azure. For each provider:
1. List individual service costs with pricing tier/instance type
2. Show monthly and annual totals
3. Note any free tier eligibility
4. Suggest cost optimization opportunities
5. Mention reserved instance / committed use discount potential

Format the response with clear tables and totals for each provider.`;
}

export function getSecurityScanPrompt(code: string): string {
  return `Analyze the following infrastructure as code for security vulnerabilities and misconfigurations:

\`\`\`
${code}
\`\`\`

For each finding, provide:
1. Severity (Critical/High/Medium/Low)
2. Title
3. Description of the issue
4. Affected resource
5. Specific recommendation to fix
6. Reference (CIS Benchmark, OWASP, etc.)

Also provide:
- An overall security score (0-100)
- A summary of the most critical issues
- Priority order for remediation`;
}

export function getMigrationPrompt(source: CloudProvider, target: CloudProvider, services: string): string {
  const names = { aws: "AWS", gcp: "GCP", azure: "Azure" };
  return `Create a migration plan from ${names[source]} to ${names[target]} for the following services:

${services}

Include:
1. Service mapping (source -> target equivalent)
2. Migration complexity assessment for each service
3. Step-by-step migration plan with dependencies
4. Estimated effort and timeline
5. Risk assessment and mitigation strategies
6. Data migration considerations
7. Rollback plan
8. Post-migration validation checklist`;
}

export function getCLIHelperPrompt(provider: CloudProvider, task: string): string {
  const tools = { aws: "AWS CLI (aws)", gcp: "Google Cloud SDK (gcloud)", azure: "Azure CLI (az)" };
  return `Provide the ${tools[provider]} commands to accomplish the following task:

${task}

For each command:
1. Show the complete command with all necessary flags
2. Explain what each flag does
3. Show example output where helpful
4. Provide alternative approaches if available
5. Note any required permissions/roles`;
}

export function getBestPracticesPrompt(description: string): string {
  return `Review the following infrastructure/application setup against the Well-Architected Framework:

${description}

Evaluate against all six pillars:
1. Operational Excellence
2. Security
3. Reliability
4. Performance Efficiency
5. Cost Optimization
6. Sustainability

For each pillar, provide:
- Current assessment (Good/Needs Improvement/Critical)
- Specific findings
- Actionable recommendations
- Priority level`;
}

export function getIncidentResponsePrompt(incident: string): string {
  return `Help diagnose and resolve the following incident:

${incident}

Provide:
1. Severity assessment (P1-P4)
2. Initial triage steps
3. Diagnostic commands to run
4. Root cause analysis approach
5. Resolution steps (immediate and long-term)
6. Communication template for stakeholders
7. Post-incident review items
8. Prevention measures`;
}

export function getRunbookPrompt(description: string): string {
  return `Generate an operational runbook for:

${description}

Include:
1. Title and description
2. Trigger conditions/alerts
3. Prerequisites and required access
4. Step-by-step procedures with exact commands
5. Expected output for each step
6. Decision trees for different scenarios
7. Rollback procedures
8. Escalation paths
9. Post-execution verification
10. Owner and review schedule`;
}

export function getServiceComparePrompt(category: string): string {
  return `Compare the ${category} services across AWS, GCP, and Azure.

For each service category, provide:
1. Service names across all three providers
2. Key features comparison
3. Pricing model differences
4. Performance characteristics
5. Unique capabilities of each provider
6. Best use cases for each
7. Integration ecosystem
8. When to choose one over another`;
}
