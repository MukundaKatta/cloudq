"use client";

import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { ToolCategory } from "@/types";
import {
  MessageSquare,
  Code2,
  LayoutDashboard,
  DollarSign,
  Shield,
  ArrowRightLeft,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  GitCompare,
  ChevronLeft,
  Plus,
  Trash2,
  Cloud,
} from "lucide-react";

const tools: { id: ToolCategory; label: string; icon: React.ReactNode; description: string }[] = [
  { id: "chat", label: "Cloud Chat", icon: <MessageSquare size={18} />, description: "Ask anything about cloud" },
  { id: "iac-generator", label: "IaC Generator", icon: <Code2 size={18} />, description: "Terraform, CFN, Pulumi" },
  { id: "architecture", label: "Architecture", icon: <LayoutDashboard size={18} />, description: "Diagram generator" },
  { id: "cost-estimator", label: "Cost Estimator", icon: <DollarSign size={18} />, description: "Compare cloud costs" },
  { id: "security-scanner", label: "Security Scanner", icon: <Shield size={18} />, description: "Scan IaC for issues" },
  { id: "migration", label: "Migration", icon: <ArrowRightLeft size={18} />, description: "Cloud migration plans" },
  { id: "cli-helper", label: "CLI Helper", icon: <Terminal size={18} />, description: "AWS/GCP/Azure CLI" },
  { id: "best-practices", label: "Best Practices", icon: <CheckCircle2 size={18} />, description: "Well-Architected" },
  { id: "incident-response", label: "Incident Response", icon: <AlertTriangle size={18} />, description: "Diagnose & resolve" },
  { id: "runbooks", label: "Runbooks", icon: <BookOpen size={18} />, description: "Auto-generate runbooks" },
  { id: "service-compare", label: "Service Compare", icon: <GitCompare size={18} />, description: "Compare across clouds" },
];

export default function Sidebar() {
  const {
    sidebarOpen,
    setSidebarOpen,
    activeTool,
    setActiveTool,
    conversations,
    activeConversation,
    setActiveConversation,
    createConversation,
    deleteConversation,
  } = useAppStore();

  const filteredConversations = conversations.filter((c) => c.category === activeTool);

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-gray-900 border-r border-gray-700/50 transition-all duration-300",
        sidebarOpen ? "w-72" : "w-16"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700/50">
        <div className={cn("flex items-center gap-2", !sidebarOpen && "hidden")}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cloud-500 to-cloud-700 flex items-center justify-center">
            <Cloud size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">CloudQ</h1>
            <p className="text-[10px] text-gray-500">AI Cloud Assistant</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft size={16} className={cn("transition-transform", !sidebarOpen && "rotate-180")} />
        </button>
      </div>

      {/* Tools */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <div className={cn("text-[10px] uppercase tracking-wider text-gray-500 px-2 py-1", !sidebarOpen && "hidden")}>
          Tools
        </div>
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => {
              setActiveTool(tool.id);
              setActiveConversation(null);
            }}
            title={tool.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
              activeTool === tool.id
                ? "bg-cloud-600/20 text-cloud-400 border border-cloud-500/20"
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
            )}
          >
            <span className="flex-shrink-0">{tool.icon}</span>
            {sidebarOpen && (
              <div className="text-left min-w-0">
                <div className="truncate">{tool.label}</div>
                <div className="text-[10px] text-gray-500 truncate">{tool.description}</div>
              </div>
            )}
          </button>
        ))}

        {/* Conversations */}
        {sidebarOpen && filteredConversations.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <div className="text-[10px] uppercase tracking-wider text-gray-500 px-2 py-1 flex items-center justify-between">
              <span>History</span>
              <button
                onClick={() => createConversation(activeTool)}
                className="p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-white"
              >
                <Plus size={12} />
              </button>
            </div>
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className={cn(
                  "group flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-all",
                  activeConversation?.id === conv.id
                    ? "bg-gray-700/50 text-white"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                )}
                onClick={() => setActiveConversation(conv)}
              >
                <MessageSquare size={14} className="flex-shrink-0" />
                <span className="truncate flex-1">{conv.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conv.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-600 text-gray-400 hover:text-red-400 transition-all"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {sidebarOpen && (
        <div className="p-3 border-t border-gray-700/50">
          <div className="text-[10px] text-gray-600 text-center">
            CloudQ v1.0 -- AWS | GCP | Azure
          </div>
        </div>
      )}
    </aside>
  );
}
