/*
  Warnings:

  - You are about to drop the column `parentId` on the `NavItem` table. All the data in the column will be lost.
  - Added the required column `listOrder` to the `NavItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NavItem" DROP CONSTRAINT "NavItem_parentId_fkey";

-- AlterTable
ALTER TABLE "NavItem" DROP COLUMN "parentId",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "listOrder" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "NavSubItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "href" TEXT,
    "disabled" BOOLEAN DEFAULT false,
    "external" BOOLEAN DEFAULT false,
    "icon" TEXT,
    "label" TEXT,
    "description" TEXT,
    "listOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "parentId" TEXT,

    CONSTRAINT "NavSubItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NavSubItem_title_key" ON "NavSubItem"("title");

-- AddForeignKey
ALTER TABLE "NavSubItem" ADD CONSTRAINT "NavSubItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "NavItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
