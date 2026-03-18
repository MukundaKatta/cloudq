"use client";

import { useState, useEffect, useRef } from "react";
import Card, { CardBody, CardHeader } from "@/components/ui/Card";
import CodeBlock from "@/components/ui/CodeBlock";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { LayoutDashboard, Copy, RefreshCw } from "lucide-react";
import ChatPanel from "@/components/chat/ChatPanel";

const sampleDiagrams = [
  {
    title: "3-Tier Web Application",
    description: "Classic web application architecture with load balancer, app servers, and database",
    code: `graph TD
    subgraph "Internet"
        U[Users/Clients]
    end

    subgraph "CDN Layer"
        CF[CloudFront/CDN]
    end

    subgraph "Load Balancing"
        ALB[Application Load Balancer]
    end

    subgraph "Application Tier"
        APP1[App Server 1]
        APP2[App Server 2]
        APP3[App Server 3]
    end

    subgraph "Caching Layer"
        REDIS[ElastiCache Redis]
    end

    subgraph "Database Tier"
        RDS_P[(Primary DB - RDS)]
        RDS_R[(Read Replica)]
    end

    subgraph "Storage"
        S3[S3 Bucket]
    end

    U --> CF
    CF --> ALB
    CF --> S3
    ALB --> APP1
    ALB --> APP2
    ALB --> APP3
    APP1 --> REDIS
    APP2 --> REDIS
    APP3 --> REDIS
    APP1 --> RDS_P
    APP2 --> RDS_P
    APP3 --> RDS_R
    RDS_P --> RDS_R
    APP1 --> S3
    APP2 --> S3
    APP3 --> S3`,
  },
  {
    title: "Microservices on Kubernetes",
    description: "Containerized microservices running on a managed Kubernetes cluster",
    code: `graph TD
    subgraph "External"
        CLIENT[Client Apps]
        DNS[Route 53 / Cloud DNS]
    end

    subgraph "Edge"
        APIGW[API Gateway]
        WAF[WAF]
    end

    subgraph "Kubernetes Cluster"
        ING[Ingress Controller]

        subgraph "Services"
            AUTH[Auth Service]
            USER[User Service]
            ORDER[Order Service]
            NOTIFY[Notification Service]
        end

        subgraph "Platform"
            MESH[Service Mesh - Istio]
            PROM[Prometheus]
            GRAF[Grafana]
        end
    end

    subgraph "Data Layer"
        PG[(PostgreSQL)]
        MONGO[(MongoDB)]
        KAFKA[Apache Kafka]
        REDIS[Redis Cache]
    end

    CLIENT --> DNS
    DNS --> WAF
    WAF --> APIGW
    APIGW --> ING
    ING --> AUTH
    ING --> USER
    ING --> ORDER
    AUTH --> PG
    USER --> PG
    ORDER --> MONGO
    ORDER --> KAFKA
    KAFKA --> NOTIFY
    AUTH --> REDIS
    MESH -.-> AUTH
    MESH -.-> USER
    MESH -.-> ORDER
    PROM -.-> AUTH
    PROM -.-> USER
    PROM -.-> ORDER`,
  },
  {
    title: "Data Pipeline Architecture",
    description: "Real-time and batch data processing pipeline",
    code: `graph LR
    subgraph "Data Sources"
        API[REST APIs]
        IOT[IoT Devices]
        DB[(App Database)]
        LOGS[Application Logs]
    end

    subgraph "Ingestion"
        KINESIS[Kinesis / Pub-Sub]
        CDC[CDC - Debezium]
        FLINK[Flink / Dataflow]
    end

    subgraph "Storage"
        S3[Data Lake - S3/GCS]
        DWH[(Data Warehouse)]
    end

    subgraph "Processing"
        SPARK[Spark / Dataproc]
        DBT[dbt Transform]
    end

    subgraph "Serving"
        BI[BI Dashboard]
        ML[ML Models]
        API_OUT[Data API]
    end

    API --> KINESIS
    IOT --> KINESIS
    DB --> CDC
    LOGS --> KINESIS
    KINESIS --> FLINK
    CDC --> S3
    FLINK --> S3
    S3 --> SPARK
    SPARK --> DWH
    DWH --> DBT
    DBT --> BI
    DBT --> ML
    DBT --> API_OUT`,
  },
  {
    title: "Multi-Region Disaster Recovery",
    description: "Active-passive multi-region setup for disaster recovery",
    code: `graph TD
    subgraph "Global"
        R53[Route 53 - Failover]
        GDB[(Global Database)]
    end

    subgraph "Primary Region - us-east-1"
        ALB1[ALB]
        ASG1[Auto Scaling Group]
        RDS1[(RDS Primary)]
        S3_1[S3 Primary]
    end

    subgraph "DR Region - us-west-2"
        ALB2[ALB - Standby]
        ASG2[ASG - Min Capacity]
        RDS2[(RDS Read Replica)]
        S3_2[S3 Replica]
    end

    R53 -->|Active| ALB1
    R53 -.->|Failover| ALB2
    ALB1 --> ASG1
    ALB2 --> ASG2
    ASG1 --> RDS1
    ASG2 --> RDS2
    RDS1 -->|Replication| GDB
    GDB -->|Replication| RDS2
    S3_1 -->|Cross-Region Replication| S3_2`,
  },
];

export default function ArchitectureDiagram() {
  const [selectedDiagram, setSelectedDiagram] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [rendered, setRendered] = useState<string>("");
  const renderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDiagram !== null) {
      renderMermaid(sampleDiagrams[selectedDiagram].code);
    }
  }, [selectedDiagram]);

  const renderMermaid = async (code: string) => {
    try {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          primaryColor: "#3478ff",
          primaryTextColor: "#c9d1d9",
          primaryBorderColor: "#58a6ff",
          lineColor: "#58a6ff",
          secondaryColor: "#1f2937",
          tertiaryColor: "#374151",
          mainBkg: "#1f2937",
          nodeBorder: "#58a6ff",
          clusterBkg: "#111827",
          clusterBorder: "#374151",
          titleColor: "#c9d1d9",
          edgeLabelBackground: "#1f2937",
        },
      });
      const { svg } = await mermaid.render("mermaid-diagram", code);
      setRendered(svg);
    } catch (err) {
      console.error("Mermaid render error:", err);
      setRendered(`<p class="text-red-400">Failed to render diagram. Check the Mermaid syntax.</p>`);
    }
  };

  if (showChat) {
    return (
      <ChatPanel
        placeholder="Describe the architecture you want to diagram..."
        welcomeMessage="Describe your system architecture and I'll generate a Mermaid diagram for you. Include details about services, data flow, and connections."
        apiEndpoint="/api/architecture"
      />
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        {/* Controls */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LayoutDashboard size={18} className="text-cloud-400" />
                <h3 className="font-semibold text-white">Architecture Diagram Generator</h3>
              </div>
              <Button variant="outline" onClick={() => setShowChat(true)}>
                Custom Diagram with AI
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Sample Diagrams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sampleDiagrams.map((diagram, i) => (
            <Card
              key={i}
              hover
              onClick={() => setSelectedDiagram(i)}
              className={selectedDiagram === i ? "border-cloud-500/50" : ""}
            >
              <CardBody>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-white text-sm">{diagram.title}</h4>
                  <Badge variant="info">Mermaid</Badge>
                </div>
                <p className="text-xs text-gray-500">{diagram.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Rendered Diagram */}
        {selectedDiagram !== null && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{sampleDiagrams[selectedDiagram].title}</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => renderMermaid(sampleDiagrams[selectedDiagram].code)}>
                      <RefreshCw size={14} />
                      Re-render
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigator.clipboard.writeText(sampleDiagrams[selectedDiagram].code)}
                    >
                      <Copy size={14} />
                      Copy Code
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div
                  ref={renderRef}
                  className="flex justify-center overflow-x-auto bg-gray-900/50 rounded-lg p-4 min-h-[300px]"
                  dangerouslySetInnerHTML={{ __html: rendered }}
                />
              </CardBody>
            </Card>
            <CodeBlock
              code={sampleDiagrams[selectedDiagram].code}
              language="mermaid"
              filename="architecture.mmd"
            />
          </div>
        )}
      </div>
    </div>
  );
}
