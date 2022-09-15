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
  //                          ALUNOS
  /* *********************************************************************** */



  /* *********************************************************************** */
  //                          PROFESSORES
  /* *********************************************************************** */


  /* *********************************************************************** */
  //                          ROOT
  /* *********************************************************************** */

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