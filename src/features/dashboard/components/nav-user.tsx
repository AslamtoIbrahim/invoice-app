import type { User } from '@/features/auth/lib/types/auth.type';
import { cn } from '@/shared/lib/utils';
import { Bell, Info, LogOutIcon, Sparkle } from 'lucide-react';
import React from 'react';
import Avatar from './ui/avatar';
import ButtonIcon from './ui/button-icon';
import ButtonTheme from './ui/button-theme';

type NavUserProps = React.ComponentProps<'div'> & {
  className?: string;
  src?: string | null | undefined;
  user?: User;
  onClickSignOut: () => void;
};
function NavUser({ className, user, onClickSignOut, ...props }: NavUserProps) {
  if (!user) {
    return null
  }
  return (
    <div
      className={cn(
        'bg-popover absolute z-50 right-2 mt-2 lg:bottom-6 lg:left-17  w-48 rounded-md shadow-lg py-2',
        className,
      )}
      {...props}
    >
      <div className='flex items-center gap-2 px-2'>
        <Avatar username={user.name} src={user?.image} className='size-8' />
        <div className='text-[10px] '>
          <p className='font-bold truncate'>{user?.name}</p>
          <p className='truncate'>{user?.email}</p>
        </div>
      </div>
      <hr className='mt-2' />
      <ButtonIcon>
        <Sparkle className="text-foreground/50 size-4" />
        <p>Upgrade to Pro</p>
      </ButtonIcon>
      <hr />
      <ButtonIcon>
        <Bell className="text-foreground/50 size-4" />
        <p>Notifications</p>
      </ButtonIcon>
      <ButtonIcon
        onClick={() =>
          window.open('https://github.com/AslamtoIbrahim', '_blank')
        }
      >
        <Info className="text-foreground/50 size-4" />
        <p>About us</p>
      </ButtonIcon>
      <ButtonTheme />
      <hr />
      <ButtonIcon onClick={onClickSignOut}>
        <LogOutIcon className="text-foreground/50 size-4" />
        <p>Log out</p>
      </ButtonIcon>
    </div>
  );
}

export default NavUser;
