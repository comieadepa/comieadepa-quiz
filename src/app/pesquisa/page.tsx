"use client";

import { useState } from "react";
import Link from "next/link";
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
 * Função inteligente para associar ícones semânticos com proporções responsivas via clamp().
 */
function getSemanticOptionIcon(questionId: number, value: string, isSelected: boolean) {
  const iconClass = `w-[38px] h-[38px] sm:w-[46px] sm:h-[46px] md:w-[52px] md:h-[52px] lg:w-[58px] lg:h-[58px] transition-transform ${
    isSelected ? "text-white scale-105 drop-shadow-md" : ""
  }`;

  if (isSelected) {
    return <CheckCircle2 className={`${iconClass} stroke-[2.2]`} />;
  }

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

    case "muito_positiva":
      return <Sparkles className={`${iconClass} text-[#2EBA26] stroke-[2]`} />;
    case "positiva":
      return <ThumbsUp className={`${iconClass} text-[#20BB11] stroke-[2]`} />;
    case "pouco_perceptivel":
      return <EyeOff className={`${iconClass} text-[#E65100] stroke-[2]`} />;

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

import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function PesquisaPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleNext = async () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Gravação segura no Supabase
      setIsSubmitting(true);
      try {
        const payload = {
          totem_id: typeof window !== "undefined" ? (localStorage.getItem("totem_id") || "totem_geral") : "totem_geral",
          q1_administracao_geral: answers[1] || "",
          q2_acompanhamento_campos: answers[2] || "",
          q3_acessibilidade_presidencia: answers[3] || "",
          q4_familia_presidencia: answers[4] || "",
          q5_secretaria_administrativa: answers[5] || "",
          q6_tesouraria_convencao: answers[6] || "",
          q7_organizacao_ago: answers[7] || "",
          q8_principal_dificuldade: answers[8] || "",
          q9_esforcos_melhoria: answers[9] || "",
          q10_satisfacao_geral: answers[10] || "",
          respostas_completas: answers,
        };

        const { error } = await supabase.from("respostas_pesquisa").insert([payload]);
        if (error) {
          console.error("Erro ao gravar resposta no Supabase:", error);
        }
      } catch (err) {
        console.error("Exceção ao gravar no Supabase:", err);
      } finally {
        setIsSubmitting(false);
        setIsCompleted(true);
      }
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
      <main className="relative w-full min-h-screen bg-[#591013] flex items-center justify-center p-4 sm:p-6 select-none overflow-y-auto">
        <div className="relative w-full max-w-[1380px] bg-[#FFF9F0] border-[4px] border-[#D8BC86] rounded-[24px] sm:rounded-[30px] p-6 sm:p-10 md:p-12 shadow-2xl text-center my-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#800020] text-white border-2 border-[#C79C3B] flex items-center justify-center mx-auto mb-5 shadow-md">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#FFD666]" />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#800020] mb-3">
            Obrigado pela sua contribuição!
          </h1>

          <p className="text-[#5C3D42] text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
            Sua avaliação foi registrada de forma totalmente anônima e confidencial. A liderança da COMIEADEPA agradece sua valiosa participação na AGO 2026.
          </p>

          <div className="bg-[#FAF0E1] border border-[#E7CE9E] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm text-[#800020] mb-6 sm:mb-8 max-w-lg mx-auto flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#800020] shrink-0" />
            <span className="font-semibold">Sessão finalizada com segurança. Nenhum dado pessoal foi mantido.</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-[#800020] to-[#590410] hover:from-[#9D0F2D] hover:to-[#6E0A1E] text-white font-bold transition-all shadow-lg shadow-[#800020]/25 text-sm sm:text-base"
            >
              <Home className="w-5 h-5" />
              <span>Voltar ao Totem</span>
            </Link>
            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-[#FFF9F0] hover:bg-[#F5E8D3] text-[#800020] font-bold border-2 border-[#800020]/30 transition-colors cursor-pointer text-sm sm:text-base"
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
    <main className="relative w-full min-h-screen bg-[#591013] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-x-hidden select-none">
      {/* 
        CARD PRINCIPAL RESPONSIVO:
        - Fundo sólido do container (#591013) substitui a imagem anterior.
        - Largura: min(1380px, calc(100% - 32px))
        - Altura: adaptável ao conteúdo sem overflow oculto forçado
        - Padding: responsivo (16px em mobile, 20px em tablet, 28px em desktop)
      */}
      <div className="relative z-10 w-full flex justify-center py-2 sm:py-4">
        <section 
          className="relative w-full bg-[#FFF9F0] border-[3px] sm:border-[4px] border-[#D8BC86] rounded-[24px] sm:rounded-[30px] shadow-[0_20px_45px_-8px_rgba(30,5,8,0.45)] p-4 sm:p-6 md:p-7 flex flex-col gap-y-4 sm:gap-y-5"
          style={{
            width: "min(1380px, calc(100% - 32px))",
            minHeight: "auto",
          }}
        >
          {/* 1. CABEÇALHO INTERNO */}
          <div className="w-full shrink-0 flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              {/* Selo 'Pergunta' */}
              <div 
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#800020] via-[#750215] to-[#590410] border border-[#C79C3B]/60 text-white shadow-md shadow-[#800020]/25 px-4 py-2 shrink-0 h-[38px] sm:h-[44px]"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-black">
                  ?
                </div>
                <span className="text-xs sm:text-sm md:text-base font-black tracking-wide">
                  Pergunta
                </span>
              </div>

              {/* Categoria e Contador */}
              <div className="flex items-center gap-2 text-[#800020] font-extrabold text-xs sm:text-sm md:text-base">
                <span className="hidden sm:inline text-[#8C6D47] uppercase font-bold text-xs tracking-wider">
                  {currentQuestion.category} •
                </span>
                <span className="bg-[#F5EAD7] px-3.5 py-1 rounded-full border border-[#DDC295] text-xs sm:text-sm font-black shadow-inner">
                  Pergunta {currentIndex + 1} de {totalQuestions}
                </span>
              </div>
            </div>

            {/* Barra de progresso */}
            <div className="w-full bg-[#E8DAC2] h-[8px] rounded-full overflow-hidden p-[1px] shadow-inner">
              <div
                className="bg-gradient-to-r from-[#800020] via-[#9E0F2D] to-[#6E0A1E] h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* 2. ENUNCIADO DA PERGUNTA (QUEBRA NATURAL SEM CORTES) */}
          <div className="w-full pt-1 sm:pt-2">
            <div className="flex items-start gap-3 sm:gap-4 md:gap-5 w-full">
              {/* Linha vertical dourada */}
              <div 
                className="w-[5px] sm:w-[6px] bg-gradient-to-b from-[#E5B533] via-[#DCA326] to-[#C78F1A] rounded-full shrink-0 shadow-sm self-stretch min-h-[44px]"
              />
              
              {/* Texto com tipografia fluida via clamp() */}
              <h2 
                className="font-extrabold text-[#800020] leading-snug sm:leading-snug tracking-tight text-left break-words w-full"
                style={{ fontSize: "clamp(18px, 2.2vw, 32px)", fontWeight: 800 }}
              >
                {currentQuestion.title}
              </h2>
            </div>
          </div>

          {/* 3. INSTRUÇÃO CENTRALIZADA (CÁPSULA) */}
          <div className="w-full flex items-center justify-center py-1">
            <div 
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-1.5 sm:py-2 rounded-full bg-[#F5EAD7] border border-[#DFC392] shadow-sm text-[#800020] text-center"
            >
              <Pointer className="w-4 h-4 sm:w-5 sm:h-5 text-[#800020] animate-bounce shrink-0" />
              <span 
                className="font-bold tracking-wide"
                style={{ fontSize: "clamp(13px, 1.4vw, 20px)", fontWeight: 700 }}
              >
                Selecione uma opção abaixo:
              </span>
            </div>
          </div>

          {/* 
            4. ALTERNATIVAS - ÁREA CENTRAL RESPONSIVA
            - 5 Colunas em telas largas (>= 1180px)
            - 3 Colunas em tablets médios / landscape estreito (768px a 1179px)
            - 2 Colunas em tablets portrait (540px a 767px)
            - 1 Coluna em smartphones (< 540px)
          */}
          <div className="w-full flex flex-col justify-center my-auto py-1">
            {is5Options ? (
              <div 
                className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-3.5 w-full items-stretch"
              >
                {currentQuestion.options.map((opt) => {
                  const isSelected = currentAnswer === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelectOption(opt.value)}
                      className={`w-full flex flex-row xs:flex-col items-center justify-center gap-3 xs:gap-2 sm:gap-3 p-3.5 sm:p-4 rounded-[20px] sm:rounded-[24px] border-2 transition-all duration-200 cursor-pointer text-center relative ${
                        isSelected
                          ? "bg-gradient-to-b from-[#800020] via-[#6E0A1E] to-[#4D020D] border-[#E5B533] border-[3px] sm:border-[4px] text-white shadow-xl shadow-[#800020]/35 scale-[1.01] sm:scale-[1.02] z-10"
                          : "bg-[#FFFFFF] border-[#E8D4B0] text-[#1A0307] hover:border-[#DCA326] hover:bg-[#FFFDF9] hover:shadow-lg shadow-sm"
                      }`}
                      style={{
                        minHeight: "clamp(70px, 15vw, 190px)",
                      }}
                    >
                      {/* Ícone */}
                      <div className="flex items-center justify-center shrink-0">
                        {getSemanticOptionIcon(currentQuestion.id, opt.value, isSelected)}
                      </div>

                      {/* Texto */}
                      <span
                        className={`leading-snug sm:leading-tight tracking-tight font-bold text-left xs:text-center ${
                          isSelected ? "text-white" : "text-[#1A0307]"
                        }`}
                        style={{ fontSize: "clamp(13px, 1.35vw, 20px)", fontWeight: 700 }}
                      >
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Grade adaptável para 6 alternativas (Q8 e Q9) */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 w-full items-stretch">
                {currentQuestion.options.map((opt) => {
                  const isSelected = currentAnswer === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelectOption(opt.value)}
                      className={`w-full flex items-center gap-3 p-3.5 sm:p-4 rounded-[20px] sm:rounded-[24px] border-2 transition-all duration-200 cursor-pointer text-left ${
                        isSelected
                          ? "bg-gradient-to-r from-[#800020] via-[#6E0A1E] to-[#4D020D] border-[#E5B533] border-[3px] sm:border-[4px] text-white shadow-xl shadow-[#800020]/35 scale-[1.01] z-10"
                          : "bg-[#FFFFFF] border-[#E8D4B0] text-[#1A0307] hover:border-[#DCA326] hover:bg-[#FFFDF9] hover:shadow-md shadow-sm"
                      }`}
                      style={{ minHeight: "clamp(70px, 10vw, 110px)" }}
                    >
                      <div className="shrink-0 flex items-center justify-center">
                        {getSemanticOptionIcon(currentQuestion.id, opt.value, isSelected)}
                      </div>

                      <span
                        className={`leading-snug font-bold ${
                          isSelected ? "text-white" : "text-[#1A0307]"
                        }`}
                        style={{ fontSize: "clamp(13px, 1.25vw, 17px)", fontWeight: 700 }}
                      >
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 5. NAVEGAÇÃO INFERIOR */}
          <div className="w-full shrink-0 pt-3 sm:pt-4 border-t border-[#E5CCA0]/80">
            <footer className="flex flex-wrap items-center justify-between gap-3">
              {currentIndex > 0 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[#800020] text-[#800020] hover:bg-[#F5EAD7] font-bold transition-colors cursor-pointer shadow-sm px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base min-w-[130px] sm:min-w-[160px] h-[46px] sm:h-[54px]"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#800020]" />
                  <span>Anterior</span>
                </button>
              ) : (
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[#DFC392] text-[#800020] hover:bg-[#F5EAD7] font-bold transition-colors shadow-sm px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base min-w-[130px] sm:min-w-[160px] h-[46px] sm:h-[54px]"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#800020]" />
                  <span>Início</span>
                </Link>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={!currentAnswer || isSubmitting}
                className={`flex items-center justify-center gap-2 rounded-2xl font-bold transition-all cursor-pointer shadow-lg px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base min-w-[140px] sm:min-w-[170px] h-[46px] sm:h-[54px] ${
                  !currentAnswer || isSubmitting
                    ? "bg-[#D8C7B2]/70 text-[#9E8B78] border border-[#C5B39E] cursor-not-allowed shadow-none"
                    : "bg-gradient-to-r from-[#800020] via-[#750215] to-[#54040E] hover:from-[#9D0F2D] hover:to-[#6E0A1E] text-white shadow-[#800020]/35 active:scale-[0.98] border border-[#E5B533]/40"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Gravando...</span>
                  </>
                ) : (
                  <>
                    <span>{currentIndex === totalQuestions - 1 ? "Finalizar" : "Próxima"}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </>
                )}
              </button>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
