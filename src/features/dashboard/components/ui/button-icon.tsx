import { cn } from "@/shared/lib/utils";

type ButtonIconProps = React.ComponentProps<'button'> & { className?: string; }


function ButtonIcon({ className, ...props }: ButtonIconProps) {
    return <button className={cn('flex items-center gap-2 p-1 w-[calc(100%-0.5rem)] m-1 hover:rounded text-sm hover:bg-foreground/10 ', className)} {...props}>
    </button>;
}

export default ButtonIcon;