import { animate, cn } from "@/shared/lib/utils";
import ButtonIcon from "./button-icon";
import { ChevronDown } from "lucide-react";
import { use, useState } from "react";
import StatusesFilter from "./statuses-filter";
import { StatusContext } from "../../store/status-context";

type FilterInvoicesProps = React.ComponentProps<'div'> & { className?: string; }


function FilterInvoices({ className, ...props }: FilterInvoicesProps) {
    const [isFiletrOn, setIsFiletrOn] = useState(false);
    const {status, setStatus } = use(StatusContext)
    const handleOnSelecteStatus = (status: string) => {
        setStatus(status.toUpperCase())
    };

    return <div className={cn('relative ', className)} {...props}>
        <ButtonIcon onClick={() => setIsFiletrOn(!isFiletrOn)} className="flex items-center px-2 justify-between md:gap-10">
            <span className="md:text-lg/2 font-sans capitalize w-10">{status ? status.toLocaleLowerCase() : "Filter"}</span>
            <ChevronDown className="shrink-0" />
        </ButtonIcon>
        {isFiletrOn && (
            <div onClick={() => setIsFiletrOn(false)} className="fixed inset-0" />
        )}
        <StatusesFilter onSelecteStatus={handleOnSelecteStatus} className={animate(isFiletrOn)} />
    </div>
}


export default FilterInvoices;