import { PrismaClient } from '@prisma/client';
import { createOrUpdateNavItem, getNavItems } from './seeders/menus';

const prisma = new PrismaClient();

async function main() {
    const navItems = getNavItems();
    try {
        // Iterate through top-level nav items
        for (const navItem of navItems) {
            await createOrUpdateNavItem(navItem);
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
