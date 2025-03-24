/*
  Warnings:

  - You are about to drop the column `idade` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `nome` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `senha` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - Added the required column `dataNascimento` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "idade",
ADD COLUMN     "dataNascimento" DATE NOT NULL,
ALTER COLUMN "nome" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "senha" SET DATA TYPE VARCHAR(20);
