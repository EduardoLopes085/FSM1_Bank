const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Rota para listar todos os gastos
async function GetGastos(req, res) {
    try {
        const gastos = await prisma.gasto.findMany();
        res.json(gastos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar gastos" });
    }
}


// Rota para buscar um gasto por ID
async function GetIdGastos(req, res) {
    try {
        const { id } = req.params;
        const gasto = await prisma.gasto.findUnique({ where: { id } });

        if (!gasto) {
            return res.status(404).json({ error: "Gasto não encontrado" });
        }

        res.json(gasto);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar gasto" });
    }
}

// Rota para adicionar um novo gasto
async function PostGastos(req, res) {
    try {
        const { descricao, valor, categoria, data } = req.body;
        const novoGasto = await prisma.gasto.create({
            data: { descricao, valor: parseFloat(valor), categoria, data: new Date(data) },
        });
        res.status(201).json(novoGasto);
    } catch (error) {
        res.status(500).json({ error: "Erro ao adicionar gasto" });
    }

}

// Rota para excluir um gasto por ID
async function DeleteGastos(req, res) {
    try {
        const { id } = req.params;

        const gastoExiste = await prisma.gasto.findUnique({ where: { id } });

        if (!gastoExiste) {
            return res.status(404).json({ error: "Gasto não encontrado" });
        }

        await prisma.gasto.delete({ where: { id } });

        res.json({ message: "Gasto excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir gasto" });
    }
}


module.exports = {
    GetGastos,
    GetIdGastos,
    PostGastos,
    DeleteGastos
};