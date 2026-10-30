import type { ImageMetadata } from 'astro';
import carol from '../assets/team/carol-avatar-3d.png';
import jully from '../assets/team/jully-avatar-3d.png';
import mari from '../assets/team/mari-avatar-3d.png';
import nina from '../assets/team/nina-avatar-3d.png';

export interface TeamMember {
  number: string;
  name: string;
  role: string;
  introduction: string;
  avatar: ImageMetadata;
}

export const team = [
  {
    number: '01',
    name: 'Carol',
    role: 'Atendimento & Sucesso do Cliente',
    introduction: 'Acolhe suas dúvidas e acompanha cada etapa para você se sentir bem orientado.',
    avatar: carol,
  },
  {
    number: '02',
    name: 'Jully',
    role: 'Gestão Contábil & Fiscal',
    introduction: 'Traduz a rotina contábil e fiscal em informações claras para o seu negócio.',
    avatar: jully,
  },
  {
    number: '03',
    name: 'Mari',
    role: 'Legalização & Abertura de Empresas',
    introduction: 'Ajuda a organizar os primeiros passos e a formalização da sua empresa.',
    avatar: mari,
  },
  {
    number: '04',
    name: 'Nina',
    role: 'Rotina Societária & DP',
    introduction: 'Cuida dos detalhes da rotina societária e de departamento pessoal com atenção.',
    avatar: nina,
  },
] satisfies TeamMember[];
