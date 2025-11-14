"use client";

import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";
import type { User } from "@/types/user";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

import { PageLayout } from "@/app/components/organisms/PageLayout";
import { Button } from "@/app/components/atoms/Button";
import { StatCard } from "@/app/components/molecules/StatCard";
import { UserCard } from "@/app/components/molecules/UserCard";
import {
  UserCardSkeleton,
  StatCardSkeleton,
} from "@/app/components/molecules/UserCardSkeleton";

const CreateUserModal = dynamic(
  () => import("@/app/components/templates/CreateUserModal")
);

const EditUserModal = dynamic(
  () => import("@/app/components/templates/EditUserModal")
);

const DeleteConfirmationModal = dynamic(
  () => import("@/app/components/templates/DeleteConfirmationModal")
);

export default function User() {
  const { users, fetchUsers, loadingFetchUser } = useUserStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  return (
    <PageLayout title="User Portal">
      <Toaster />
      {isCreateModalOpen && (
        <CreateUserModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      {isEditModalOpen && (
        <EditUserModal
          isOpen={isEditModalOpen}
          user={selectedUser as User}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          user={selectedUser}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedUser(null);
          }}
        />
      )}

      <section className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Users</h2>
            <p className="">Manage and view all users in the system</p>
          </div>
          <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
            Add User
          </Button>
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
              {loadingFetchUser ? (
                <>
                  {[...Array(5)].map((_, index) => (
                    <UserCardSkeleton key={index} />
                  ))}
                </>
              ) : (
                users.map((user) => (
                  <UserCard
                    user={user}
                    key={user.id}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loadingFetchUser ? (
          <>
            <StatCardSkeleton />
          </>
        ) : (
          <StatCard label="Total Users" value={users.length.toString()} />
        )}
      </section>
    </PageLayout>
  );
}
