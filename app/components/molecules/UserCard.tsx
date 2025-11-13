import React from "react";
import { Heading } from "../atoms/Heading";
import { Text } from "../atoms/Text";
import { Badge } from "../atoms/Badge";
import { User } from "@/types/user";
import Link from "next/link";
import { Button } from "../atoms/Button";

interface UserCardProps {
  user: User;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewPosts?: () => void;
}

export function UserCard({
  user,
  onEdit,
  onDelete,
  onViewPosts,
}: UserCardProps) {
  const { name, address, company, email, id, phone, username, website } = user;
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
        <button className="text-secondary hover:text-primary font-medium transition duration-200">
          Edit
        </button>
        <Button variant="danger">Delete</Button>
      </td>
    </tr>
  );
}
