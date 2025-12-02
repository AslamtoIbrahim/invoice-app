import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { cn } from "@/shared/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

const statuses = ["paid", "pending", "draft"];

type StatusesFilterProps = React.ComponentProps<'div'> & {
    className?: string;
    onSelecteStatus: (status: string) => void;
}


function StatusesFilter({ className, onSelecteStatus, ...props }: StatusesFilterProps) {
    const [value, setValue] = useState("");
    const handleOnValueChange = (status: string) => {
        if (status === value) {
            setValue("");
            onSelecteStatus("");
            return
        }
        setValue(status);
        onSelecteStatus(status);

    };
    return <div className={cn('bg-popover absolute right-2 mt-2 md:top-8 md:w-30 md:left-0  rounded-md p-4 pr-10 shadow-lg  ', className)} {...props}>
        <RadioGroup value={value}>
            {statuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                    <RadioGroupItem
                        value={status}
                        id={status}
                        onClick={() => handleOnValueChange(status)} />
                    <Label className="capitalize" htmlFor={status}>{status}</Label>
                </div>
            ))}
        </RadioGroup>
    </div>
}


export default StatusesFilter;