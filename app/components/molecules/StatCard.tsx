import React from "react";
import { Heading } from "../atoms/Heading";
import { Text } from "../atoms/Text";

interface StatCardProps {
  label: string;
  value: string | number;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-card p-6 text-center border border-gray-200 dark:border-gray-800">
      <Text variant="secondary" className="text-sm font-medium mb-2">
        {label}
      </Text>
      <Heading level={2} className="text-4xl mb-0">
        {value}
      </Heading>
    </div>
  );
}
