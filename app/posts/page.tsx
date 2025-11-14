"use client";

import { useSearchParams } from "next/navigation";

import { useUserStore } from "@/store/useUserStore";
import { Suspense, useEffect } from "react";
import { Post, User } from "@/types/user";
import { PageLayout } from "@/app/components/organisms/PageLayout";
import { PostList } from "@/app/components/organisms/PostList";
import { PostCardSkeleton } from "@/app/components/molecules/UserCardSkeleton";
import { Button } from "@/app/components/atoms/Button";
import { Skeleton } from "@/app/components/atoms/Skeleton";

type UserPostParams = {
  posts: Post[];
  users: User[];
  fetchPosts: (userId: string) => Promise<void>;
  loadingFetchPost: boolean;
  fetchUsers: () => Promise<void>;
  errorFetchPost: string | null;
  successFetchPost: boolean;
};

function UserPosts(params: UserPostParams) {
  const {
    posts,
    users,
    fetchPosts,
    fetchUsers,
    loadingFetchPost,
    errorFetchPost,
    successFetchPost,
  } = params;
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (userId !== null) {
      fetchPosts(userId);
    }
    if (!users[Number(userId)]) {
      fetchUsers();
    }
  }, [fetchUsers, userId, users, fetchPosts]);

  const isInitialLoad = !successFetchPost && errorFetchPost === null;

  if (loadingFetchPost || (userId !== null && isInitialLoad)) {
    return <UserPostLoading />;
  }

  return (
    <section className="bg-card rounded-lg shadow-lg p-8 mb-8 border border-primary">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">
            {users[Number(userId)]?.name}
          </h2>
          <p className="text-secondary mb-1">{users[Number(userId)]?.email}</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold text-primary">{posts?.length}</p>
          <p className="text-secondary">Posts</p>
        </div>
      </div>
      {userId === null ? (
        <section className="bg-card rounded-lg shadow-lg p-8 text-center border border-primary">
          <p className="text-secondary text-lg">
            Select a user from the list to view their posts
          </p>
          <a href="/users" className="mt-6 inline-block">
            <Button variant="primary">View All Users</Button>
          </a>
        </section>
      ) : (
        <PostList
          posts={posts}
          loading={loadingFetchPost}
          success={successFetchPost}
        />
      )}
    </section>
  );
}

function UserPostLoading() {
  return (
    <section className="bg-card rounded-lg shadow-lg p-8 mb-8 border border-primary">
      <div className="flex items-center justify-between mb-2">
        <div>
          <Skeleton height={36} width={240} className="mb-3" />
          <Skeleton height={24} width={240} />
        </div>
        <div>
          <Skeleton height={42} width={40} />
          <p className="text-secondary">Posts</p>
        </div>
      </div>
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

export default function Posts() {
  const {
    users,
    posts,
    fetchPosts,
    loadingFetchPost,
    errorFetchPost,
    fetchUsers,
    successFetchPost,
  } = useUserStore();
  return (
    <PageLayout title="Posts">
      <Suspense fallback={<UserPostLoading />}>
        <UserPosts
          users={users}
          posts={posts}
          fetchPosts={fetchPosts}
          fetchUsers={fetchUsers}
          loadingFetchPost={loadingFetchPost}
          errorFetchPost={errorFetchPost}
          successFetchPost={successFetchPost}
        />
        <div className="py-6">
          <a href="/users" className="link-primary">
            ← Back to Users
          </a>
        </div>
      </Suspense>
    </PageLayout>
  );
}
