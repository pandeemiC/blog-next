import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      if (!profile || typeof profile.id === "undefined") {
        console.error(
          "GitHub profile or profile.id is undefined/invalid in signIn callback."
        );
        return false;
      }

      const { name, email, image } = user;

      const githubId: number = Number(profile.id);
      if (isNaN(githubId)) {
        console.error(
          "GitHub profile.id could not be converted to a number:",
          profile.id
        );
        return false;
      }

      const githubLogin: string = (profile as any).login;
      const githubBio: string | undefined = (profile as any).bio;

      try {
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: githubId,
          });

        if (!existingUser) {
          console.log(
            `Creating new user in Sanity with GitHub ID: ${githubId} (type: ${typeof githubId})`
          );
          await writeClient.create({
            _type: "author",
            id: githubId,
            name: name || githubLogin,
            username: githubLogin,
            email,
            image,
            bio: githubBio || "",
          });
        }
        return true;
      } catch (error) {
        console.error(
          "Error in signIn callback while fetching/creating user:",
          error
        );
        return false;
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile && typeof profile.id !== "undefined") {
        const githubId: number = Number(profile.id);
        if (isNaN(githubId)) {
          console.error(
            "GitHub profile.id in jwt could not be converted to a number:",
            profile.id
          );
          return token;
        }

        try {
          const sanityUser = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
              id: githubId,
            });

          if (sanityUser) {
            token.sanityUserId = sanityUser._id;
          }
          token.githubLogin = (profile as any)?.login;
          token.githubId = githubId;
        } catch (error) {
          console.error(
            "Error in jwt callback while fetching Sanity user:",
            error
          );
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sanityUserId && typeof token.sanityUserId === "string") {
        (session as any).id = token.sanityUserId;
        if (session.user) {
          (session.user as any).sanityId = token.sanityUserId;
        }
      }
      if (token.githubLogin && session.user) {
        (session.user as any).username = token.githubLogin;
      }

      if (
        token.githubId &&
        typeof token.githubId === "number" &&
        session.user
      ) {
        (session.user as any).githubId = token.githubId;
      }
      return session;
    },
  },
});
