const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Rota para listar todos os gastos
async function GetGastos(req, res) {
    try {
        const gastos = await prisma.expense.findMany();
        res.json(gastos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar gastos" });
    }
}


// Rota para buscar um gasto por ID
async function GetIdGastos(req, res) {
    try {
        const { id } = req.params;
        const gasto = await prisma.expense.findUnique({ where: { id: parseInt(id) } });

        

        if (!gasto) {
            return res.status(404).json({ error: "Gasto não encontrado" });
        }

        res.json(gasto);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar gasto" });
    }
}

// Função para buscar os gastos de um usuário
async function GastosPorUser (req, res) {
    const { id } = req.params; 

    try {
        const gastos = await prisma.expense.findMany({
            where: { userId: parseInt(id) }, // Filtra os gastos pelo userId
        });


        if (gastos.length === 0) {
            return res.status(404).json({ error: "Nenhum gasto encontrado para este usuário" });
        }

        res.status(200).json(gastos); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar gastos do usuário" });
    }
}

// Rota para adicionar um novo gasto
async function PostGastos(req, res) {
    try {
        const { descricao, value, category, walletId } = req.body; // Inclua o walletId

        if (!walletId) {
            return res.status(400).json({ error: "walletId é obrigatório" }); // Valide se o walletId está presente
        }

        // Criação do gasto associado a uma carteira
        const novoGasto = await prisma.expense.create({
            data: {
                descricao,
                value: parseFloat(value),
                category,
                walletId // Adicione o walletId aqui
            },
        });

        res.status(201).json(novoGasto);
    } catch (error) {
        res.status(500).json({ error: `Erro ao adicionar gasto: ${error.message}` }); // Melhorei a mensagem de erro
    }
}


// Rota para excluir um gasto por ID
async function DeleteGastos(req, res) {
    try {
        const { id } = req.params;

        const gastoExiste = await prisma.expense.findUnique({ where: { id: parseInt(id) } });

        if (!gastoExiste) {
            return res.status(404).json({ error: "Gasto não encontrado" });
        }

        await prisma.expense.delete({ where: { id } });

        res.json({ message: "Gasto excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir gasto" });
    }
}


module.exports = {
    GetGastos,
    GetIdGastos,
    GastosPorUser,
    PostGastos,
    DeleteGastos
};