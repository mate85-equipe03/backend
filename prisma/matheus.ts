import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const x = await prisma.processoSeletivo.findFirst({
    where: {
      id: 1,
    },
    include: {
      tipos_documento: true,
    }
  })
  

  console.log(x.tipos_documento[0])
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
