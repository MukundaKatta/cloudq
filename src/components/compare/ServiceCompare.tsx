"use client";

import { useState } from "react";
import Card, { CardBody, CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { serviceComparisons } from "@/data/cloud-services";
import { GitCompare } from "lucide-react";
import ChatPanel from "@/components/chat/ChatPanel";
import Button from "@/components/ui/Button";

export default function ServiceCompare() {
  const [selectedCategory, setSelectedCategory] = useState<string>(Object.keys(serviceComparisons)[0]);
  const [showChat, setShowChat] = useState(false);

  const categories = Object.keys(serviceComparisons);

  if (showChat) {
    return (
      <ChatPanel
        placeholder="Ask to compare specific cloud services..."
        welcomeMessage="Ask me to compare any cloud services across AWS, GCP, and Azure. I'll provide detailed feature, pricing, and use-case comparisons."
        apiEndpoint="/api/service-compare"
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
                <GitCompare size={18} className="text-cloud-400" />
                <h3 className="font-semibold text-white">Cloud Service Comparison</h3>
              </div>
              <Button size="sm" variant="outline" onClick={() => setShowChat(true)}>
                AI Deep Compare
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    selectedCategory === cat
                      ? "bg-cloud-600/20 text-cloud-400 border border-cloud-500/30"
                      : "bg-gray-800 text-gray-400 hover:text-gray-200 border border-gray-700/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Comparison Table */}
        <div className="space-y-4">
          {serviceComparisons[selectedCategory]?.map((entry, i) => (
            <Card key={i}>
              <CardHeader>
                <p className="text-sm text-gray-400">{entry.description}</p>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="space-y-1">
                    <Badge variant="aws" size="md">AWS</Badge>
                    <div className="text-white font-medium text-sm mt-2">{entry.aws}</div>
                  </div>
                  <div className="space-y-1">
                    <Badge variant="gcp" size="md">GCP</Badge>
                    <div className="text-white font-medium text-sm mt-2">{entry.gcp}</div>
                  </div>
                  <div className="space-y-1">
                    <Badge variant="azure" size="md">Azure</Badge>
                    <div className="text-white font-medium text-sm mt-2">{entry.azure}</div>
                  </div>
                </div>

                <div className="border-t border-gray-700/50 pt-3">
                  <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Key Differences</h4>
                  <ul className="space-y-1">
                    {entry.keyDifferences.map((diff, j) => (
                      <li key={j} className="text-xs text-gray-400 flex items-start gap-2">
                        <span className="text-cloud-400 mt-0.5">-</span>
                        {diff}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
