import SearchForm from "@/app/components/SearchForm";

export default function Home() {
  return (
    <>
      <section className="secondary_container">
        <h1 className="heading">Express & Share</h1>
        <p className="sub-heading !max-w-3xl">
          Your Voice, Your Blog, Live on the Feed
        </p>

        <SearchForm />
      </section>
    </>
  );
}
