import type { Items } from "../types/item.type";

export function calcTotal(items: Items[]) {
    return items.reduce((sum, item) => sum + (Number(item.qty) * Number(item.price)), 0)

}