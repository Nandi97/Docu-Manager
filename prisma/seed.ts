import { PrismaClient } from '@prisma/client';
import { createOrUpdateNavItem, getNavItems } from './seeders/menus';
import { getDepartmentsSeeder } from './seeders/departments';
import { getDesignationsSeeder } from './seeders/designations';
import { getEmployeeTypesSeeder } from './seeders/employee-types';
import { getEmploymentStatusesSeeder } from './seeders/employment-statuses';
import { getGenders } from './seeders/genders';
import { getEmployeesSeeder } from './seeders/employees';

const prisma = new PrismaClient();

async function main() {
    const navItems = getNavItems();
    const genders = getGenders();
    const departments = getDepartmentsSeeder();
    const designations = getDesignationsSeeder();
    const employeeTypes = getEmployeeTypesSeeder();
    const employmentStatuses = getEmploymentStatusesSeeder();
    const employees = getEmployeesSeeder();

    try {
        // Iterate through top-level nav items
        for (const navItem of navItems) {
            await createOrUpdateNavItem(navItem);
        }
        //Genders
        for (const gender of genders) {
            const existing = await prisma.gender.findUnique({
                where: { name: gender.name }
            });
            if (!existing) {
                const newData = await prisma.gender.create({
                    data: {
                        ...gender
                    }
                });
                console.log(`Created Genders: ${newData.name}`);
            } else {
                const updatedData = await prisma.gender.update({
                    where: { id: existing.id },
                    data: { ...gender }
                });
                console.log(`Updated Genders: ${updatedData.name}`);
            }
        }
        //Departments
        for (const department of departments) {
            const existing = await prisma.department.findUnique({
                where: { name: department.name }
            });
            if (!existing) {
                const newData = await prisma.department.create({
                    data: {
                        ...department
                    }
                });
                console.log(`Created Departments: ${newData.name}`);
            } else {
                const updatedData = await prisma.department.update({
                    where: { id: existing.id },
                    data: { ...department }
                });
                console.log(`Updated Departments: ${updatedData.name}`);
            }
        }

        //Designations
        for (const designation of designations) {
            const existing = await prisma.designation.findUnique({
                where: { title: designation.title }
            });
            if (!existing) {
                const newData = await prisma.designation.create({
                    data: {
                        ...designation
                    }
                });
                console.log(`Created Designation: ${newData.title}`);
            } else {
                const updatedData = await prisma.designation.update({
                    where: { id: existing.id },
                    data: { ...designation }
                });
                console.log(`Updated Designation: ${updatedData.title}`);
            }
        }

        //Employee Type
        for (const employeeType of employeeTypes) {
            const existing = await prisma.employeeType.findUnique({
                where: { name: employeeType.name }
            });
            if (!existing) {
                const newData = await prisma.employeeType.create({
                    data: {
                        ...employeeType
                    }
                });
                console.log(`Created Employee Type: ${newData.name}`);
            } else {
                const updatedData = await prisma.employeeType.update({
                    where: { id: existing.id },
                    data: { ...employeeType }
                });
                console.log(`Updated Employee Type: ${updatedData.name}`);
            }
        }

        //Employment Statuses
        for (const employmentStatus of employmentStatuses) {
            const existing = await prisma.employmentStatus.findUnique({
                where: { name: employmentStatus.name }
            });
            if (!existing) {
                const newData = await prisma.employmentStatus.create({
                    data: {
                        ...employmentStatus
                    }
                });
                console.log(`Created Employment Status: ${newData.name}`);
            } else {
                const updatedData = await prisma.employmentStatus.update({
                    where: { id: existing.id },
                    data: { ...employmentStatus }
                });
                console.log(`Updated Employment Status: ${updatedData.name}`);
            }
        }

        //Employees
        for (const employee of employees) {
            const existing = await prisma.employee.findUnique({
                where: { email: employee.email }
            });
            if (!existing) {
                const newData = await prisma.employee.create({
                    data: {
                        ...employee
                    }
                });
                console.log(
                    `Created Employee: ${newData.firstName + newData.lastName}`
                );
            } else {
                const updatedData = await prisma.employee.update({
                    where: { id: existing.id },
                    data: { ...employee }
                });
                console.log(
                    `Updated Employee: ${updatedData.firstName + updatedData.lastName}`
                );
            }
        }

        console.log('Seeder execution completed successfully.');
    } catch (error) {
        console.error('Error occurred during seeding:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((error) => {
    console.error('Unhandled error in seeder:', error);
    process.exit(1);
});
