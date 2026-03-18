"use client";

import { useState } from "react";
import Card, { CardBody, CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { incidentPlaybooks } from "@/data/cloud-services";
import { getSeverityColor } from "@/lib/utils";
import { AlertTriangle, ChevronDown, ChevronRight, Stethoscope, Wrench, ShieldCheck } from "lucide-react";
import ChatPanel from "@/components/chat/ChatPanel";
import Button from "@/components/ui/Button";

export default function IncidentResponse() {
  const [selectedIncident, setSelectedIncident] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["symptoms", "diagnosis", "resolution", "prevention"]));
  const [showChat, setShowChat] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  if (showChat) {
    return (
      <ChatPanel
        placeholder="Describe the incident you're experiencing..."
        welcomeMessage="Describe the incident or symptoms you're seeing and I'll help you diagnose the issue, find the root cause, and guide you through resolution."
        apiEndpoint="/api/incident-response"
      />
    );
  }

  const incident = selectedIncident !== null ? incidentPlaybooks[selectedIncident] : null;

  return (
    <div className="flex flex-col h-full overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-cloud-400" />
                <h3 className="font-semibold text-white">Incident Response Assistant</h3>
              </div>
              <Button size="sm" variant="outline" onClick={() => setShowChat(true)}>
                AI Diagnosis
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Incident Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {incidentPlaybooks.map((playbook, i) => (
            <Card
              key={i}
              hover
              onClick={() => setSelectedIncident(i)}
              className={selectedIncident === i ? "border-cloud-500/50" : ""}
            >
              <CardBody>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white text-sm">{playbook.title}</h4>
                  <Badge className={getSeverityColor(playbook.severity)} size="sm">
                    {playbook.severity}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">
                  {playbook.symptoms[0]}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Incident Detail */}
        {incident && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{incident.title}</h3>
                  <Badge className={getSeverityColor(incident.severity)} size="md">
                    {incident.severity}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Symptoms */}
            <Card>
              <div
                className="px-5 py-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection("symptoms")}
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-yellow-400" />
                  <h4 className="font-medium text-white text-sm">Symptoms</h4>
                </div>
                {expandedSections.has("symptoms") ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
              </div>
              {expandedSections.has("symptoms") && (
                <CardBody className="pt-0">
                  <ul className="space-y-2">
                    {incident.symptoms.map((s, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">-</span> {s}
                      </li>
                    ))}
                  </ul>
                </CardBody>
              )}
            </Card>

            {/* Diagnosis */}
            <Card>
              <div
                className="px-5 py-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection("diagnosis")}
              >
                <div className="flex items-center gap-2">
                  <Stethoscope size={16} className="text-blue-400" />
                  <h4 className="font-medium text-white text-sm">Diagnosis Steps</h4>
                </div>
                {expandedSections.has("diagnosis") ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
              </div>
              {expandedSections.has("diagnosis") && (
                <CardBody className="pt-0">
                  <ol className="space-y-2">
                    {incident.diagnosis.map((d, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-blue-400 font-mono text-xs mt-0.5 min-w-[20px]">{i + 1}.</span>
                        {d}
                      </li>
                    ))}
                  </ol>
                </CardBody>
              )}
            </Card>

            {/* Resolution */}
            <Card>
              <div
                className="px-5 py-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection("resolution")}
              >
                <div className="flex items-center gap-2">
                  <Wrench size={16} className="text-green-400" />
                  <h4 className="font-medium text-white text-sm">Resolution</h4>
                </div>
                {expandedSections.has("resolution") ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
              </div>
              {expandedSections.has("resolution") && (
                <CardBody className="pt-0">
                  <ol className="space-y-2">
                    {incident.resolution.map((r, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-green-400 font-mono text-xs mt-0.5 min-w-[20px]">{i + 1}.</span>
                        {r}
                      </li>
                    ))}
                  </ol>
                </CardBody>
              )}
            </Card>

            {/* Prevention */}
            <Card>
              <div
                className="px-5 py-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection("prevention")}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-purple-400" />
                  <h4 className="font-medium text-white text-sm">Prevention</h4>
                </div>
                {expandedSections.has("prevention") ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
              </div>
              {expandedSections.has("prevention") && (
                <CardBody className="pt-0">
                  <ul className="space-y-2">
                    {incident.prevention.map((p, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-purple-400 mt-1">-</span> {p}
                      </li>
                    ))}
                  </ul>
                </CardBody>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
