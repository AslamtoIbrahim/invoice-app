import { Spinner } from "@/shared/components/ui/spinner";
import { cn, containerAnime, itemAnime } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import { use, useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import { useFetchInvoices } from "../hooks/use-invoice";
import type { Status } from "../lib/types/status.type";
import { StatusContext } from "../store/status-context";
import InvoiceItem from "./ui/invoice-item";

type ContentProps = React.ComponentProps<'div'> & { className?: string; }


function Content({ className, ...props }: ContentProps) {
  const { status } = use(StatusContext)
  const [enableInitial, setEnableInitial] = useState(true);
  const { data, error, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchInvoices(status as Status)
  useEffect(() => {
    setEnableInitial(true)
  }, [status]);

  useEffect(() => {
    setEnableInitial(false)
  }, [data]);

  function handleOnChange(inView: boolean) {
    if (inView && hasNextPage) {
      setEnableInitial(false)
      fetchNextPage()
    }
  }
  if (error) {
    return null
  }
  if (isPending) {
    return <div className="h-[calc(100vh-12rem)] flex items-center justify-center">
      <Spinner />
    </div>
  }
  return <div className={cn('overflow-auto h-[calc(100vh-12rem)]', className)} {...props}>
    <motion.div variants={containerAnime}
      key={status}
      className="p-4 space-y-4  "
      animate="show"
      // initial="hidden"
      initial={enableInitial ? "hidden" : false}
    // initial={!isFetching ? "hidden" : false}
    >
      {
        data.pages.map(p => p.invoices.map(v => <motion.div
          key={v.id} variants={itemAnime}>
          <InvoiceItem key={v.id} invoice={v} />
        </motion.div>))
      }
    </motion.div>
    {hasNextPage && !isFetchingNextPage &&
      <InView className="w-full flex justify-center" onChange={handleOnChange}>
        <Spinner />
      </InView>}
  </div>
}


export default Content;