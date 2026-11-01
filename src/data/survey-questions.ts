export interface Question {
  id: number;
  title: string;
  category: string;
  options: { label: string; value: string }[];
}

export const SURVEY_QUESTIONS: Question[] = [
  {
    id: 1,
    category: "Administração Geral",
    title: "Como o senhor avalia a administração geral da Presidência da COMIEADEPA?",
    options: [
      { label: "Excelente", value: "excelente" },
      { label: "Boa", value: "boa" },
      { label: "Regular", value: "regular" },
      { label: "Insatisfatória", value: "insatisfatoria" },
      { label: "Não tenho condições de avaliar", value: "nao_tenho_condicoes" },
    ],
  },
  {
    id: 2,
    category: "Acompanhamento aos Campos",
    title: "Como avalia a atenção e o acompanhamento da Presidência aos campos e ministros no Estado do Pará?",
    options: [
      { label: "Excelente", value: "excelente" },
      { label: "Bom", value: "bom" },
      { label: "Regular", value: "regular" },
      { label: "Insatisfatório", value: "insatisfatorio" },
      { label: "Não tenho condições de avaliar", value: "nao_tenho_condicoes" },
    ],
  },
  {
    id: 3,
    category: "Acessibilidade e Diálogo",
    title: "Como avalia a acessibilidade e a disposição da Presidência para ouvir as necessidades dos ministros?",
    options: [
      { label: "Excelente", value: "excelente" },
      { label: "Boa", value: "boa" },
      { label: "Regular", value: "regular" },
      { label: "Insatisfatória", value: "insatisfatoria" },
      { label: "Não tive oportunidade de contato", value: "sem_oportunidade" },
    ],
  },
  {
    id: 4,
    category: "Família da Presidência",
    title: "Como avalia a participação e a contribuição da família da Presidência nas atividades e iniciativas da Convenção?",
    options: [
      { label: "Muito positiva", value: "muito_positiva" },
      { label: "Positiva", value: "positiva" },
      { label: "Regular", value: "regular" },
      { label: "Pouco perceptível", value: "pouco_perceptivel" },
      { label: "Não tenho condições de avaliar", value: "nao_tenho_condicoes" },
    ],
  },
  {
    id: 5,
    category: "Secretaria Administrativa",
    title: "Como avalia o atendimento prestado pela Secretaria Administrativa da COMIEADEPA?",
    options: [
      { label: "Excelente", value: "excelente" },
      { label: "Bom", value: "bom" },
      { label: "Regular", value: "regular" },
      { label: "Insatisfatório", value: "insatisfatorio" },
      { label: "Não utilizei o serviço", value: "nao_utilizei" },
    ],
  },
  {
    id: 6,
    category: "Tesouraria da Convenção",
    title: "Como avalia o atendimento e as orientações prestadas pela Tesouraria da Convenção?",
    options: [
      { label: "Excelente", value: "excelente" },
      { label: "Bom", value: "bom" },
      { label: "Regular", value: "regular" },
      { label: "Insatisfatório", value: "insatisfatorio" },
      { label: "Não utilizei o serviço", value: "nao_utilizei" },
    ],
  },
  {
    id: 7,
    category: "Assembleias Gerais (AGO)",
    title: "Como avalia a organização e a realização das Assembleias Gerais Ordinárias (AGO)?",
    options: [
      { label: "Excelente", value: "excelente" },
      { label: "Boa", value: "boa" },
      { label: "Regular", value: "regular" },
      { label: "Insatisfatória", value: "insatisfatoria" },
      { label: "É minha primeira participação", value: "primeira_participacao" },
    ],
  },
  {
    id: 8,
    category: "Participação e Engajamento",
    title: "Qual é a principal dificuldade que o senhor encontra para participar das atividades e eventos da Convenção?",
    options: [
      { label: "Deslocamento e distância", value: "deslocamento_distancia" },
      { label: "Custos de viagem, hospedagem e alimentação", value: "custos_viagem" },
      { label: "Informações e comunicação", value: "informacoes_comunicacao" },
      { label: "Datas e programação", value: "datas_programacao" },
      { label: "Não encontro dificuldades", value: "sem_dificuldades" },
      { label: "Outra dificuldade", value: "outra_dificuldade" },
    ],
  },
  {
    id: 9,
    category: "Prioridades de Melhoria",
    title: "Em qual área a administração da COMIEADEPA deveria concentrar maiores esforços de melhoria?",
    options: [
      { label: "Assistência e apoio aos ministros", value: "assistencia_ministros" },
      { label: "Visitas e acompanhamento dos campos", value: "visitas_campos" },
      { label: "Comunicação e transparência administrativa", value: "comunicacao_transparencia" },
      { label: "Atendimento na sede administrativa", value: "atendimento_sede" },
      { label: "Organização dos eventos e assembleias", value: "organizacao_eventos" },
      { label: "Formação e capacitação ministerial", value: "formacao_capacitacao" },
    ],
  },
  {
    id: 10,
    category: "Satisfação Geral",
    title: "Considerando o trabalho desenvolvido, qual é o seu nível geral de satisfação com a atual administração da COMIEADEPA?",
    options: [
      { label: "Muito satisfeito", value: "muito_satisfeito" },
      { label: "Satisfeito", value: "satisfeito" },
      { label: "Parcialmente satisfeito", value: "parcialmente_satisfeito" },
      { label: "Insatisfeito", value: "insatisfeito" },
      { label: "Não tenho condições de avaliar", value: "nao_tenho_condicoes" },
    ],
  },
];
