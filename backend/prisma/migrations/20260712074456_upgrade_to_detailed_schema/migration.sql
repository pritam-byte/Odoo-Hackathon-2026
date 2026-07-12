/*
  Warnings:

  - The values [IN_PROGRESS,COMPLETED] on the enum `MaintenanceStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [PENDING,IN_PROGRESS] on the enum `TripStatus` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Driver` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `licenseValid` on the `Driver` table. All the data in the column will be lost.
  - The primary key for the `FuelLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `FuelLog` table. All the data in the column will be lost.
  - You are about to drop the column `fuelConsumedLiters` on the `FuelLog` table. All the data in the column will be lost.
  - You are about to alter the column `cost` on the `FuelLog` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - The primary key for the `MaintenanceLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dateCompleted` on the `MaintenanceLog` table. All the data in the column will be lost.
  - You are about to drop the column `dateStarted` on the `MaintenanceLog` table. All the data in the column will be lost.
  - You are about to alter the column `cost` on the `MaintenanceLog` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - The primary key for the `Trip` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cargoWeightKg` on the `Trip` table. All the data in the column will be lost.
  - You are about to alter the column `startOdometer` on the `Trip` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `endOdometer` on the `Trip` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Vehicle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `currentOdometer` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `maxCapacityKg` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `registrationNumber` on the `Vehicle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registrationNo]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contactNumber` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenseCategory` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenseExpiryDate` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liters` to the `FuelLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceType` to the `MaintenanceLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `MaintenanceLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargoWeight` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plannedDistance` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquisitionCost` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxLoadCapacity` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationNo` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'FLEET_MANAGER', 'DISPATCHER', 'DRIVER', 'SAFETY_OFFICER', 'FINANCIAL_ANALYST');

-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('TOLL', 'PARKING', 'INSURANCE', 'REPAIR', 'OTHER');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "DriverStatus" ADD VALUE 'OFF_DUTY';
ALTER TYPE "DriverStatus" ADD VALUE 'SUSPENDED';

-- AlterEnum
BEGIN;
CREATE TYPE "MaintenanceStatus_new" AS ENUM ('OPEN', 'CLOSED');
ALTER TABLE "public"."MaintenanceLog" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "MaintenanceLog" ALTER COLUMN "status" TYPE "MaintenanceStatus_new" USING ("status"::text::"MaintenanceStatus_new");
ALTER TYPE "MaintenanceStatus" RENAME TO "MaintenanceStatus_old";
ALTER TYPE "MaintenanceStatus_new" RENAME TO "MaintenanceStatus";
DROP TYPE "public"."MaintenanceStatus_old";
ALTER TABLE "MaintenanceLog" ALTER COLUMN "status" SET DEFAULT 'OPEN';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TripStatus_new" AS ENUM ('DRAFT', 'DISPATCHED', 'COMPLETED', 'CANCELLED');
ALTER TABLE "public"."Trip" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Trip" ALTER COLUMN "status" TYPE "TripStatus_new" USING ("status"::text::"TripStatus_new");
ALTER TYPE "TripStatus" RENAME TO "TripStatus_old";
ALTER TYPE "TripStatus_new" RENAME TO "TripStatus";
DROP TYPE "public"."TripStatus_old";
ALTER TABLE "Trip" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- AlterEnum
ALTER TYPE "VehicleStatus" ADD VALUE 'RETIRED';

-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_userId_fkey";

-- DropForeignKey
ALTER TABLE "FuelLog" DROP CONSTRAINT "FuelLog_tripId_fkey";

-- DropForeignKey
ALTER TABLE "FuelLog" DROP CONSTRAINT "FuelLog_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "MaintenanceLog" DROP CONSTRAINT "MaintenanceLog_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_vehicleId_fkey";

-- DropIndex
DROP INDEX "Vehicle_registrationNumber_key";

-- AlterTable
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_pkey",
DROP COLUMN "licenseValid",
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "licenseCategory" TEXT NOT NULL,
ADD COLUMN     "licenseExpiryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "safetyScore" DOUBLE PRECISION NOT NULL DEFAULT 100,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Driver_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Driver_id_seq";

-- AlterTable
ALTER TABLE "FuelLog" DROP CONSTRAINT "FuelLog_pkey",
DROP COLUMN "date",
DROP COLUMN "fuelConsumedLiters",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fuelDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "liters" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "odometer" DOUBLE PRECISION,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "vehicleId" SET DATA TYPE TEXT,
ALTER COLUMN "tripId" SET DATA TYPE TEXT,
ALTER COLUMN "cost" DROP DEFAULT,
ALTER COLUMN "cost" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "FuelLog_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "FuelLog_id_seq";

-- AlterTable
ALTER TABLE "MaintenanceLog" DROP CONSTRAINT "MaintenanceLog_pkey",
DROP COLUMN "dateCompleted",
DROP COLUMN "dateStarted",
ADD COLUMN     "closedAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "serviceType" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "vehicleId" SET DATA TYPE TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "cost" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "status" SET DEFAULT 'OPEN',
ADD CONSTRAINT "MaintenanceLog_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MaintenanceLog_id_seq";

-- AlterTable
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_pkey",
DROP COLUMN "cargoWeightKg",
ADD COLUMN     "actualDistance" DOUBLE PRECISION,
ADD COLUMN     "cargoWeight" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "destination" TEXT NOT NULL,
ADD COLUMN     "dispatchedAt" TIMESTAMP(3),
ADD COLUMN     "plannedDistance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "revenue" DOUBLE PRECISION,
ADD COLUMN     "source" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "vehicleId" SET DATA TYPE TEXT,
ALTER COLUMN "driverId" SET DATA TYPE TEXT,
ALTER COLUMN "startOdometer" DROP NOT NULL,
ALTER COLUMN "startOdometer" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "endOdometer" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "status" SET DEFAULT 'DRAFT',
ADD CONSTRAINT "Trip_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Trip_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'DISPATCHER',
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_pkey",
DROP COLUMN "currentOdometer",
DROP COLUMN "maxCapacityKg",
DROP COLUMN "registrationNumber",
ADD COLUMN     "acquisitionCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "maxLoadCapacity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "odometer" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "registrationNo" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Vehicle_id_seq";

-- DropEnum
DROP TYPE "RoleType";

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "tripId" TEXT,
    "category" "ExpenseCategory" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "expenseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Expense_vehicleId_idx" ON "Expense"("vehicleId");

-- CreateIndex
CREATE INDEX "Expense_tripId_idx" ON "Expense"("tripId");

-- CreateIndex
CREATE INDEX "Expense_category_idx" ON "Expense"("category");

-- CreateIndex
CREATE INDEX "Expense_expenseDate_idx" ON "Expense"("expenseDate");

-- CreateIndex
CREATE INDEX "Driver_status_idx" ON "Driver"("status");

-- CreateIndex
CREATE INDEX "Driver_licenseExpiryDate_idx" ON "Driver"("licenseExpiryDate");

-- CreateIndex
CREATE INDEX "FuelLog_vehicleId_idx" ON "FuelLog"("vehicleId");

-- CreateIndex
CREATE INDEX "FuelLog_tripId_idx" ON "FuelLog"("tripId");

-- CreateIndex
CREATE INDEX "FuelLog_fuelDate_idx" ON "FuelLog"("fuelDate");

-- CreateIndex
CREATE INDEX "MaintenanceLog_vehicleId_idx" ON "MaintenanceLog"("vehicleId");

-- CreateIndex
CREATE INDEX "MaintenanceLog_status_idx" ON "MaintenanceLog"("status");

-- CreateIndex
CREATE INDEX "Trip_status_idx" ON "Trip"("status");

-- CreateIndex
CREATE INDEX "Trip_vehicleId_idx" ON "Trip"("vehicleId");

-- CreateIndex
CREATE INDEX "Trip_driverId_idx" ON "Trip"("driverId");

-- CreateIndex
CREATE INDEX "Trip_createdAt_idx" ON "Trip"("createdAt");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_registrationNo_key" ON "Vehicle"("registrationNo");

-- CreateIndex
CREATE INDEX "Vehicle_status_idx" ON "Vehicle"("status");

-- CreateIndex
CREATE INDEX "Vehicle_type_idx" ON "Vehicle"("type");

-- CreateIndex
CREATE INDEX "Vehicle_region_idx" ON "Vehicle"("region");

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceLog" ADD CONSTRAINT "MaintenanceLog_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuelLog" ADD CONSTRAINT "FuelLog_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuelLog" ADD CONSTRAINT "FuelLog_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE SET NULL ON UPDATE CASCADE;
