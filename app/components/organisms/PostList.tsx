import { Post } from "@/types/user";
import { PostCard } from "@/app/components";

interface PostListProps {
  posts: Post[];
  onLike?: (postId: number) => void;
  emptyMessage?: string;
}

export function PostList({
  posts,
  onLike,
  emptyMessage = "No posts found",
}: PostListProps) {
  if (!posts?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-secondary text-lg">{emptyMessage}</p>
      </div>
    );
  }
  console.log("posts.length", posts.length);

  return (
    <div className="space-y-6">
      {posts.map((post, id) => (
        <PostCard key={id} post={post} onLike={() => onLike?.(id)} />
      ))}
    </div>
  );
}
