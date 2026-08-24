"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import {
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Eye,
  Image as ImageIcon,
  LayoutGrid,
  List,
  Plus,
  ExternalLink,
  Users,
  Calendar,
  Sparkles,
  Search,
} from "lucide-react";

import { InvitationWithDetails } from "@/features/invitation/types";
import { DataTable } from "@/components/dashboard/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/ui/status-badge";
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog";
import { bulkDeleteInvitations, duplicateInvitation, deleteInvitation } from "./actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const subscribeStorage = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

function useDraftBackup(id: string) {
  const snapshot = React.useSyncExternalStore(
    subscribeStorage,
    () => {
      try {
        return localStorage.getItem(`draft_backup_${id}`);
      } catch {
        return null;
      }
    },
    () => null
  );

  return React.useMemo(() => {
    if (!snapshot) return null;
    try {
      return JSON.parse(snapshot);
    } catch {
      return null;
    }
  }, [snapshot]);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCoverUrl(row: InvitationWithDetails, localBackup: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowAny = row as any;
  return (
    localBackup?.cover?.image ||
    row.draft_payload?.cover?.image ||
    rowAny.drafts?.[0]?.payload?.cover?.image ||
    rowAny.drafts?.payload?.cover?.image ||
    row.gallery?.[0]?.url
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCoupleNames(row: InvitationWithDetails, localBackup: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowAny = row as any;
  const groom =
    localBackup?.couple?.groom?.nickname ||
    localBackup?.couple?.groom?.fullName ||
    row.draft_payload?.couple?.groom?.nickname ||
    row.draft_payload?.couple?.groom?.fullName ||
    rowAny.couples?.[0]?.groom?.nickname ||
    "Groom";

  const bride =
    localBackup?.couple?.bride?.nickname ||
    localBackup?.couple?.bride?.fullName ||
    row.draft_payload?.couple?.bride?.nickname ||
    row.draft_payload?.couple?.bride?.fullName ||
    rowAny.couples?.[0]?.bride?.nickname ||
    "Bride";

  return { groom, bride, formatted: `${groom} & ${bride}` };
}

function CoverThumbnail({ row }: { row: InvitationWithDetails }) {
  const localBackup = useDraftBackup(row.id);
  const coverUrl = getCoverUrl(row, localBackup);

  if (coverUrl) {
    return (
      <div className="relative w-11 h-14 rounded-lg overflow-hidden border border-border/80 shadow-xs bg-muted">
        <Image
          src={coverUrl}
          alt="Cover"
          fill
          unoptimized={coverUrl.startsWith("data:")}
          className="object-cover"
          sizes="44px"
        />
      </div>
    );
  }

  return (
    <div className="w-11 h-14 bg-muted/60 rounded-lg border border-border/60 flex flex-col items-center justify-center text-[10px] text-muted-foreground gap-0.5">
      <ImageIcon className="w-4 h-4 opacity-40" />
      <span>N/A</span>
    </div>
  );
}

function CoupleNamesDisplay({ row }: { row: InvitationWithDetails }) {
  const localBackup = useDraftBackup(row.id);
  const { formatted } = getCoupleNames(row, localBackup);
  return <span className="font-semibold text-text">{formatted}</span>;
}

export function InvitationClientList({ initialData }: { initialData: InvitationWithDetails[] }) {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | "published" | "draft">("all");
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("grid");
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  // Search and status filter
  const filteredData = React.useMemo(() => {
    return initialData.filter((inv) => {
      const matchesSearch =
        !search ||
        (inv.title || "").toLowerCase().includes(search.toLowerCase()) ||
        inv.slug.toLowerCase().includes(search.toLowerCase()) ||
        inv.theme.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "all" || inv.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [initialData, search, statusFilter]);

  const totalCount = initialData.length;
  const publishedCount = initialData.filter((i) => i.status === "published").length;
  const draftCount = initialData.filter((i) => i.status === "draft").length;

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredData.map((d) => d.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const toggleSelect = (id: string, checked: boolean) => {
    const newSet = new Set(selectedIds);
    if (checked) newSet.add(id);
    else newSet.delete(id);
    setSelectedIds(newSet);
  };

  const handleBulkDelete = async () => {
    await bulkDeleteInvitations(Array.from(selectedIds));
    setSelectedIds(new Set());
  };

  const columns = [
    {
      header: (
        <Checkbox
          checked={selectedIds.size === filteredData.length && filteredData.length > 0}
          onCheckedChange={toggleSelectAll}
        />
      ),
      cell: (row: InvitationWithDetails) => (
        <Checkbox
          checked={selectedIds.has(row.id)}
          onCheckedChange={(c) => toggleSelect(row.id, c as boolean)}
        />
      ),
      className: "w-[40px]",
    },
    {
      header: "Cover",
      cell: (row: InvitationWithDetails) => <CoverThumbnail row={row} />,
    },
    {
      header: "Bride & Groom",
      cell: (row: InvitationWithDetails) => <CoupleNamesDisplay row={row} />,
    },
    {
      header: "Title",
      cell: (row: InvitationWithDetails) => (
        <span className="font-medium text-text">{row.title || "Untitled Invitation"}</span>
      ),
    },
    {
      header: "Slug",
      cell: (row: InvitationWithDetails) => (
        <Link
          href={`/invitations/${row.id}/builder`}
          className="text-primary hover:underline font-mono text-xs"
        >
          /{row.slug}
        </Link>
      ),
    },
    {
      header: "Template",
      cell: (row: InvitationWithDetails) => <span className="capitalize">{row.theme}</span>,
    },
    {
      header: "Status",
      cell: (row: InvitationWithDetails) => {
        const statusStr = (row.status || "draft").toString();
        const variant =
          statusStr === "published" ? "success" : statusStr === "archived" ? "pending" : "warning";
        return <StatusBadge status={variant}>{statusStr.toUpperCase()}</StatusBadge>;
      },
    },
    {
      header: "Created",
      cell: (row: InvitationWithDetails) => format(new Date(row.created_at), "MMM d, yyyy"),
    },
    {
      header: "Updated",
      cell: (row: InvitationWithDetails) => format(new Date(row.updated_at), "MMM d, yyyy"),
    },
    {
      header: "",
      className: "text-right",
      cell: (row: InvitationWithDetails) => (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-muted cursor-pointer"
              />
            }
          >
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-36">
            <DropdownMenuItem
              render={<Link href={`/invitation/${row.slug}`} target="_blank" />}
              className="hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
            >
              <Eye className="mr-2 h-3.5 w-3.5 text-primary/80" /> Preview
            </DropdownMenuItem>
            <DropdownMenuItem
              render={<Link href={`/invitations/${row.id}/builder`} />}
              className="hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
            >
              <Edit className="mr-2 h-3.5 w-3.5 text-primary/80" /> Edit Builder
            </DropdownMenuItem>
            <DropdownMenuItem
              render={<Link href={`/invitations/${row.id}/guests`} />}
              className="hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
            >
              <Users className="mr-2 h-3.5 w-3.5 text-primary/80" /> Buku Tamu
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => duplicateInvitation(row.id)}
              className="hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
            >
              <Copy className="mr-2 h-3.5 w-3.5 text-primary/80" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <ConfirmDialog
              title="Delete Invitation?"
              description="This will permanently delete the invitation. This action cannot be undone."
              destructive
              onConfirm={() => deleteInvitation(row.id)}
              trigger={
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="text-destructive hover:bg-destructive/15 hover:text-destructive focus:bg-destructive/15 focus:text-destructive cursor-pointer transition-colors"
                >
                  <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                </DropdownMenuItem>
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* 🌟 Header Stats & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface p-3.5 rounded-2xl border shadow-xs">
        {/* Left: Search Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-textMuted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berdasarkan judul, slug, tema..."
            className="w-full h-9 pl-9 pr-3 text-xs rounded-xl bg-surfaceMuted/60 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-textMuted"
          />
        </div>

        {/* Right: Status Filter Tabs & View Mode Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-surfaceMuted p-1 rounded-xl border">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                statusFilter === "all"
                  ? "bg-surface text-text shadow-xs font-semibold"
                  : "text-textMuted hover:text-text"
              }`}
            >
              Semua ({totalCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("published")}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                statusFilter === "published"
                  ? "bg-surface text-emerald-600 dark:text-emerald-400 shadow-xs font-semibold"
                  : "text-textMuted hover:text-text"
              }`}
            >
              Publik ({publishedCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("draft")}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                statusFilter === "draft"
                  ? "bg-surface text-amber-600 dark:text-amber-400 shadow-xs font-semibold"
                  : "text-textMuted hover:text-text"
              }`}
            >
              Draft ({draftCount})
            </button>
          </div>

          {/* Dual View Mode Switcher */}
          <div className="flex items-center gap-1 bg-surfaceMuted p-1 rounded-xl border">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-surface text-primary shadow-xs"
                  : "text-textMuted hover:text-text"
              }`}
              title="Mode Grid Kartu"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-surface text-primary shadow-xs"
                  : "text-textMuted hover:text-text"
              }`}
              title="Mode Tabel"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Bulk Delete Trigger */}
          {selectedIds.size > 0 && (
            <ConfirmDialog
              title={`Hapus ${selectedIds.size} undangan?`}
              description="Tindakan ini akan menghapus seluruh data undangan terpilih secara permanen."
              destructive
              onConfirm={handleBulkDelete}
              trigger={
                <Button variant="destructive" size="sm" className="text-xs cursor-pointer">
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Hapus ({selectedIds.size})
                </Button>
              }
            />
          )}
        </div>
      </div>

      {/* 🖼️ Grid View Mode */}
      {viewMode === "grid" && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((inv) => (
            <InvitationCardItem
              key={inv.id}
              invitation={inv}
              isSelected={selectedIds.has(inv.id)}
              onToggleSelect={(checked) => toggleSelect(inv.id, checked)}
            />
          ))}

          {filteredData.length === 0 && (
            <div className="col-span-full py-16 text-center rounded-2xl border border-dashed bg-surfaceMuted/30">
              <Sparkles className="w-10 h-10 text-textMuted mx-auto mb-2 opacity-50" />
              <h3 className="text-sm font-semibold text-text">Tidak Ada Undangan Ditemukan</h3>
              <p className="text-xs text-textMuted mt-1 mb-4">
                Coba sesuaikan kata kunci pencarian atau filter status Anda.
              </p>
              <Button nativeButton={false} size="sm" render={<Link href="/invitations/create" />}>
                <Plus className="w-4 h-4 mr-1" /> Buat Undangan Baru
              </Button>
            </div>
          )}
        </div>
      )}

      {/* 📋 Table View Mode */}
      {viewMode === "table" && (
        <div className="rounded-2xl border bg-surface overflow-hidden shadow-xs">
          <DataTable columns={columns} data={filteredData} />
        </div>
      )}
    </div>
  );
}

function InvitationCardItem({
  invitation,
  isSelected,
  onToggleSelect,
}: {
  invitation: InvitationWithDetails;
  isSelected: boolean;
  onToggleSelect: (checked: boolean) => void;
}) {
  const localBackup = useDraftBackup(invitation.id);
  const coverUrl = getCoverUrl(invitation, localBackup);
  const { formatted: coupleTitle } = getCoupleNames(invitation, localBackup);

  const isPublished = invitation.status === "published";

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border bg-surface overflow-hidden shadow-xs transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 ${
        isSelected ? "ring-2 ring-primary border-primary" : ""
      }`}
    >
      {/* Top Cover Visual Banner */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-surfaceMuted">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={coupleTitle}
            fill
            unoptimized={coverUrl.startsWith("data:")}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-surfaceMuted to-surface text-textMuted">
            <ImageIcon className="w-8 h-8 opacity-40" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        {/* Checkbox Selector Top Left */}
        <div className="absolute top-3 left-3 z-10">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(c) => onToggleSelect(c as boolean)}
            className="bg-black/40 border-white/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
        </div>

        {/* Status Badge Top Right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md border ${
              isPublished
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                : "bg-amber-500/20 text-amber-300 border-amber-500/30"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isPublished ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            {isPublished ? "PUBLISHED" : "DRAFT"}
          </span>
        </div>

        {/* Couple Title on Banner Bottom */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-base font-serif font-bold text-white tracking-wide drop-shadow-md truncate">
            {coupleTitle}
          </h3>
          <p className="text-xs text-amber-200/90 font-mono mt-0.5 truncate">/{invitation.slug}</p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-textMuted">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-primary" />
              Tema: <span className="font-medium text-text capitalize">{invitation.theme}</span>
            </span>
            <span className="flex items-center gap-1 text-[11px]">
              <Calendar className="w-3 h-3" />
              {format(new Date(invitation.updated_at), "d MMM yyyy")}
            </span>
          </div>

          <p className="text-xs text-textMuted truncate">
            {invitation.title || "Undangan Pernikahan Tanpa Judul"}
          </p>
        </div>

        {/* Action Buttons Footer */}
        <div className="pt-3 border-t flex items-center gap-2">
          <Button
            nativeButton={false}
            variant="default"
            size="sm"
            className="flex-1 text-xs cursor-pointer font-medium"
            render={<Link href={`/invitations/${invitation.id}/builder`} />}
          >
            <Edit className="w-3.5 h-3.5 mr-1" /> Edit Builder
          </Button>

          <Button
            nativeButton={false}
            variant="outline"
            size="sm"
            className="text-xs cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
            render={<Link href={`/invitation/${invitation.slug}`} target="_blank" />}
            title="Lihat Pratinjau Publik"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>

          <Button
            nativeButton={false}
            variant="outline"
            size="sm"
            className="text-xs cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
            render={<Link href={`/invitations/${invitation.id}/guests`} />}
            title="Buku Tamu & RSVP"
          >
            <Users className="w-3.5 h-3.5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-muted cursor-pointer shrink-0"
                />
              }
            >
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-36">
              <DropdownMenuItem
                onClick={() => duplicateInvitation(invitation.id)}
                className="hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
              >
                <Copy className="mr-2 h-3.5 w-3.5 text-primary/80" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <ConfirmDialog
                title="Hapus Undangan?"
                description="Tindakan ini akan menghapus undangan ini secara permanen."
                destructive
                onConfirm={() => deleteInvitation(invitation.id)}
                trigger={
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive hover:bg-destructive/15 hover:text-destructive focus:bg-destructive/15 focus:text-destructive cursor-pointer transition-colors"
                  >
                    <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                  </DropdownMenuItem>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
