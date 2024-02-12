/*
  Warnings:

  - Added the required column `title` to the `Plugin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plugin" ADD COLUMN     "title" TEXT NOT NULL;
