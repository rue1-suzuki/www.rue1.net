import NextAuth from "next-auth"
import AppleProvider from 'next-auth/providers/apple'
import DiscordProvider from "next-auth/providers/discord"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"

export const { handlers, signIn, signOut, auth, } = NextAuth({
  providers: [
    AppleProvider,
    DiscordProvider,
    GithubProvider,
    GoogleProvider,
    TwitterProvider,
  ],
})
