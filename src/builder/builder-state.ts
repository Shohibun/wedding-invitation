import { BuilderState, BuilderAction } from "./builder-types";

export const initialBuilderState: BuilderState = {
  invitationId: null,
  templateId: null,
  previewTemplateId: null,
  selectedSection: null,
  selectedField: null,
  previewMode: false,
  deviceMode: "desktop",
  isLandscape: false,
  zoomScale: "fit",
  isDirty: false,
  status: "saved",
  sidebarCollapsed: false,
  workingInvitation: {},
  metadata: {},
};

export function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case "INIT_BUILDER":
      return {
        ...state,
        invitationId: action.payload.invitationId,
        templateId: action.payload.templateId,
        previewTemplateId: null,
        workingInvitation: action.payload.initialData || {},
        status: "saved",
        isDirty: false,
      };

    case "SET_PREVIEW_TEMPLATE":
      return {
        ...state,
        previewTemplateId: action.payload,
      };

    case "UPDATE_SECTION":
      return {
        ...state,
        workingInvitation: {
          ...state.workingInvitation,
          [action.payload.section]: action.payload.data,
        },
      };
    case "SET_SECTION":
      return {
        ...state,
        selectedSection: action.payload,
        // Reset field selection when changing section
        selectedField: action.payload !== state.selectedSection ? null : state.selectedField,
      };
    case "SET_FIELD":
      return {
        ...state,
        selectedField: action.payload,
      };
    case "SET_PREVIEW_MODE":
      return {
        ...state,
        previewMode: action.payload,
        // Optional: clear selections when entering preview
        selectedSection: action.payload ? null : state.selectedSection,
        selectedField: action.payload ? null : state.selectedField,
      };
    case "SET_DEVICE_MODE":
      return {
        ...state,
        deviceMode: action.payload,
        // Reset orientation to portrait on device switch unless it's desktop
        isLandscape: action.payload === "desktop" ? false : state.isLandscape,
      };
    case "SET_ORIENTATION":
      return {
        ...state,
        isLandscape: action.payload,
      };
    case "SET_ZOOM":
      return {
        ...state,
        zoomScale: action.payload,
      };
    case "SET_STATUS":
      return {
        ...state,
        status: action.payload,
      };
    case "SET_DIRTY":
      return {
        ...state,
        isDirty: action.payload,
        status: action.payload ? "unsaved" : state.status,
      };
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebarCollapsed: action.payload !== undefined ? action.payload : !state.sidebarCollapsed,
      };
    case "RESTORE_STATE":
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
