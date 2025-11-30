import { cn, fixDate, fixPrice } from "@/shared/lib/utils";
import Status from "./status";
import type { InvoiceRead } from "../../lib/types/invoice.types";
import { useNavigate } from "react-router-dom";
import { calcTotal } from "../../lib/utils/utils";

type InvoiceItemProps = React.ComponentProps<'div'> & {
    className?: string;
    invoice: InvoiceRead
}


function InvoiceItem({ className, invoice, ...props }: InvoiceItemProps) {
    const navigate = useNavigate()

    function handleClick() {
        navigate(`/invoice/${invoice.id}`)
    }


    return <div onClick={handleClick} className={cn('bg-popover p-4 rounded-lg',
        'grid grid-cols-2 gap-x-4 gap-y-2 place-items-start ',
        'md:flex md:items-center md:justify-evenly', className)} {...props}>
        <p className="font-semibold"><span className="text-chart-2">#</span>{invoice.code}</p>
        <p className="text-secondary-foreground font-light clo-start-1 row-start-2 ">Due {fixDate(invoice.date)}</p>
        <p className="font-light col-span-1 row-span-1 justify-self-end truncate w-30">{invoice.billTo.name}</p>
        <p className="font-bold text-lg ">£{fixPrice(calcTotal(invoice.items))}</p>
        <Status value={invoice.status} className="col-start-2 row-start-2 row-span-2 self-center justify-self-end" />
    </div>
}


export default InvoiceItem;