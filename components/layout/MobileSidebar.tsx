'use client';
import { DashboardNav } from '@/components/layout/DashboardNav';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { fetchAllNavItems } from '@/services/api-calls/nav-tems';
import { useQuery } from '@tanstack/react-query';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';

// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    // playlists: Playlist[];
}

export function MobileSidebar({ className }: SidebarProps) {
    const [open, setOpen] = useState(false);
    const { data: navItems } = useQuery({
        queryFn: fetchAllNavItems,
        queryKey: ['nav-items']
    });
    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <MenuIcon />
                </SheetTrigger>
                <SheetContent side="left" className="!px-0">
                    <div className="space-y-4 py-4">
                        <div className="px-3 py-2">
                            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                Overview
                            </h2>
                            <div className="space-y-1">
                                {navItems && (
                                    <DashboardNav
                                        items={navItems}
                                        isMobileNav={true}
                                        setOpen={setOpen}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
