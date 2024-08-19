-- CreateTable
CREATE TABLE "NavItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "href" TEXT,
    "disabled" BOOLEAN DEFAULT false,
    "external" BOOLEAN DEFAULT false,
    "icon" TEXT,
    "label" TEXT,
    "description" TEXT,
    "parentId" TEXT,

    CONSTRAINT "NavItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NavItem" ADD CONSTRAINT "NavItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "NavItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
