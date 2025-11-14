import React from "react";
import { Heading } from "../atoms/Heading";
import { Text } from "../atoms/Text";

interface StatCardProps {
  label: string;
  value: string | number;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-card rounded-lg shadow-card p-6 text-center border border-primary">
      <Text
        variant="secondary"
        className="w-20 mx-auto text-sm font-medium mb-2"
      >
        {label}
      </Text>
      <Heading level={2} className="w-16 text-4xl mb-0 mx-auto">
        {value}
      </Heading>
    </div>
  );
}
