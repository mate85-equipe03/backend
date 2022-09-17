import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';


const prisma = new PrismaClient()

async function main() {

  /* *********************************************************************** */
  //                             NIVEL VAGA
  /* *********************************************************************** */
  const mestrado = await prisma.nivelVaga.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Mestrado'
    },
  })

  const doutorado = await prisma.nivelVaga.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Doutorado'
    },
  })
  
  console.log({ mestrado, doutorado })

  /* *********************************************************************** */
  //                  USUARIOS
  /* *********************************************************************** */
  const root_user = await prisma.usuario.upsert({
    where: { login: 'root' }, 
    update: {},
    create: {
      login: 'root',
      email: 'root@ufba.br',
      senha: bcrypt.hashSync('root', 10)
    },
  })

  const djair_user = await prisma.usuario.upsert({
    where: { login: '123456' }, 
    update: {},
    create: {
      login: '123456',
      email: 'djair@ufba.br',
      senha: bcrypt.hashSync('123456', 10),
      aluno: {
        create: {
          matricula: '123456',
        },
      },
    },
  })

  const augusto_user = await prisma.usuario.upsert({
    where: { login: '654321' }, 
    update: {},
    create: {
      login: '654321',
      email: 'augusto@ufba.br',
      senha: bcrypt.hashSync('654321', 10),
      professor: {
        create: {
          siape: '654321',
        },
      },
    },
  })

  const beatriz_user = await prisma.usuario.upsert({
    where: { login: '123654' }, 
    update: {},
    create: {
      login: '123654',
      email: 'beatriz@ufba.br',
      senha: bcrypt.hashSync('123654', 10),
      professor: {
        create: {
          siape: '123654',
        },
      },
    },
  })

  console.log({ beatriz_user, djair_user, augusto_user, root_user })

  /* *********************************************************************** */
  //                          PROCESSOS SELETIVOS
  /* *********************************************************************** */
  const processoSeletivo01 = await prisma.processoSeletivo.upsert({
    where: { id: 1 }, 
    update: {},
    create: {
      titulo:     'Edital PGCOMP-03/2022',
      descricao:  'Processo Seletivo para Concessão de Bolsas de Mestrado e Doutorado',
      semestre:   '2022.2',
      arquivado:  false,
      edital_url: 'https://pgcomp.ufba.br/sites/pgcomp.ufba.br/files/edital_pgcomp_03_2022_-_bolsas_mestrado_e_doutorado.pdf',
    },
  })

  const processoSeletivo02 = await prisma.processoSeletivo.upsert({
    where: { id: 2 }, 
    update: {},
    create: {
      titulo:     'Edital PGCOMP-08/2021',
      descricao:  'Processo Seletivo para Concessão de Bolsas de Mestrado e Doutorado',
      semestre:   '2021.1',
      arquivado:  true,
      edital_url: 'https://pgcomp.ufba.br/sites/pgcomp.ufba.br/files/3_-_edital_pgcomp_08_2021_-_bolsas_mestrado_e_doutorado_-_terceira_chamada.pdf',
    },
  })

  console.log(processoSeletivo01, processoSeletivo02)

  


}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })