"use client";

import { useState } from "react";
import Card, { CardBody, CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { wellArchitectedPractices } from "@/data/cloud-services";
import type { WellArchitectedPillar } from "@/types";
import { CheckCircle2, Circle, ChevronDown, ChevronRight } from "lucide-react";
import ChatPanel from "@/components/chat/ChatPanel";
import Button from "@/components/ui/Button";

const pillarInfo: Record<string, { label: string; color: string; icon: string }> = {
  "operational-excellence": { label: "Operational Excellence", color: "text-purple-400", icon: "gear" },
  security: { label: "Security", color: "text-red-400", icon: "shield" },
  reliability: { label: "Reliability", color: "text-blue-400", icon: "refresh" },
  performance: { label: "Performance Efficiency", color: "text-green-400", icon: "zap" },
  "cost-optimization": { label: "Cost Optimization", color: "text-yellow-400", icon: "dollar" },
  sustainability: { label: "Sustainability", color: "text-emerald-400", icon: "leaf" },
};

export default function BestPractices() {
  const [selectedPillar, setSelectedPillar] = useState<WellArchitectedPillar>("operational-excellence");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [showChat, setShowChat] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const practices = wellArchitectedPractices[selectedPillar] || [];
  const totalChecks = practices.reduce((acc, p) => acc + p.checks.length, 0);
  const completedChecks = practices.reduce(
    (acc, p) => acc + p.checks.filter((_, i) => checkedItems.has(`${p.title}-${i}`)).length,
    0
  );
  const progress = totalChecks > 0 ? Math.round((completedChecks / totalChecks) * 100) : 0;

  if (showChat) {
    return (
      <ChatPanel
        placeholder="Describe your infrastructure for a best practices review..."
        welcomeMessage="Describe your infrastructure setup and I'll evaluate it against the AWS Well-Architected Framework's six pillars."
        apiEndpoint="/api/best-practices"
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
                <CheckCircle2 size={18} className="text-cloud-400" />
                <h3 className="font-semibold text-white">Well-Architected Framework Review</h3>
              </div>
              <Button size="sm" variant="outline" onClick={() => setShowChat(true)}>
                AI Review
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {Object.entries(pillarInfo).map(([id, info]) => (
                <button
                  key={id}
                  onClick={() => setSelectedPillar(id as WellArchitectedPillar)}
                  className={`p-3 rounded-lg text-center transition-all border ${
                    selectedPillar === id
                      ? "bg-gray-800 border-cloud-500/30"
                      : "bg-gray-800/30 border-gray-700/30 hover:border-gray-600"
                  }`}
                >
                  <div className={`text-xs font-medium ${info.color}`}>{info.label}</div>
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Progress */}
        <Card>
          <CardBody>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">
                {pillarInfo[selectedPillar]?.label} Progress
              </span>
              <span className="text-sm font-medium text-white">{progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-cloud-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {completedChecks} of {totalChecks} checks completed
            </div>
          </CardBody>
        </Card>

        {/* Practice Items */}
        <div className="space-y-3">
          {practices.map((practice, pIdx) => {
            const practiceId = `${selectedPillar}-${pIdx}`;
            const isExpanded = expandedItems.has(practiceId);
            const practiceCheckedCount = practice.checks.filter((_, i) =>
              checkedItems.has(`${practice.title}-${i}`)
            ).length;

            return (
              <Card key={pIdx}>
                <div
                  className="px-5 py-4 cursor-pointer"
                  onClick={() => toggleExpand(practiceId)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isExpanded ? (
                        <ChevronDown size={16} className="text-gray-400" />
                      ) : (
                        <ChevronRight size={16} className="text-gray-400" />
                      )}
                      <div>
                        <h4 className="font-medium text-white text-sm">{practice.title}</h4>
                        <p className="text-xs text-gray-500">{practice.description}</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        practiceCheckedCount === practice.checks.length
                          ? "success"
                          : practiceCheckedCount > 0
                          ? "warning"
                          : "default"
                      }
                      size="sm"
                    >
                      {practiceCheckedCount}/{practice.checks.length}
                    </Badge>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-4 pt-0 border-t border-gray-700/50 mt-0 pt-3">
                    <div className="space-y-2 ml-7">
                      {practice.checks.map((check, cIdx) => {
                        const checkId = `${practice.title}-${cIdx}`;
                        const isChecked = checkedItems.has(checkId);
                        return (
                          <label
                            key={cIdx}
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCheck(checkId);
                            }}
                          >
                            {isChecked ? (
                              <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
                            ) : (
                              <Circle size={16} className="text-gray-600 group-hover:text-gray-400 flex-shrink-0" />
                            )}
                            <span
                              className={`text-sm ${
                                isChecked ? "text-gray-500 line-through" : "text-gray-300"
                              }`}
                            >
                              {check}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
