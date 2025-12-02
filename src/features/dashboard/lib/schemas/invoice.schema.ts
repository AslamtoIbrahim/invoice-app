import z from "zod";
import { BillFromSchema } from "./bill-from.schema";
import { BillToSchema } from "./bill-to.schema";
import { ItemSchema } from "./item.schema";
import { StatusSchema } from "./status.schema";


export const InvoiceReadSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  code: z.string(),
  billFrom: BillFromSchema,
  billTo: BillToSchema,
  date: z.date(),
  paymentTerm: z.string(),
  status: StatusSchema,
  description: z.string(),
  items: z.array(ItemSchema),
})

export const InvoiceCreateSchema = z.object({
  code: z.string(),
  billFrom: BillFromSchema,
  billTo: BillToSchema,
  date: z.date(),
  paymentTerm: z.string(),
  status: StatusSchema,
  description: z.string(),
  items: z.array(ItemSchema),
})

export const InvoiceUpdateSchema = InvoiceCreateSchema.partial()


export const InvoiceFormSchema = z.object({
    date: z.date(),
    billFrom: BillFromSchema,
    billTo: BillToSchema,
    paymentTerm: z.string(),
    // status: z.string(),
    description: z.string(),
    items: z.array(ItemSchema).min(1, "At least one item is required"),
})

 

