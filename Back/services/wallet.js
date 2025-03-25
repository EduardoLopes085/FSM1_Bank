const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function GetWallet(req, res) {
    try {
        const carteira = await prisma.wallet.findMany({
            include: {
                owner: true,          // Inclui todos os dados do dono da carteira (referenciado por `ownerId`)
                expenses: true,       // Inclui todas as despesas associadas à carteira
                users: true           // Inclui todos os usuários associados à carteira
            }
        });
        res.json(carteira);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar carteiras" });
    }
}


async function GetIdWallet(req, res) {
    try {
        const { id } = req.params;
        const carteira = await prisma.wallet.findUnique({ where: { id: parseInt(id) } });

        if (!carteira) {
            return res.status(404).json({ error: "Carteira não encontrada" });
        }

        res.json(carteira);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar carteira" });
    }
}

module.exports={
    GetWallet,
    GetIdWallet
}