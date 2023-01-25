-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "doctor_id" TEXT NOT NULL,
    "patients_id" TEXT NOT NULL,
    CONSTRAINT "Alert_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Alert_patients_id_fkey" FOREIGN KEY ("patients_id") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
