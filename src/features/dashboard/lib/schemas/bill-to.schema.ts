import z from "zod";

export const BillToSchema = z.object({
    name: z.string().min(3).nonempty(),
    email: z.email(),
    street: z.string().min(3).nonempty(),
    city: z.string().min(3).nonempty(),
    postCode: z.string().min(3).nonempty(),
    country: z.string().min(3).nonempty(),
})