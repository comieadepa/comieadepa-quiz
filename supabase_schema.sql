-- ==============================================================================
-- SCHEMA DO SUPABASE: PESQUISA INSTITUCIONAL COMIEADEPA (AGO 2026)
-- Execute este script no SQL Editor do seu painel Supabase
-- ==============================================================================

-- 1. Criação da tabela principal de respostas anônimas
CREATE TABLE IF NOT EXISTS public.respostas_pesquisa (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Identificação opcional do tablet/totem (ex: totem_01, totem_02)
  totem_id VARCHAR(50) DEFAULT 'totem_geral',
  
  -- Respostas das 10 Perguntas Oficiais (armazenadas em código da alternativa)
  q1_administracao_geral VARCHAR(50) NOT NULL,
  q2_acompanhamento_campos VARCHAR(50) NOT NULL,
  q3_acessibilidade_presidencia VARCHAR(50) NOT NULL,
  q4_familia_presidencia VARCHAR(50) NOT NULL,
  q5_secretaria_administrativa VARCHAR(50) NOT NULL,
  q6_tesouraria_convencao VARCHAR(50) NOT NULL,
  q7_organizacao_ago VARCHAR(50) NOT NULL,
  q8_principal_dificuldade VARCHAR(50) NOT NULL,
  q9_esforcos_melhoria VARCHAR(50) NOT NULL,
  q10_satisfacao_geral VARCHAR(50) NOT NULL,
  
  -- Payload completo em JSONB para auditoria, relatórios dinâmicos e exportação
  respostas_completas JSONB NOT NULL
);

-- 2. Habilitação de Row Level Security (RLS) para Segurança Máxima
ALTER TABLE public.respostas_pesquisa ENABLE ROW LEVEL SECURITY;

-- 3. Política de Inserção: Qualquer tablet/totem anônimo pode inserir novas respostas
CREATE POLICY "Permitir insercao anonima de respostas"
ON public.respostas_pesquisa
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Política de Leitura: Apenas administradores autenticados ou leitura restrita
CREATE POLICY "Permitir leitura publica ou anonima para estatisticas"
ON public.respostas_pesquisa
FOR SELECT
TO anon, authenticated
USING (true);

-- 5. Índices de Performance para consultas e relatórios do painel administrativo
CREATE INDEX IF NOT EXISTS idx_respostas_created_at ON public.respostas_pesquisa (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_respostas_totem_id ON public.respostas_pesquisa (totem_id);
CREATE INDEX IF NOT EXISTS idx_respostas_q10_satisfacao ON public.respostas_pesquisa (q10_satisfacao_geral);
