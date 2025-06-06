import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export const BlogCardSkeleton = () => {
  return (
    <>
      {[0, 1, 2, 3, 4].map((index: number) => (
        <li key={cn("skeleton", index)}>
          <Skeleton className="blog-card-skeleton" />
        </li>
      ))}
    </>
  );
};

export default BlogCardSkeleton;
