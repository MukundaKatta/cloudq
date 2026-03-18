# CloudQ

AI-powered cloud infrastructure assistant with IaC generation, architecture diagrams, security scanning, and cost estimation.

<!-- Add screenshot here -->

## Features

- **AI Chat** — Ask questions about AWS, GCP, Azure, DevOps, and cloud architecture
- **IaC Generator** — Generate Terraform, CloudFormation, and Pulumi infrastructure code
- **Architecture Diagrams** — Auto-generate cloud architecture diagrams with Mermaid and D3
- **Cost Estimator** — Estimate monthly cloud costs for infrastructure configurations
- **Security Scanner** — Scan configurations for security vulnerabilities and misconfigurations
- **Migration Assistant** — Plan and execute cloud-to-cloud migration strategies
- **CLI Helper** — Generate and explain AWS/GCP/Azure CLI commands
- **Best Practices** — Get recommendations aligned with cloud provider best practices
- **Incident Response** — Guided runbooks for cloud incident troubleshooting
- **Runbook Generator** — Auto-generate operational runbooks from infrastructure definitions
- **Service Comparison** — Compare equivalent services across cloud providers

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **AI SDK:** Vercel AI SDK, OpenAI
- **Diagrams:** Mermaid, D3.js
- **Code Display:** react-syntax-highlighter
- **Markdown:** react-markdown, remark-gfm
- **Database:** Supabase (with SSR helpers)
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key
- Supabase project

### Installation

```bash
git clone <repo-url>
cd cloudq
npm install
```

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### Running

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/
│   ├── chat/         # AI chat panel
│   ├── iac/          # IaC code generator
│   ├── architecture/ # Diagram generator
│   ├── cost/         # Cost estimator
│   ├── security/     # Security scanner
│   ├── migration/    # Migration assistant
│   ├── cli/          # CLI helper
│   ├── practices/    # Best practices engine
│   ├── incident/     # Incident response
│   ├── runbooks/     # Runbook generator
│   ├── compare/      # Service comparison
│   └── layout/       # Sidebar and header
├── lib/              # Store, utilities, Supabase client
└── types/            # TypeScript type definitions
```

## License

MIT
