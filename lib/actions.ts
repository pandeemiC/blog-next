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
};
