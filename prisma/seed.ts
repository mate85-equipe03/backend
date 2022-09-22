import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  /* *********************************************************************** */
  //                             NIVEL VAGA
  /* *********************************************************************** */
  const mestrado = await prisma.nivelVaga.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Mestrado',
    },
  });

  const doutorado = await prisma.nivelVaga.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Doutorado',
    },
  });

  console.log({ mestrado, doutorado });

  /* *********************************************************************** */
  //                  USUARIOS
  /* *********************************************************************** */
  const root_user = await prisma.usuario.upsert({
    where: { login: 'root' },
    update: {},
    create: {
      login: 'root',
      email: 'root@ufba.br',
      senha: bcrypt.hashSync('root', 10),
    },
  });

  const djair_user = await prisma.usuario.upsert({
    where: { login: '123456' },
    update: {},
    create: {
      login: '123456',
      email: 'djair@ufba.br',
      senha: bcrypt.hashSync('123456', 10),
      professor: {
        create: {
          siape: '123456',
        },
      },
    },
  });

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
  });

  const matheus_user = await prisma.usuario.upsert({
    where: { login: '200420221' },
    update: {},
    create: {
      login: '200420221',
      email: 'matheuslao@ufba.br',
      senha: bcrypt.hashSync('123456', 10),
      professor: {
        create: {
          siape: '200420221',
        },
      },
    },
  });

  const beatriz_user = await prisma.usuario.upsert({
    where: { login: '123654' },
    update: {},
    create: {
      login: '123654',
      email: 'beatriz@ufba.br',
      senha: bcrypt.hashSync('123654', 10),
      aluno: {
        create: {
          matricula: '123654',
        },
      },
    },
  });

  const lucas_user = await prisma.usuario.upsert({
    where: { login: '202202001' },
    update: {},
    create: {
      login: '202202001',
      email: 'lucas@ufba.br',
      senha: bcrypt.hashSync('123456', 10),
      aluno: {
        create: {
          matricula: '202202001',
        },
      },
    },
  });

  const kennedy_user = await prisma.usuario.upsert({
    where: { login: '202202002' },
    update: {},
    create: {
      login: '202202002',
      email: 'kennedy@ufba.br',
      senha: bcrypt.hashSync('123456', 10),
      aluno: {
        create: {
          matricula: '202202002',
        },
      },
    },
  });

  const rodrigo_user = await prisma.usuario.upsert({
    where: { login: '202202003' },
    update: {},
    create: {
      login: '202202003',
      email: 'rodrigo@ufba.br',
      senha: bcrypt.hashSync('123456', 10),
      aluno: {
        create: {
          matricula: '202202003',
        },
      },
    },
  });

  console.log({ root_user, matheus_user, djair_user, augusto_user, 
    beatriz_user, lucas_user, kennedy_user, rodrigo_user });

  /* *********************************************************************** */
  //                          PROCESSOS SELETIVOS
  /* *********************************************************************** */
  const processoSeletivo01 = await prisma.processoSeletivo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      titulo: 'Edital PGCOMP-03/2022',
      descricao:
        'Processo Seletivo para Concessão de Bolsas de Mestrado e Doutorado',
      semestre: '2022.2',
      arquivado: false,
      edital_url:
        'https://pgcomp.ufba.br/sites/pgcomp.ufba.br/files/edital_pgcomp_03_2022_-_bolsas_mestrado_e_doutorado.pdf',
      categorias_producao: {
        create: [
          {nome: 'Publicação A1', pontuacao: 10.0},
          {nome: 'Publicação A2', pontuacao: 8.75}
        ],
      },
    },
  });
  const etapa01 = await prisma.etapa.upsert({
    where: { id: 1 },
    update: {},
    create: {
      processo_seletivo_id: processoSeletivo01.id,
      name: 'Inscrições',
      data_inicio: new Date('2022-09-15'),
      data_fim: new Date('2022-10-15'),
    },
  });
  const etapa03 = await prisma.etapa.upsert({
    where: { id: 3 },
    update: {},
    create: {
      processo_seletivo_id: processoSeletivo01.id,
      name: 'Em analise',
      data_inicio: new Date('2022-10-15'),
      data_fim: new Date('2022-11-15'),
    },
  });

  const processoSeletivo02 = await prisma.processoSeletivo.upsert({
    where: { id: 2 },
    update: {},
    create: {
      titulo: 'Edital PGCOMP-08/2021',
      descricao:
        'Processo Seletivo para Concessão de Bolsas de Mestrado e Doutorado',
      semestre: '2021.1',
      arquivado: true,
      edital_url:
        'https://pgcomp.ufba.br/sites/pgcomp.ufba.br/files/3_-_edital_pgcomp_08_2021_-_bolsas_mestrado_e_doutorado_-_terceira_chamada.pdf',
      categorias_producao: {
        create: [
          {nome: 'Publicação A1', pontuacao: 10.0},
          {nome: 'Publicação A2', pontuacao: 8.75}
        ],
      },
    },
  });
  const etapa02 = await prisma.etapa.upsert({
    where: { id: 2 },
    update: {},
    create: {
      processo_seletivo_id: processoSeletivo02.id,
      name: 'Arquivado',
      data_inicio: new Date('2021-09-15'),
      data_fim: new Date('2021-12-15'),
    },
  });

  console.log(processoSeletivo01, processoSeletivo02);

  /* *********************************************************************** */
  //                          STATUS
  /* *********************************************************************** */
  const statusEnviada = await prisma.statusInscricao.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Enviada',
    },
  });  

  /* *********************************************************************** */
  //                          INSCRICAO
  /* *********************************************************************** */
  const inscricaoBia = await prisma.inscricao.upsert({
    where: { id: 1 },
    update: {},
    create: {
      status_id: statusEnviada.id,
      aluno_id: beatriz_user.aluno.id,
      processo_seletivo_id: processoSeletivo01.id,
      url_lattes: 'https://idojo.com.br',
      url_enade: 'https://ufba.br',
      producoes:{
        create: [
          {url: "oij", file: null, categorias_producao_id: 1},
          {url: "bla", file: null, categorias_producao_id: 2}
        ]
      }
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
