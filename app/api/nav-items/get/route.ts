import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.json(
            { message: 'Please signin to view side menu' },
            { status: 401 }
        );
    }

    try {
        const data = await prisma.navItem.findMany({
            include: {
                items: true // Include nested items
            },
            orderBy: {
                listOrder: 'asc'
            }
        });

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        NextResponse.json(
            { err: 'Error has occurred while fetching menus' },
            { status: 403 }
        );
    }
}
