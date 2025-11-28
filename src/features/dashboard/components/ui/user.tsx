import { authClient } from '@/features/auth/lib/auth-client';
import { animate } from '@/shared/lib/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavUser from '../nav-user';
import Avatar from './avatar';

function User() {
  const { data: session, isPending, error } = authClient.useSession();
  const navigate = useNavigate();
  const [isUserOn, setIsUserOn] = useState(false);

  if ((session === null && !isPending) || error) {
    navigate('/login');
    return null;
  }
  const handleSignOutClick = async () => {
    await authClient.signOut().then(({ data, error }) => {
      if (error) {
        console.log('Error signing out: ', error)
        navigate('*')
      } else {
        if (data.success) navigate('/login')
        console.log('data out: ', data)
      }
    })
  };
  return (
    <div className="relative px-2">
      <Avatar
        onClick={() => setIsUserOn(!isUserOn)}
        src={session?.user.image}
        username={session?.user.name}
      />
      {isUserOn && (
        <div onClick={() => setIsUserOn(false)} className="fixed inset-0" />
      )}
      <NavUser onClickSignOut={handleSignOutClick} user={session?.user} className={animate(isUserOn)} />
    </div>
  );
}

export default User;
