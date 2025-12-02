import { cn } from "@/shared/lib/utils";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { authClient } from "@/features/auth/lib/auth-client";
import { Spinner } from "@/shared/components/ui/spinner";

type RootLayoutProps = React.ComponentProps<'div'> & { className?: string; }


function RootLayout({ className, ...props }: RootLayoutProps) {
  const { data: session, isPending, error } = authClient.useSession();
  const navigate = useNavigate();

  if (session === null && !isPending) {
    navigate('/login');
    return null;
  }
  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Error occurred: {error.message}</p>
      </div>
    );
  }
  return <div className={cn('', className)} {...props}>
    <AnimatePresence mode="wait">
      <motion.div
        key={useLocation().pathname}
        // initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{ duration: 0.50 }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  </div>
}


export default RootLayout;