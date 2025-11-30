import Logo from './ui/logo';
import User from './ui/user';

function NavBar() {
  return (
    <div className="bg-popover flex  items-center justify-between shadow-xs 
    lg:flex-col lg:h-screen lg:w-fit">
      <Logo />
      <User />
    </div>
  );
}

export default NavBar;
