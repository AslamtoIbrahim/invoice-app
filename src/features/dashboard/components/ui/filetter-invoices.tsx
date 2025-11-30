import { animate, cn } from "@/shared/lib/utils";
import ButtonIcon from "./button-icon";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import StatusesFilter from "./statuses-filter";

type FilterInvoicesProps = React.ComponentProps<'div'> & { className?: string; }


function FilterInvoices({ className, ...props }: FilterInvoicesProps) {
    const [isFiletrOn, setIsFiletrOn] = useState(false);

    const handleOnSelecteStatus = (status: string) => {
      console.log('res: ',status);
    };

    return <div className={cn('relative', className)} {...props}>
        <ButtonIcon onClick={() => setIsFiletrOn(!isFiletrOn)} className="flex items-center justify-between md:gap-10">
            <span className="text-lg font-semibold">Filter</span>
            <ChevronDown className="shrink-0" />
        </ButtonIcon>
        {isFiletrOn && (
            <div onClick={() => setIsFiletrOn(false)} className="fixed inset-0" />
        )}
        <StatusesFilter onSelecteStatus={handleOnSelecteStatus} className={animate(isFiletrOn)} />
    </div>
}


export default FilterInvoices;