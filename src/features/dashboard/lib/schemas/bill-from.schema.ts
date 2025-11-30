import z from "zod";

export const BillFromSchema = z.object({
    street: z.string().min(4).nonempty(),
    city: z.string().min(4).nonempty(),
    postCode: z.string().min(3).nonempty(),
    country: z.string().min(3).nonempty(),
})