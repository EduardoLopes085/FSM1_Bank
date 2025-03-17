const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


//listar todos os usarios
async function GetUsers(req,res){
    const users = await prisma.user.findMany();
    res.json(users)
}

async function GetIdUsers(req,res){
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

async function PostUsers(req,res) {
    try {
        const body = req.body;

        if (!body.nome || !body.idade || !body.email || !body.senha) {
            return res.status(400).json({
                message: "Todos os campos obrigatórios devem ser preenchidos."
            });
        }

        const newUser = await prisma.user.create({ data: body })
        res.status(201).json(newUser);

    } catch (error) {
        res.status(500).json({ error: "Erro ao adicionar o Usuário" });

    }
    
}

async function PutUsers(req,res) {
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

async function DeleteUsers(req,res) {
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