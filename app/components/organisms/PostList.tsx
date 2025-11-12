import React from "react";
import { PostCard } from "../molecules/PostCard";

interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  likes: number;
}

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
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          date={post.date}
          likes={post.likes}
          onLike={() => onLike?.(post.id)}
        />
      ))}
    </div>
  );
}
