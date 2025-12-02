import { Spinner } from "@/shared/components/ui/spinner";
import { cn, containerAnime, itemAnime } from "@/shared/lib/utils";
import { useFetchInvoices } from "../hooks/use-invoice";
import InvoiceItem from "./ui/invoice-item";
import { StatusContext } from "../store/status-context";
import { use } from "react";
import type { Status } from "../lib/types/status.type";
import { motion } from "framer-motion";

type ContentProps = React.ComponentProps<'div'> & { className?: string; }


function Content({ className, ...props }: ContentProps) {
  const { status } = use(StatusContext)
  const { data, error, isPending } = useFetchInvoices(status as Status)
  if (error) {
    return null
  }
  if (isPending) {
    return <div className="h-[calc(100vh-12rem)] flex items-center justify-center">
      <Spinner />
    </div>
  }
  return <div className={cn('', className)} {...props}>
    <motion.div variants={containerAnime}
      key={status}
      className="p-4 space-y-4"
      initial="hidden"
      animate="show">
      {
        data.pages.map(p => p.invoices.map(v => <motion.div key={v.id} variants={itemAnime}>
          <InvoiceItem key={v.id} invoice={v} />
        </motion.div>))
      }
    </motion.div>
  </div>
}


export default Content;