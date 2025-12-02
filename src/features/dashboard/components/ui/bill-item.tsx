import { cn } from "@/shared/lib/utils";
import type { Items } from "../../lib/types/item.type";
import Item from "./item";
import { calcTotal, fixPrice } from "../../lib/utils/utils";

type BillItemProps = React.ComponentProps<'div'> & {
    className?: string;
    items: Items[]
}


function BillItem({ className, items, ...props }: BillItemProps) {
    return <div className={cn('bg-primary/10  rounded-lg overflow-hidden ', className)} {...props}>
        <div className="flex items-center  justify-between px-4 py-2 text-secondary-foreground font-medium bg-background/10">
            <p className="flex-2">Item Client</p>
            <p className="flex-1 text-center hidden md:block">Qty.</p>
            <p className="flex-1 text-end hidden md:block">Price</p>
            <p className="flex-1 text-end">Total</p>
        </div>
        <section className="p-4 space-y-2">
            {
                items.map((item, index) => <Item key={index} item={item} />)
            }
        </section>
        <div className="flex items-center justify-between text-xl bg-background/70 p-4">
            <p className="font-semibold">Amount Due</p>
            <p className="font-black">£{fixPrice(calcTotal(items))}</p>
        </div>
    </div>
}


export default BillItem;