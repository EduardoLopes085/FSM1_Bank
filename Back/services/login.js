const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SECRET_KEY = 'EFKAJDJKSJFASDNCZ45'; // idealmente usar variável de ambiente

async function login(req, res) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: 'Usuário não encontrado' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Senha incorreta' });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    SECRET_KEY,
    { expiresIn: '5h' }
  );

  // 👇 Aqui incluímos o user (sem a senha, claro!)
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email
    }
  });
}

module.exports = login;
