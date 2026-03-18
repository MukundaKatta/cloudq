"use client";

import ChatPanel from "@/components/chat/ChatPanel";

export default function RunbookGenerator() {
  return (
    <ChatPanel
      placeholder="Describe the operational procedure you need a runbook for..."
      welcomeMessage="I generate operational runbooks with step-by-step procedures, commands, expected outputs, rollback plans, and escalation paths. Describe the procedure you need documented."
      apiEndpoint="/api/runbook"
    />
  );
}
