const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function GetWalletUser(req, res) {
    try {
        const walletUser = await prisma.walletUser.findMany({
            include: {
                wallet: true,  // Inclui os dados da carteira associada ao usuário
                user: true,    // Inclui os dados do usuário dono da carteira
            }
        });
        res.json(walletUser);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar carteiras", details: error.message });
    }
}

async function shareWallet(req, res) {
    try {
      const { walletId, userId } = req.body;
  
      // Verifica se os parâmetros foram enviados
      if (!walletId || !userId) {
        return res.status(400).json({ error: "walletId e userId são obrigatórios." });
      }
  
      // Verifica se a carteira existe
      const wallet = await prisma.wallet.findUnique({
        where: { id: parseInt(walletId) },
        include: { users: true }
      });
  
      if (!wallet) {
        return res.status(404).json({ error: "Carteira não encontrada." });
      }
  
      // Verifica se o usuário já está na carteira
      const userAlreadyInWallet = wallet.users.some(user => user.userId === parseInt(userId));
      if (userAlreadyInWallet) {
        return res.status(400).json({ error: "Usuário já tem acesso a esta carteira." });
      }
  
      // Adiciona o usuário à carteira compartilhada
      const sharedWallet = await prisma.walletUser.create({
        data: {
          walletId: parseInt(walletId),
          userId: parseInt(userId),
        }
      });
  
      res.status(201).json({ message: "Carteira compartilhada com sucesso!", sharedWallet });
    } catch (error) {
      console.error("Erro ao compartilhar carteira:", error);
      res.status(500).json({ error: `Erro ao compartilhar carteira. ${error.message}` });
    }
  }



module.exports = {
    GetWalletUser,
    shareWallet
}