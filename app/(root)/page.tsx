import SearchForm from "@/components/SearchForm";
import BlogCard, { BlogTypeCard } from "@/components/BlogCard";
import { BLOGS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import Footer from "@/components/Footer";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();
  console.log(session?.id);

  const { data: posts } = await sanityFetch({ query: BLOGS_QUERY, params });

  return (
    <>
      <section className="pattern secondary_container mask-alpha mask-b-from-white mask-b-from-80% mask-b-to-transparent">
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
            posts.map((post: BlogTypeCard, i: number) => (
              <BlogCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-result">No blogs found..</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
