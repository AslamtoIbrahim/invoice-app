import type z from "zod";
import type { InvoiceReadSchema, InvoiceSchema } from "../schemas/invoice.schema";


export type InvoiceRead = z.infer<typeof InvoiceReadSchema>

export type Invoice = z.infer<typeof InvoiceSchema>