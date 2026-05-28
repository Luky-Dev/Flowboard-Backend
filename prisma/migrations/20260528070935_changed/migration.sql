/*
  Warnings:

  - The `column` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TaskColumn" AS ENUM ('UNASSIGNED', 'DOING', 'DONE');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "column",
ADD COLUMN     "column" "TaskColumn" NOT NULL DEFAULT 'UNASSIGNED';
