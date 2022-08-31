import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GithubProvider from "next-auth/providers/github";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
});

// import NextAuth from "next-auth"
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
// import clientPromise from "../../../lib/mongodb"

// // For more information on each option (and a full list of options) go to
// // https://next-auth.js.org/configuration/options
// export default NextAuth({
//   adapter: MongoDBAdapter(clientPromise),
//   ...
// })
