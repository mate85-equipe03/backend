import { PrismaClient, StatusInscricao, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  

  /* *********************************************************************** */
  //                  USUARIOS
  /* *********************************************************************** */
  const root_user = await prisma.usuario.upsert({
    where: { login: 'root' },
    update: {},
    create: {
      login: 'root',
      email: 'root@ufba.br',
      telefone: '9999999999',
      senha: bcrypt.hashSync('root', 10),
      role: Role.ROOT,
    },
  });
  
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
