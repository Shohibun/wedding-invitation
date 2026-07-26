export type DeviceMode = "desktop" | "tablet" | "mobile";
export type SaveStatus = "saved" | "saving" | "draft" | "published" | "unsaved";

export interface BuilderState {
  invitationId: string | null;
  templateId: string | null;
  previewTemplateId: string | null; // In-memory preview override (Sprint 18)
  selectedSection: string | null;
  selectedField: string | null;
  previewMode: boolean;
  deviceMode: DeviceMode;
  isLandscape: boolean;
  zoomScale: number | "fit";
  isDirty: boolean;
  status: SaveStatus;
  sidebarCollapsed: boolean;
  // Draft layer: In-memory working copy
  workingInvitation: Record<string, unknown>;
  // Future extensibility for plugins or metadata
  metadata?: Record<string, unknown>;
}

export type BuilderAction =
  | {
      type: "INIT_BUILDER";
      payload: { invitationId: string; templateId: string; initialData?: Record<string, unknown> };
    }
  | { type: "SET_PREVIEW_TEMPLATE"; payload: string | null }
  | { type: "UPDATE_SECTION"; payload: { section: string; data: unknown } }
  | { type: "SET_SECTION"; payload: string | null }
  | { type: "SET_FIELD"; payload: string | null }
  | { type: "SET_PREVIEW_MODE"; payload: boolean }
  | { type: "SET_DEVICE_MODE"; payload: DeviceMode }
  | { type: "SET_ORIENTATION"; payload: boolean }
  | { type: "SET_ZOOM"; payload: number | "fit" }
  | { type: "SET_STATUS"; payload: SaveStatus }
  | { type: "SET_DIRTY"; payload: boolean }
  | { type: "TOGGLE_SIDEBAR"; payload?: boolean }
  | { type: "RESTORE_STATE"; payload: BuilderState }; // Used for Undo/Redo

export interface BuilderContextValue {
  state: BuilderState;
  dispatch: React.Dispatch<BuilderAction>;
  history: {
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    pushState: (state: BuilderState) => void;
  };
  actions: {
    saveDraft: () => Promise<void>;
    publish: () => Promise<void>;
  };
}
