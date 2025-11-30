import { cn } from "@/shared/lib/utils";

type OverviewInvoicesProps = React.ComponentProps<'div'> & { className?: string; }


function OverviewInvoices({ className, ...props }: OverviewInvoicesProps) {
    return <div className={cn('', className)} {...props}>
        <h1 className="text-3xl font-semibold">Invoices</h1>
        <p className="text-foreground/70">There are 8 total invoices</p>
    </div>
}


export default OverviewInvoices;