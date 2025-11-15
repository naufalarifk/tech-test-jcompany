// app/components/molecules/UserCard.tsx
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
    <tr key={id} className="table-row">
      <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium text-primary whitespace-nowrap">
        {name}
      </td>
      <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-secondary whitespace-nowrap max-w-[200px] truncate">
        {email}
      </td>
      <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm whitespace-nowrap">
        {address.city}
      </td>
      <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-secondary whitespace-nowrap max-w-[150px] truncate">
        {company.name}
      </td>
      <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm space-x-2 whitespace-nowrap">
        <Link
          href={`/posts?userId=${id}`}
          className="link-primary text-xs md:text-sm"
        >
          Posts
        </Link>
        <button
          onClick={() => onEdit?.(user)}
          className="text-secondary hover:cursor-pointer hover:text-blue-500 font-medium text-xs md:text-sm"
          aria-label={`Edit ${name}`}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete?.(user)}
          className="text-secondary hover:cursor-pointer hover:text-red-600 dark:hover:text-red-400 font-medium text-xs md:text-sm"
          aria-label={`Delete ${name}`}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
