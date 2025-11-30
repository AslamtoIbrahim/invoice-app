import { cn, styleByStatus } from "@/shared/lib/utils";
import { BsCircleFill } from "react-icons/bs";

type StatusProps = React.ComponentProps<'div'> & {
    className?: string;
    value: "PAID" | "PENDING" | "DRAFT";
    
}


function Status({ className, value, ...props }: StatusProps) {
    return <div className={cn(`flex items-center py-2 w-28 justify-center gap-2 rounded-lg `, styleByStatus(value), className)} {...props}>
        <BsCircleFill size={8} />
        <span className="capitalize text-lg font-semibold">{value.toLowerCase()}</span>
    </div>
}


export default Status;