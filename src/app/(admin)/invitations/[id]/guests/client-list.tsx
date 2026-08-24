"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { MoreHorizontal, Edit, Trash2, Copy, Plus, Download, Upload, QrCode } from "lucide-react";
import { Guest } from "@/features/guest/types";
import {
  createGuestAction,
  updateGuestAction,
  deleteGuestAction,
  bulkDeleteGuestsAction,
} from "@/features/guest/actions";

import { DataTable } from "@/components/dashboard/data-table";
import { Toolbar, SearchBar } from "@/components/dashboard/toolbar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NativeSelect } from "@/components/ui/native-select";
import { toast } from "sonner";
import { GuestForm } from "./components/guest-form";
import { GuestImportDialog } from "./components/guest-import-dialog";
import { GuestExportDialog } from "./components/guest-export-dialog";
import { GuestLinkDialog } from "./components/guest-link-dialog";

interface GuestClientListProps {
  invitationId: string;
  invitationSlug: string;
  guests: Guest[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

export function GuestClientList({
  invitationId,
  invitationSlug,
  guests,
  totalCount,
  currentPage,
  pageSize,
}: GuestClientListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [isImportOpen, setIsImportOpen] = React.useState(false);
  const [isExportOpen, setIsExportOpen] = React.useState(false);
  const [editingGuest, setEditingGuest] = React.useState<Guest | null>(null);
  const [linkGuest, setLinkGuest] = React.useState<Guest | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Search local state to allow debouncing or pressing enter
  const [searchInput, setSearchInput] = React.useState(searchParams.get("query") || "");

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset to page 1 on filter change
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters("query", searchInput);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(guests.map((g) => g.id)));
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = async (values: any) => {
    setIsLoading(true);
    const res = await createGuestAction(values);
    setIsLoading(false);
    if (res.success) {
      toast.success("Guest added successfully");
      setIsCreateOpen(false);
      router.refresh();
    } else {
      toast.error(res.error || "Failed to add guest");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdate = async (values: any) => {
    if (!editingGuest) return;
    setIsLoading(true);
    const res = await updateGuestAction(editingGuest.id, invitationId, values);
    setIsLoading(false);
    if (res.success) {
      toast.success("Guest updated successfully");
      setEditingGuest(null);
      router.refresh();
    } else {
      toast.error(res.error || "Failed to update guest");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteGuestAction(id, invitationId);
    if (res.success) {
      toast.success("Guest deleted");
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      router.refresh();
    } else {
      toast.error(res.error || "Failed to delete guest");
    }
  };

  const handleBulkDelete = async () => {
    const res = await bulkDeleteGuestsAction(Array.from(selectedIds), invitationId);
    if (res.success) {
      toast.success(`${selectedIds.size} guests deleted`);
      setSelectedIds(new Set());
      router.refresh();
    } else {
      toast.error(res.error || "Failed to bulk delete");
    }
  };

  const copyLink = (guestId: string) => {
    const url = `${window.location.origin}/invitation/${invitationSlug}?guest=${guestId}`;
    navigator.clipboard.writeText(url);
    toast.success("Invitation link copied!");
  };

  const showQrCode = (guest: Guest) => {
    setLinkGuest(guest);
  };

  const handleExport = () => {
    setIsExportOpen(true);
  };

  const columns = [
    {
      header: (
        <Checkbox
          checked={selectedIds.size === guests.length && guests.length > 0}
          onCheckedChange={toggleSelectAll}
        />
      ),
      cell: (row: Guest) => (
        <Checkbox
          checked={selectedIds.has(row.id)}
          onCheckedChange={(c) => toggleSelect(row.id, c as boolean)}
        />
      ),
      className: "w-[40px]",
    },
    {
      header: "Name",
      cell: (row: Guest) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.phone_number || "No phone"}</p>
        </div>
      ),
    },
    {
      header: "Max Pax",
      cell: (row: Guest) => row.max_pax,
    },
    {
      header: "",
      className: "text-right",
      cell: (row: Guest) => (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => copyLink(row.id)}>
              <Copy className="mr-2 h-4 w-4" /> Copy Link
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => showQrCode(row)}>
              <QrCode className="mr-2 h-4 w-4" /> Show QR
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditingGuest(row)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <ConfirmDialog
              title="Delete Guest?"
              description={`Are you sure you want to delete ${row.name}?`}
              destructive
              onConfirm={() => handleDelete(row.id)}
              trigger={
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="text-destructive focus:bg-destructive/10"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <Toolbar>
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <SearchBar
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search name or phone..."
          />
        </form>
        <div className="flex gap-2 ml-auto">
          <NativeSelect
            value={searchParams.get("sortBy") || "created_at"}
            onChange={(e) => updateFilters("sortBy", e.target.value)}
          >
            <option value="created_at">Newest</option>
            <option value="name">Alphabetical</option>
          </NativeSelect>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button variant="outline" onClick={() => setIsImportOpen(true)}>
            <Upload className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Guest
          </Button>
        </div>
      </Toolbar>

      {selectedIds.size > 0 && (
        <div className="p-3 bg-muted/50 border rounded-md flex items-center justify-between">
          <span className="text-sm font-medium">{selectedIds.size} guests selected</span>
          <ConfirmDialog
            title={`Delete ${selectedIds.size} guests?`}
            description="Are you sure you want to permanently delete the selected guests?"
            destructive
            onConfirm={handleBulkDelete}
            trigger={
              <Button variant="destructive" size="sm">
                Bulk Delete
              </Button>
            }
          />
        </div>
      )}

      <DataTable columns={columns} data={guests} />

      {/* Basic Pagination Controls */}
      {totalCount > pageSize && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, totalCount)} of {totalCount} guests
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={currentPage * pageSize >= totalCount}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Guest</DialogTitle>
          </DialogHeader>
          <GuestForm
            invitationId={invitationId}
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingGuest} onOpenChange={(open) => !open && setEditingGuest(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Guest</DialogTitle>
          </DialogHeader>
          {editingGuest && (
            <GuestForm
              invitationId={invitationId}
              initialData={editingGuest}
              onSubmit={handleUpdate}
              onCancel={() => setEditingGuest(null)}
              isLoading={isLoading}
            />
          )}
        </DialogContent>
      </Dialog>

      <GuestLinkDialog
        open={!!linkGuest}
        onOpenChange={(open) => !open && setLinkGuest(null)}
        invitationId={invitationId}
        invitationSlug={invitationSlug}
        guest={linkGuest}
        onRegenerateSuccess={() => {
          setLinkGuest(null);
          router.refresh();
        }}
      />

      <GuestImportDialog
        open={isImportOpen}
        onOpenChange={setIsImportOpen}
        invitationId={invitationId}
        onSuccess={() => {
          setIsImportOpen(false);
          router.refresh();
        }}
      />

      <GuestExportDialog
        open={isExportOpen}
        onOpenChange={setIsExportOpen}
        invitationId={invitationId}
        invitationSlug={invitationSlug}
        selectedGuests={guests.filter((g) => selectedIds.has(g.id))}
      />
    </div>
  );
}
