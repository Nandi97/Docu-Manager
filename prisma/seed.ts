import { PrismaClient } from '@prisma/client';
import { getNavItems } from './seeders/menus';

const prisma = new PrismaClient();

async function createOrUpdateNavItem(navItem: any) {
    const existingNavItem = await prisma.navItem.findUnique({
        where: { title: navItem.title }
    });

    const data = {
        title: navItem.title,
        href: navItem.href,
        disabled: navItem.disabled,
        external: navItem.external,
        icon: navItem.icon,
        label: navItem.label,
        listOrder: navItem.listOrder,
        description: navItem.description
    };

    let savedNavItem;

    if (!existingNavItem) {
        savedNavItem = await prisma.navItem.create({
            data
        });
        console.log(`Created nav item: ${savedNavItem.title}`);
    } else {
        savedNavItem = await prisma.navItem.update({
            where: { id: existingNavItem.id },
            data
        });
        console.log(`Updated nav item: ${savedNavItem.title}`);
    }

    // Handle nested items (NavSubItem) separately
    if (navItem.items && navItem.items.length > 0) {
        for (const subItem of navItem.items) {
            await createOrUpdateNavSubItem(subItem, savedNavItem.id);
        }
    }

    return savedNavItem;
}

async function createOrUpdateNavSubItem(subItem: any, parentId: string) {
    const existingSubItem = await prisma.navSubItem.findUnique({
        where: { title: subItem.title }
    });

    const data = {
        title: subItem.title,
        href: subItem.href,
        disabled: subItem.disabled,
        external: subItem.external,
        icon: subItem.icon,
        label: subItem.label,
        listOrder: subItem.listOrder,
        description: subItem.description,
        parentId
    };

    if (!existingSubItem) {
        await prisma.navSubItem.create({
            data
        });
        console.log(`Created nav sub-item: ${subItem.title}`);
    } else {
        await prisma.navSubItem.update({
            where: { id: existingSubItem.id },
            data
        });
        console.log(`Updated nav sub-item: ${subItem.title}`);
    }
}

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
