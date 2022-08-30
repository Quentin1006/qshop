import {
  handleAuth,
  handleLogin,
  handleCallback,
  AfterCallbackAppRoute,
  Session,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

// export default handleAuth({
//   signup: handleLogin({ authorizationParams: { screen_hint: 'signup' } }),

//   async callback(req, res) {
//     console.log('callback');
//     await handleCallback(req, res);
//   },
// });

const afterCallback: AfterCallbackAppRoute = async (
  req: NextRequest,
  session: Session,
  state: unknown,
) => {
  console.log({ input: JSON.stringify({ session, state }) });
  // user is probably not registered
  const {
    sub,
    email,
    given_name,
    family_name,
    created_at,
    updated_at,
    picture,
  } = session.user;
  console.log({ user: JSON.stringify(session.user) });
  await fetch('http://localhost:8088/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      id: sub,
      email,
      createdAt: created_at, // not defined
      updatedAt: updated_at,
      firstname: given_name,
      lastname: family_name,
      picture,
    }),
  });

  return session;
};

export const GET = handleAuth({
  login: (req: NextApiRequest, res: NextApiResponse) => {
    console.log('calling login');
    return handleLogin(req, res);
  },
  callback: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      console.log('custom callback');
      return await handleCallback(req, res, { afterCallback });
    } catch (error: unknown) {
      console.log({ error });
      res
        .setHeader('Location', `/error?code=${(error as Error).cause}`)
        .status(302)
        .end();
    }
  },
});
