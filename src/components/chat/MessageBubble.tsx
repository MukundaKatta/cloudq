"use client";

import { cn } from "@/lib/utils";
import { extractCodeBlocks } from "@/lib/utils";
import CodeBlock from "@/components/ui/CodeBlock";
import { Cloud, User } from "lucide-react";
import type { ChatMessage } from "@/types";

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const codeBlocks = extractCodeBlocks(message.content);

  const renderContent = (content: string) => {
    if (codeBlocks.length === 0) {
      return <div className="whitespace-pre-wrap">{content}</div>;
    }

    const parts: React.ReactNode[] = [];
    let remaining = content;
    let idx = 0;

    for (const block of codeBlocks) {
      const marker = "```" + (block.language || "") + "\n" + block.code + "\n```";
      const pos = remaining.indexOf(marker);
      if (pos > 0) {
        const textBefore = remaining.slice(0, pos).trim();
        if (textBefore) {
          parts.push(
            <div key={`text-${idx}`} className="whitespace-pre-wrap mb-3">
              {renderMarkdownLite(textBefore)}
            </div>
          );
        }
      }
      parts.push(
        <CodeBlock
          key={`code-${idx}`}
          code={block.code}
          language={block.language}
          className="my-3"
        />
      );
      remaining = pos >= 0 ? remaining.slice(pos + marker.length) : remaining;
      idx++;
    }

    const trailing = remaining.trim();
    if (trailing) {
      parts.push(
        <div key="trailing" className="whitespace-pre-wrap mt-3">
          {renderMarkdownLite(trailing)}
        </div>
      );
    }

    return <>{parts}</>;
  };

  return (
    <div className={cn("flex gap-3 animate-fade-in", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-cloud-500 to-cloud-700 flex items-center justify-center">
          <Cloud size={16} className="text-white" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-xl px-4 py-3 text-sm",
          isUser
            ? "bg-cloud-600 text-white rounded-br-sm"
            : "bg-gray-800 text-gray-200 border border-gray-700/50 rounded-bl-sm"
        )}
      >
        {renderContent(message.content)}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center">
          <User size={16} className="text-gray-300" />
        </div>
      )}
    </div>
  );
}

function renderMarkdownLite(text: string): React.ReactNode {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("### ")) {
      return <h3 key={i} className="text-base font-bold text-white mt-3 mb-1">{line.slice(4)}</h3>;
    }
    if (line.startsWith("## ")) {
      return <h2 key={i} className="text-lg font-bold text-white mt-4 mb-1">{line.slice(3)}</h2>;
    }
    if (line.startsWith("# ")) {
      return <h1 key={i} className="text-xl font-bold text-white mt-4 mb-2">{line.slice(2)}</h1>;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      return (
        <div key={i} className="flex gap-2 ml-2">
          <span className="text-cloud-400">-</span>
          <span>{renderInline(line.slice(2))}</span>
        </div>
      );
    }
    if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+)\.\s(.*)$/);
      if (match) {
        return (
          <div key={i} className="flex gap-2 ml-2">
            <span className="text-cloud-400 font-mono text-xs mt-0.5">{match[1]}.</span>
            <span>{renderInline(match[2])}</span>
          </div>
        );
      }
    }
    if (line.trim() === "") {
      return <div key={i} className="h-2" />;
    }
    return <div key={i}>{renderInline(line)}</div>;
  });
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-gray-700 text-cloud-300 text-xs font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bp, j) => {
      if (bp.startsWith("**") && bp.endsWith("**")) {
        return <strong key={`${i}-${j}`} className="font-semibold text-white">{bp.slice(2, -2)}</strong>;
      }
      return <span key={`${i}-${j}`}>{bp}</span>;
    });
  });
}
