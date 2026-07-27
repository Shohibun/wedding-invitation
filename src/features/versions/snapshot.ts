import { Snapshot } from "./types";
import { SnapshotSchema } from "./schema";
import { Draft } from "../../features/drafts/types";

export const SnapshotGenerator = {
  /**
   * Generates an immutable Snapshot from a Draft entity.
   * Clones the data to prevent reference mutation and strictly validates JSON serializability.
   */
  fromDraft: (draft: Draft): Snapshot => {
    // 1. Ensure the draft has data
    if (!draft.data) {
      throw new Error("[SnapshotGenerator] Cannot generate a snapshot from an empty draft.");
    }

    // 2. Deep clone to break all references (Immutability guarantee)
    const clonedData = JSON.parse(JSON.stringify(draft.data));

    // 3. Strict Zod validation
    return SnapshotSchema.parse(clonedData);
  },
};
