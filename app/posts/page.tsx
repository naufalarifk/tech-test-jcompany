"use client";

import { useSearchParams } from "next/navigation";
import { PageLayout, PostList, Badge, Button } from "@/app/components";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

export default function Posts() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const { posts, fetchPosts, loadingFetchPost, errorFetchPost } =
    useUserStore();

  useEffect(() => {
    if (userId !== null) {
      fetchPosts(userId);
    }
  }, [fetchPosts, userId]);

  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor" },
    {
      id: 3,
      name: "Carol Williams",
      email: "carol@example.com",
      role: "Viewer",
    },
    { id: 4, name: "David Brown", email: "david@example.com", role: "Editor" },
    { id: 5, name: "Emma Davis", email: "emma@example.com", role: "Admin" },
    { id: 6, name: "Frank Miller", email: "frank@example.com", role: "Viewer" },
  ];

  const allPosts = {
    1: [
      {
        id: 101,
        title: "Getting Started with React",
        content: "Learn the basics of React and components.",
        date: "2025-11-10",
        likes: 24,
      },
      {
        id: 102,
        title: "Advanced TypeScript Tips",
        content: "Master TypeScript with advanced techniques.",
        date: "2025-11-08",
        likes: 45,
      },
      {
        id: 103,
        title: "Building Scalable Applications",
        content: "Best practices for scalable app architecture.",
        date: "2025-11-05",
        likes: 67,
      },
    ],
    2: [
      {
        id: 201,
        title: "Next.js Performance Optimization",
        content: "Improve your Next.js app performance.",
        date: "2025-11-09",
        likes: 38,
      },
      {
        id: 202,
        title: "Tailwind CSS Deep Dive",
        content: "Explore advanced Tailwind CSS features.",
        date: "2025-11-07",
        likes: 52,
      },
    ],
    3: [
      {
        id: 301,
        title: "JavaScript ES6 Features",
        content: "Understanding modern JavaScript features.",
        date: "2025-11-06",
        likes: 29,
      },
    ],
    4: [
      {
        id: 401,
        title: "Web Development Trends 2025",
        content: "Latest trends in web development.",
        date: "2025-11-11",
        likes: 91,
      },
      {
        id: 402,
        title: "API Design Best Practices",
        content: "Creating robust and scalable APIs.",
        date: "2025-11-04",
        likes: 56,
      },
      {
        id: 403,
        title: "Database Optimization",
        content: "Techniques to optimize database queries.",
        date: "2025-11-02",
        likes: 73,
      },
      {
        id: 404,
        title: "Security in Web Apps",
        content: "Essential security practices for web applications.",
        date: "2025-10-31",
        likes: 82,
      },
    ],
    5: [
      {
        id: 501,
        title: "Cloud Computing Guide",
        content: "Introduction to cloud computing services.",
        date: "2025-11-09",
        likes: 47,
      },
      {
        id: 502,
        title: "DevOps Best Practices",
        content: "Implementing DevOps in your organization.",
        date: "2025-11-03",
        likes: 65,
      },
    ],
    6: [
      {
        id: 601,
        title: "UI/UX Design Principles",
        content: "Creating beautiful user interfaces.",
        date: "2025-11-08",
        likes: 34,
      },
    ],
  };

  const parsedUserId = userId ? parseInt(userId) : null;
  const currentUser = parsedUserId
    ? users.find((u) => u.id === parsedUserId)
    : null;
  const userPosts =
    parsedUserId && allPosts[parsedUserId as keyof typeof allPosts]
      ? allPosts[parsedUserId as keyof typeof allPosts]
      : [];

  // Show all posts if no userId is provided
  const displayPosts = parsedUserId ? userPosts : [];

  if (userId && !currentUser) {
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
      {currentUser && (
        <section className="bg-card rounded-lg shadow-lg p-8 mb-8 border border-primary">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">
                {users[Number(userId!)].name}
              </h2>
              <p className="text-secondary mb-1">{currentUser.email}</p>
              <Badge variant="default">{currentUser.role}</Badge>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-primary">
                {userPosts.length}
              </p>
              <p className="text-secondary">Posts</p>
            </div>
          </div>
        </section>
      )}

      {/* Page Title */}
      {!currentUser && (
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Please select a user
          </h2>
          <p className="text-secondary">
            Use the userId query parameter to view posts. Example: ?userId=1
          </p>
        </section>
      )}

      {/* Posts List */}
      {displayPosts.length > 0 ? (
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
      )}

      {/* Back Button */}
      <div className="py-6">
        <a href="/users" className="link-primary">
          ← Back to Users
        </a>
      </div>
    </PageLayout>
  );
}
