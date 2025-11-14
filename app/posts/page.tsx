"use client";

import { useSearchParams } from "next/navigation";
import { PageLayout, PostList, Badge, Button } from "@/app/components";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

export default function Posts() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const { users, posts, fetchPosts, loadingFetchPost, errorFetchPost } =
    useUserStore();

  useEffect(() => {
    if (userId !== null) {
      fetchPosts(userId);
    }
  }, [fetchPosts, userId]);

  if (userId) {
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
      {/* User Info Card - only show if userId is provided */}
      {userId && (
        <section className="bg-card rounded-lg shadow-lg p-8 mb-8 border border-primary">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">
                {users[Number(userId!)].name}
              </h2>
              <p className="text-secondary mb-1">
                {users[Number(userId!)].email}
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-primary">{posts.length}</p>
              <p className="text-secondary">Posts</p>
            </div>
          </div>
        </section>
      )}

      {/* Page Title */}
      {/* {!currentUser && (
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Please select a user
          </h2>
          <p className="text-secondary">
            Use the userId query parameter to view posts. Example: ?userId=1
          </p>
        </section>
      )} */}

      {/* Posts List */}
      {/* {displayPosts.length > 0 ? (
        <PostList posts={posts} />
      ) : currentUser ? (
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
      )} */}

      {/* Back Button */}
      <div className="py-6">
        <a href="/users" className="link-primary">
          ← Back to Users
        </a>
      </div>
    </PageLayout>
  );
}
