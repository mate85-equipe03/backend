import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const x = await prisma.processoSeletivo.findFirst({
    where: {
      id: 1,
    },
    include: {
      categorias_producao: true,
    }
  })
  

  console.log(x.categorias_producao[0])
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
