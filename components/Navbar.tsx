import React from "react";
import Link from "next/link";
import { auth, signOut, signIn } from "@/auth";

const Navbar = async () => {
  const session = await auth();

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
          {session && session?.user ? (
            <>
              <Link href="/blog/create">
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Logout</button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
