"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  UploadCloud,
  FileCode,
  Image as ImageIcon,
  FileCheck,
  MoreVertical,
  Plus,
  SlidersHorizontal,
  FolderDot
} from "lucide-react";
import {
  cn,
  Button,
  Badge,
  Card,
  Input
} from "@/components/ui";

const ASSETS_DB = [
  { id: "a1", name: "Dubai_Creek_MasterPlan_v2.dwg", type: "Drawing", size: "24.5 MB", format: "DWG", uploadedBy: "Norman Foster", date: "2026-05-18", status: "Approved", gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" },
  { id: "a2", name: "Aerodynamic_WindTunnel_Report.pdf", type: "Document", size: "8.2 MB", format: "PDF", uploadedBy: "James Okoye", date: "2026-05-20", status: "Approved", gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" },
  { id: "a3", name: "Apple_Park_VisitorCenter_Facade_Render.png", type: "Render", size: "14.1 MB", format: "PNG", uploadedBy: "Aiko Tanaka", date: "2026-05-24", status: "In Review", gradient: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)" },
  { id: "a4", name: "Bloomberg_Lobby_Stone_Spec.pdf", type: "Document", size: "1.2 MB", format: "PDF", uploadedBy: "Marcus Williams", date: "2026-05-14", status: "Approved", gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" },
  { id: "a5", name: "Lobby_Timber_Ceiling_Detail.dwg", type: "Drawing", size: "18.6 MB", format: "DWG", uploadedBy: "Laura Chen", date: "2026-05-02", status: "Approved", gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" },
  { id: "a6", name: "Battersea_Power_Station_Retail_Logistics.xlsx", type: "Document", size: "4.5 MB", format: "XLSX", uploadedBy: "Sofia Rossi", date: "2026-04-18", status: "Approved", gradient: "linear-gradient(135deg, #10b981 0%, #047857 100%)" },
  { id: "a7", name: "Sustainable_Tall_Building_Presentation.key", type: "Document", size: "32.0 MB", format: "KEY", uploadedBy: "Norman Foster", date: "2026-05-29", status: "Draft", gradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)" },
  { id: "a8", name: "Tower_Core_Structural_Calcs.pdf", type: "Document", size: "12.4 MB", format: "PDF", uploadedBy: "James Okoye", date: "2026-05-10", status: "Approved", gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" },
  { id: "a9", name: "NEOM_MasterPlan_Zoning_Map.dwg", type: "Drawing", size: "45.2 MB", format: "DWG", uploadedBy: "Norman Foster", date: "2026-05-22", status: "In Review", gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" },
  { id: "a10", name: "Dubai_Tower_Podium_Glazing_Material.pdf", type: "Document", size: "2.1 MB", format: "PDF", uploadedBy: "Laura Chen", date: "2026-04-30", status: "Approved", gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" },
  { id: "a11", name: "Apple_Center_Roof_StressTest.xlsx", type: "Document", size: "6.8 MB", format: "XLSX", uploadedBy: "James Okoye", date: "2026-05-01", status: "Approved", gradient: "linear-gradient(135deg, #10b981 0%, #047857 100%)" },
  { id: "a12", name: "Marina_Resort_SitePlan_Draft.dwg", type: "Drawing", size: "15.4 MB", format: "DWG", uploadedBy: "Aiko Tanaka", date: "2026-05-28", status: "Draft", gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" }
];

export default function AssetLibraryPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredAssets = ASSETS_DB.filter((asset) => {
    const matchesFilter = filter === "All" || asset.type === filter;
    const matchesSearch =
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.uploadedBy.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getFormatIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "drawing":
        return <FileCode size={18} />;
      case "render":
        return <ImageIcon size={18} />;
      case "document":
      default:
        return <FileText size={18} />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "success";
      case "in review":
        return "info";
      case "draft":
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--text-primary)]">Asset Register</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            A secure, version-controlled vault for design calculations, blueprints, and assets.
          </p>
        </div>
        <Button className="w-full md:w-auto self-start flex items-center gap-2">
          <UploadCloud size={16} />
          Upload Asset
        </Button>
      </div>

      {/* Upload Zone Drop Area */}
      <div className="border border-dashed border-[var(--border)] bg-[var(--surface-hover)]/35 hover:bg-[var(--surface-hover)]/60 transition-all p-6 rounded-xl flex flex-col items-center justify-center text-center group cursor-pointer">
        <UploadCloud size={32} className="text-[var(--text-tertiary)] group-hover:text-[var(--accent-2)] transition-colors mb-2" />
        <span className="font-semibold text-xs text-[var(--text-primary)]">Drag & drop files to upload</span>
        <span className="text-[10px] text-[var(--text-tertiary)] mt-1">Supports AutoCAD DWG, PDF reports, 3D Rhino Models, and high-res Renders</span>
      </div>

      {/* Filter and Search Actions */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl">
        <div className="flex flex-wrap items-center gap-2">
          {["All", "Drawing", "Document", "Render"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                filter === t
                  ? "bg-[var(--accent-2)]/15 text-[var(--accent-2)] border border-[var(--accent-2)]/25"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-transparent"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Input
              placeholder="Search drawings or uploaders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search size={14} />}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <AnimatePresence mode="wait">
        {filteredAssets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-[var(--surface)] border border-[var(--border)] rounded-xl"
          >
            <FolderDot className="text-[var(--text-tertiary)] mb-4" size={48} />
            <h3 className="text-lg font-medium text-[var(--text-primary)]">No assets found</h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm mt-1">
              No files in the registry match your filters. Try resetting search parameters.
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredAssets.map((asset) => (
              <motion.div
                key={asset.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                <Card className="overflow-hidden flex flex-col h-[280px]" hover padding="none">
                  {/* Decorative cover preview */}
                  <div
                    style={{ background: asset.gradient }}
                    className="h-24 w-full relative flex items-start justify-between p-3"
                  >
                    <Badge variant={getStatusVariant(asset.status)} size="sm">
                      {asset.status}
                    </Badge>
                    <button className="h-7 w-7 rounded-lg bg-black/25 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/45 transition-colors">
                      <MoreVertical size={14} />
                    </button>
                  </div>

                  {/* Body details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">
                        {getFormatIcon(asset.type)}
                        <span>{asset.type} ({asset.format})</span>
                      </div>

                      <h4 className="font-semibold text-sm text-[var(--text-primary)] line-clamp-2 hover:text-[var(--accent-2)] transition-colors cursor-pointer" title={asset.name}>
                        {asset.name}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
                      <span className="font-semibold">{asset.size}</span>
                      <span className="text-[var(--text-tertiary)]">By {asset.uploadedBy}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
