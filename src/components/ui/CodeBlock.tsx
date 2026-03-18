"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export default function CodeBlock({
  code,
  language = "text",
  filename,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  const langColors: Record<string, string> = {
    terraform: "text-purple-400",
    hcl: "text-purple-400",
    yaml: "text-green-400",
    json: "text-yellow-400",
    typescript: "text-blue-400",
    javascript: "text-yellow-300",
    python: "text-blue-300",
    bash: "text-green-300",
    sh: "text-green-300",
    sql: "text-orange-300",
    mermaid: "text-pink-400",
  };

  return (
    <div className={cn("rounded-lg overflow-hidden border border-gray-700/50 bg-terminal-bg", className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/80 border-b border-gray-700/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          {filename && (
            <span className="text-xs text-gray-400 ml-2 font-mono">{filename}</span>
          )}
          <span className={cn("text-xs font-mono", langColors[language] || "text-gray-500")}>
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-gray-700"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                {showLineNumbers && (
                  <span className="inline-block w-8 text-right mr-4 text-gray-600 select-none text-xs leading-6">
                    {i + 1}
                  </span>
                )}
                <span className="text-terminal-text leading-6">{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
