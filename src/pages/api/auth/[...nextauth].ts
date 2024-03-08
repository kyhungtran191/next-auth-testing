import NextAuth from "next-auth";
// Provider
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "johnsmith" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     console.log(credentials);
    //     let user = {
    //       username: credentials?.username,
    //       password: credentials?.password,
    //     };
    //     return Promise.resolve(user)
    //       .then((res) => res)
    //       .catch(() => null);
    //   },
    // }),
    // ...add more providers here
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      profile: (profile, tokens) => {
        console.log(tokens);
        if (profile) {
          console.log(profile);
          return {
            id: profile.sub,
            name: profile.firstName,
            lastName: profile.family_name,
            firstName: profile.given_name,
            image: profile.picture,
          };
        } else {
          throw new Error("Login Failed");
        }
      },
    }),
  ],
};
export default NextAuth(authOptions);
