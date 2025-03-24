const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');


//listar todos os usarios
async function GetUsers(req, res) {
    const users = await prisma.user.findMany();
    res.json(users)
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
        const { name, email, password, ownedWallets } = req.body;

        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({
                message: "Todos os campos obrigatórios devem ser preenchidos."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                ownedWallets: {
                    create: {
                        name: "minha carteira",
                    },
                },

            },
            include: {
                ownedWallets: true,
            },
        })
        
        // Acessa a carteira criada
        const wallet = newUser .ownedWallets[0]; 

        // Cria a entrada na tabela WalletUser 
        await prisma.walletUser .create({
            data: {
                userId: newUser .id,
                walletId: wallet.id,
            },
        });
        
        res.status(201).json(newUser);

    } catch (error) {
        console.error(error);
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