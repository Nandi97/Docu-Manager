import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.json(
            { message: 'Please sign in to fetch employees' },
            { status: 401 }
        );
    }

    try {
        const { searchParams } = new URL(request.url);
        const page = Number(searchParams.get('page')) || 1;
        const limit = Number(searchParams.get('limit')) || 10;
        const search = searchParams.get('search') || '';
        const offset = (page - 1) * limit;

        // Fetch the total number of employees matching the search criteria
        const totalEmployees = await prisma.employee.count({
            where: {
                OR: [
                    { firstName: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                    {
                        designation: {
                            title: { contains: search, mode: 'insensitive' },
                            department: {
                                name: { contains: search, mode: 'insensitive' }
                            }
                        }
                    }
                ]
            }
        });

        const data = await prisma.employee.findMany({
            where: {
                OR: [
                    { firstName: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                    {
                        designation: {
                            title: { contains: search, mode: 'insensitive' },
                            department: {
                                name: { contains: search, mode: 'insensitive' }
                            }
                        }
                    }
                ]
            },
            include: {
                designation: {
                    include: {
                        department: true
                    }
                },
                employeeType: true,
                employmentStatus: true
            },
            orderBy: {
                dateOfJoining: 'asc'
            },
            skip: offset,
            take: limit
        });

        const pageCount = Math.ceil(totalEmployees / limit);

        return NextResponse.json(
            { employees: data, pageCount, totalEmployees },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { err: 'Error occurred while fetching employees' },
            { status: 403 }
        );
    }
}
