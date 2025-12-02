import type z from "zod";
import type { InvoiceCreateSchema, InvoiceReadSchema, InvoiceFormSchema, InvoiceUpdateSchema } from "../schemas/invoice.schema";


export type InvoiceRead = z.infer<typeof InvoiceReadSchema>

export type InvoiceCreate = z.infer<typeof InvoiceCreateSchema>

export type InvoiceUpdate = z.infer<typeof InvoiceUpdateSchema>

export type InvoiceField = z.infer<typeof InvoiceFormSchema>

export type InvoiceAxiosResponse = {
    invoices: InvoiceRead[];
    nextCursor: string | null;
}