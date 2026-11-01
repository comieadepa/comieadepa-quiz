"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { 
  Users, 
  BarChart3, 
  FileSpreadsheet, 
  FileText, 
  Tablet, 
  CheckCircle, 
  Lock, 
  Home, 
  Clock, 
  TrendingUp,
  RefreshCw,
  Database
} from "lucide-react";

interface SurveyResponse {
  id: string;
  created_at: string;
  totem_id: string;
  q1_administracao_geral: string;
  q7_organizacao_ago: string;
  q10_satisfacao_geral: string;
  respostas_completas: Record<string, string>;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [authError, setAuthError] = useState("");
  
  // Dados reais vindos do Supabase
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResponses = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("respostas_pesquisa")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao carregar dados do Supabase:", error);
      } else if (data) {
        setResponses(data);
      }
    } catch (err) {
      console.error("Exceção ao buscar respostas:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchResponses();
    }
  }, [isAuthenticated, fetchResponses]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey === "admin" || accessKey === "comieadepa" || accessKey === "ago2026") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Chave de acesso inválida. Tente 'admin' para visualização.");
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-slate-950 select-none">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-1">
            Painel da Gestão AGO
          </h1>
          <p className="text-sm text-slate-400 text-center mb-6">
            Acesso restrito para coordenação e diretoria da COMIEADEPA.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                Chave de Acesso
              </label>
              <input
                type="password"
                placeholder="Digite a chave (ex: admin)"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none transition-colors"
              />
              {authError && (
                <p className="text-xs text-rose-400 mt-2 font-medium">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 font-bold text-slate-950 transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              Acessar Painel
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-300 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Voltar ao Totem
            </Link>
            <span className="flex items-center gap-1 text-emerald-400">
              <Database className="w-3 h-3" /> Supabase Online
            </span>
          </div>
        </div>
      </main>
    );
  }

  // Cálculos dinâmicos com dados reais
  const totalCount = responses.length;
  
  // Q1 Breakdown
  const q1Excelente = responses.filter(r => r.q1_administracao_geral === "excelente").length;
  const q1Boa = responses.filter(r => r.q1_administracao_geral === "boa").length;
  const q1Outras = totalCount - (q1Excelente + q1Boa);
  const q1PctExcelente = totalCount > 0 ? Math.round((q1Excelente / totalCount) * 100) : 0;
  const q1PctBoa = totalCount > 0 ? Math.round((q1Boa / totalCount) * 100) : 0;
  const q1PctOutras = totalCount > 0 ? Math.round((q1Outras / totalCount) * 100) : 0;

  // Q7 Breakdown
  const q7Excelente = responses.filter(r => r.q7_organizacao_ago === "excelente").length;
  const q7Boa = responses.filter(r => r.q7_organizacao_ago === "boa").length;
  const q7Outras = totalCount - (q7Excelente + q7Boa);
  const q7PctExcelente = totalCount > 0 ? Math.round((q7Excelente / totalCount) * 100) : 0;
  const q7PctBoa = totalCount > 0 ? Math.round((q7Boa / totalCount) * 100) : 0;
  const q7PctOutras = totalCount > 0 ? Math.round((q7Outras / totalCount) * 100) : 0;

  // Totens únicos
  const uniqueTotens = Array.from(new Set(responses.map(r => r.totem_id || "totem_geral")));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-sm">
              CP
            </div>
            <div>
              <h1 className="font-bold text-white text-sm sm:text-base leading-tight">
                COMIEADEPA • Painel Administrativo
              </h1>
              <p className="text-[11px] text-slate-400">
                Pesquisa Institucional AGO 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Supabase PostgreSQL Ativo
            </span>

            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ver Totem</span>
            </Link>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 border border-slate-700 text-xs transition-colors cursor-pointer"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-8">
        {/* Supabase Status Banner */}
        <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-300">
                Conexão ao Vivo com Supabase PostgreSQL
              </p>
              <p className="text-xs text-slate-400">
                As respostas enviadas em qualquer tablet/totem no auditório são sincronizadas automaticamente nesta base de dados em tempo real.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button 
              onClick={fetchResponses}
              disabled={loading}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>{loading ? "Carregando..." : "Atualizar"}</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
              <span>Total de Respostas Coletadas</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{totalCount}</div>
            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2 font-medium">
              <TrendingUp className="w-3.5 h-3.5" /> Gravadas em tempo real
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
              <span>Aprovação na Q1 (Presidência)</span>
              <BarChart3 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">
              {totalCount > 0 ? `${q1PctExcelente + q1PctBoa}%` : "100%"}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Excelente e Boa somadas
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
              <span>Totens Ativos Registrados</span>
              <Tablet className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">
              {Math.max(uniqueTotens.length, 1)} <span className="text-base text-emerald-400 font-normal">Online</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Estações enviando dados
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
              <span>Tempo Estimado p/ Resposta</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">~1m 30s</div>
            <p className="text-xs text-slate-400 mt-2">
              10 perguntas objetivas
            </p>
          </div>
        </div>

        {/* Action Header: Export options */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Resultados Consolidados por Eixo</h2>
            <p className="text-xs text-slate-400">Distribuição estatística calculada sobre a base oficial do Supabase</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (responses.length === 0) {
                  alert("Ainda não há respostas registradas para exportar.");
                  return;
                }
                const csvContent = "data:text/csv;charset=utf-8," 
                  + "ID,Data,Totem,Q1,Q7,Q10\n"
                  + responses.map(e => `${e.id},${e.created_at},${e.totem_id},${e.q1_administracao_geral},${e.q7_organizacao_ago},${e.q10_satisfacao_geral}`).join("\n");
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", `comieadepa_pesquisa_${new Date().toISOString().slice(0, 10)}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Exportar CSV/Excel</span>
            </button>
          </div>
        </div>

        {/* Questions Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Q1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Administração Geral</span>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Pergunta 1</span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Como o senhor avalia a administração geral da Presidência da COMIEADEPA?
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Excelente</span>
                  <span className="text-white font-bold">{q1PctExcelente}% ({q1Excelente})</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${q1PctExcelente}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Boa</span>
                  <span className="text-white font-bold">{q1PctBoa}% ({q1Boa})</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${q1PctBoa}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Regular / Outras</span>
                  <span className="text-white font-bold">{q1PctOutras}% ({q1Outras})</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${q1PctOutras}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Q7 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Assembleias Gerais (AGO)</span>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Pergunta 7</span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Como avalia a organização e a realização das Assembleias Gerais Ordinárias (AGO)?
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Excelente</span>
                  <span className="text-white font-bold">{q7PctExcelente}% ({q7Excelente})</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${q7PctExcelente}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Boa</span>
                  <span className="text-white font-bold">{q7PctBoa}% ({q7Boa})</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${q7PctBoa}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Regular / Outras</span>
                  <span className="text-white font-bold">{q7PctOutras}% ({q7Outras})</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${q7PctOutras}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Últimas Respostas Registradas */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              Últimas Respostas Recebidas no Banco de Dados
            </span>
            <span className="text-xs text-slate-500 font-normal">
              Mostrando as coletas mais recentes
            </span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Horário / Data</th>
                  <th className="py-3 px-4">Estação / Totem</th>
                  <th className="py-3 px-4">Q1: Administração</th>
                  <th className="py-3 px-4">Q7: AGO</th>
                  <th className="py-3 px-4">Q10: Satisfação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {responses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-500">
                      Nenhuma resposta registrada ainda no Supabase. Faça um teste em /pesquisa!
                    </td>
                  </tr>
                ) : (
                  responses.slice(0, 10).map((r) => (
                    <tr key={r.id}>
                      <td className="py-3 px-4 text-slate-400">
                        {new Date(r.created_at).toLocaleString("pt-BR")}
                      </td>
                      <td className="py-3 px-4 font-medium text-white">{r.totem_id || "totem_geral"}</td>
                      <td className="py-3 px-4 capitalize text-amber-300">{r.q1_administracao_geral || "-"}</td>
                      <td className="py-3 px-4 capitalize text-blue-300">{r.q7_organizacao_ago || "-"}</td>
                      <td className="py-3 px-4 capitalize text-emerald-300">{r.q10_satisfacao_geral || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
