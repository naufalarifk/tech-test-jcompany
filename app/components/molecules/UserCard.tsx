import React from "react";
import { Heading } from "../atoms/Heading";
import { Text } from "../atoms/Text";
import { Badge } from "../atoms/Badge";

interface UserCardProps {
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  onEdit?: () => void;
  onDelete?: () => void;
  onViewPosts?: () => void;
}

export function UserCard({
  name,
  email,
  role,
  status,
  onEdit,
  onDelete,
  onViewPosts,
}: UserCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md hover:shadow-lg transition p-6 border border-gray-200 dark:border-gray-800">
      <Heading level={3} className="text-lg mb-2">
        {name}
      </Heading>
      <Text variant="secondary" className="mb-2">
        {email}
      </Text>
      <div className="flex gap-2 mb-4">
        <Badge variant="default">{role}</Badge>
        <Badge variant={status === "Active" ? "success" : "inactive"}>
          {status}
        </Badge>
      </div>
      <div className="flex gap-2">
        {onViewPosts && (
          <button
            onClick={onViewPosts}
            className="text-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-white font-medium transition duration-200"
          >
            Posts
          </button>
        )}
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-white font-medium transition duration-200"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white font-medium transition duration-200"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
