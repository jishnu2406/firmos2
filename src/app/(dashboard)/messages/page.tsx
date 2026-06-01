"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hash,
  Send,
  Search,
  Users,
  Compass,
  MessageSquare,
  Sparkles,
  Info,
  PhoneCall,
  Video
} from "lucide-react";
import {
  cn,
  Button,
  Badge,
  Card,
  Avatar,
  Input
} from "@/components/ui";

const CHANNELS_DB = [
  { id: "c1", name: "general", desc: "Company-wide announcements and general chatter." },
  { id: "c2", name: "design-team", desc: "Dedicated channel for CAD, layout drafts, and FF&E selections." },
  { id: "c3", name: "dubai-creek-tower", desc: "Direct coordinate deliverables channel for Emaar Properties tower." },
  { id: "c4", name: "apple-park-expansion", desc: "Apple Inc. project logs and carbon roof specifications." },
  { id: "c5", name: "neom-masterplan", desc: "NEOM industrial sector coordinate discussions." },
  { id: "c6", name: "finance-audits", desc: "Billings ledgers and outstanding payment alerts." }
];

const INITIAL_MESSAGES = [
  { id: "m1", channelId: "c3", sender: "Norman Foster", fallback: "NF", time: "10:32 AM", content: "Team, I just reviewed the aerodynamic wind calculations. Let's make sure the tension cables coordinates in our main DWG match exactly." },
  { id: "m2", channelId: "c3", sender: "James Okoye", fallback: "JO", time: "10:35 AM", content: "Understood, Norman. I'm cross-referencing our carbon deflections models right now. I'll drop the updated drawing in the asset register shortly." },
  { id: "m3", channelId: "c3", sender: "Laura Chen", fallback: "LC", time: "10:42 AM", content: "Great. I will import James' coordinate updates directly into our detailed facade shop drawings." },
  { id: "m4", channelId: "c3", sender: "Mouzhan Majidi", fallback: "MM", time: "10:50 AM", content: "Remember to tag Emaar's managing director for milestone approval on this once drawings are verified and approved." },
  
  { id: "m5", channelId: "c2", sender: "Spencer de Grey", fallback: "SG", time: "09:15 AM", content: "Have we selected the main lobby stone finishes for Apple's Visitor Center expansion?" },
  { id: "m6", channelId: "c2", sender: "Marcus Williams", fallback: "MW", time: "09:20 AM", content: "Yes, Spencer. We are looking at a premium textured limestone swatch. I'll drop the physical specification document into the asset vault." },
  { id: "m7", channelId: "c2", sender: "Aiko Tanaka", fallback: "AT", time: "09:24 AM", content: "I've started rendering the lobby with that limestone. The warm beige tone looks incredible with the curved glazing." },
  { id: "m8", channelId: "c2", sender: "Spencer de Grey", fallback: "SG", time: "09:30 AM", content: "Superb. Apple's VP of Design is expecting to see these swatches by next Tuesday." }
];

export default function MessagesHubPage() {
  const [activeChannelId, setActiveChannelId] = useState<string>("c3");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");

  const activeChannel = CHANNELS_DB.find((c) => c.id === activeChannelId) || CHANNELS_DB[0];
  const channelMessages = messages.filter((m) => m.channelId === activeChannelId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      channelId: activeChannelId,
      sender: "Norman Foster", // Current user
      fallback: "NF",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: inputValue
    };

    setMessages([...messages, newMsg]);
    setInputValue("");
  };

  return (
    <Card padding="none" className="h-[calc(100vh-140px)] flex overflow-hidden border border-[var(--border)]">
      {/* Channels Sidebar List (Left) */}
      <div className="w-64 border-r border-[var(--border)] bg-[var(--surface-hover)]/25 flex flex-col justify-between shrink-0">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-1.5">
              <MessageSquare size={16} className="text-[var(--accent-2)]" />
              Collaborate
            </h3>
            <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-0.5 rounded">
              <Compass size={14} />
            </button>
          </div>

          {/* List of Channels */}
          <div className="space-y-1 overflow-y-auto max-h-[60vh] scrollbar-thin">
            {CHANNELS_DB.map((chan) => {
              const isActive = chan.id === activeChannelId;
              return (
                <button
                  key={chan.id}
                  onClick={() => setActiveChannelId(chan.id)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-all text-left",
                    isActive
                      ? "bg-[var(--accent-2)]/15 text-[var(--accent-2)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                  )}
                >
                  <Hash size={13} className="shrink-0 text-[var(--text-tertiary)]" />
                  <span className="truncate">{chan.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* User stats strip */}
        <div className="p-4 border-t border-[var(--border)] flex items-center gap-3">
          <Avatar fallback="NF" size="sm" status="online" />
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-[var(--text-primary)] truncate">Norman Foster</div>
            <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider font-bold">Principal</div>
          </div>
        </div>
      </div>

      {/* Message Chat Feed (Center) */}
      <div className="flex-1 flex flex-col justify-between bg-[var(--surface)]">
        {/* Chat Feed Header */}
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <Hash size={15} className="text-[var(--text-tertiary)]" />
              {activeChannel.name}
            </h3>
            <p className="text-[10px] text-[var(--text-secondary)] line-clamp-1 max-w-md">
              {activeChannel.desc}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors">
              <PhoneCall size={15} />
            </button>
            <button className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors">
              <Video size={15} />
            </button>
            <button className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors">
              <Info size={15} />
            </button>
          </div>
        </div>

        {/* Message Feed list scroll */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin">
          <AnimatePresence initial={false}>
            {channelMessages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-start gap-3"
              >
                <Avatar fallback={msg.fallback} size="sm" />
                <div className="space-y-1 max-w-[80%]">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-xs text-[var(--text-primary)]">{msg.sender}</span>
                    <span className="text-[9px] text-[var(--text-tertiary)] tabular-nums">{msg.time}</span>
                  </div>
                  <div className="bg-[var(--surface-hover)]/30 border border-[var(--border)]/15 px-3 py-2 rounded-xl text-xs text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Message input submit form (Bottom) */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-[var(--border)] bg-[var(--surface-hover)]/15 flex items-center gap-3">
          <div className="relative flex-1">
            <Input
              placeholder={`Message #${activeChannel.name}...`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-[var(--surface)] border-[var(--border)]"
            />
          </div>
          <Button type="submit" size="icon" className="bg-[var(--accent-2)] hover:opacity-90 shrink-0">
            <Send size={14} className="text-white" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
