import { cn, slide } from "@/shared/lib/utils";
import { useState } from "react";
import Content from "./content";
import InvoiceForm from "./invoice-form";
import ButtonAdd from "./ui/button-add";
import InvoicePanel from "./ui/invoice-panel";

type DashboardProps = React.ComponentProps<'div'> & { className?: string; }


function Dashboard({ className, ...props }: DashboardProps) {
    const [isFormActive, setIsFormActive] = useState(false);
    function handleAddInvoice() {
        setIsFormActive(pr => !pr)
    }

    return <div className={cn('md:px-8 md:max-w-3xl md:mx-auto md:mt-8 lg:flex-1 lg:max-w-5xl lg:mx-auto lg:mt-12 xl:max-w-6xl', className)} {...props}>
        <InvoicePanel onAddInvoice={handleAddInvoice} />
        <Content />
        <ButtonAdd onClick={handleAddInvoice} />
        {isFormActive && <div onClick={() => setIsFormActive(false)} className="fixed z-40 inset-0 bg-background/50" />}
        <InvoiceForm onCloseFormInvoice={() => setIsFormActive(false)} className={slide(isFormActive)} />
    </div>
}


export default Dashboard;