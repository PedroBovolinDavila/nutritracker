/*
  Warnings:

  - You are about to drop the `Alert` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Alert";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "alerts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "doctor_id" TEXT NOT NULL,
    "patients_id" TEXT NOT NULL,
    CONSTRAINT "alerts_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "alerts_patients_id_fkey" FOREIGN KEY ("patients_id") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
