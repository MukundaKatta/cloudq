import { NextRequest } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/prompts";

export async function POST(req: NextRequest) {
  try {
    const { message, tool, provider, history } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(
        generateFallbackResponse(message, tool, provider),
        {
          headers: { "Content-Type": "text/plain" },
        }
      );
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...((history || []) as Array<{ role: string; content: string }>),
      {
        role: "user",
        content: `[Provider context: ${provider?.toUpperCase() || "AWS"}] ${message}`,
      },
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages,
        stream: true,
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);
      return new Response(
        generateFallbackResponse(message, tool, provider),
        { headers: { "Content-Type": "text/plain" } }
      );
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;
            const data = trimmed.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                controller.enqueue(encoder.encode(content));
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      "I encountered an error processing your request. Please try again.",
      { status: 500, headers: { "Content-Type": "text/plain" } }
    );
  }
}

function generateFallbackResponse(message: string, tool: string, provider: string): string {
  const msg = message.toLowerCase();

  if (msg.includes("vpc") || msg.includes("network")) {
    return `## VPC / Networking on ${provider?.toUpperCase() || "AWS"}

A **Virtual Private Cloud (VPC)** provides an isolated network environment for your cloud resources.

### Key Components:
- **Subnets**: Public (internet-facing) and private (internal only)
- **Route Tables**: Control traffic routing between subnets
- **Internet Gateway**: Allows public subnet resources to reach the internet
- **NAT Gateway**: Allows private subnet resources to make outbound connections
- **Security Groups**: Stateful firewalls at the instance level
- **Network ACLs**: Stateless firewalls at the subnet level

### Best Practices:
1. Use multiple Availability Zones for high availability
2. Keep databases and sensitive resources in private subnets
3. Use VPC Flow Logs for network monitoring
4. Implement least-privilege security group rules
5. Use VPC endpoints for AWS service access without internet

### Example CIDR Planning:
\`\`\`
VPC:         10.0.0.0/16 (65,536 IPs)
Public-1:    10.0.1.0/24 (256 IPs)
Public-2:    10.0.2.0/24 (256 IPs)
Private-1:   10.0.10.0/24 (256 IPs)
Private-2:   10.0.11.0/24 (256 IPs)
Database-1:  10.0.20.0/24 (256 IPs)
Database-2:  10.0.21.0/24 (256 IPs)
\`\`\`

Would you like me to generate IaC code for a VPC setup?`;
  }

  if (msg.includes("kubernetes") || msg.includes("k8s") || msg.includes("eks") || msg.includes("gke") || msg.includes("aks")) {
    return `## Kubernetes on ${provider?.toUpperCase() || "AWS"}

### Managed Kubernetes Services:
| Provider | Service | Control Plane Cost |
|----------|---------|-------------------|
| AWS | EKS | $0.10/hr ($73/mo) |
| GCP | GKE | $0.10/hr (free for one Autopilot) |
| Azure | AKS | Free |

### Key Considerations:
1. **Node Management**: Use managed node groups for easier operations
2. **Networking**: Choose between native VPC CNI or overlay networking
3. **Storage**: Configure CSI drivers for persistent volumes
4. **Monitoring**: Deploy Prometheus + Grafana or use managed monitoring
5. **Security**: Enable RBAC, network policies, and pod security standards

### Essential Add-ons:
- **Ingress Controller**: NGINX or cloud-native (ALB/GCE/AGIC)
- **Service Mesh**: Istio, Linkerd, or AWS App Mesh
- **Secrets Management**: External Secrets Operator + cloud KMS
- **Autoscaling**: Cluster Autoscaler + HPA/VPA
- **Logging**: Fluent Bit/Fluentd to CloudWatch/Stackdriver

### Quick kubectl Commands:
\`\`\`bash
# Get cluster info
kubectl cluster-info

# List all pods across namespaces
kubectl get pods -A

# Check node resources
kubectl top nodes

# Describe a problematic pod
kubectl describe pod <pod-name> -n <namespace>

# View pod logs
kubectl logs -f <pod-name> -n <namespace>
\`\`\``;
  }

  if (msg.includes("serverless") || msg.includes("lambda") || msg.includes("function")) {
    return `## Serverless Computing

### Service Comparison:
| Feature | AWS Lambda | Cloud Functions | Azure Functions |
|---------|-----------|----------------|-----------------|
| Max Duration | 15 min | 9 min (HTTP), 60 min (event) | 5-10 min (consumption) |
| Memory | 128MB - 10GB | 128MB - 32GB | 1.5GB (consumption) |
| Concurrency | 1000 default | 3000 | 200 default |
| Languages | Node, Python, Java, Go, .NET, Ruby | Node, Python, Java, Go, .NET, Ruby, PHP | Node, Python, Java, C#, PowerShell, TypeScript |

### Best Practices:
1. Keep functions small and focused (single responsibility)
2. Minimize cold starts with provisioned concurrency or min instances
3. Use environment variables for configuration
4. Implement proper error handling and dead letter queues
5. Set appropriate timeout and memory settings
6. Use layers/dependencies efficiently

### Cost Tips:
- AWS Lambda: 1M free invocations + 400,000 GB-seconds/month
- Cloud Functions: 2M free invocations/month
- Azure Functions: 1M free invocations + 400,000 GB-seconds/month`;
  }

  if (msg.includes("cost") || msg.includes("price") || msg.includes("cheap")) {
    return `## Cloud Cost Optimization

### Quick Cost Comparison (monthly estimates):
| Resource | AWS | GCP | Azure |
|----------|-----|-----|-------|
| Small VM (2vCPU/8GB) | ~$68 | ~$61 | ~$70 |
| Medium VM (4vCPU/16GB) | ~$135 | ~$122 | ~$140 |
| 100GB Object Storage | ~$2.30 | ~$2.00 | ~$1.80 |
| Managed PostgreSQL (small) | ~$125 | ~$113 | ~$130 |

### Top Cost Optimization Strategies:
1. **Reserved Instances / Committed Use**: Save 30-60% for predictable workloads
2. **Spot/Preemptible Instances**: Save 60-90% for fault-tolerant workloads
3. **Right-sizing**: Match instance types to actual usage
4. **Auto-scaling**: Scale down during off-peak hours
5. **Storage Tiering**: Use lifecycle policies to move data to cheaper tiers
6. **Tag Everything**: Enable cost allocation and tracking
7. **Review Unused Resources**: Delete unattached volumes, idle load balancers

### Recommended Tools:
- AWS: Cost Explorer, Trusted Advisor, Savings Plans
- GCP: Cost Management, Recommender, Committed Use Discounts
- Azure: Cost Management + Billing, Advisor, Reservations`;
  }

  return `## Cloud Infrastructure Assistant

I can help you with a wide range of cloud infrastructure topics. Here are some things you can ask me about:

### Infrastructure
- VPC/networking setup and best practices
- Compute options (VMs, containers, serverless)
- Database selection and configuration
- Storage strategies and lifecycle management

### DevOps
- CI/CD pipeline design
- Infrastructure as Code (Terraform, CloudFormation, Pulumi)
- Container orchestration (Kubernetes, ECS)
- Monitoring and observability

### Security
- IAM best practices and least privilege
- Encryption at rest and in transit
- Network security (security groups, NACLs, firewalls)
- Compliance frameworks

### Cost Optimization
- Cost comparison across providers
- Reserved/committed use pricing
- Right-sizing recommendations
- Tagging strategies

### Try asking about:
- "How do I set up a production-ready VPC?"
- "Compare managed Kubernetes across cloud providers"
- "What are the best practices for serverless?"
- "Help me estimate costs for a 3-tier web app"

*Note: For full AI-powered responses, configure your OpenAI API key in \`.env.local\`.*`;
}
