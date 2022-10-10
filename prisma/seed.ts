import { PrismaClient, StatusInscricao, Role } from '@prisma/client';
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
      telefone: '9999999999',
      senha: bcrypt.hashSync('root', 10),
      role: Role.ROOT,
    },
  });

  const djair_user = await prisma.usuario.upsert({
    where: { login: '123456' },
    update: {},
    create: {
      login: '123456',
      email: 'djair@ufba.br',
      telefone: '7399999999',
      senha: bcrypt.hashSync('123456', 10),
      role: Role.PROFESSOR,
      professor: {
        create: {
          nome: 'Djair',
          siape: '123456',
        },
      },
    },
    include: {
      professor: true,
    },
  });

  const augusto_user = await prisma.usuario.upsert({
    where: { login: '654321' },
    update: {},
    create: {
      login: '654321',
      email: 'augusto@ufba.br',
      telefone: '7199999999',
      senha: bcrypt.hashSync('654321', 10),
      role: Role.PROFESSOR,
      professor: {
        create: {
          nome: 'Augusto',
          siape: '654321',
        },
      },
    },
    include: {
      professor: true,
    },
  });

  const matheus_user = await prisma.usuario.upsert({
    where: { login: '200420221' },
    update: {},
    create: {
      login: '200420221',
      email: 'matheuslao@ufba.br',
      telefone: '7499999999',
      senha: bcrypt.hashSync('123456', 10),
      role: Role.PROFESSOR,
      professor: {
        create: {
          nome: 'Mateus',
          siape: '200420221',
        },
      },
    },
    include: {
      professor: true,
    },
  });

  const beatriz_user = await prisma.usuario.upsert({
    where: { login: '123654' },
    update: {},
    create: {
      login: '123654',
      email: 'beatriz@ufba.br',
      telefone: '7599999999',
      senha: bcrypt.hashSync('123654', 10),
      role: Role.ALUNO,
      aluno: {
        create: {
          nome: 'Beatriz',
          matricula: '123654',
          semestre_pgcomp: 20221,
          curso: 'mestrado',
          lattes_link: '-',
        },
      },
    },
    include: {
      aluno: true,
    },
  });

  const lucas_user = await prisma.usuario.upsert({
    where: { login: '202202001' },
    update: {},
    create: {
      login: '202202001',
      telefone: '7799999999',
      email: 'lucas@ufba.br',
      senha: bcrypt.hashSync('123456', 10),
      role: Role.ALUNO,
      aluno: {
        create: {
          nome: 'Lucas',
          matricula: '202202001',
          semestre_pgcomp: 20221,
          curso: 'mestrado',
          lattes_link: '-',
        },
      },
    },
    include: {
      aluno: true,
    },
  });

  const kennedy_user = await prisma.usuario.upsert({
    where: { login: '202202002' },
    update: {},
    create: {
      login: '202202002',
      email: 'kennedy@ufba.br',
      telefone: '8199999999',
      senha: bcrypt.hashSync('123456', 10),
      role: Role.ALUNO,
      aluno: {
        create: {
          nome: 'Kennedy',
          matricula: '202202002',
          semestre_pgcomp: 20221,
          curso: 'mestrado',
          lattes_link: '-',
        },
      },
    },
    include: {
      aluno: true,
    },
  });

  const rodrigo_user = await prisma.usuario.upsert({
    where: { login: '202202003' },
    update: {},
    create: {
      login: '202202003',
      email: 'rodrigo@ufba.br',
      telefone: '7499999999',
      senha: bcrypt.hashSync('123456', 10),
      role: Role.ALUNO,
      aluno: {
        create: {
          nome: 'Rodrigo',
          matricula: '202202003',
          semestre_pgcomp: 20221,
          curso: 'mestrado',
          lattes_link: '-',
        },
      },
    },
    include: {
      aluno: true,
    },
  });

  console.log({
    root_user,
    matheus_user,
    djair_user,
    augusto_user,
    beatriz_user,
    lucas_user,
    kennedy_user,
    rodrigo_user,
  });

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
          { nome: 'Publicação A1', pontuacao: 10.0 },
          { nome: 'Publicação A2', pontuacao: 8.75 },
          { nome: 'Publicação A3', pontuacao: 8.75 },
          { nome: 'Publicação B1', pontuacao: 6.75 },
        ],
      },
    },
    include: {
      categorias_producao: true,
    },
  });
  const etapa01 = await prisma.etapa.upsert({
    where: { id: 1 },
    update: {},
    create: {
      processo_seletivo_id: processoSeletivo01.id,
      name: 'Inscrições',
      data_inicio: new Date('2022-10-01'),
      data_fim: new Date('2022-11-15'),
    },
  });
  const etapa03 = await prisma.etapa.upsert({
    where: { id: 3 },
    update: {},
    create: {
      processo_seletivo_id: processoSeletivo01.id,
      name: 'Em analise',
      data_inicio: new Date('2022-11-15'),
      data_fim: new Date('2022-12-15'),
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
          { nome: 'Publicação A1', pontuacao: 10.0 },
          { nome: 'Publicação A2', pontuacao: 8.75 },
        ],
      },
    },
    include: {
      categorias_producao: true,
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
  const statusEnviada = await prisma.statusInscricaoDesc.upsert({
    where: {
      id: StatusInscricao.ENVIADA,
    },
    update: {},
    create: {
      name: 'Enviada',
      id: StatusInscricao.ENVIADA,
    },
  });

  /* *********************************************************************** */
  //                          INSCRICAO
  /* *********************************************************************** */
  // const inscricaoBia = await prisma.inscricao.upsert({
  //   where: { id: 1 },
  //   update: {},
  //   create: {
  //     aluno_id: beatriz_user.aluno.id,
  //     processo_seletivo_id: processoSeletivo01.id,
  //     url_lattes: 'https://idojo.com.br',
  //     url_enade: 'https://ufba.br',
  //     documentos: {
  //       create: [
  //         {
  //           url: 'https://ufba-bolsa.nyc3.digitaloceanspaces.com/1665103845264-3236024.3236073.pdf',
  //           categorias_producao_id: processoSeletivo01.categorias_producao[0].id,
  //         },
  //         {
  //           url: 'https://ufba-bolsa.nyc3.digitaloceanspaces.com/1665026409919-c157-rc-2020-RESySu-v1.0b.pdf',
  //           categorias_producao_id: processoSeletivo01.categorias_producao[1].id,
  //         },
  //       ],
  //     },
  //   },
  // });
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
