"use client";

import ChatPanel from "@/components/chat/ChatPanel";

export default function MigrationAssistant() {
  return (
    <ChatPanel
      placeholder="Describe your migration scenario (e.g., AWS to GCP, on-prem to cloud)..."
      welcomeMessage="I help plan cloud migrations. Describe your current setup, target environment, and the services you need to migrate. I'll create a comprehensive migration plan with service mapping, steps, timeline, and risk assessment."
      apiEndpoint="/api/migration"
    />
  );
}
