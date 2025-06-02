import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import React, { Suspense } from "react";
import UserBlogs from "@/components/UserBlogs";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) return notFound();

  return (
    <>
      <section className="profile-container">
        <div className="profile-card nextjs-bg">
          <div className="profile-title">
            <h3 className="text-[24px] font-black font-sansation text-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile-image"
          />

          <p className="text-[30px] font-bold bg-white p-3 font-sansation rounded-lg border-black border-2 mt-7 text-center">
            @{user?.username}
          </p>
          <p className="mt-1 font-sansation italic text-center bg-white p-3 border-black border-2 rounded-lg text-[14px] font-regular">
            {user?.bio}
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-[30px] font-sansation font-bold uppercase">
            {session?.id === id ? "Your" : "All"} Blogs
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<BlogCardSkeleton />}>
              <UserBlogs id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Page;
