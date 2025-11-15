// app/users/page.tsx
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
  () => import("@/app/components/templates/CreateUserModal"),
  { ssr: false }
);

const EditUserModal = dynamic(
  () => import("@/app/components/templates/EditUserModal"),
  { ssr: false }
);

const DeleteConfirmationModal = dynamic(
  () => import("@/app/components/templates/DeleteConfirmationModal"),
  { ssr: false }
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
      <Toaster position="top-right" />

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

      <section className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
              Users
            </h2>
            <p className="text-sm md:text-base">
              Manage and view all users in the system
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full sm:w-auto"
          >
            Add User
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:gap-6 mb-6 md:mb-8">
        {loadingFetchUser ? (
          <StatCardSkeleton />
        ) : (
          <StatCard label="Total Users" value={users.length.toString()} />
        )}
      </section>

      <section className="px-4 rounded-lg shadow-card overflow-hidden border border-primary min-h-[400px] w-full">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-primary">
              <thead className="table-header sticky top-0 z-10">
                <tr>
                  <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-primary whitespace-nowrap">
                    Name
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-primary whitespace-nowrap">
                    Email
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-primary whitespace-nowrap">
                    Address
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-primary whitespace-nowrap">
                    Company
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-primary whitespace-nowrap">
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
        </div>
      </section>
    </PageLayout>
  );
}
