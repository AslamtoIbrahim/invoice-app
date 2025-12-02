import { authClient } from '@/features/auth/lib/auth-client';
import NavBar from '@/features/dashboard/components/navbar';
import { Spinner } from '@/shared/components/ui/spinner';
import { Outlet, useNavigate } from 'react-router-dom';

function DashboardPage() {
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
  return (
    <div className='lg:flex overflow-hidden  w-full page-wrapper'>
      <NavBar />
      {/* <Dashboard /> */}
      <Outlet />
    </div>
  );
}

export default DashboardPage;
