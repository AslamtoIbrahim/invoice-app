import { cn } from "@/shared/lib/utils";
import InvoiceItem from "./ui/invoice-item";
import { defInvoice } from "../lib/utils/constants";

type ContentProps = React.ComponentProps<'div'> & { className?: string;}


function Content({ className, ...props }: ContentProps) {
  return <div className={cn('p-4 space-y-4',className)} {...props}>
    <InvoiceItem invoice={defInvoice} />
     
</div>
}


export default Content;