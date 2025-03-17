-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gastos" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoria" TEXT NOT NULL,

    CONSTRAINT "Gastos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Gastos" ADD CONSTRAINT "Gastos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
