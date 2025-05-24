import SearchForm from "@/components/SearchForm";
import BlogCard from "@/components/BlogCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: {
        _id: 1,
        name: "pandemiC",
      },
      _id: 1,
      description: "Simple description",
      image:
        "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Gaming",
      title: "Pro Gaming",
    },
  ];

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
