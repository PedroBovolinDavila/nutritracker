-- AlterTable
ALTER TABLE "doctor_alerts" ADD COLUMN     "viewed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "patient_alerts" ADD COLUMN     "viewed" BOOLEAN NOT NULL DEFAULT false;
