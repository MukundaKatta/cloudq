"use client";

import { useState } from "react";
import Card, { CardBody, CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import TextArea from "@/components/ui/TextArea";
import { securityRules } from "@/data/cloud-services";
import { getSeverityColor } from "@/lib/utils";
import type { SecurityFinding } from "@/types";
import { Shield, AlertTriangle, CheckCircle2, Search, XCircle } from "lucide-react";
import ChatPanel from "@/components/chat/ChatPanel";

export default function SecurityScanner() {
  const [code, setCode] = useState("");
  const [findings, setFindings] = useState<SecurityFinding[]>([]);
  const [scanned, setScanned] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleScan = () => {
    const results: SecurityFinding[] = [];
    const lines = code.split("\n");

    lines.forEach((line, lineNum) => {
      securityRules.forEach((rule) => {
        if (rule.pattern.test(line)) {
          const existingIdx = results.findIndex((r) => r.id === rule.id);
          if (existingIdx === -1) {
            results.push({
              id: rule.id,
              severity: rule.severity,
              title: rule.title,
              description: rule.description,
              resource: line.trim().slice(0, 80),
              line: lineNum + 1,
              recommendation: rule.recommendation,
              reference: rule.reference,
            });
          }
        }
      });
    });

    setFindings(results);
    setScanned(true);
  };

  const getScore = (): number => {
    if (findings.length === 0) return 100;
    let score = 100;
    findings.forEach((f) => {
      switch (f.severity) {
        case "critical": score -= 25; break;
        case "high": score -= 15; break;
        case "medium": score -= 8; break;
        case "low": score -= 3; break;
      }
    });
    return Math.max(0, score);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    if (score >= 50) return "text-orange-400";
    return "text-red-400";
  };

  const severityCounts = {
    critical: findings.filter((f) => f.severity === "critical").length,
    high: findings.filter((f) => f.severity === "high").length,
    medium: findings.filter((f) => f.severity === "medium").length,
    low: findings.filter((f) => f.severity === "low").length,
  };

  const score = getScore();

  if (showChat) {
    return (
      <ChatPanel
        placeholder="Paste your IaC code for a comprehensive AI security review..."
        welcomeMessage="Paste your Terraform, CloudFormation, or Kubernetes YAML and I'll provide a detailed security analysis with recommendations."
        apiEndpoint="/api/security-scan"
      />
    );
  }

  const sampleCode = `resource "aws_s3_bucket" "data" {
  bucket = "my-data-bucket"
  acl    = "public-read"
}

resource "aws_s3_bucket_versioning" "data" {
  bucket = aws_s3_bucket.data.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_security_group" "web" {
  name = "web-sg"

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "main" {
  engine         = "postgres"
  instance_class = "db.t3.medium"
  password       = "supersecretpassword123"
  multi_az       = false
  backup_retention_period = 0
  deletion_protection     = false
  storage_encrypted       = false
}`;

  return (
    <div className="flex flex-col h-full overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-cloud-400" />
                <h3 className="font-semibold text-white">IaC Security Scanner</h3>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setShowChat(true)}>
                  AI Deep Scan
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setCode(sampleCode)}>
                  Load Sample
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <TextArea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your Terraform, CloudFormation, or Pulumi code here..."
              rows={12}
              className="mb-4"
            />
            <div className="flex gap-3">
              <Button onClick={handleScan} disabled={!code.trim()}>
                <Search size={16} />
                Scan Code
              </Button>
              <Button variant="ghost" onClick={() => { setCode(""); setFindings([]); setScanned(false); }}>
                Clear
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Results */}
        {scanned && (
          <>
            {/* Score Card */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card className="md:col-span-2">
                <CardBody className="text-center">
                  <div className={`text-5xl font-bold ${getScoreColor(score)} mb-2`}>{score}</div>
                  <div className="text-sm text-gray-400 mb-3">Security Score</div>
                  <div className="flex justify-center">
                    {score >= 90 ? (
                      <Badge variant="success" size="md">Secure</Badge>
                    ) : score >= 70 ? (
                      <Badge variant="warning" size="md">Needs Attention</Badge>
                    ) : (
                      <Badge variant="danger" size="md">Critical Issues</Badge>
                    )}
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="text-center">
                  <div className="text-3xl font-bold text-red-400">{severityCounts.critical}</div>
                  <div className="text-xs text-gray-400">Critical</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="text-center">
                  <div className="text-3xl font-bold text-orange-400">{severityCounts.high}</div>
                  <div className="text-xs text-gray-400">High</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">{severityCounts.medium}</div>
                  <div className="text-xs text-gray-400">Medium</div>
                </CardBody>
              </Card>
            </div>

            {/* Findings */}
            {findings.length === 0 ? (
              <Card>
                <CardBody className="text-center py-8">
                  <CheckCircle2 size={40} className="mx-auto text-green-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-1">No Issues Found</h3>
                  <p className="text-sm text-gray-400">Your code passed all security checks. Consider using the AI Deep Scan for more comprehensive analysis.</p>
                </CardBody>
              </Card>
            ) : (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-400">
                  {findings.length} Finding{findings.length !== 1 ? "s" : ""}
                </h3>
                {findings
                  .sort((a, b) => {
                    const order = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
                    return order[a.severity] - order[b.severity];
                  })
                  .map((finding) => (
                    <Card key={finding.id}>
                      <CardBody>
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {finding.severity === "critical" || finding.severity === "high" ? (
                              <XCircle size={18} className={finding.severity === "critical" ? "text-red-400" : "text-orange-400"} />
                            ) : (
                              <AlertTriangle size={18} className="text-yellow-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-white text-sm">{finding.title}</h4>
                              <Badge className={getSeverityColor(finding.severity)} size="sm">
                                {finding.severity.toUpperCase()}
                              </Badge>
                              <span className="text-[10px] text-gray-500 font-mono">{finding.id}</span>
                              {finding.line && (
                                <span className="text-[10px] text-gray-500">Line {finding.line}</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 mb-2">{finding.description}</p>
                            <div className="bg-gray-800/50 rounded p-2 mb-2">
                              <code className="text-xs text-gray-300 font-mono">{finding.resource}</code>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-[10px] text-green-400 font-medium uppercase mt-0.5">Fix:</span>
                              <p className="text-xs text-green-300/80">{finding.recommendation}</p>
                            </div>
                            {finding.reference && (
                              <p className="text-[10px] text-gray-500 mt-1">Ref: {finding.reference}</p>
                            )}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
