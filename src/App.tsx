import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
import Dashboard from './features/dashboard/components/dashboard';
import Details from './features/dashboard/components/details';
import DashboardPage from './page/dashboard-page';
import LoginPage from './page/login-page';
import SignupPage from './page/signup-page';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/',
    element: <DashboardPage />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'invoice/:id',
        element: <Details />,
      },
    ]
  },
]);


const queryClient = new QueryClient()


function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
