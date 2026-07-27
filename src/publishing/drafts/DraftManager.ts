import { DraftService } from "../../features/drafts/service";
import { Draft } from "../../features/drafts/types";

export class DraftManager {
  private invitationId: string;
  private currentVersion: number = 1;
  private lastSavedHash: string | null = null;
  private saveTimeout: NodeJS.Timeout | null = null;

  // Callbacks for the React UI to hook into
  public onSaveStart?: () => void;
  public onSaveSuccess?: (draft: Draft) => void;
  public onSaveError?: (error: Error) => void;

  constructor(invitationId: string) {
    this.invitationId = invitationId;
  }

  /**
   * Initializes the manager by loading the current draft from the DB.
   */
  async initialize(): Promise<Draft | null> {
    const draft = await DraftService.getDraft(this.invitationId);
    if (draft) {
      this.currentVersion = draft.version;
      this.lastSavedHash = this.hashState(draft.data);
    }
    return draft;
  }

  /**
   * Schedules an auto-save for the current Builder State.
   * Utilizes debouncing to prevent spamming the database.
   */
  scheduleAutoSave(builderState: unknown, delayMs: number = 2000) {
    // 1. Dirty Tracking
    if (!this.isDirty(builderState)) {
      return; // No changes to save
    }

    // 2. Debounce
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = setTimeout(() => {
      this.executeSave(builderState);
    }, delayMs);
  }

  /**
   * Forces an immediate save, bypassing the debounce timer.
   */
  async forceSave(builderState: unknown) {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    await this.executeSave(builderState);
  }

  /**
   * Executes the actual save operation through the Service Layer.
   */
  private async executeSave(builderState: unknown) {
    try {
      if (this.onSaveStart) this.onSaveStart();

      const payload = DraftService.serializeBuilderData(builderState);
      const savedDraft = await DraftService.saveDraft(
        this.invitationId,
        payload,
        this.currentVersion
      );

      // Update local state after successful save
      this.currentVersion = savedDraft.version;
      this.lastSavedHash = this.hashState(savedDraft.data);

      if (this.onSaveSuccess) this.onSaveSuccess(savedDraft);
    } catch (error) {
      console.error("[DraftManager] Auto-save failed:", error);
      if (this.onSaveError && error instanceof Error) {
        this.onSaveError(error);
      }
    }
  }

  /**
   * Determines if the current state differs from the last saved state.
   */
  private isDirty(builderState: unknown): boolean {
    const currentHash = this.hashState(builderState);
    return currentHash !== this.lastSavedHash;
  }

  /**
   * Creates a simple deterministic hash of the state for dirty comparison.
   */
  private hashState(state: unknown): string {
    return JSON.stringify(state);
  }
}
