import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";

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
      </section>
    </>
  );
};

export default Page;
