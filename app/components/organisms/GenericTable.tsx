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
    <div className="bg-card rounded-lg shadow-md border border-primary overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="table-header bg-secondary border-b border-primary">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  className="px-6 py-3 text-left text-sm font-semibold text-primary"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-primary">
            {data.map((row) => (
              <tr
                key={String(row[rowKey])}
                className="table-row hover:bg-hover transition duration-150"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 text-sm table-cell">
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
