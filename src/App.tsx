import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import DashboardPage from './page/dashboard-page';
import LoginPage from './page/login-page';
import SignupPage from './page/signup-page';

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
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
