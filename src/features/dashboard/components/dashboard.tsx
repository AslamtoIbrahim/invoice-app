import { cn, dashboardVariants, slide } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import StatusProvider from "../store/status-provider";
import Content from "./content";
import InvoiceField from "./invoice-form";
import ButtonAdd from "./ui/button-add";
import InvoicePanel from "./ui/invoice-panel";

type DashboardProps = React.ComponentProps<'div'> & { className?: string; }


function Dashboard({ className, ...props }: DashboardProps) {
    const [isFormActive, setIsFormActive] = useState(false);
 
    function handleAddInvoice() {
        setIsFormActive(pr => !pr)
    }

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={dashboardVariants}
            transition={{ duration: 0.5 }}
        >
            <StatusProvider>
                <div className={cn('md:px-8 md:max-w-3xl md:mx-auto md:mt-8 lg:flex-1 lg:max-w-5xl lg:mx-auto lg:mt-12 xl:max-w-6xl', className)} {...props}>
                    <InvoicePanel onAddInvoice={handleAddInvoice} />
                    <Content />
                    <ButtonAdd onClick={handleAddInvoice} />
                    {isFormActive && <div onClick={() => setIsFormActive(false)} className="fixed z-40 inset-0 bg-background/50" />}
                    <InvoiceField onCloseFormInvoice={() => setIsFormActive(false)}
                        className={slide(isFormActive)} />
                </div>
            </StatusProvider>
        </motion.div>
    )
}


export default Dashboard;