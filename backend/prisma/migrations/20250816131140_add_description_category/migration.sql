/*
  Warnings:

  - Added the required column `category` to the `ProjectDescription` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectDescription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "points" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProjectDescription_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProjectDescription" ("createdAt", "id", "order", "points", "projectId", "title", "updatedAt") SELECT "createdAt", "id", "order", "points", "projectId", "title", "updatedAt" FROM "ProjectDescription";
DROP TABLE "ProjectDescription";
ALTER TABLE "new_ProjectDescription" RENAME TO "ProjectDescription";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
