import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { AlunosService } from 'src/alunos/alunos.service';
import { ProfessoresService } from 'src/professores/professores.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AutenticacaoService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
    private alunosService: AlunosService,
    private professoresService: ProfessoresService,
  ) {}

  async validateUser(login: string, senha: string): Promise<any> {
    const usuario = await this.usuariosService.findOne(login);
    if (!usuario) return null;

    const senhaEstaCorreta = await bcrypt.compareSync(senha, usuario.senha);
    if (usuario && senhaEstaCorreta) {
      const { senha, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(usuario: any) {
    const payload = {
      role: usuario.role,
      login: usuario.login,
      userId: usuario.id,
    };

    var matricula = "";
    var nome = "";

    if (usuario.role == Role.ALUNO){
      const aluno = await this.alunosService.findAlunoByUserId(usuario.id); 
      matricula = aluno.matricula;
      nome = aluno.nome;
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          role: usuario.role,
          id: usuario.id,
          email: usuario.email,
          telefone: usuario.telefone,
          nome: nome,
          matricula: matricula,
        },
      };
    }else if (usuario.role == Role.PROFESSOR){
      const professor = await this.professoresService.findProfessorByUserId(usuario.id); 
      matricula = professor.siape
      nome = professor.nome;
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          role: usuario.role,
          id: usuario.id,
          professor_id: professor.id,
          email: usuario.email,
          telefone: usuario.telefone,
          nome: nome,
          matricula: matricula,
        },
      };
    }else{
      matricula = "ROOT";
      nome = "ROOT";
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          role: usuario.role,
          id: usuario.id,
          email: usuario.email,
          telefone: usuario.telefone,
          nome: nome,
          matricula: matricula,
        },
      };
    }


  }
}
