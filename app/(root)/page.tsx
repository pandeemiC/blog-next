import SearchForm from "@/components/SearchForm";
import BlogCard from "@/components/BlogCard";
import { client } from "@/sanity/lib/client";
import { BLOGS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = await client.fetch(BLOGS_QUERY);

  return (
    <>
      <section className="pattern secondary_container">
        <h1 className="heading shadow-xl">Express & Share</h1>
        <p className="sub-heading bg-background-100 p-2 rounded-md shadow-md !max-w-3xl">
          Your Voice, Your Blog, Live on the Feed
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-black font-sansation font-black text-3xl">
          {query ? `Search results for "${query}"` : "All Blogs"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: BlogCardType, i: number) => (
              <BlogCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-result">No blogs found..</p>
          )}
        </ul>
      </section>
    </>
  );
}
