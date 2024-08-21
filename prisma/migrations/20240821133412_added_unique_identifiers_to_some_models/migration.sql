/*
  Warnings:

  - You are about to drop the column `employmentStatus` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Designation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employmentStatusName` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "employmentStatus",
ADD COLUMN     "employmentStatusName" TEXT NOT NULL;

-- DropEnum
DROP TYPE "EmploymentStatus";

-- CreateTable
CREATE TABLE "EmploymentStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "EmploymentStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmploymentStatus_name_key" ON "EmploymentStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Designation_title_key" ON "Designation"("title");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_employmentStatusName_fkey" FOREIGN KEY ("employmentStatusName") REFERENCES "EmploymentStatus"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
