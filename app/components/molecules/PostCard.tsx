import { Heading } from "../atoms/Heading";
import { Text } from "../atoms/Text";
import { Post } from "@/types/user";

interface PostCardProps {
  post: Post;
  onReadMore?: () => void;
}

export function PostCard({ post }: PostCardProps) {
  const { body, id, title, userId } = post;

  return (
    <div className="bg-card rounded-lg shadow-card p-6 border border-primary border-l-4 border-l-primary hover:shadow-lg transition duration-300">
      <div className="flex justify-between items-start mb-2">
        <Heading level={3} className="text-xl flex-1 mb-0">
          {title}
        </Heading>
        <Text variant="tertiary" className="text-sm ml-4 mb-0">
          {userId}
        </Text>
      </div>
      <Text variant="secondary" className="mb-4">
        {body}
      </Text>
      <div className="flex items-center justify-between">
        <Text variant="tertiary" className="text-sm mb-0">
          Post ID: {id}
        </Text>
      </div>
    </div>
  );
}
