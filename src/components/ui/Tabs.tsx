"use client";

import { cn } from "@/lib/utils";
import { useState, type ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  children: (activeTab: string) => ReactNode;
  className?: string;
}

export default function Tabs({ tabs, defaultTab, onChange, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex border-b border-gray-700/50 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
              "border-b-2 -mb-[1px]",
              activeTab === tab.id
                ? "border-cloud-500 text-cloud-400"
                : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500"
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.badge && (
              <span className="text-xs bg-cloud-600/20 text-cloud-400 px-1.5 py-0.5 rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="flex-1 pt-4">{children(activeTab)}</div>
    </div>
  );
}
