'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

// import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { useSidebar } from '@/hooks/useSidebar';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from '../ui/button';

interface DashboardNavProps {
    items: NavItem[];
    setOpen?: Dispatch<SetStateAction<boolean>>;
    isMobileNav?: boolean;
}

export function DashboardNav({
    items,
    setOpen,
    isMobileNav = false
}: DashboardNavProps) {
    const path = usePathname();
    const { isMinimized } = useSidebar();

    // State to manage which dropdown is open
    const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

    if (!items?.length) {
        return null;
    }
    const handleDropdownToggle = (itemId: string) => {
        setOpenDropdown(openDropdown === itemId ? null : itemId);
    };

    return (
        <nav className="grid items-start gap-2">
            <TooltipProvider>
                {items.map((item, index) => (
                    <div key={index} className="flex flex-col">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                {item.items && item.items.length > 0 ? (
                                    <Button
                                        className={cn(
                                            'flex w-full items-center justify-between gap-2 overflow-hidden rounded-md bg-transparent py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',

                                            item.disabled &&
                                                'cursor-not-allowed opacity-80'
                                        )}
                                        onClick={() => {
                                            if (
                                                item.items &&
                                                item.items.length > 0
                                            ) {
                                                handleDropdownToggle(item.id);
                                            } else if (setOpen) {
                                                setOpen(false);
                                            }
                                        }}
                                    >
                                        {isMobileNav ||
                                        (!isMinimized && !isMobileNav) ? (
                                            <div className="flex items-center">
                                                <Icon
                                                    icon={item?.icon as string}
                                                    className="mr-3 size-5 flex-none"
                                                />{' '}
                                                <span className="mr-2 truncate">
                                                    {item.title}
                                                </span>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                        <Icon
                                            icon={`mdi:chevron-right`}
                                            className={`mr-3 size-5 flex-none ${openDropdown === item.id ? 'rotate-90' : ''} transition-all duration-300 ease-in-out`}
                                        />
                                    </Button>
                                ) : (
                                    <Link
                                        href={
                                            item.disabled
                                                ? '/'
                                                : item.href || '#'
                                        }
                                        className={cn(
                                            'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                                            path === item.href
                                                ? 'bg-accent'
                                                : 'transparent',
                                            item.disabled &&
                                                'cursor-not-allowed opacity-80'
                                        )}
                                        onClick={() => {
                                            if (setOpen) setOpen(false);
                                        }}
                                    >
                                        <Icon
                                            icon={item?.icon as string}
                                            className="ml-3 size-5 flex-none"
                                        />
                                        {isMobileNav ||
                                        (!isMinimized && !isMobileNav) ? (
                                            <span className="mr-2 truncate">
                                                {item.title}
                                            </span>
                                        ) : (
                                            ''
                                        )}
                                    </Link>
                                )}
                            </TooltipTrigger>
                            <TooltipContent
                                align="center"
                                side="right"
                                sideOffset={8}
                                className={
                                    !isMinimized ? 'hidden' : 'inline-block'
                                }
                            >
                                {item.title}
                            </TooltipContent>
                        </Tooltip>

                        {item.items &&
                            item.items.length > 0 &&
                            openDropdown === item.id && (
                                <div className="mt-2 w-full rounded-md border bg-transparent shadow-lg">
                                    {item.items.map((subItem, subIndex) => (
                                        <Link
                                            key={subIndex}
                                            href={
                                                subItem.disabled
                                                    ? '/'
                                                    : subItem.href || '#'
                                            }
                                            className={cn(
                                                'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                                                path === subItem.href
                                                    ? 'bg-accent'
                                                    : 'transparent',
                                                subItem.disabled &&
                                                    'cursor-not-allowed opacity-80'
                                            )}
                                            onClick={() => {
                                                if (setOpen) setOpen(false);
                                            }}
                                        >
                                            <Icon
                                                icon={subItem?.icon as string}
                                                className="ml-3 size-5 flex-none"
                                            />
                                            {isMobileNav ||
                                            (!isMinimized && !isMobileNav) ? (
                                                <span className="mr-2 truncate">
                                                    {subItem.title}
                                                </span>
                                            ) : (
                                                ''
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            )}
                    </div>
                ))}
            </TooltipProvider>
        </nav>
    );
}
