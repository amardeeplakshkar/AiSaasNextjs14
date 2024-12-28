import React from "react";

const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-x-auto">
    <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
      {children}
    </table>
  </div>
);

const TableHead = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-200">
    {children}
  </thead>
);

const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="border-b border-gray-300">
    {children}
  </tr>
);

const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="px-4 py-2 text-center border border-gray-300">{children}</td>
);

const TableHeaderCell = ({ children }: { children: React.ReactNode }) => (
  <th className="px-4 py-2 text-center border border-gray-300 font-bold">{children}</th>
);

export { Table, TableHead, TableRow, TableCell, TableHeaderCell };
