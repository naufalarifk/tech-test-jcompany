"use client";

import { useSearchParams } from "next/navigation";
import {
  PageLayout,
  PostList,
  Button,
  PostCardSkeleton,
  Skeleton,
} from "@/app/components";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

export default function Posts() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const {
    users,
    posts,
    fetchPosts,
    loadingFetchPost,
    errorFetchPost,
    fetchUsers,
  } = useUserStore();

  useEffect(() => {
    if (userId !== null) {
      fetchPosts(userId);
    }
    if (!users[Number(userId)]) {
      fetchUsers();
    }
  }, [fetchUsers, userId, users, fetchPosts]);

  if (!userId) {
    return (
      <PageLayout title="Posts">
        <div className="bg-card rounded-lg shadow-lg p-8 text-center border border-primary">
          <h2 className="text-2xl font-bold text-primary mb-4">
            User Not Found
          </h2>
          <p className="text-secondary">
            The user with ID {userId} does not exist.
          </p>
          <a href="/users" className="mt-6 inline-block">
            <Button variant="primary">Back to Users</Button>
          </a>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Posts">
      {userId && (
        <section className="bg-card rounded-lg shadow-lg p-8 mb-8 border border-primary">
          {loadingFetchPost ? (
            <div className="flex items-center justify-between">
              <div>
                <Skeleton height={36} width={240} className="mb-3" />
                <Skeleton height={24} width={240} />
              </div>
              <div>
                <Skeleton height={42} width={40} />
                <p className="text-secondary">Posts</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-2">
                  {users[Number(userId)]?.name}
                </h2>
                <p className="text-secondary mb-1">
                  {users[Number(userId)]?.email}
                </p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-primary">
                  {posts?.length}
                </p>
                <p className="text-secondary">Posts</p>
              </div>
            </div>
          )}
        </section>
      )}

      {loadingFetchPost ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      ) : errorFetchPost ? (
        <section className="bg-card rounded-lg shadow-lg p-8 text-center border border-primary">
          <p className="text-red-600 dark:text-red-400 text-lg mb-4">
            {errorFetchPost}
          </p>
          <Button variant="primary" onClick={() => fetchPosts(userId)}>
            Retry
          </Button>
        </section>
      ) : posts?.length > 0 ? (
        <PostList posts={posts} />
      ) : userId ? (
        <section className="bg-card rounded-lg shadow-lg p-8 text-center border border-primary">
          <p className="text-secondary text-lg mb-4">No posts yet</p>
          <Button variant="primary">Create First Post</Button>
        </section>
      ) : (
        <section className="bg-card rounded-lg shadow-lg p-8 text-center border border-primary">
          <p className="text-secondary text-lg">
            Select a user from the list to view their posts
          </p>
          <a href="/users" className="mt-6 inline-block">
            <Button variant="primary">View All Users</Button>
          </a>
        </section>
      )}

      <div className="py-6">
        <a href="/users" className="link-primary">
          ← Back to Users
        </a>
      </div>
    </PageLayout>
  );
}
