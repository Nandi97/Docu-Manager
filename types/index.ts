import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Prisma.NavItemGetPayload is used to type the basic NavItem
export type NavItem = Prisma.NavItemGetPayload<{
    include: {
        items: true; // Include nested items
    };
}>;

// Define the type for NavItem with children, which is essentially a recursive type
export type NavItemWithChildren = NavItem & {
    items: NavItemWithChildren[];
};

// Define the type for NavItem with optional children
export type NavItemWithOptionalChildren = NavItem & {
    items?: NavItemWithChildren[];
};

// Define the MainNavItem and SidebarNavItem types based on the optionality of children
export type MainNavItem = NavItemWithOptionalChildren;
export type SidebarNavItem = NavItemWithChildren;

export type Employee = Prisma.EmployeeGetPayload<{
    include: {
        designation: {
            include: {
                department: true;
            };
        };
        employeeType: true;
        employmentStatus: true;
    };
}>;
