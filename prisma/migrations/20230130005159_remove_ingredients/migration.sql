/*
  Warnings:

  - You are about to drop the `ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `meals_ingredients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "meals_ingredients" DROP CONSTRAINT "meals_ingredients_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "meals_ingredients" DROP CONSTRAINT "meals_ingredients_meal_id_fkey";

-- AlterTable
ALTER TABLE "meals" ADD COLUMN     "ingredients" JSONB[];

-- DropTable
DROP TABLE "ingredients";

-- DropTable
DROP TABLE "meals_ingredients";
