import React from "react";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";

const SearchForm = () => {
  const query = "test";

  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        type="text"
        name="query"
        defaultValue={query}
        placeholder="Search Blogs"
        className="search-input"
      />

      <div className="flex gap-2">{query && <SearchFormReset />}</div>
    </Form>
  );
};

export default SearchForm;
