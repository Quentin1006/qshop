import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter";
// import EmailProvider from "next-auth/providers/email"
import Auth0Provider from "next-auth/providers/auth0";
import GoogleProvider from "next-auth/providers/google";

// NextAuth doesnt sign you out from your provider

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, {
    adapter: TypeORMLegacyAdapter({
      type: "postgres",
      host: "localhost",
      username: "qshop",
      password: "qshop",
      database: "qshop",
      applicationName: "qshop",
    }),
    providers: [
      // EmailProvider({
      // }),
      // @TODO: Set as env variable
      Auth0Provider({
        clientId: "655763646496-hufk1gpashres1cud7r04305nt77u094.apps.googleusercontent.com",
        clientSecret:
          "jl4-dkmP6tv6HBlJ8gIiIj-DBrmC5wand010c9JU3WbF8bAjoGzA9tEsocqgkYMv",
        issuer: "https://quentin-sahal.eu.auth0.com",
      }),
      GoogleProvider({
        clientId:
          "655763646496-hufk1gpashres1cud7r04305nt77u094.apps.googleusercontent.com",
        clientSecret: "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",
      }),
    ],
    session: {
      // Choose how you want to save the user session.
      // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
      // If you use an `adapter` however, we default it to `"database"` instead.
      // You can still force a JWT session by explicitly defining `"jwt"`.
      // When using `"database"`, the session cookie will only contain a `sessionToken` value,
      // which is used to look up the session in the database.
      strategy: "database",

      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 30 * 24 * 60 * 60, // 30 days

      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      // Note: This option is ignored if using JSON Web Tokens
      updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
      // The maximum age of the NextAuth.js issued JWT in seconds.
      // Defaults to `session.maxAge`.
      maxAge: 60 * 60 * 24 * 30,
      // You can define your own encode/decode functions for signing and encryption
      // async encode() {},
      // async decode() {},
    },
    // custom pages url
    // pages: {
    //   signIn: "/auth/signin",
    //   signOut: "/auth/signout",
    //   error: "/auth/error", // Error code passed in query string as ?error=
    //   verifyRequest: "/auth/verify-request", // (used for check email message)
    //   newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
    // },
    // callbacks: {
    //     async signIn({ user, account, profile, email, credentials }) {
    //       return true
    //     },
    //     async redirect({ url, baseUrl }) {
    //       return baseUrl
    //     },
    //     async session({ session, token, user }) {
    //       return session
    //     },
    //     async jwt({ token, user, account, profile, isNewUser }) {
    //       return token
    //     }
    //   },
    events: {
      async signIn(message) {
        /* on successful sign in */
      },
      async signOut(message) {
        /* on signout */
      },
      async createUser(message) {
        /* user created */
      },
      async updateUser(message) {
        /* user updated - e.g. their email was verified */
      },
      async linkAccount(message) {
        /* account (e.g. Twitter) linked to a user */
      },
      async session(message) {
        /* session is active */
      },
    },
    theme: {
      colorScheme: "auto", // "auto" | "dark" | "light"
      brandColor: "#C0C0C0", // Hex color code
      logo: "http://localhost:3000/logo.png", // Absolute URL to image
      buttonText: "#808080", // Hex color code
    },
  });
}
