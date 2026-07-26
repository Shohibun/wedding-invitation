import { BuilderAction, BuilderState } from "./builder-types";

export const BUILDER_ACTIONS = {
  INIT_BUILDER: "INIT_BUILDER",
  SET_PREVIEW_TEMPLATE: "SET_PREVIEW_TEMPLATE",
  UPDATE_SECTION: "UPDATE_SECTION",
  SET_SECTION: "SET_SECTION",
  SET_FIELD: "SET_FIELD",
  SET_PREVIEW_MODE: "SET_PREVIEW_MODE",
  SET_DEVICE_MODE: "SET_DEVICE_MODE",
  SET_ORIENTATION: "SET_ORIENTATION",
  SET_ZOOM: "SET_ZOOM",
  SET_STATUS: "SET_STATUS",
  SET_DIRTY: "SET_DIRTY",
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
  RESTORE_STATE: "RESTORE_STATE",
} as const;

export const builderActionCreators = {
  initBuilder: (
    invitationId: string,
    templateId: string,
    initialData?: Record<string, unknown>
  ): BuilderAction => ({
    type: "INIT_BUILDER",
    payload: { invitationId, templateId, initialData },
  }),
  setPreviewTemplate: (templateId: string | null): BuilderAction => ({
    type: "SET_PREVIEW_TEMPLATE",
    payload: templateId,
  }),
  updateSection: (section: string, data: unknown): BuilderAction => ({
    type: "UPDATE_SECTION",
    payload: { section, data },
  }),
  setSection: (sectionId: string | null): BuilderAction => ({
    type: "SET_SECTION",
    payload: sectionId,
  }),
  setField: (fieldId: string | null): BuilderAction => ({
    type: "SET_FIELD",
    payload: fieldId,
  }),
  setPreviewMode: (mode: boolean): BuilderAction => ({
    type: "SET_PREVIEW_MODE",
    payload: mode,
  }),
  setDeviceMode: (mode: BuilderState["deviceMode"]): BuilderAction => ({
    type: "SET_DEVICE_MODE",
    payload: mode,
  }),
  setOrientation: (isLandscape: boolean): BuilderAction => ({
    type: "SET_ORIENTATION",
    payload: isLandscape,
  }),
  setZoom: (scale: number | "fit"): BuilderAction => ({
    type: "SET_ZOOM",
    payload: scale,
  }),
  setStatus: (status: BuilderState["status"]): BuilderAction => ({
    type: "SET_STATUS",
    payload: status,
  }),
  setDirty: (isDirty: boolean): BuilderAction => ({
    type: "SET_DIRTY",
    payload: isDirty,
  }),
  toggleSidebar: (isCollapsed?: boolean): BuilderAction => ({
    type: "TOGGLE_SIDEBAR",
    payload: isCollapsed,
  }),
  restoreState: (state: BuilderState): BuilderAction => ({
    type: "RESTORE_STATE",
    payload: state,
  }),
};
