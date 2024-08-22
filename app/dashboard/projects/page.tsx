import { Breadcrumbs } from '@/components/custom-ui/breadcrumbs';
import { Heading } from '@/components/custom-ui/Heading';
import { KanbanBoard } from '@/components/custom-ui/kanban/kanban-board';
import NewTaskDialog from '@/components/custom-ui/kanban/new-task-dialog';
import PageContainer from '@/components/layout/PageContainer';
import React from 'react';
const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Projects', link: '/dashboard/projects' }
];

const page = () => {
    return (
        <PageContainer>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-start justify-between">
                    <Heading
                        title={`Projects`}
                        description="Manage tasks by dnd"
                    />
                    <NewTaskDialog />
                </div>
                <KanbanBoard />
            </div>
        </PageContainer>
    );
};

export default page;
