import { Button } from "@/shared/components/ui/button";
import Dialog from "@/shared/components/ui/dialog";
import { Spinner } from "@/shared/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { cn, detailVariants, slide } from "@/shared/lib/utils";
import { addDays } from "date-fns";
import { motion } from "framer-motion";
import { CheckCheck, ChevronLeftIcon, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteInvoice, useFetchInvoiceById, useUpdateInvoice } from "../hooks/use-invoice";
import { fixDate } from "../lib/utils/utils";
import InvoiceForm from "./invoice-form";
import BillItem from "./ui/bill-item";
import DeleteDialog from "./ui/delete-dialog";
import Status from "./ui/status";

type DetailsProps = React.ComponentProps<'div'> & { className?: string; }


function Details({ className, ...props }: DetailsProps) {
    const { id } = useParams()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isFormActive, setIsFormActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const updateInvoice = useUpdateInvoice()
    const deleteIvoice = useDeleteInvoice()

    const { data: invoice, error, isPending } = useFetchInvoiceById(id)
    function handleAddInvoice() {
        setIsFormActive(pr => !pr)
    }

    function handleDeleteInvoice(): void {
        setLoading(true)
        const id = invoice?.id
        if (id) {
            deleteIvoice.mutate(id, {
                onSuccess() {
                    setIsDeleteDialogOpen(false);
                    navigate(-1);
                    setLoading(false)
                }
            })
        }
    }

    function handleUpdateStatus(): void {
        setLoading(true)
        if (invoice?.id) {
            updateInvoice.mutate({ id: invoice.id, invoice: { status: 'PAID' } }, {
                onSuccess(inv) {
                    console.log('msg', inv);
                    setLoading(false)
                }
            })
            return
        }
    }

    if (error) {
        console.log('error', error.message);
        return null
    }
    if (isPending) {
        return <div className="h-[calc(100vh-12rem)] flex items-center justify-center">
            <Spinner />
        </div>
    }

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={detailVariants}
            transition={{ duration: 0.5 }}
        >
            <div className={cn('p-4 space-y-4 lg:flex-1 md:mt-8 lg:mt-12', className)} {...props}>
                <div className="bg-popover p-4 margins rounded-lg flex items-center justify-between mb-4">
                    {/* <p className="font-light text-secondary-foreground">Status</p> */}
                    <Button onClick={() => navigate(-1)} variant={'ghost'} className="w-22 mr-auto">
                        <ChevronLeftIcon className="text-secondary-foreground size-4" />
                        Back
                    </Button>
                    <Tooltip>
                        <TooltipTrigger> <Status value={invoice.status} /></TooltipTrigger>
                        <TooltipContent>
                            <p>Current status</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className="bg-popover p-4 rounded-lg space-y-4 py-6 margins">
                    <div className="flex justify-between">
                        <div>
                            <p className="font-semibold"><span className="text-chart-2">#</span>{invoice.code}</p>
                            <p className="text-secondary-foreground font-light">{invoice.description}</p>
                        </div>
                        <div className="text-secondary-foreground font-light text-end">
                            <p >{invoice.billFrom.street}</p>
                            <p >{invoice.billFrom.city}</p>
                            <p >{invoice.billFrom.postCode}</p>
                            <p >{invoice.billFrom.country}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 md:justify-between">
                        <div>
                            <p className="text-secondary-foreground font-light">Invoice Date</p>
                            <p className="font-semibold">Due {fixDate(new Date(invoice.date))}</p>
                        </div>
                        <div className="text-end">
                            <p className="text-secondary-foreground font-light">Payment Due</p>
                            {/* <p className="font-semibold">Due {fixDate(new Date(invoice.paymentTerm))}</p> */}
                            <p className="font-semibold">Due {fixDate(addDays(invoice.date, Number(invoice.paymentTerm)))}</p>
                        </div>
                    </div>
                    <section className="space-y-4 md:flex md:justify-between md:pt-4">
                        <div className="font-light">
                            <p className="text-secondary-foreground">Bill To</p>
                            <p className="text-lg font-bold">{invoice.billTo.name}</p>
                            <p >{invoice.billTo.street}</p>
                            <p >{invoice.billTo.city}</p>
                            <p >{invoice.billTo.postCode}</p>
                            <p >{invoice.billTo.country}</p>
                        </div>
                        <div className="">
                            <p className="text-secondary-foreground font-light md:text-end">Sent To</p>
                            <p>{invoice.billTo.email}</p>
                        </div>
                    </section>
                    <BillItem items={invoice.items} />
                </div>


                <div className="bg-popover p-4 rounded-lg flex items-center justify-end gap-x-2 mb-4 margins ">

                    {invoice.status !== 'PAID' && <Button disabled={loading} onClick={handleUpdateStatus} variant={'default'} className="flex-1 md:flex-0 bg-chart-5">
                        <CheckCheck className="text-secondary-foreground size-4" />
                        <span className="hidden md:inline">Mark as</span>Paid
                    </Button>}
                    <Button disabled={loading} onClick={() => setIsDeleteDialogOpen(true)} variant={'destructive'} className="flex-1 md:flex-0  md:w-fit">
                        <Trash className="text-secondary-foreground size-4 " />
                        Delete
                    </Button>
                    <Button disabled={loading} onClick={handleAddInvoice} variant={'secondary'} className="flex-1 md:flex-0 md:w-fit">
                        <Edit className="text-secondary-foreground size-4" />
                        Edit
                    </Button>
                </div>

                <Dialog open={isDeleteDialogOpen} closeDialog={() => setIsDeleteDialogOpen(false)}>
                    <DeleteDialog title="invoice" cancelClick={() => setIsDeleteDialogOpen(false)}
                        deleteItem={handleDeleteInvoice} />
                </Dialog>

                {isFormActive && <div onClick={() => setIsFormActive(false)} className="fixed z-40 inset-0 bg-background/50" />}
                <InvoiceForm updateInvocie={invoice} onCloseFormInvoice={() => setIsFormActive(false)}
                    className={slide(isFormActive)} />
            </div>
        </motion.div>
    )
}


export default Details;