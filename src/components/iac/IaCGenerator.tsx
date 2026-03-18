"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import CodeBlock from "@/components/ui/CodeBlock";
import Card, { CardBody, CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { iacTemplates } from "@/data/cloud-services";
import type { IaCTool, CloudProvider } from "@/types";
import { Code2, Download, Wand2 } from "lucide-react";
import ChatPanel from "@/components/chat/ChatPanel";

const resourceTemplates = [
  { value: "vpc", label: "VPC / Network" },
  { value: "ec2", label: "Compute Instance" },
  { value: "s3", label: "Object Storage" },
  { value: "rds", label: "Managed Database" },
  { value: "eks", label: "Kubernetes Cluster" },
  { value: "custom", label: "Custom (describe below)" },
];

export default function IaCGenerator() {
  const { selectedProvider } = useAppStore();
  const [iacTool, setIacTool] = useState<IaCTool>("terraform");
  const [selectedResource, setSelectedResource] = useState("vpc");
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  const handleGenerate = () => {
    const templates = iacTemplates[iacTool];
    if (templates && templates[selectedResource]) {
      setGeneratedCode(templates[selectedResource]);
    } else {
      setShowChat(true);
    }
  };

  const handleDownload = () => {
    if (!generatedCode) return;
    const extensions: Record<string, string> = {
      terraform: ".tf",
      cloudformation: ".yaml",
      pulumi: ".ts",
    };
    const blob = new Blob([generatedCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `main${extensions[iacTool]}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const langMap: Record<string, string> = {
    terraform: "hcl",
    cloudformation: "yaml",
    pulumi: "typescript",
  };

  if (showChat) {
    return (
      <ChatPanel
        placeholder="Describe the infrastructure you need..."
        welcomeMessage="Describe your infrastructure requirements and I'll generate the IaC code for you."
        apiEndpoint="/api/iac-generate"
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Configuration */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code2 size={18} className="text-cloud-400" />
                <h3 className="font-semibold text-white">Generate Infrastructure as Code</h3>
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Select
                  label="IaC Tool"
                  value={iacTool}
                  onChange={(e) => setIacTool(e.target.value as IaCTool)}
                  options={[
                    { value: "terraform", label: "Terraform (HCL)" },
                    { value: "cloudformation", label: "CloudFormation (YAML)" },
                    { value: "pulumi", label: "Pulumi (TypeScript)" },
                  ]}
                />
                <Select
                  label="Cloud Provider"
                  value={selectedProvider}
                  options={[
                    { value: "aws", label: "Amazon Web Services" },
                    { value: "gcp", label: "Google Cloud Platform" },
                    { value: "azure", label: "Microsoft Azure" },
                  ]}
                  disabled
                />
                <Select
                  label="Resource Type"
                  value={selectedResource}
                  onChange={(e) => setSelectedResource(e.target.value)}
                  options={resourceTemplates}
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleGenerate} className="flex items-center gap-2">
                  <Wand2 size={16} />
                  Generate Template
                </Button>
                <Button variant="outline" onClick={() => setShowChat(true)}>
                  Custom Generation with AI
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Template Gallery */}
          {!generatedCode && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {resourceTemplates.filter(r => r.value !== "custom").map((resource) => {
                  const hasTemplate = iacTemplates[iacTool]?.[resource.value];
                  return (
                    <Card
                      key={resource.value}
                      hover
                      onClick={() => {
                        if (hasTemplate) {
                          setSelectedResource(resource.value);
                          setGeneratedCode(iacTemplates[iacTool][resource.value]);
                        }
                      }}
                      className={!hasTemplate ? "opacity-50" : ""}
                    >
                      <CardBody>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white text-sm">{resource.label}</h4>
                          <Badge variant={hasTemplate ? "success" : "default"} size="sm">
                            {hasTemplate ? "Available" : "AI Only"}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">
                          {iacTool === "terraform" ? "HCL" : iacTool === "cloudformation" ? "YAML" : "TypeScript"} template
                          for {selectedProvider.toUpperCase()}
                        </p>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Generated Code */}
          {generatedCode && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">Generated Code</h3>
                  <Badge variant={selectedProvider as "aws" | "gcp" | "azure"}>
                    {selectedProvider.toUpperCase()}
                  </Badge>
                  <Badge>{iacTool}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleDownload}>
                    <Download size={14} />
                    Download
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setGeneratedCode(null)}>
                    Clear
                  </Button>
                </div>
              </div>
              <CodeBlock
                code={generatedCode}
                language={langMap[iacTool]}
                filename={`main${iacTool === "terraform" ? ".tf" : iacTool === "cloudformation" ? ".yaml" : ".ts"}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
