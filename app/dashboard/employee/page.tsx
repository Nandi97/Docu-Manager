import { Breadcrumbs } from '@/components/custom-ui/breadcrumbs';
import PageContainer from '@/components/layout/PageContainer';
import { columns } from '@/components/tables/employee-tables/columns';
import { EmployeeTable } from '@/components/tables/employee-tables/employee-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/custom-ui/Heading';
import { Separator } from '@/components/ui/separator';
// import { Employee } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Employee } from '@/types';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Employee', link: '/dashboard/employee' }
];

type paramsProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
};

export default async function page({ searchParams }: paramsProps) {
    const page = Number(searchParams.page) || 1;
    const pageLimit = Number(searchParams.limit) || 10;
    const searchQuery = searchParams.search || '';
    const offset = (page - 1) * pageLimit;

    const res = await fetch(
        `http://localhost:3000/api/employees/get?page=${page}&limit=${pageLimit}` +
            (searchQuery ? `&search=${searchQuery}` : '')
    );

    if (!res.ok) {
        throw new Error('Error fetching employees');
    }

    const employeeRes = await res.json();
    const totalEmployees = employeeRes.totalEmployees;
    const pageCount = Math.ceil(totalEmployees / pageLimit);
    const employees: Employee[] = employeeRes.employees;
    return (
        <PageContainer>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex items-start justify-between">
                    <Heading
                        title={`Employee (${totalEmployees})`}
                        description="Manage employees (Server side table functionalities.)"
                    />

                    <Link
                        href={'/dashboard/employee/new'}
                        className={cn(buttonVariants({ variant: 'default' }))}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Link>
                </div>
                <Separator />

                <EmployeeTable
                    searchKey="country"
                    pageNo={page}
                    columns={columns}
                    totalUsers={totalEmployees}
                    data={employees}
                    pageCount={pageCount}
                />
            </div>
        </PageContainer>
    );
}
