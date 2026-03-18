import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:54321";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveConversation(
  id: string,
  title: string,
  messages: unknown[],
  category: string
) {
  const { data, error } = await supabase
    .from("conversations")
    .upsert({
      id,
      title,
      messages: JSON.stringify(messages),
      category,
      updated_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    console.error("Error saving conversation:", error);
    return null;
  }
  return data;
}

export async function loadConversations() {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error loading conversations:", error);
    return [];
  }
  return data || [];
}

export async function deleteConversation(id: string) {
  const { error } = await supabase.from("conversations").delete().eq("id", id);
  if (error) {
    console.error("Error deleting conversation:", error);
    return false;
  }
  return true;
}

export async function saveScanResult(
  conversationId: string,
  result: unknown
) {
  const { data, error } = await supabase
    .from("scan_results")
    .insert({
      conversation_id: conversationId,
      result: JSON.stringify(result),
      created_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    console.error("Error saving scan result:", error);
    return null;
  }
  return data;
}
