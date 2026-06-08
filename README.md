# ContHabilidade Edu

> Plataforma interativa para o ensino de contabilidade básica — conceitos, razonetes, lançamentos mistos e avaliação de estoques.

[![Deploy Vercel](https://img.shields.io/badge/Vercel-deployed-black?logo=vercel)](https://contaviva-edu.vercel.app)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-active-blue?logo=github)](https://tamashirobr.github.io/contaviva-edu/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev)

---

## Visão geral

O **ContHabilidade Edu** é uma ferramenta 100% web (React + Vite) voltada para estudantes e professores de contabilidade. Sem instalação para o aluno — basta abrir o navegador.

| Módulo | O que faz |
|--------|-----------|
| **Conceitos** | Equação patrimonial, natureza das contas (razonete interativo), partidas dobradas |
| **Razonetes** | Laboratório de lançamentos com balança patrimonial ao vivo e alertas didáticos |
| **Estoque** | Fichas PEPS, UEPS e Custo Médio com comparativo de CMV |

---

## Funcionalidades

### 📖 Conceitos
- Equação patrimonial **Ativo = Passivo + PL** em destaque.
- Painel interativo por grupo de conta: clique em *Ativo*, *Passivo*, *PL*, *Receita* ou *Despesa* e veja o razonete mostrar de que lado a conta aumenta.
- Explicação das partidas dobradas e do razonete (conta T).
- Atalho mental: Ativo/Despesa → natureza devedora; Passivo/PL/Receita → natureza credora.

### 🧪 Laboratório de Razonetes

**Lançamentos simples, compostos e mistos**

O formulário tem duas colunas independentes (DÉBITO / CRÉDITO), cada uma com linhas ilimitadas:

| Tipo | Exemplo |
|------|---------|
| **Simples** (1D/1C) | Integralização de capital |
| **Composto** (2D/1C ou 1D/2C) | Venda parte à vista, parte a prazo |
| **Misto** (ND/NC) | Folha de pagamento |

**Balança patrimonial ao vivo** — inclina quando Débito ≠ Crédito; permanece nivelada quando a equação está equilibrada.

**Sistema de alertas didáticos** — aparece somente após o usuário preencher valores nos dois lados:

| Alerta | Tipo |
|--------|------|
| Mesma conta no débito e no crédito | 🔴 Erro (bloqueia o lançamento) |
| Total débito ≠ total crédito | 🔴 Erro |
| Débito em conta de Receita | 🟡 Aviso pedagógico |
| Crédito em conta de Despesa | 🟡 Aviso pedagógico |
| Tudo correto | 🟢 Pronto para registrar |

Razonetes gerados automaticamente para cada conta movimentada, com saldo calculado na natureza correta. Mini-diário com todos os lançamentos registrados, identificados por tipo (SIMPLES / COMPOSTO / MISTO).

### 📦 Controle de Estoque
- Registro de entradas e saídas com histórico.
- Cálculo automático da **ficha de estoque** nos três métodos:
  - **PEPS** — Primeiro a Entrar, Primeiro a Sair (aceito pelo CPC 16)
  - **UEPS** — Último a Entrar, Primeiro a Sair (apenas didático; não aceito no Brasil desde 2008)
  - **Custo Médio Ponderado Móvel** (aceito pelo CPC 16)
- **Comparativo** lado a lado: CMV e estoque final por método.
- Nota regulatória embutida (CPC 16 / IAS 2).
- Exemplo clássico pré-carregado com 3 lotes e 2 saídas.

---

## Instalação local

**Requisitos:** Node.js 18+ (testado com Node 22).

```bash
git clone https://github.com/tamashiroBR/conthabilidade-edu.git
cd contaviva-edu
npm install
npm run dev
```

Abra `http://localhost:5173`.

---

## Scripts disponíveis

```bash
npm run dev      # servidor de desenvolvimento com hot-reload
npm run build    # build de produção → pasta dist/
npm run preview  # pré-visualizar o build localmente
```

---

## Estrutura do projeto

```
conthabilidade-edu/
├─ src/
│  ├─ App.jsx            # toda a aplicação (Conceitos + Razonetes + Estoque)
│  └─ main.jsx           # bootstrap React + shim window.storage → localStorage
├─ index.html
├─ package.json
├─ vite.config.js        # base path configurável via VITE_BASE_PATH
├─ vercel.json           # rewrite SPA para Vercel
└─ README.md
```

---

## Customizar o plano de contas

Edite o array `CONTAS` em `src/App.jsx`:

```js
{ cod: "minhaconta", nome: "Minha Conta", grupo: "Ativo", nat: "D" }
```

- `grupo`: `"Ativo"` | `"Passivo"` | `"PL"` | `"Receita"` | `"Despesa"`
- `nat`: `"D"` (devedora) | `"C"` (credora)

---

## Customizar os exemplos do laboratório

Edite o array `PRESETS_MISTO` em `src/App.jsx`:

```js
{
  txt: "Descrição curta (aparece no botão)",
  historico: "Histórico completo do lançamento",
  d: [{ conta: "bancos", valor: 10000 }],        // um ou mais débitos
  c: [{ conta: "capital", valor: 10000 }],       // um ou mais créditos
}
```

---

## Licença

MIT — livre para uso educacional e comercial.
