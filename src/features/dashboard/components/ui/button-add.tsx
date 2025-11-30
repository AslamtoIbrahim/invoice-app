import { cn } from "@/shared/lib/utils";
import { Plus } from "lucide-react";

type ButtonAddProps = React.ComponentProps<'button'> & { className?: string; }


function ButtonAdd({ className, ...props }: ButtonAddProps) {
    return (
        <button className={cn('fixed right-4 bottom-4 bg-primary rounded-full shadow-2xl md:hidden', className)} {...props}>
            <Plus className='text-background m-2' />
        </button>
    )
}


export default ButtonAdd;