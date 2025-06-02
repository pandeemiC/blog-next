import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  BLOGS_BY_ID_QUERY,
  PLAYLIST_BY_SLUG_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import BlogCard, { BlogTypeCard } from "@/components/BlogCard";

export const experimental_ppr = true;
const md = markdownit();

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(BLOGS_BY_ID_QUERY, { id });

  const { select: editorPosts } = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
    slug: "editor-picks",
  });

  const parsedContent = md.render(post?.article || "");
  console.log("Markdown Content:", post?.article);

  if (!post) return notFound();

  return (
    <>
      <section className="secondary_container !min-h-[230px] pattern">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading rounded-md">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container font-sansation">
        <img
          src={post.image}
          alt="Post Image"
          className="rounded-xl w-full h-auto"
        />

        <div className="space-y-5 mt-10 max-w-10xl mx-auto">
          <div className="flex justify-between items-center gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-5 items-center mb-3"
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

            <p className="category-tag shadow-2xl">{post.category}</p>
          </div>
          <svg
            className="w-[40vw] h-3"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0"
              y1="5"
              x2="100"
              y2="5"
              className="stroke-current text-secondary-800"
              strokeWidth="1"
            />
          </svg>
        </div>
        {parsedContent ? (
          <article
            className="prose max-w-5xl font-sansation break-all mt-5"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        ) : (
          <p className="no-result">No details provided..</p>
        )}

        <hr className="divider" />

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-[30px] font-bold">Editor Picks</p>
            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: BlogTypeCard, index: number) => (
                <BlogCard key={index} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
