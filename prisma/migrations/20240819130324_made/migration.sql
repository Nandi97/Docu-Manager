/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `NavItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NavItem_title_key" ON "NavItem"("title");
