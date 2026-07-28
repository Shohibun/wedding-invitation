import React from "react";

export const ReportTable: React.FC<{
  headers: string[];
  rows: (string | number | boolean | null)[][];
}> = ({ headers, rows }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm text-gray-600">
      <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
        <tr>
          {headers.map((header, idx) => (
            <th key={idx} className="px-6 py-3 font-medium">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIdx) => (
          <tr key={rowIdx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
            {row.map((cell, cellIdx) => (
              <td key={cellIdx} className="px-6 py-4 whitespace-nowrap">
                {cell === null ? "-" : String(cell)}
              </td>
            ))}
          </tr>
        ))}
        {rows.length === 0 && (
          <tr>
            <td colSpan={headers.length} className="px-6 py-8 text-center text-gray-500">
              No data available for this section.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
