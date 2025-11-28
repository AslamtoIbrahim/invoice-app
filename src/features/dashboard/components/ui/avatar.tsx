import { cn } from '@/shared/lib/utils';
import React, { useState } from 'react';

type AvatarProps = React.ComponentProps<'div'> & {
  className?: string;
  src?: string | null | undefined;
  username?: string;
};

function Avatar({ className, src, username, ...props }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  return (
    <div
      className={cn(
        'bg-muted flex size-12 cursor-pointer items-center justify-center overflow-hidden rounded-md',
        className,
      )}
      {...props}
    >
      {!imgError && src ? (
        <img src={src} onError={() => setImgError(true)} />
      ) : (
        <div className="bg-primary text-background flex h-full w-full items-center justify-center pt-1 text-xl font-semibold">
          <p>{username ? username.charAt(0).toUpperCase() : 'U'}</p>
        </div>
      )}
    </div>
  );
}

export default Avatar;



 