"use client";

import React from "react";
import { Input } from "./ui/input";

const BlogForm = () => {
  return (
    <form action={() => {}} className="blog-form">
      <div className="">
        <label htmlFor="title" className="blog-form-label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="blog-form-input"
          required
          placeholder="Blog Title"
        />
      </div>
    </form>
  );
};

export default BlogForm;
