import { DashboardNav } from './DashboardNav';
import { cn } from '@/lib/utils';
import { fetchAllNavItems } from '@/services/api-calls/nav-tems';
import { useQuery } from '@tanstack/react-query';

export default function Sidebar() {
    const { data: navItems } = useQuery({
        queryFn: fetchAllNavItems,
        queryKey: ['nav-items']
    });
    return (
        <nav
            className={cn(
                `relative hidden h-screen w-72 border-r pt-16 lg:block`
            )}
        >
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
                            Overview
                        </h2>
                        {navItems && <DashboardNav items={navItems} />}
                    </div>
                </div>
            </div>
        </nav>
    );
}
