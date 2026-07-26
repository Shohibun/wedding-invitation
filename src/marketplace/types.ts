import { z } from "zod";
import { MarketplaceItemSchema, MarketplaceItemType } from "./schema";

export type MarketplaceItem = z.infer<typeof MarketplaceItemSchema>;
export type { MarketplaceItemType };
