import SearchForm from "@/app/components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  return (
    <>
      <section className="secondary_container">
        <h1 className="heading">Express & Share</h1>
        <p className="sub-heading !max-w-3xl">
          Your Voice, Your Blog, Live on the Feed
        </p>

        <SearchForm query={query} />
      </section>
    </>
  );
}
