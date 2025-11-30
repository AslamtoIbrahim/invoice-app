import { cn } from "@/shared/lib/utils";
import ButtonIcon from "./button-icon";
import { Plus } from "lucide-react";

type ButtonAddLaptopProps = React.ComponentProps<'div'> & { className?: string; }


function ButtonAddLaptop({ className, ...props }: ButtonAddLaptopProps) {
    return <div className={cn('hidden md:block', className)} {...props}>
        <ButtonIcon className="flex px-4 items-center bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl hover:rounded-xl py-2 flex-0 text-lg font-semibold ">
            <Plus />
            <span className="ml-2 hidden md:inline text-nowrap">New Invoice</span>
        </ButtonIcon>
    </div>
}


export default ButtonAddLaptop;