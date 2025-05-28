import { defineQuery } from "next-sanity";

export const BLOGS_QUERY = defineQuery(
  `*[_type == 'blog' && defined(slug.current) && (
      !defined($search) ||
      lower(title) match lower($search) + "*" || 
      lower(title) match "*" + lower($search) + "*" || 
      lower(category) match "*" + lower($search) + "*" ||
      lower(author->name) match "*" + lower($search) + "*" ||
      lower(description) match "*" + lower($search) + "*" 
    )] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id, name, image, bio
    },
    views,
    description,
    category,
    image
  }`
);

export const BLOGS_BY_ID_QUERY = defineQuery(
  `*[_type == 'blog' && _id == $id][0] {
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id, name, image, bio, username
    },
    views,
    description,
    category,
    image,
    article
  }`
);

export const BLOG_VIEWS_QUERY =
  defineQuery(`*[_type == 'blog' && _id == $id][0] {
  _id, views
  }`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(
  `*[_type == 'author' && _id == $id][0] {
      _id, id, name, username, email, image, bio
    }`
);
