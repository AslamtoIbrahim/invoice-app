import { cn } from "@/shared/lib/utils";
import type { Items } from "../../lib/types/item.type";
import { fixPrice } from "../../lib/utils/utils";

type ItemProps = React.ComponentProps<'div'> & {
  className?: string;
  item: Items
}


function Item({ className, item, ...props }: ItemProps) {
  return (<div className={cn('flex items-center text-secondary-foreground font-light justify-between', className)} {...props}>
    <p className="flex-2">{item.name}</p>
    <p className="flex-1 text-center hidden md:block">{Number(item.qty)}</p>
    <p className="flex-1 text-end hidden md:block">£{fixPrice(Number(item.price))}</p>
    <p className="flex-1 text-end">£{fixPrice(Number(item.price) * Number(item.qty))}</p>
  </div>)
}


export default Item;