"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { MoreHorizontal, Edit, Copy, Trash2, Eye } from "lucide-react";

import { InvitationWithDetails } from "@/features/invitation/types";
import { DataTable } from "@/components/dashboard/data-table";
import { Toolbar, SearchBar } from "@/components/dashboard/toolbar";
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

export function InvitationClientList({ initialData }: { initialData: InvitationWithDetails[] }) {
  const [search, setSearch] = React.useState("");
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  // Search filter
  const filteredData = React.useMemo(() => {
    if (!search) return initialData;
    return initialData.filter(
      (inv) =>
        (inv.title || "").toLowerCase().includes(search.toLowerCase()) ||
        inv.slug.toLowerCase().includes(search.toLowerCase()) ||
        inv.theme.toLowerCase().includes(search.toLowerCase())
    );
  }, [initialData, search]);

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
      cell: (row: InvitationWithDetails) => {
        const coverUrl = (row as any).gallery?.[0]?.url; // eslint-disable-line @typescript-eslint/no-explicit-any
        return coverUrl ? (
          <div className="relative w-12 h-16 rounded-md overflow-hidden border">
            <Image src={coverUrl} alt="Cover" fill className="object-cover" sizes="48px" />
          </div>
        ) : (
          <div className="w-12 h-16 bg-muted rounded-md border flex items-center justify-center text-xs text-muted-foreground">
            N/A
          </div>
        );
      },
    },
    {
      header: "Bride & Groom",
      cell: (row: InvitationWithDetails) => {
        const groom = (row as any).couples?.[0]?.groom?.nickname || "Groom"; // eslint-disable-line @typescript-eslint/no-explicit-any
        const bride = (row as any).couples?.[0]?.bride?.nickname || "Bride"; // eslint-disable-line @typescript-eslint/no-explicit-any
        return <span className="font-medium">{`${groom} & ${bride}`}</span>;
      },
    },
    {
      header: "Title",
      cell: (row: InvitationWithDetails) => <span className="font-medium">{row.title}</span>,
    },
    {
      header: "Slug",
      cell: (row: InvitationWithDetails) => (
        <Link href={`/invitations/${row.id}`} className="text-primary hover:underline">
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
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem render={<Link href={`/invitation/${row.slug}`} target="_blank" />}>
              <Eye className="mr-2 h-4 w-4" /> Preview
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href={`/invitations/${row.id}`} />}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => duplicateInvitation(row.id)}>
              <Copy className="mr-2 h-4 w-4" /> Duplicate
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
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by slug or theme..."
        />
        {selectedIds.size > 0 && (
          <ConfirmDialog
            title={`Delete ${selectedIds.size} invitations?`}
            description="Are you sure you want to permanently delete the selected invitations?"
            destructive
            onConfirm={handleBulkDelete}
            trigger={<Button variant="destructive">Delete Selected ({selectedIds.size})</Button>}
          />
        )}
      </Toolbar>

      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}
