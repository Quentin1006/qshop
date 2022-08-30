'use-client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { upperFirst } from '@/helpers/string.helper';

export type HeaderConnectProps = {
  user: any;
};

export default function HeaderConnect({ user }: HeaderConnectProps) {
  console.log('HeaderConnect', { user });
  return (
    <div className="flex flex-col items-start">
      <div className="text-xs font-thin">
        {user ? `Bonjour ${upperFirst(user.given_name as any)}` : 'Bonjour, Identifiez-vous'}
      </div>
      <div>Compte et listes</div>
    </div>
  );
}
