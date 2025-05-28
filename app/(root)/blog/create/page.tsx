import { auth } from "@/auth";
import BlogForm from "@/components/BlogForm";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <>
      <section className="secondary_container !min-h-[230px] pattern">
        <h1 className="heading rounded-md">Create your blog</h1>
      </section>

      <BlogForm />
    </>
  );
};

export default Page;
