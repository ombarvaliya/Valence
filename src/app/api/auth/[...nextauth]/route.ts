import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // --- START OF DETAILED LOGGING ---
        console.log("\n--- Authorize Function Triggered ---"); 
        try {
          if (!credentials?.email || !credentials.password) {
            console.log("[AUTH-LOG] authorize: FAILED - Missing email or password.");
            return null;
          }
          console.log(`[AUTH-LOG] authorize: Attempting login for email: ${credentials.email}`);

          await dbConnect();
          console.log("[AUTH-LOG] authorize: Database connection successful.");
          
          const user = await User.findOne({ email: credentials.email }).select('+password');

          if (!user) {
            console.log(`[AUTH-LOG] authorize: FAILED - No user found for email: ${credentials.email}`);
            return null;
          }
          console.log(`[AUTH-LOG] authorize: User found in database: ${user.name}`);
          
          // Note: user.password will be the hashed password from the DB
          const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordMatch) {
            console.log(`[AUTH-LOG] authorize: FAILED - Incorrect password for user: ${user.email}`);
            return null;
          }

          console.log(`[AUTH-LOG] authorize: SUCCESS - Passwords match for user: ${user.email}`);
          console.log("--- Authorize Function Finished Successfully ---\n");
          return { id: user._id.toString(), name: user.name, email: user.email };

        } catch (error) {
          console.error("[AUTH-LOG] authorize: CATASTROPHIC ERROR - An unexpected error occurred:", error);
          console.log("--- Authorize Function Finished with ERROR ---\n");
          return null;
        }
        // --- END OF DETAILED LOGGING ---
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user) (session.user as any).id = token.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };