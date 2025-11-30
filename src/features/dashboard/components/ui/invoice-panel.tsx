import { cn } from "@/shared/lib/utils";
import ButtonAddLaptop from "./button-add-laptop";
import FilterInvoices from "./filetter-invoices";
import OverviewInvoices from "./overview-invoices";

type InvoicePanelProps = React.ComponentProps<'div'> & { className?: string;
    onAddInvoice?: () => void;
 }


function InvoicePanel({ className, onAddInvoice, ...props }: InvoicePanelProps) {
    return <div className={cn('flex items-center justify-between md:gap-x-4 p-4', className)} {...props}>
        <OverviewInvoices className="flex-1" />
        <FilterInvoices className="flex-1 shrink-0 md:flex-0" />
        <ButtonAddLaptop onClick={onAddInvoice} />
    </div>
}


export default InvoicePanel;