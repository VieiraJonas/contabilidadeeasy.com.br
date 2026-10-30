export interface ServiceCardData {
  label: string;
  icon: string;
  title: [string, string];
  description: string;
  features: string[];
  service: string;
  action: string;
  featured?: boolean;
}

export interface SegmentCardData {
  icon: string;
  label: string;
  title: string;
  description: string;
  service: string;
  action: string;
}

export interface BenefitCardData {
  number: string;
  title: string;
  description: string;
}

export interface FaqItemData {
  number: string;
  question: string;
  answer: string;
}

export const services = [
  {
    "label": "01 / COMEÇAR",
    "icon": "↗",
    "title": [
      "Abertura",
      "de empresa"
    ],
    "description": "Orientação para formalizar seu negócio, organizar a documentação e entender as etapas até o CNPJ.",
    "features": [
      "Entendimento da atividade",
      "Orientação para formalização",
      "Acompanhamento das etapas"
    ],
    "service": "Abertura de empresa",
    "action": "Vamos começar ↗",
    "featured": true
  },
  {
    "label": "02 / SIMPLIFICAR",
    "icon": "⇄",
    "title": [
      "Troca de",
      "contador"
    ],
    "description": "Uma transição organizada para você seguir com mais clareza sobre os documentos e a rotina da empresa.",
    "features": [
      "Entendimento do cenário atual",
      "Organização da transição",
      "Continuidade do acompanhamento"
    ],
    "service": "Troca de contador",
    "action": "Quero conhecer a EASY ↗",
    "featured": false
  },
  {
    "label": "03 / EMPREENDER",
    "icon": "⊞",
    "title": [
      "MEI sem",
      "complicação"
    ],
    "description": "Apoio ao microempreendedor para entender a formalização e manter as informações do negócio organizadas.",
    "features": [
      "Orientação para abertura",
      "Apoio à rotina do MEI",
      "Esclarecimento de dúvidas"
    ],
    "service": "MEI",
    "action": "Cuidar do meu MEI ↗",
    "featured": false
  },
  {
    "label": "04 / CRESCER",
    "icon": "↗",
    "title": [
      "De MEI",
      "para ME"
    ],
    "description": "Seu negócio está mudando? Entenda os próximos passos para uma migração alinhada à sua nova realidade.",
    "features": [
      "Análise do momento da empresa",
      "Orientação para a mudança",
      "Organização cadastral"
    ],
    "service": "Migração de MEI para ME",
    "action": "Planejar o próximo passo ↗",
    "featured": false
  }
] satisfies ServiceCardData[];

export const segments = [
  {
    "icon": "§",
    "label": "01 / ADVOCACIA",
    "title": "Você cuida dos seus clientes.",
    "description": "Apoio contábil para profissionais e escritórios de advocacia, com atenção à organização da atividade e à rotina do negócio.",
    "service": "Contabilidade para advocacia",
    "action": "Contabilidade para advogados ↗"
  },
  {
    "icon": "▥",
    "label": "02 / COMÉRCIO",
    "title": "Mais atenção à sua operação.",
    "description": "Orientação para comerciantes que precisam acompanhar documentos, obrigações e informações do dia a dia.",
    "service": "Contabilidade para comércio",
    "action": "Contabilidade para comércio ↗"
  },
  {
    "icon": "↗",
    "label": "03 / PRESTAÇÃO DE SERVIÇOS",
    "title": "Seu talento merece espaço.",
    "description": "Suporte para prestadores de serviços organizarem a empresa enquanto se dedicam ao que sabem fazer.",
    "service": "Contabilidade para prestadores de serviços",
    "action": "Contabilidade para serviços ↗"
  }
] satisfies SegmentCardData[];

export const benefits = [
  {
    "number": "01",
    "title": "Praticidade digital",
    "description": "Converse e alinhe as demandas da empresa por canais digitais, sem complicar o seu dia."
  },
  {
    "number": "02",
    "title": "Atendimento próximo",
    "description": "Uma conversa para entender sua necessidade, com linguagem direta e espaço para perguntar."
  },
  {
    "number": "03",
    "title": "Olhar para cada negócio",
    "description": "Serviços apresentados a partir do seu momento e das particularidades da atividade."
  },
  {
    "number": "04",
    "title": "Mais clareza na rotina",
    "description": "Orientação para saber quais informações organizar e como seguir nas próximas etapas."
  }
] satisfies BenefitCardData[];

export const questions = [
  {
    "number": "01",
    "question": "Quais serviços encontro na EASY?",
    "answer": "Abertura de empresa, acompanhamento do MEI, migração de MEI para ME, troca de contador e certificado digital. Também apresentamos atendimento voltado à advocacia, ao comércio e aos prestadores de serviços. O escopo é alinhado conforme a sua necessidade."
  },
  {
    "number": "02",
    "question": "Posso começar o atendimento online?",
    "answer": "Sim. Pelo WhatsApp você pode explicar sua necessidade e alinhar as informações iniciais. Quando uma etapa exigir documentação ou atendimento específico, a orientação será combinada com você."
  },
  {
    "number": "03",
    "question": "O que preciso para abrir uma empresa?",
    "answer": "O primeiro passo é informar a atividade pretendida e o contexto do negócio. A EASY orienta quais documentos serão necessários para analisar a formalização. Os prazos dependem das características do processo e dos órgãos envolvidos."
  },
  {
    "number": "04",
    "question": "Já tenho contador. Como funciona a troca?",
    "answer": "Converse com a EASY sobre sua situação atual. A partir desse contato, é possível alinhar o escopo e organizar as informações necessárias à transição."
  },
  {
    "number": "05",
    "question": "Como saber se devo migrar de MEI para ME?",
    "answer": "Essa avaliação depende do momento e das características do seu negócio. Conte o que mudou na atividade para receber orientação individual sobre os próximos passos."
  },
  {
    "number": "06",
    "question": "Onde a EASY está localizada?",
    "answer": "Na Rua Joaquim da Silva Lima, 233, Centro, Loja 15, Guarapari – ES, CEP 29200-260. Converse pelo WhatsApp para combinar seu atendimento."
  }
] satisfies FaqItemData[];

export const contactServices = [
  "Abertura de empresa",
  "Troca de contador",
  "MEI",
  "Migração de MEI para ME",
  "Certificado digital",
  "Contabilidade para advocacia",
  "Contabilidade para comércio",
  "Contabilidade para prestadores de serviços",
  "Quero tirar uma dúvida"
] satisfies string[];
