"use client";

import { useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import LoadingDots from "@/components/ui/LoadingDots";
import { generateId } from "@/lib/utils";
import type { ChatMessage } from "@/types";

interface ChatPanelProps {
  systemPrompt?: string;
  placeholder?: string;
  welcomeMessage?: string;
  apiEndpoint?: string;
}

export default function ChatPanel({
  placeholder,
  welcomeMessage = "Hello! I'm CloudQ, your AI cloud infrastructure assistant. Ask me anything about AWS, GCP, Azure, DevOps, or infrastructure management.",
  apiEndpoint = "/api/chat",
}: ChatPanelProps) {
  const { activeConversation, addMessage, updateLastAssistantMessage, isLoading, setIsLoading, activeTool, selectedProvider, createConversation } = useAppStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = activeConversation?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (content: string) => {
    if (!activeConversation) {
      createConversation(activeTool);
    }

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
      metadata: { provider: selectedProvider, tool: activeTool },
    };
    addMessage(userMessage);

    const assistantMessage: ChatMessage = {
      id: generateId(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };
    addMessage(assistantMessage);

    setIsLoading(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          tool: activeTool,
          provider: selectedProvider,
          history: messages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          updateLastAssistantMessage(accumulated);
        }
      } else {
        const data = await response.json();
        updateLastAssistantMessage(data.content || data.message || "I encountered an error processing your request.");
      }
    } catch (error) {
      console.error("Chat error:", error);
      updateLastAssistantMessage(
        "I apologize, but I encountered an error. Please check that your API key is configured in `.env.local` and try again.\n\nFor now, I can still help you with local features like the Security Scanner, Cost Estimator, and Service Comparison tools which work offline."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-lg animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cloud-500 to-cloud-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cloud-500/20">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Welcome to CloudQ</h3>
              <p className="text-gray-400 text-sm mb-6">{welcomeMessage}</p>
              <div className="grid grid-cols-2 gap-2">
                {getSuggestions(activeTool).map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(suggestion)}
                    className="text-left text-xs text-gray-400 bg-gray-800/50 border border-gray-700/50 rounded-lg p-3 hover:border-cloud-500/30 hover:text-gray-200 transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && messages[messages.length - 1]?.content === "" && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cloud-500 to-cloud-700 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
              </svg>
            </div>
            <div className="bg-gray-800 border border-gray-700/50 rounded-xl rounded-bl-sm px-4 py-3">
              <LoadingDots />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSend} placeholder={placeholder} disabled={isLoading} />
    </div>
  );
}

function getSuggestions(tool: string): string[] {
  const suggestions: Record<string, string[]> = {
    chat: [
      "Explain the difference between ECS and EKS",
      "How do I set up a VPN between AWS and GCP?",
      "What's the best way to handle secrets in Kubernetes?",
      "Compare serverless options across cloud providers",
    ],
    "iac-generator": [
      "Create a VPC with public and private subnets",
      "Set up an EKS cluster with managed node groups",
      "Deploy a serverless API with Lambda and API Gateway",
      "Create an S3 bucket with encryption and versioning",
    ],
    architecture: [
      "Design a microservices architecture on AWS",
      "Create a multi-region disaster recovery setup",
      "Design a data pipeline with Kafka and Spark",
      "Architecture for a real-time analytics platform",
    ],
    "cost-estimator": [
      "Estimate costs for a 3-tier web app on AWS",
      "Compare Kubernetes cluster costs across providers",
      "What would a data warehouse cost on each cloud?",
      "Estimate serverless API costs for 1M requests/day",
    ],
    "security-scanner": [
      "Scan my Terraform code for security issues",
      "Check my CloudFormation template for vulnerabilities",
      "Review my Kubernetes manifests for security",
      "Audit my IAM policies for over-permission",
    ],
    migration: [
      "Migrate from AWS to GCP for a web application",
      "Plan an on-premises to cloud migration",
      "Migrate databases from Azure to AWS",
      "Move a monolith to microservices on Kubernetes",
    ],
    "cli-helper": [
      "How do I list all running EC2 instances?",
      "Show me gcloud commands for GKE management",
      "Azure CLI commands for VM management",
      "How to configure kubectl for cloud Kubernetes?",
    ],
    "best-practices": [
      "Review my AWS architecture for best practices",
      "Check my setup against Well-Architected Framework",
      "Security best practices for a production Kubernetes cluster",
      "Cost optimization review for my cloud infrastructure",
    ],
    "incident-response": [
      "My application is returning 502 errors",
      "Database connections are being exhausted",
      "High CPU usage on production servers",
      "SSL certificate expired in production",
    ],
    runbooks: [
      "Create a runbook for database failover",
      "Runbook for deploying to production",
      "Incident response runbook for outages",
      "Runbook for scaling up during peak traffic",
    ],
    "service-compare": [
      "Compare compute services across providers",
      "Compare managed database options",
      "Compare serverless platforms",
      "Compare AI/ML services across clouds",
    ],
  };
  return suggestions[tool] || suggestions.chat;
}
