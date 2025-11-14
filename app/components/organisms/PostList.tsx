import { Post } from "@/types/user";
import { PostCard } from "@/app/components/molecules/PostCard";
interface PostListProps {
  posts: Post[];
  emptyMessage?: string;
  loading: boolean;
  success: boolean;
}

export function PostList({
  posts,
  loading,
  success,
  emptyMessage = "No posts found",
}: PostListProps) {
  if (success && !loading && !posts?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-secondary text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post, id) => (
        <PostCard key={id} post={post} />
      ))}
    </div>
  );
}
