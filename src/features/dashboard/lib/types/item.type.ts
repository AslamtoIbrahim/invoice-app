import type z from "zod";
import type { ItemSchema } from "../schemas/item.schema";

export type Items = z.infer<typeof ItemSchema>