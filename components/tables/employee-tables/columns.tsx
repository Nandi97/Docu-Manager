'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Employee } from '@/types';

export const columns: ColumnDef<Employee>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'firstName',
        header: 'First Name'
    },
    {
        accessorKey: 'firstName',
        header: 'First Name'
    },
    {
        accessorKey: 'email',
        header: 'EMAIL'
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Phone Number'
    },
    {
        accessorKey: 'designation.department.name',
        header: 'Department'
    },
    {
        accessorKey: 'designation.name',
        header: 'Designation'
    },
    {
        accessorKey: 'employeeType.name',
        header: 'Employment Type'
    },
    {
        accessorKey: 'employmentStatus.name',
        header: 'Status'
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
];
