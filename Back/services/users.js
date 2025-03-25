const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');


// Listar todos os usuários com suas carteiras
async function GetUsers(req, res) {
    try {
        const users = await prisma.user.findMany({
            include: {
                ownedWallets: true,  // Inclui as carteiras que o usuário possui
                sharedWallets: true, // Inclui as carteiras compartilhadas
            },
        });

        res.json(users);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

async function GetIdUsers(req, res) {
    try {
        const id = parseInt(req.params.id);
        const users = await prisma.user.findUnique({ where: { id } })
        if (!users) return res.status(404).json({ error: "Usuário não encontrado" })

        res.json(users);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao buscar o Usuário", error: error.message })

    }
}

async function PostUsers(req, res) {
    try {
        const { name, email, password } = req.body; // Removido ownedWallets do corpo, já que a carteira será criada automaticamente

        // Verificação de campos obrigatórios
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Todos os campos obrigatórios devem ser preenchidos."
            });
        }

        // Criptografando a senha
        const hashedPassword = await bcrypt.hash(password, 5);

        // Criando o novo usuário com a carteira associada
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                ownedWallets: {
                    create: {
                        name: `Carteira do ${name}`, // Nome da carteira do usuário
                    },
                },
            },
            include: {
                ownedWallets: true, // Inclui a carteira criada
            },
        });

        // Acessa a carteira criada
        const wallet = newUser.ownedWallets[0]; 

        // Associa o usuário à sua carteira criada
        await prisma.walletUser.create({
            data: {
                userId: newUser.id,
                walletId: wallet.id,
            },
        });
        
        res.status(201).json(newUser); // Retorna o novo usuário com a carteira associada
    } catch (error) {
        console.error("Erro ao adicionar o usuário:", error);
        res.status(500).json({ error: "Erro ao adicionar o Usuário" });
    }
}

async function PutUsers(req, res) {
    try {
        const id = parseInt(req.params.id);
        const body = req.body;

        if (!body.nome || !body.idade || !body.email || !body.senha) {
            return res.status(400).json({
                message: "Todos os campos obrigatórios devem ser preenchidos."
            });
        }

        const updateUser = await prisma.user.update({ data: body, where: { id } })

        res.status(200).json({ messsage: "Usuário atualizado com sucesso" })

    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar Usuário" });

    }

}

async function DeleteUsers(req, res) {
    try {

        const id = parseInt(req.params.id)
        const userExiste = await prisma.user.findUnique({ where: { id } })

        if (!userExiste) return res.status(400).json({ error: "Usuário não encontrado" })

        await prisma.user.delete({ where: { id } });
        res.status(200).json({ message: "Usuário excluido com sucesso" })

    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir Usuário" });

    }

}

module.exports = {
    GetUsers,
    GetIdUsers,
    PostUsers,
    PutUsers,
    DeleteUsers
};