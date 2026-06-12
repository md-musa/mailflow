/*
  Warnings:

  - A unique constraint covering the columns `[createdById,name]` on the table `groups` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "groups_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "groups_createdById_name_key" ON "groups"("createdById", "name");
