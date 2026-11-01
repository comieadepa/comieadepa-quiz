"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SURVEY_QUESTIONS, Question } from "@/data/survey-questions";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  Home, 
  ShieldCheck,
  Check,
  Star,
  ThumbsUp,
  Meh,
  ThumbsDown,
  HelpCircle,
  EyeOff,
  PhoneOff,
  UserCheck,
  Sparkles,
  HeartHandshake,
  DollarSign,
  Compass,
  MapPin,
  Calendar,
  AlertCircle,
  GraduationCap,
  Building2,
  Users2,
  MessageSquare,
  Smile,
  Frown,
  Pointer
} from "lucide-react";

/**
 * Função inteligente para associar ícones semânticos expressivos (58x58px na escala desktop)
 * para cada alternativa do questionário oficial.
 */
function getSemanticOptionIcon(questionId: number, value: string, isSelected: boolean) {
  // Ícones escalados: 58x58px na referência (w-[58px] h-[58px]) e proporcionais em telas menores
  const iconClass = `w-10 h-10 sm:w-12 sm:h-12 md:w-[54px] md:h-[54px] lg:w-[58px] lg:h-[58px] transition-transform ${
    isSelected ? "text-white scale-105 drop-shadow-md" : ""
  }`;

  // Se selecionado, todos os cartões usam o CheckCircle de confirmação do mockup oficial
  if (isSelected) {
    return <CheckCircle2 className={`${iconClass} stroke-[2.2]`} />;
  }

  // Alternativas padrão de avaliação (Q1, Q2, Q3, Q5, Q6, Q7, Q10)
  switch (value) {
    case "excelente":
      return <Star className={`${iconClass} text-[#2EBA26] fill-[#2EBA26]/10 stroke-[2]`} />;
    case "boa":
    case "bom":
      return <ThumbsUp className={`${iconClass} text-[#20BB11] stroke-[2]`} />;
    case "regular":
      return <Meh className={`${iconClass} text-[#C79C3B] stroke-[2]`} />;
    case "insatisfatoria":
    case "insatisfatorio":
      return <ThumbsDown className={`${iconClass} text-[#F64F6A] stroke-[2]`} />;
    case "nao_tenho_condicoes":
      return <HelpCircle className={`${iconClass} text-[#717179] stroke-[2]`} />;
    case "sem_oportunidade":
      return <PhoneOff className={`${iconClass} text-[#717179] stroke-[2]`} />;
    case "nao_utilizei":
      return <EyeOff className={`${iconClass} text-[#717179] stroke-[2]`} />;
    case "primeira_participacao":
      return <UserCheck className={`${iconClass} text-[#1E88E5] stroke-[2]`} />;

    // Questão 4 (Família da Presidência)
    case "muito_positiva":
      return <Sparkles className={`${iconClass} text-[#2EBA26] stroke-[2]`} />;
    case "positiva":
      return <ThumbsUp className={`${iconClass} text-[#20BB11] stroke-[2]`} />;
    case "pouco_perceptivel":
      return <EyeOff className={`${iconClass} text-[#E65100] stroke-[2]`} />;

    // Questão 8 (Dificuldades de Participação)
    case "deslocamento_distancia":
      return <Compass className={`${iconClass} text-[#E65100] stroke-[2]`} />;
    case "custos_viagem":
      return <DollarSign className={`${iconClass} text-[#C79C3B] stroke-[2]`} />;
    case "informacoes_comunicacao":
      return <MessageSquare className={`${iconClass} text-[#1E88E5] stroke-[2]`} />;
    case "datas_programacao":
      return <Calendar className={`${iconClass} text-[#8E24AA] stroke-[2]`} />;
    case "sem_dificuldades":
      return <Check className={`${iconClass} text-[#2EBA26] stroke-[2.5]`} />;
    case "outra_dificuldade":
      return <AlertCircle className={`${iconClass} text-[#717179] stroke-[2]`} />;

    // Questão 9 (Prioridades de Melhoria)
    case "assistencia_ministros":
      return <HeartHandshake className={`${iconClass} text-[#E53935] stroke-[2]`} />;
    case "visitas_campos":
      return <MapPin className={`${iconClass} text-[#2EBA26] stroke-[2]`} />;
    case "comunicacao_transparencia":
      return <MessageSquare className={`${iconClass} text-[#1E88E5] stroke-[2]`} />;
    case "atendimento_sede":
      return <Building2 className={`${iconClass} text-[#C79C3B] stroke-[2]`} />;
    case "organizacao_eventos":
      return <Users2 className={`${iconClass} text-[#8E24AA] stroke-[2]`} />;
    case "formacao_capacitacao":
      return <GraduationCap className={`${iconClass} text-[#00897B] stroke-[2]`} />;

    // Questão 10 (Nível Geral de Satisfação)
    case "muito_satisfeito":
      return <Star className={`${iconClass} text-[#2EBA26] fill-[#2EBA26]/10 stroke-[2]`} />;
    case "satisfeito":
      return <Smile className={`${iconClass} text-[#20BB11] stroke-[2]`} />;
    case "parcialmente_satisfeito":
      return <Meh className={`${iconClass} text-[#C79C3B] stroke-[2]`} />;
    case "insatisfeito":
      return <Frown className={`${iconClass} text-[#F64F6A] stroke-[2]`} />;

    default:
      return <HelpCircle className={`${iconClass} text-[#717179] stroke-[2]`} />;
  }
}

export default function PesquisaPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const totalQuestions = SURVEY_QUESTIONS.length;
  const currentQuestion: Question = SURVEY_QUESTIONS[currentIndex];
  const currentAnswer = answers[currentQuestion.id];
  const progressPercentage = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <main className="relative w-screen min-h-screen bg-[#591013] flex items-center justify-center p-4 sm:p-6 select-none">
        <div className="relative w-full max-w-[1380px] bg-[#FFF9F0] border-2 border-[#E5CCA0] rounded-[30px] p-8 sm:p-12 shadow-2xl text-center">
          <div className="w-20 h-20 rounded-full bg-[#800020] text-white border-2 border-[#C79C3B] flex items-center justify-center mx-auto mb-6 shadow-md">
            <CheckCircle2 className="w-12 h-12 text-[#FFD666]" />
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#800020] mb-3">
            Obrigado pela sua contribuição!
          </h1>

          <p className="text-[#5C3D42] text-base sm:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            Sua avaliação foi registrada de forma totalmente anônima e confidencial. A liderança da COMIEADEPA agradece sua valiosa participação na AGO 2026.
          </p>

          <div className="bg-[#FAF0E1] border border-[#E7CE9E] rounded-2xl p-4 text-xs sm:text-sm text-[#800020] mb-8 max-w-lg mx-auto flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#800020]" />
            <span className="font-semibold">Sessão finalizada com segurança. Nenhum dado pessoal foi mantido.</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#800020] to-[#590410] hover:from-[#9D0F2D] hover:to-[#6E0A1E] text-white font-bold transition-all shadow-lg shadow-[#800020]/25"
            >
              <Home className="w-5 h-5" />
              <span>Voltar ao Totem</span>
            </Link>
            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#FFF9F0] hover:bg-[#F5E8D3] text-[#800020] font-bold border-2 border-[#800020]/30 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Nova Resposta</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  const optionCount = currentQuestion.options.length;
  const is5Options = optionCount === 5;

  return (
    <main className="relative w-screen min-h-screen bg-[#591013] flex flex-col items-center justify-start overflow-x-hidden select-none">
      {/* 
        Background oficial das perguntas COMIEADEPA:
        Fundo com cabeçalho institucional fixado no topo ou absoluto, preenchendo o canvas.
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Image
          src="/img/bg_pergunta2.png"
          alt="COMIEADEPA Pesquisa Institucional"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-100"
        />
      </div>

      {/* 
        Área de espaçamento superior correspondente ao cabeçalho institucional da imagem:
        Garante que o card nunca encubra o logo, COMIEADEPA e AGO 2026 (+20px total para descer o card).
      */}
      <div className="relative z-10 w-full h-[140px] sm:h-[155px] md:h-[165px] lg:h-[175px] shrink-0 pointer-events-none" />

      {/* 
        1. CARD PRINCIPAL (PROMPT 08 - MEDIDAS EXATAS):
        - Viewport 1600x900 referência: Largura 1380px, limitada a calc(100% - 48px). Altura: 690px.
        - Fundo creme #FFF9F0, borda dourada reforçada de 4px, border-radius 30px, padding interno 28px.
        - position: relative e organização interna em CSS Grid (linhas proporcionais).
      */}
      <div className="relative z-10 w-full max-w-[1380px] px-4 sm:px-6 mb-6 flex justify-center">
        <section 
          className="relative w-full bg-[#FFF9F0] border-[4px] border-[#D8BC86] rounded-[30px] shadow-[0_22px_48px_-6px_rgba(75,10,18,0.25)] p-[20px] sm:p-[28px] grid grid-rows-[auto_auto_auto_1fr_auto] gap-y-0"
          style={{
            minHeight: "clamp(580px, 76vh, 690px)",
            width: "min(1380px, calc(100% - 24px))",
          }}
        >
          {/* 2. CABEÇALHO INTERNO — ALTURA ~60 PX (Selo Pergunta 150x44px + Categoria/Contador + Barra 8px) */}
          <div className="w-full shrink-0 flex flex-col justify-between" style={{ minHeight: "56px" }}>
            <div className="flex items-center justify-between gap-3 mb-2.5">
              {/* Selo 'Pergunta': 150 × 44 px alinhado à esquerda */}
              <div 
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#800020] via-[#750215] to-[#590410] border border-[#C79C3B]/60 text-white shadow-md shadow-[#800020]/25 shrink-0"
                style={{ width: "clamp(120px, 15vw, 150px)", height: "44px" }}
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-black">
                  ?
                </div>
                <span className="text-sm sm:text-base font-black tracking-wide">
                  Pergunta
                </span>
              </div>

              {/* Categoria e contador alinhados à direita */}
              <div className="flex items-center gap-2 sm:gap-3 text-[#800020] font-extrabold text-xs sm:text-base">
                <span className="hidden md:inline text-[#8C6D47] uppercase font-bold text-xs tracking-wider">
                  {currentQuestion.category} •
                </span>
                <span className="bg-[#F5EAD7] px-4 py-1.5 rounded-full border border-[#DDC295] text-xs sm:text-sm font-black shadow-inner">
                  Pergunta {currentIndex + 1} de {totalQuestions}
                </span>
              </div>
            </div>

            {/* Barra de progresso: largura 100%, altura 8 px, abaixo do cabeçalho */}
            <div className="w-full bg-[#E8DAC2] h-[8px] rounded-full overflow-hidden p-[1px] shadow-inner">
              <div
                className="bg-gradient-to-r from-[#800020] via-[#9E0F2D] to-[#6E0A1E] h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* 3. PERGUNTA — ÁREA DE ~120 PX (24px abaixo da barra de progresso, fonte 34px/800, cor #800020, barra 6x90px) */}
          <div className="w-full pt-[20px] sm:pt-[24px] pb-[10px] flex items-center min-h-[90px] sm:min-h-[110px] md:min-h-[120px]">
            <div className="flex items-start gap-4 sm:gap-[20px] w-full">
              {/* Linha vertical dourada de 6 × 90 px */}
              <div 
                className="w-[6px] bg-gradient-to-b from-[#E5B533] via-[#DCA326] to-[#C78F1A] rounded-full shrink-0 shadow-sm self-stretch"
                style={{ minHeight: "clamp(50px, 8vw, 90px)" }}
              />
              
              {/* Texto com fonte proporcional até 34px, peso 800 (#800020), permitindo quebra suave */}
              <h2 
                className="font-extrabold text-[#800020] leading-tight sm:leading-snug tracking-tight text-left"
                style={{ fontSize: "clamp(18px, 2.1vw, 34px)", fontWeight: 800 }}
              >
                {currentQuestion.title}
              </h2>
            </div>
          </div>

          {/* 4. INSTRUÇÃO — ALTURA 52 PX (Margem superior 12px, fonte 22px/700, fundo creme claro, formato cápsula) */}
          <div className="w-full flex items-center justify-center pt-[10px] sm:pt-[12px] pb-[14px]">
            <div 
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 rounded-full bg-[#F5EAD7] border border-[#DFC392] shadow-sm text-[#800020] text-center"
              style={{ minHeight: "clamp(42px, 5vh, 52px)" }}
            >
              <Pointer className="w-4 h-4 sm:w-5 sm:h-5 text-[#800020] animate-bounce shrink-0" />
              <span 
                className="font-bold tracking-wide"
                style={{ fontSize: "clamp(14px, 1.4vw, 22px)", fontWeight: 700 }}
              >
                Selecione uma opção abaixo:
              </span>
            </div>
          </div>

          {/* 5. ALTERNATIVAS — ÁREA CENTRAL (Centralizada no espaço disponível, sem margens arbitrárias) */}
          <div className="w-full flex flex-col justify-center my-auto py-2">
            {is5Options ? (
              /* GRADE PARA 5 ALTERNATIVAS: 5 colunas iguais, espaçamento 14px, altura até 210px */
              <div 
                className="grid grid-cols-2 sm:grid-cols-5 gap-[12px] sm:gap-[14px] w-full items-stretch"
                style={{ minHeight: "clamp(140px, 22vh, 210px)" }}
              >
                {currentQuestion.options.map((opt) => {
                  const isSelected = currentAnswer === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelectOption(opt.value)}
                      className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-[20px] sm:rounded-[24px] border-2 transition-all duration-200 cursor-pointer text-center relative ${
                        isSelected
                          ? "bg-gradient-to-b from-[#800020] via-[#6E0A1E] to-[#4D020D] border-[#E5B533] border-[4px] text-white shadow-xl shadow-[#800020]/35 scale-[1.02] z-10"
                          : "bg-[#FFFFFF] border-[#E8D4B0] text-[#1A0307] hover:border-[#DCA326] hover:bg-[#FFFDF9] hover:shadow-lg shadow-sm"
                      }`}
                      style={{
                        minHeight: "clamp(120px, 18vh, 210px)",
                      }}
                    >
                      {/* Ícone: ~58x58px na escala desktop */}
                      <div className="flex items-center justify-center shrink-0 mb-[12px] sm:mb-[16px]">
                        {getSemanticOptionIcon(currentQuestion.id, opt.value, isSelected)}
                      </div>

                      {/* Texto: ~22px peso 700 centralizado */}
                      <span
                        className={`leading-tight tracking-tight font-bold ${
                          isSelected ? "text-white" : "text-[#1A0307]"
                        }`}
                        style={{ fontSize: "clamp(13px, 1.35vw, 22px)", fontWeight: 700 }}
                      >
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* GRADE PARA 6 ALTERNATIVAS (Q8 e Q9): 6 colunas em telas ultra-wide / 3 colunas em 2 linhas equilibradas */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-[10px] sm:gap-[14px] w-full items-stretch">
                {currentQuestion.options.map((opt) => {
                  const isSelected = currentAnswer === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelectOption(opt.value)}
                      className={`flex flex-col sm:flex-row xl:flex-col items-center justify-center gap-3 p-3 sm:p-4 rounded-[20px] sm:rounded-[24px] border-2 transition-all duration-200 cursor-pointer text-center xl:text-center sm:text-left ${
                        isSelected
                          ? "bg-gradient-to-b from-[#800020] via-[#6E0A1E] to-[#4D020D] border-[#E5B533] border-[4px] text-white shadow-xl shadow-[#800020]/35 scale-[1.02] z-10"
                          : "bg-[#FFFFFF] border-[#E8D4B0] text-[#1A0307] hover:border-[#DCA326] hover:bg-[#FFFDF9] hover:shadow-md shadow-sm"
                      }`}
                      style={{ minHeight: "clamp(75px, 11vh, 180px)" }}
                    >
                      <div className="shrink-0 flex items-center justify-center">
                        {getSemanticOptionIcon(currentQuestion.id, opt.value, isSelected)}
                      </div>

                      <span
                        className={`leading-snug font-bold ${
                          isSelected ? "text-white" : "text-[#1A0307]"
                        }`}
                        style={{ fontSize: "clamp(12px, 1.15vw, 18px)", fontWeight: 700 }}
                      >
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 6. NAVEGAÇÃO INFERIOR — ALTURA ~70 PX (Margem superior 14px, botões 180x56px, fonte 18px/700) */}
          <div className="w-full shrink-0 pt-[14px] border-t border-[#E5CCA0]/80">
            <footer className="flex items-center justify-between gap-4" style={{ minHeight: "56px" }}>
              {currentIndex > 0 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[#800020] text-[#800020] hover:bg-[#F5EAD7] font-bold transition-colors cursor-pointer shadow-sm"
                  style={{ 
                    width: "clamp(140px, 15vw, 180px)", 
                    height: "clamp(48px, 6vh, 56px)",
                    fontSize: "clamp(14px, 1.2vw, 18px)",
                    fontWeight: 700 
                  }}
                >
                  <ArrowLeft className="w-5 h-5 text-[#800020]" />
                  <span>Anterior</span>
                </button>
              ) : (
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[#DFC392] text-[#800020] hover:bg-[#F5EAD7] font-bold transition-colors shadow-sm"
                  style={{ 
                    width: "clamp(140px, 15vw, 180px)", 
                    height: "clamp(48px, 6vh, 56px)",
                    fontSize: "clamp(14px, 1.2vw, 18px)",
                    fontWeight: 700 
                  }}
                >
                  <ArrowLeft className="w-5 h-5 text-[#800020]" />
                  <span>Início</span>
                </Link>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={!currentAnswer}
                className={`flex items-center justify-center gap-2 rounded-2xl font-bold transition-all cursor-pointer shadow-lg ${
                  !currentAnswer
                    ? "bg-[#D8C7B2]/70 text-[#9E8B78] border border-[#C5B39E] cursor-not-allowed shadow-none"
                    : "bg-gradient-to-r from-[#800020] via-[#750215] to-[#54040E] hover:from-[#9D0F2D] hover:to-[#6E0A1E] text-white shadow-[#800020]/35 active:scale-[0.98] border border-[#E5B533]/40"
                }`}
                style={{ 
                  width: "clamp(140px, 15vw, 180px)", 
                  height: "clamp(48px, 6vh, 56px)",
                  fontSize: "clamp(14px, 1.2vw, 18px)",
                  fontWeight: 700 
                }}
              >
                <span>{currentIndex === totalQuestions - 1 ? "Finalizar" : "Próxima"}</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
