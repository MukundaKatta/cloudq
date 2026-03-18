"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import Card, { CardBody, CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import CodeBlock from "@/components/ui/CodeBlock";
import Button from "@/components/ui/Button";
import { cliCommands } from "@/data/cloud-services";
import { Terminal, Copy } from "lucide-react";
import ChatPanel from "@/components/chat/ChatPanel";

export default function CLIHelper() {
  const { selectedProvider } = useAppStore();
  const [selectedCommand, setSelectedCommand] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);

  const commands = cliCommands[selectedProvider] || [];
  const toolName = { aws: "AWS CLI", gcp: "Google Cloud SDK", azure: "Azure CLI" }[selectedProvider];

  if (showChat) {
    return (
      <ChatPanel
        placeholder={`Ask about ${toolName} commands...`}
        welcomeMessage={`Ask me about any ${toolName} command and I'll explain the usage, flags, and provide examples.`}
        apiEndpoint="/api/cli-helper"
      />
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-cloud-400" />
                <h3 className="font-semibold text-white">{toolName} Command Reference</h3>
                <Badge variant={selectedProvider as "aws" | "gcp" | "azure"}>{selectedProvider.toUpperCase()}</Badge>
              </div>
              <Button size="sm" variant="outline" onClick={() => setShowChat(true)}>
                Ask AI
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Command List */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-400">Common Commands</h4>
            {commands.map((cmd, i) => (
              <Card
                key={i}
                hover
                onClick={() => setSelectedCommand(i)}
                className={selectedCommand === i ? "border-cloud-500/50" : ""}
              >
                <CardBody>
                  <div className="flex items-start justify-between mb-2">
                    <code className="text-sm text-cloud-300 font-mono">{cmd.command}</code>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(cmd.command);
                      }}
                      className="p-1 text-gray-500 hover:text-white transition-colors"
                    >
                      <Copy size={12} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">{cmd.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Command Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-400">
              {selectedCommand !== null ? "Examples" : "Select a command to see examples"}
            </h4>
            {selectedCommand !== null && commands[selectedCommand] && (
              <div className="space-y-3">
                {commands[selectedCommand].examples.map((example, i) => (
                  <CodeBlock
                    key={i}
                    code={example}
                    language="bash"
                    showLineNumbers={false}
                    filename={`example-${i + 1}.sh`}
                  />
                ))}
              </div>
            )}
            {selectedCommand === null && (
              <Card>
                <CardBody className="text-center py-12">
                  <Terminal size={40} className="mx-auto text-gray-600 mb-3" />
                  <p className="text-gray-500 text-sm">Click a command to see usage examples</p>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
