// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  console.log('req.url -> :', req.url);
  const session = await getSession(req, res);

  console.log('rrt ->', JSON.stringify(session));
  // @QUESTION: Pourquoi le timestamp n'est pas le meme dans le jwt et dans le accessTokenExpires
  // Un fixé par le provider google, l'autre par la lib auth0 ?
  const headers = {
    Authorization: `Bearer ${session?.idToken}`,
  };
  const result = await fetch('http://localhost:8088/protected', {
    headers,
  })
    .then((result) => {
      if (result.status >= 400) {
        console.log('result status is above 400');
        res.setHeader(
          'Set-Cookie',
          'appSession=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/',
        );
      }
      return result.json();
    })
    .catch((result) => {
      console.log(result);
    });

  res.status(200).json(result);
}
