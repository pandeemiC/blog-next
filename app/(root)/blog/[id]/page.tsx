import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { BLOGS_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(BLOGS_BY_ID_QUERY, { id });

  if (!post) return notFound();

  return (
    <>
      <section className="secondary_container !min-h-[230px] pattern">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading rounded-md">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <img
          src={post.image}
          alt="Post Image"
          className="rounded-xl w-full h-auto"
        />

        <div className="space-y-5 mt-10 max-w-6xl mx-auto">
          <div className="flex justify-between items-center gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Avatar>
                <AvatarImage alt={post.author.name} src={post.author.image} />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>

              <div>
                <p className="text-[20px] font-medium">{post.author.name}</p>
                <p className="text-[16px] font-bold text-black/50">
                  @{post.author.username}
                </p>
              </div>
            </Link>
          </div>

          <p></p>
        </div>
      </section>
    </>
  );
};

export default Page;
