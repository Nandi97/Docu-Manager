'use client';
import React from 'react';
import { columns } from '@/components/tables/employee-tables/columns';
import { EmployeeTable } from '@/components/tables/employee-tables/employee-table';
import { useQuery } from '@tanstack/react-query';
import { Employee } from '@/types';
import axios from 'axios';

type DashboardProps = {
    page: number;
    pageLimit: number;
    searchQuery: string;
};

const fetchEmployees = async (
    page: number,
    pageLimit: number,
    searchQuery: string
) => {
    const offset = (page - 1) * pageLimit;
    const res = await axios.get(
        `/api/employees/get?page=${page}&limit=${pageLimit}` +
            (searchQuery ? `&search=${searchQuery}` : '')
    );

    if (!res.data) {
        throw new Error('Error fetching employees');
    }

    return res.data;
};
const Dashboard = ({ page, pageLimit, searchQuery }: DashboardProps) => {
    // const { data, error, isLoading } = useQuery(
    //     ['employees', page, pageLimit, searchQuery],
    //     () => fetchEmployees(page, pageLimit, searchQuery)
    // );

    const { data, isLoading, error } = useQuery<any>({
        queryKey: ['employees', page, pageLimit, searchQuery],
        queryFn: () => fetchEmployees(page, pageLimit, searchQuery)
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    const { totalEmployees, employees, pageCount } = data;

    return (
        <EmployeeTable
            searchKey=" "
            pageNo={page}
            columns={columns}
            totalUsers={totalEmployees}
            data={employees}
            pageCount={pageCount}
        />
    );
};

export default Dashboard;
