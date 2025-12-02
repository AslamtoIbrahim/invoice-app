import { cn } from "@/shared/lib/utils";
import { useFetchInvoices } from "../../hooks/use-invoice";

type OverviewInvoicesProps = React.ComponentProps<'div'> & { className?: string; }


function OverviewInvoices({ className, ...props }: OverviewInvoicesProps) {
    const {data, error, isPending } = useFetchInvoices()
    if (error || isPending) {
        return null
    }
    const total = data.pages.map(p => p.invoices).flat().length
      
    return <div className={cn('', className)} {...props}>
        <h1 className="text-3xl font-semibold">Invoices</h1>
        <p className="text-foreground/70">There are {total} total invoices</p>
    </div>
}


export default OverviewInvoices;