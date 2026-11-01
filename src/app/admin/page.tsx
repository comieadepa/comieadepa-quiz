"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  BarChart3, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Tablet, 
  CheckCircle, 
  ArrowUpRight, 
  Filter, 
  ShieldAlert, 
  Lock, 
  Home, 
  Clock, 
  TrendingUp,
  RefreshCw
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [authError, setAuthError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey === "admin" || accessKey === "comieadepa" || accessKey === "ago2026") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Chave de acesso inválida. Tente 'admin' para visualização demonstrativa.");
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
                Chave ou Senha Provisória
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
            <span>Modo Mockup</span>
          </div>
        </div>
      </main>
    );
  }

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
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Sincronização Ativa
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
        {/* Notice of architecture / demo stage */}
        <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-300">
                Ambiente de Demonstração e Layout (Fase 1)
              </p>
              <p className="text-xs text-slate-400">
                Os números e gráficos abaixo são ilustrativos para validação visual dos gestores. A integração com Supabase PostgreSQL e exportadores será ativada nas etapas seguintes.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-1.5 cursor-pointer">
              <RefreshCw className="w-3.5 h-3.5" />
              Atualizar
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
              <span>Total de Respostas</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">487</div>
            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2 font-medium">
              <TrendingUp className="w-3.5 h-3.5" /> +52 na última hora
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
              <span>Índice Geral de Satisfação</span>
              <BarChart3 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">4.8 <span className="text-base text-slate-500 font-normal">/ 5.0</span></div>
            <p className="text-xs text-slate-400 mt-2">
              96% de avaliações positivas
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
              <span>Tablets Conectados</span>
              <Tablet className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">6 <span className="text-base text-emerald-400 font-normal">Online</span></div>
            <p className="text-xs text-slate-400 mt-2">
              Totens distribuídos no auditório
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
              <span>Tempo Médio p/ Resposta</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">1m 45s</div>
            <p className="text-xs text-slate-400 mt-2">
              Fluxo ágil e sem filas
            </p>
          </div>
        </div>

        {/* Action Header: Export options */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Resultados Consolidados por Eixo</h2>
            <p className="text-xs text-slate-400">Distribuição percentual das 10 perguntas institucionais</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Geração de relatório em Excel (XLSX) será integrada com a base Supabase.")}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Exportar Excel</span>
            </button>

            <button
              onClick={() => alert("Geração de relatório em PDF para diretoria será integrada com a base Supabase.")}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-rose-400" />
              <span>Relatório PDF</span>
            </button>
          </div>
        </div>

        {/* Questions Breakdown (Demo preview) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
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
                  <span className="text-white font-bold">72% (351)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[72%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Boa</span>
                  <span className="text-white font-bold">21% (102)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[21%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Regular / Outras</span>
                  <span className="text-white font-bold">7% (34)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[7%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
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
                  <span className="text-white font-bold">68% (331)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[68%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Boa</span>
                  <span className="text-white font-bold">25% (122)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[25%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Regular / Outras</span>
                  <span className="text-white font-bold">7% (34)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[7%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tablets Status Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Tablet className="w-4 h-4 text-amber-400" />
            Status das Estações / Tablets Cadastrados
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Estação / Totem</th>
                  <th className="py-3 px-4">Localização</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Coletas Hoje</th>
                  <th className="py-3 px-4">Último Ping</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Totem 01 (Samsung Tab A9)</td>
                  <td className="py-3.5 px-4">Entrada Principal - Foyer</td>
                  <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Ativo</span></td>
                  <td className="py-3.5 px-4 font-bold text-white">118</td>
                  <td className="py-3.5 px-4 text-slate-400">há 12s</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Totem 02 (Samsung Tab A9)</td>
                  <td className="py-3.5 px-4">Auditório - Ala Direita</td>
                  <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Ativo</span></td>
                  <td className="py-3.5 px-4 font-bold text-white">96</td>
                  <td className="py-3.5 px-4 text-slate-400">há 18s</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Totem 03 (Lenovo M10)</td>
                  <td className="py-3.5 px-4">Auditório - Ala Esquerda</td>
                  <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Ativo</span></td>
                  <td className="py-3.5 px-4 font-bold text-white">104</td>
                  <td className="py-3.5 px-4 text-slate-400">há 45s</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Totem 04 (Samsung Tab S6 Lite)</td>
                  <td className="py-3.5 px-4">Secretaria Geral / Credenciamento</td>
                  <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Ativo</span></td>
                  <td className="py-3.5 px-4 font-bold text-white">169</td>
                  <td className="py-3.5 px-4 text-slate-400">há 5s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
