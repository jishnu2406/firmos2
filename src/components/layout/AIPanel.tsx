"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  Send,
  Paperclip,
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Mic,
  Bot,
  User,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Button, Avatar, Badge, cn } from "@/components/ui";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const WELCOME_SUGGESTIONS = [
  "Summarize all active projects",
  "Draft a progress report for Sky Tower",
  "What's the team capacity this week?",
  "Generate a client proposal outline",
];

export const AIPanel: React.FC = () => {
  const { aiPanelOpen, setAiPanelOpen, currentUser } = useAppStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (aiPanelOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [aiPanelOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1500));

    const responses: Record<string, string> = {
      "Summarize all active projects": `Here's a summary of your **8 active projects**:\n\n📊 **Sky Tower Complex** — Design Development phase, 72% complete, on track\n🏢 **Marina Bay Residences** — Documentation phase, 85% budget consumed ⚠️\n🏛️ **Heritage Museum** — Schematic Design, awaiting client feedback\n🌳 **Urban Park Pavilion** — Concept phase, recently kicked off\n🏗️ **Tech Campus HQ** — Construction phase, 3 RFIs pending\n🏠 **Lakeside Villas** — Design Development, team at full capacity\n🎭 **Cultural Center** — Tender stage, submission due in 12 days\n🏥 **Medical Research Lab** — Concept phase, specialized requirements under review\n\n**Key concerns:** Marina Bay budget overrun risk, Cultural Center tender deadline approaching.`,
      "Draft a progress report for Sky Tower": `# Sky Tower Complex — Progress Report\n**Period:** Nov 25 – Dec 1, 2024\n**Phase:** Design Development (72% complete)\n\n## Highlights\n- Structural engineering coordination completed for floors 1-25\n- MEP layouts finalized for podium levels\n- Facade mock-up approved by client\n\n## Next Steps\n- Complete core detail drawings by Dec 8\n- Schedule wind tunnel test coordination\n- Submit revised cost estimate\n\n## Budget Status\n- Budget: $2.4M | Spent: $1.7M (71%)\n- Projected completion: Within budget ✅\n\n*Shall I format this as a PDF for the client?*`,
      "What's the team capacity this week?": `## Team Capacity Overview\n\n| Team Member | Allocation | Status |\n|---|---|---|\n| Alexandra Chen | 95% | 🔴 Near capacity |\n| James Wong | 80% | 🟡 Moderate |\n| Sarah Mitchell | 60% | 🟢 Available |\n| David Kim | 100% | 🔴 Full |\n| Emma Roberts | 45% | 🟢 Available |\n| Michael Torres | 75% | 🟡 Moderate |\n\n**Summary:** 2 team members at capacity, 2 available for new assignments. Sarah and Emma can take on additional work this week.`,
      "Generate a client proposal outline": `# Proposal Outline Template\n\n1. **Executive Summary** — Project vision and value proposition\n2. **Understanding** — Client brief interpretation and site analysis\n3. **Our Approach** — Design philosophy and methodology\n4. **Team** — Key personnel and their relevant experience\n5. **Timeline** — Phase-by-phase schedule with milestones\n6. **Deliverables** — Scope of services per phase\n7. **Fee Structure** — Fee breakdown and payment schedule\n8. **Relevant Experience** — Similar project case studies\n9. **Terms & Conditions** — Standard engagement terms\n\n*Want me to generate the full proposal for a specific project?*`,
    };

    const aiContent =
      responses[content.trim()] ||
      `I understand you're asking about "${content.trim()}". As your AI assistant, I can help with project analysis, report generation, team management, and more.\n\nHere are a few things I can help with:\n- **Project insights** — status summaries, risk analysis, timeline optimization\n- **Content generation** — reports, proposals, emails, meeting notes\n- **Data analysis** — financial trends, team utilization, client metrics\n- **Knowledge search** — find documents, precedents, and specifications\n\nCould you provide more details about what you need?`;

    const aiMsg: ChatMessage = {
      id: `msg_${Date.now()}_ai`,
      role: "assistant",
      content: aiContent,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const panelWidth = isExpanded ? 560 : 400;

  return (
    <AnimatePresence>
      {aiPanelOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAiPanelOpen(false)}
          />

          <motion.div
            className="fixed top-0 right-0 z-50 h-screen border-l border-[var(--border)] flex flex-col"
            style={{
              backgroundColor: "var(--surface)",
              width: panelWidth,
              maxWidth: "95vw",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-14 border-b border-[var(--border)] shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[var(--accent-2)] to-purple-500 flex items-center justify-center">
                    <Sparkles size={14} className="text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[var(--surface)]" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                    NEXUS Mind
                  </h2>
                  <p className="text-[10px] text-[var(--success)]">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <Minimize2 size={14} />
                  ) : (
                    <Maximize2 size={14} />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => {
                    setMessages([]);
                  }}
                >
                  <RotateCcw size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setAiPanelOpen(false)}
                >
                  <X size={14} />
                </Button>
              </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.length === 0 ? (
                // Welcome state
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[var(--accent-2)] to-purple-500 flex items-center justify-center mb-4">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                    Welcome to NEXUS Mind
                  </h3>
                  <p className="text-sm text-[var(--text-tertiary)] mb-6 max-w-sm">
                    Your AI-powered workspace assistant. Ask me anything about
                    your projects, team, or data.
                  </p>
                  <div className="grid grid-cols-1 gap-2 w-full max-w-sm">
                    {WELCOME_SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => sendMessage(suggestion)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] transition-colors text-left group"
                      >
                        <Sparkles
                          size={12}
                          className="text-[var(--accent-2)] shrink-0 opacity-50 group-hover:opacity-100"
                        />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // Messages
                messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "flex gap-3",
                      msg.role === "user" ? "flex-row-reverse" : ""
                    )}
                  >
                    <div className="shrink-0">
                      {msg.role === "assistant" ? (
                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[var(--accent-2)] to-purple-500 flex items-center justify-center">
                          <Sparkles size={12} className="text-white" />
                        </div>
                      ) : (
                        <Avatar
                          fallback={currentUser?.name || "U"}
                          size="xs"
                        />
                      )}
                    </div>
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                        msg.role === "user"
                          ? "bg-[var(--accent-2)] text-white rounded-tr-md"
                          : "bg-[var(--surface-hover)] text-[var(--text-primary)] rounded-tl-md"
                      )}
                    >
                      <div className="whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                      </div>
                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-1 mt-2 pt-2 border-t border-[var(--border)]/50">
                          <Button variant="ghost" size="icon-sm">
                            <Copy size={12} />
                          </Button>
                          <Button variant="ghost" size="icon-sm">
                            <ThumbsUp size={12} />
                          </Button>
                          <Button variant="ghost" size="icon-sm">
                            <ThumbsDown size={12} />
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[var(--accent-2)] to-purple-500 flex items-center justify-center">
                    <Sparkles size={12} className="text-white" />
                  </div>
                  <div className="bg-[var(--surface-hover)] rounded-2xl rounded-tl-md px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-[var(--text-tertiary)] animate-bounce" />
                      <span className="h-2 w-2 rounded-full bg-[var(--text-tertiary)] animate-bounce [animation-delay:0.15s]" />
                      <span className="h-2 w-2 rounded-full bg-[var(--text-tertiary)] animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input area */}
            <div className="px-4 py-3 border-t border-[var(--border)] shrink-0">
              <div className="flex items-end gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 focus-within:ring-2 focus-within:ring-[var(--accent-2)] focus-within:border-transparent transition-all">
                <Button variant="ghost" size="icon-sm" className="shrink-0 mb-0.5">
                  <Paperclip size={14} />
                </Button>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask NEXUS Mind anything..."
                  rows={1}
                  className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none resize-none max-h-24 py-1"
                />
                <Button variant="ghost" size="icon-sm" className="shrink-0 mb-0.5">
                  <Mic size={14} />
                </Button>
                <Button
                  variant="primary"
                  size="icon-sm"
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="shrink-0 mb-0.5 rounded-lg"
                >
                  <Send size={14} />
                </Button>
              </div>
              <p className="text-[10px] text-[var(--text-tertiary)] mt-1.5 text-center">
                NEXUS Mind uses Claude Sonnet for intelligent responses
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AIPanel;
