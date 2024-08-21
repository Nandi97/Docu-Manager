/*
  Warnings:

  - You are about to drop the column `departmentId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `employmentStatusName` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `employmentStatusId` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_employmentStatusName_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "departmentId",
DROP COLUMN "employmentStatusName",
ADD COLUMN     "employmentStatusId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_employmentStatusId_fkey" FOREIGN KEY ("employmentStatusId") REFERENCES "EmploymentStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
