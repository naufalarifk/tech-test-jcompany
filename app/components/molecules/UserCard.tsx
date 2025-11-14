import React from "react";
import { User } from "@/types/user";
import Link from "next/link";

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const { name, address, company, email, id } = user;
  return (
    <tr key={id} className="table-row hover:bg-hover transition duration-150">
      <td className="px-6 py-4 text-sm font-medium text-primary">{name}</td>
      <td className="px-6 py-4 text-sm text-secondary">{email}</td>
      <td className="px-6 py-4 text-sm">{address.city}</td>
      <td className="px-6 py-4 text-sm text-secondary">{company.name}</td>
      <td className="px-6 py-4 text-sm space-x-2">
        <Link href={`/posts?userId=${id}`} className="link-primary">
          Posts
        </Link>
        <button
          onClick={() => onEdit?.(user)}
          className="text-secondary hover:cursor-pointer hover:text-blue-500 font-medium transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete?.(user)}
          className="text-secondary hover:cursor-pointer hover:text-red-600 dark:hover:text-red-400 font-medium transition duration-200"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
