import z from "zod";


export const ItemSchema = z.object({
    _tempId: z.string().optional(),
    name: z.string().min(1),
    qty: z.string().min(1),
    price: z.string().min(1),
})