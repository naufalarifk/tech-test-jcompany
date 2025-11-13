"use client";

import Link from "next/link";
import { PageLayout, StatCard, Badge, Button } from "@/app/components";
export default function User() {
  return (
    <PageLayout title="User Portal">
      {/* <section className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              Users
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and view all users in the system
            </p>
          </div>
          <Button variant="primary">Add User</Button>
        </div>
      </section>
      <section className="bg-white dark:bg-neutral-900 rounded-lg shadow-card overflow-hidden border border-gray-200 dark:border-gray-800 mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-neutral-950 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black dark:text-white">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black dark:text-white">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black dark:text-white">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black dark:text-white">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition duration-150"
                >
                  <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant="default">{user.role}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge
                      variant={
                        user.status === "Active" ? "success" : "inactive"
                      }
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <Link
                      href={`/posts?userId=${user.id}`}
                      className="text-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-white font-medium transition duration-200"
                    >
                      Posts
                    </Link>
                    <button className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white font-medium transition duration-200">
                      Edit
                    </button>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Users" value={users.length.toString()} />
        <StatCard
          label="Active Users"
          value={users.filter((u) => u.status === "Active").length.toString()}
        />
        <StatCard
          label="Admin Users"
          value={users.filter((u) => u.role === "Admin").length.toString()}
        />
      </section> */}
      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 border rounded">
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">{user.company.name}</p>
            <p className="text-sm text-gray-600">{user.id}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
