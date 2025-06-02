import { type SchemaTypeDefinition } from "sanity";
import { author } from "@/sanity/schemaTypes/author";
import { blog } from "@/sanity/schemaTypes/blog";
import { playlist } from "./playlist";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, blog, playlist],
};
