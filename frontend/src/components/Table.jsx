import React, { useState, useRef, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { createPortal } from 'react-dom';

export default function Table({ columns, data, onView = () => {}, onEdit = () => {}, onDelete = () => {} }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const menuRef = useRef(null);

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null);
        setDropdownPosition(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuOpen = (index, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.right - 128,
    });
    setOpenMenuIndex(index);
  };

  const renderDropdown = () => {
    if (openMenuIndex === null || !dropdownPosition) return null;

    return createPortal(
      <div
        ref={menuRef}
        style={{
          position: 'absolute',
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          zIndex: 9999,
        }}
        className="bg-white rounded shadow w-32"
      >
        <button
          onClick={() => {
            onView(data[openMenuIndex]);
            setOpenMenuIndex(null);
          }}
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          View
        </button>
        <button
          onClick={() => {
            onEdit(data[openMenuIndex]);
            setOpenMenuIndex(null);
          }}
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Edit
        </button>
        <button
          onClick={() => {
            onDelete(data[openMenuIndex]);
            setOpenMenuIndex(null);
          }}
          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
        >
          Delete
        </button>
      </div>,
      document.body
    );
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <input
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="relative overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-2 font-semibold cursor-pointer select-none hover:bg-gray-200"
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: '↑',
                          desc: '↓',
                        }[header.column.getIsSorted()] ?? ''}
                      </div>
                    )}
                  </th>
                ))}
                <th className="px-4 py-2 font-semibold">Actions</th>
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-100">
            {table.getRowModel().rows.map((row, index) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="px-4 py-2 relative">
                  <button
                    onClick={(e) => handleMenuOpen(index, e)}
                    className="p-1 rounded hover:bg-gray-200 focus:outline-none"
                  >
                    <BsThreeDotsVertical />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {renderDropdown()}
    </div>
  );
}
