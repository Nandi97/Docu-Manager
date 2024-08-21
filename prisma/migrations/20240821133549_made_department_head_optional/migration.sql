-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_headId_fkey";

-- AlterTable
ALTER TABLE "Department" ALTER COLUMN "headId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_headId_fkey" FOREIGN KEY ("headId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
