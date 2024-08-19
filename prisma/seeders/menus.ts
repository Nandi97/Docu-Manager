import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export function getNavItems() {
    return [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: 'dashboard',
            label: 'Dashboard',
            items: []
        },
        {
            title: 'User',
            href: '/dashboard/user',
            icon: 'user',
            label: 'User',
            items: []
        },
        {
            title: 'Employee',
            href: '/dashboard/employee',
            icon: 'employee',
            label: 'Employee',
            items: []
        },
        {
            title: 'Profile',
            href: '/dashboard/profile',
            icon: 'profile',
            label: 'Profile',
            items: []
        },
        {
            title: 'Kanban',
            href: '/dashboard/kanban',
            icon: 'kanban',
            label: 'Kanban',
            items: []
        },
        {
            title: 'Finance',
            icon: 'finance',
            label: 'Finance',
            items: [
                {
                    title: 'Purchase Orders',
                    href: '/dashboard/finance/purchase-orders',
                    icon: 'purchase_orders',
                    label: 'Purchase Orders',
                    items: []
                },
                {
                    title: 'Invoices',
                    href: '/dashboard/finance/invoices',
                    icon: 'invoices',
                    label: 'Invoices',
                    items: []
                },
                {
                    title: 'Expense Tracking',
                    href: '/dashboard/finance/expenses',
                    icon: 'expenses',
                    label: 'Expenses',
                    items: []
                },
                {
                    title: 'Budgeting',
                    href: '/dashboard/finance/budgeting',
                    icon: 'budgeting',
                    label: 'Budgeting',
                    items: []
                }
            ]
        },
        {
            title: 'HR & Administration',
            icon: 'hr_admin',
            label: 'HR & Admin',
            items: [
                {
                    title: 'Staff Onboarding',
                    href: '/dashboard/hr/onboarding',
                    icon: 'onboarding',
                    label: 'Staff Onboarding',
                    items: []
                },
                {
                    title: 'Leave Applications',
                    href: '/dashboard/hr/leave-applications',
                    icon: 'leave_applications',
                    label: 'Leave Applications',
                    items: []
                },
                {
                    title: 'Employee Management',
                    href: '/dashboard/hr/employee-management',
                    icon: 'employee_management',
                    label: 'Employee Management',
                    items: []
                },
                {
                    title: 'Payroll',
                    href: '/dashboard/hr/payroll',
                    icon: 'payroll',
                    label: 'Payroll',
                    items: []
                }
            ]
        },
        {
            title: 'Asset Management',
            href: '/dashboard/assets',
            icon: 'assets',
            label: 'Assets',
            items: []
        },
        {
            title: 'Official Letters',
            href: '/dashboard/official-letters',
            icon: 'official_letters',
            label: 'Official Letters',
            items: []
        },
        {
            title: 'Reports',
            href: '/dashboard/reports',
            icon: 'reports',
            label: 'Reports',
            items: []
        },
        {
            title: 'Settings',
            href: '/dashboard/settings',
            icon: 'settings',
            label: 'Settings',
            items: []
        },
        {
            title: 'Login',
            href: '/',
            icon: 'login',
            label: 'Login',
            items: []
        }
    ];
}
export async function createOrUpdateNavItem(
    navItem: any,
    parentId: string | null = null
) {
    const existingMenu = await prisma.navItem.findUnique({
        where: { title: navItem.title }
    });

    const data = {
        ...navItem,
        parentId,
        items: undefined // Prevent direct assignment of nested items
    };

    let savedNavItem;

    if (!existingMenu) {
        savedNavItem = await prisma.navItem.create({
            data
        });
        console.log(`Created menu item: ${savedNavItem.title}`);
    } else {
        savedNavItem = await prisma.navItem.update({
            where: { id: existingMenu.id },
            data
        });
        console.log(`Updated menu item: ${savedNavItem.title}`);
    }

    // Handle nested items
    if (navItem.items && navItem.items.length > 0) {
        for (const nestedItem of navItem.items) {
            await createOrUpdateNavItem(nestedItem, savedNavItem.id);
        }
    }

    return savedNavItem;
}
