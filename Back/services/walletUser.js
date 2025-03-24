const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function GetWalletUser(req, res) {
    try {
        const walletUser = await prisma.walletUser.findMany();
        res.json(walletUser);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar carteiras" });
    }
    
}

module.exports= GetWalletUser;