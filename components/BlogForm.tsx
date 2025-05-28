"use client";

import React, { useState, useActionState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";

const BlogForm = () => {
  const [error, setError] = useState<Record<string, string>>({});
  const [article, setArticle] = useState("**Hello");

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        article,
      };
      await formSchema.parseAsync(formValues);
      console.log(formValues);

      // const result = await createEntry(prevState, formData, entry)
      // console.log(result)
    } catch (error) {
      throw new Error("");
    } finally {
    }
  };
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={() => {}} className="blog-form">
      <div>
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

        {error.title && <p className="blog-form-error">{error.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="blog-form-label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="blog-form-textarea"
          placeholder="Blog Description"
        />

        {error.description && (
          <p className="blog-form-error">{error.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="blog-form-label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="blog-form-input"
          required
          placeholder="Blog Category e.g (Tech, Gaming, Art, Health).."
        />

        {error.category && <p className="blog-form-error">{error.category}</p>}
      </div>
      <div>
        <label htmlFor="link" className="blog-form-label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="blog-form-input"
          required
          placeholder="Image URL"
        />

        {error.link && <p className="blog-form-error">{error.link}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="article" className="blog-form-label">
          Entry
        </label>
        <MDEditor
          id="article"
          preview="edit"
          height={300}
          value={article}
          onChange={(value) => setArticle(value as string)}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Enter the details of your blog entry..",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
          className="blog-form-editor"
        />

        {error.article && <p className="blog-form-error">{error.article}</p>}
      </div>

      <Button type="submit" className="blog-form-btn" disabled={isPending}>
        <Send className="size-6 ml-2 text-white" />
        {isPending ? "Submitting.." : "Submit"}
      </Button>
    </form>
  );
};

export default BlogForm;
