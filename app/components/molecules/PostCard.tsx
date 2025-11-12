import React from "react";
import { Heading } from "../atoms/Heading";
import { Text } from "../atoms/Text";

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  date: string;
  likes: number;
  onLike?: () => void;
  onReadMore?: () => void;
}

export function PostCard({
  id,
  title,
  content,
  date,
  likes,
  onLike,
  onReadMore,
}: PostCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 border border-gray-200 dark:border-gray-800 border-l-4 border-l-black dark:border-l-white">
      <div className="flex justify-between items-start mb-2">
        <Heading level={3} className="text-xl flex-1 mb-0">
          {title}
        </Heading>
        <Text variant="tertiary" className="text-sm ml-4 mb-0">
          {date}
        </Text>
      </div>
      <Text variant="secondary" className="mb-4">
        {content}
      </Text>
      <div className="flex items-center justify-between">
        <Text variant="tertiary" className="text-sm mb-0">
          Post ID: {id}
        </Text>
        <div className="flex items-center space-x-4">
          {onLike && (
            <button
              onClick={onLike}
              className="flex items-center space-x-1 text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 font-medium transition duration-200"
            >
              <span>❤️</span>
              <span>{likes}</span>
            </button>
          )}
          {onReadMore && (
            <button
              onClick={onReadMore}
              className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 font-medium transition duration-200"
            >
              Read More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
