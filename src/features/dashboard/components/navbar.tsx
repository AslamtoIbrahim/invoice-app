import Logo from './ui/logo';
import User from './ui/user';

function NavBar() {
  return (
    <div className="bg-popover flex  items-center justify-between shadow-xs">
      <Logo />
      <User />
    </div>
  );
}

export default NavBar;
