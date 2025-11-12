import React from "react";

interface TableRow {
  [key: string]: unknown;
}

interface TableColumn {
  key: string;
  label: string;
  render?: (value: unknown, row: TableRow) => React.ReactNode;
  width?: string;
}

interface GenericTableProps {
  columns: TableColumn[];
  data: TableRow[];
  rowKey: string;
}

export function GenericTable({ columns, data, rowKey }: GenericTableProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-neutral-800 border-b border-gray-200 dark:border-gray-800">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  className="px-6 py-3 text-left text-sm font-semibold text-black dark:text-white"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {data.map((row) => (
              <tr
                key={String(row[rowKey])}
                className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition duration-150"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
