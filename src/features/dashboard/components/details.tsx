import { Button } from "@/features/auth/components/ui/button";
import { cn, fixDate } from "@/shared/lib/utils";
import { ChevronLeftIcon, Edit, Trash } from "lucide-react";
import BillItem from "./ui/bill-item";
import Status from "./ui/status";
import { useNavigate } from "react-router-dom";
import { defInvoice } from "../lib/utils/constants";

type DetailsProps = React.ComponentProps<'div'> & { className?: string; }


function Details({ className, ...props }: DetailsProps) {
    const navigate = useNavigate()
    const invoice = defInvoice

    return <div className={cn('p-4 space-y-4 lg:flex-1 md:mt-8 lg:mt-12', className)} {...props}>
        <div className="bg-popover p-4 margins rounded-lg flex items-center justify-between mb-4">
            <p className="font-light text-secondary-foreground">Status</p>
            <Status value={invoice.status} />
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
                    <p className="font-semibold">Due {fixDate(new Date(invoice.paymentTerm))}</p>
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
            <Button onClick={() => navigate(-1)} variant={'ghost'} className="w-22 mr-auto">
                <ChevronLeftIcon className="text-secondary-foreground size-4" />
                Back
            </Button>
            <Button variant={'destructive'} className="w-22">
                <Trash className="text-secondary-foreground size-4" />
                Delete
            </Button>
            <Button variant={'secondary'} className="w-22">
                <Edit className="text-secondary-foreground size-4" />
                Edit
            </Button>
        </div>
    </div>
}


export default Details;