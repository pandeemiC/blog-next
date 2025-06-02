import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth, signOut, signIn } from "@/auth";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { Author } from "@/sanity/types";
import { LogOut, NotebookPen } from "lucide-react";
import LogOutModal from "./LogOutModal";

const Navbar = async () => {
  const session = await auth();
  let authorData: Author | null = null;

  if (session && (session as any).id) {
    try {
      authorData = await client.fetch<Author>(AUTHOR_BY_ID_QUERY, {
        id: (session as any).id,
      });
    } catch (error) {
      console.error("Failed to fetch author data in Navbar:", error);
    }
  }

  const handleLogOut = () => {};

  return (
    <header className="px-5 py-1 bg-background-200 border-b shadow-sm font-sansation">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <img
            src="/blog-next-logo.png"
            alt="BlogLogo"
            width={60}
            height={30}
            className="m-3 transition-transform duration-300 hover:scale-110"
          />
        </Link>

        <div className="flex items-center gap-5 text-secondary text-xl">
          {session && session.user && authorData ? (
            <>
              <LogOutModal />

              <Link href="/blog/create">
                <span className="max-sm:hidden login">Create</span>
                <NotebookPen className="size-10 sm:hidden" />
              </Link>

              <Link href={`/user/${(session as any).id}`}>
                <Avatar>
                  <AvatarImage
                    alt={authorData.name || session.user.name || "User"}
                    src={authorData.image || session.user.image || undefined}
                  />
                  <AvatarFallback>
                    {(authorData.name || session.user.name || "AV")
                      .substring(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit" className="login">
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
