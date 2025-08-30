import 'next-auth';

// This file extends the default types provided by NextAuth.js

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's name. */
      name: string;
      /** The user's email address. */
      email: string;
      /** The user's unique ID from the database. */
      id: string; 
    }
  }

  /** The JWT payload */
  interface User {
    id: string;
  }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** The user's unique ID */
        id: string;
    }
}