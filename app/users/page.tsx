"use client";

import Link from "next/link";
import {
  PageLayout,
  StatCard,
  Badge,
  Button,
  UserCard,
} from "@/app/components";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
export default function User() {
  const { users, loadingFetchUser, fetchUsers, errorFetchUser } =
    useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <PageLayout title="User Portal">
      <section className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Users</h2>
            <p className="">Manage and view all users in the system</p>
          </div>
          <Button variant="primary">Add User</Button>
        </div>
      </section>
      <section className="rounded-lg shadow-card overflow-hidden border border-primary  mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="table-header border-b border-primary">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-primary">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-primary">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-primary">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-primary">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-primary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary">
              {users.map((user, id) => (
                <UserCard user={user} key={id} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Users" value={users.length.toString()} />
        {/* <StatCard
          label="Active Users"
          value={users.filter((u) => u.status === "Active").length.toString()}
        />
        <StatCard
          label="Admin Users"
          value={users.filter((u) => u.role === "Admin").length.toString()}
        /> */}
      </section>
    </PageLayout>
  );
}
