"use server";

import { auth } from "@/auth";
import { parseServerActionResp } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createEntry = async (
  state: any,
  form: FormData,
  article: string
) => {
  const session = await auth();
  if (!session) {
    parseServerActionResp({ error: "Not signed in", status: "ERROR" });
  }

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "article")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const blog = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      article,
    };

    const result = await writeClient.create({ _type: "blog", ...blog });
    return parseServerActionResp({ ...result, error: "", status: "SUCCESS" });
  } catch (error) {
    console.log(error);

    return parseServerActionResp({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
