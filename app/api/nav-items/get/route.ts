import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    // const session = await getServerSession(req, res, authOptions);

    // if (!session) {
    // 	return res.status(401).json({ message: 'Please signin to view side menu' });
    // }

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
