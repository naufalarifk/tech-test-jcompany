import { Skeleton } from "../atoms/Skeleton";

export function UserCardSkeleton() {
  return (
    <tr className="table-row border-b border-primary">
      <td className="px-6 py-4">
        <Skeleton width="150px" height="16px" />
      </td>
      <td className="px-6 py-4">
        <Skeleton width="200px" height="16px" />
      </td>
      <td className="px-6 py-4">
        <Skeleton width="100px" height="16px" />
      </td>
      <td className="px-6 py-4">
        <Skeleton width="180px" height="16px" />
      </td>
      <td className="px-6 py-4 space-x-2 flex">
        <Skeleton width="50px" height="16px" />
        <Skeleton width="40px" height="16px" />
        <Skeleton width="50px" height="16px" />
      </td>
    </tr>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="bg-card rounded-lg shadow-card p-6 border border-primary border-l-4 border-l-primary">
      <div className="flex justify-between items-start mb-2">
        <Skeleton width="70%" height="24px" className="mb-2" />
        <Skeleton width="20px" height="20px" className="ml-4" />
      </div>
      <Skeleton width="100%" height="16px" className="mb-2" />
      <Skeleton width="90%" height="16px" className="mb-2" />
      <Skeleton width="80%" height="16px" className="mb-4" />
      <div className="flex items-center justify-between">
        <Skeleton width="100px" height="14px" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-card rounded-lg shadow-card p-6 text-center border border-primary">
      <Skeleton width="80px" height="16px" className="mx-auto mb-2" />
      <Skeleton width="60px" height="36px" className="mx-auto" />
    </div>
  );
}
