"use server";

import { auth } from "@/auth";
import { parseServerActionResp } from "./utils";

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
};
