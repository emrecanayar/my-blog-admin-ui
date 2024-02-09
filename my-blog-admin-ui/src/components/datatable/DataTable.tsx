import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import styles from "./dataTable.module.css";

export interface DataTableProps {
  data: any;
  columns: any;
}

const DataTable = ({ data, columns }: DataTableProps) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });

  const handleAddClick = () => {
    // Handle the add button click event here
    console.log("Add button clicked");
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>Movies List</div>
      <div className={styles.datatable}>
        <div className={styles.search}>
          <input
            type="text"
            value={filtering}
            placeholder="Ara..."
            onChange={(e) => setFiltering(e.target.value)}
          />
          <button className={styles.addButton} onClick={handleAddClick}>
            Ekle
          </button>
        </div>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {/* Sıralama ikonlarını burada kontrol edip gösteriyoruz */}
                        {}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.paginationContainer}>
          <div className={styles.pagination}>
            <button onClick={() => table.setPageIndex(0)}>İlk</button>
            <button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              Önceki
            </button>
            <button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Sonraki
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              Son
            </button>
            <div className={styles.pageSizeSelector}>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize} kayıt
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DataTable;
