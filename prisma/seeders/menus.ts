import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export function getNavItems() {
    return [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: 'radix-icons:dashboard',
            label: 'Dashboard',
            listOrder: 1,
            items: []
        },
        {
            title: 'User',
            href: '/dashboard/user',
            icon: 'radix-icons:person',
            label: 'User',
            listOrder: 2,
            items: []
        },
        {
            title: 'Employee',
            href: '/dashboard/employee',
            icon: 'mdi:account-tie',
            label: 'Employee',
            listOrder: 3,
            items: []
        },
        {
            title: 'Profile',
            href: '/dashboard/profile',
            icon: 'mdi:account-box-outline',
            label: 'Profile',
            listOrder: 4,
            items: []
        },
        {
            title: 'Projects',
            href: '/dashboard/projects',
            icon: 'mdi:checkbox-blank-badge-outline',
            label: 'Projects',
            listOrder: 5,
            items: []
        },
        {
            title: 'Finance',
            icon: 'mdi:finance',
            label: 'Finance',
            listOrder: 6,
            items: [
                {
                    title: 'Purchase Orders',
                    href: '/dashboard/finance/purchase-orders',
                    icon: 'mdi:cart-arrow-down',
                    label: 'Purchase Orders',
                    listOrder: 1,
                    items: []
                },
                {
                    title: 'Invoices',
                    href: '/dashboard/finance/invoices',
                    icon: 'mdi:invoice-list-outline',
                    label: 'Invoices',
                    listOrder: 2,
                    items: []
                },
                {
                    title: 'Expense Tracking',
                    href: '/dashboard/finance/expenses',
                    icon: 'mdi:cash-multiple',
                    label: 'Expenses',
                    listOrder: 3,
                    items: []
                },
                {
                    title: 'Budgeting',
                    href: '/dashboard/finance/budgeting',
                    icon: 'mdi:wallet-bifold-outline',
                    label: 'Budgeting',
                    listOrder: 4,
                    items: []
                }
            ]
        },
        {
            title: 'HR & Administration',
            icon: 'hr_admin',
            label: 'HR & Admin',
            listOrder: 7,
            items: [
                {
                    title: 'Staff Onboarding',
                    href: '/dashboard/hr/onboarding',
                    icon: 'mdi:account-plus-outline',
                    label: 'Staff Onboarding',
                    listOrder: 1,
                    items: []
                },
                {
                    title: 'Leave Applications',
                    href: '/dashboard/hr/leave-applications',
                    icon: 'mdi:calendar-remove-outline',
                    label: 'Leave Applications',
                    listOrder: 2,
                    items: []
                },
                {
                    title: 'Employee Management',
                    href: '/dashboard/hr/employee-management',
                    icon: 'mdi:account-multiple-outline',
                    label: 'Employee Management',
                    listOrder: 3,
                    items: []
                },
                {
                    title: 'Payroll',
                    href: '/dashboard/hr/payroll',
                    icon: 'streamline:money-cash-coins-stack-accounting-billing-payment-stack-cash-coins-currency-money-finance',
                    label: 'Payroll',
                    listOrder: 4,
                    items: []
                }
            ]
        },
        {
            title: 'Asset Management',
            href: '/dashboard/assets',
            icon: 'carbon:task-asset-view',
            listOrder: 8,
            label: 'Assets',
            items: []
        },
        {
            title: 'Official Letters',
            href: '/dashboard/official-letters',
            icon: 'mdi:note-alert-outline',
            label: 'Official Letters',
            listOrder: 9,
            items: []
        },
        {
            title: 'Reports',
            href: '/dashboard/reports',
            icon: 'mdi:receipt-text-arrow-right-outline',
            label: 'Reports',
            listOrder: 10,
            items: []
        },
        {
            title: 'Settings',
            href: '/dashboard/settings',
            icon: 'mdi:cog-outline',
            label: 'Settings',
            listOrder: 11,
            items: []
        },
        {
            title: 'Login',
            href: '/',
            icon: 'mdi:login',
            label: 'Login',
            listOrder: 12,
            items: []
        }
    ];
}
