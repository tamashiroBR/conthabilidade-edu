# ContaViva Edu — Aprenda Contabilidade na Prática

Ferramenta interativa de ensino de contabilidade básica. Voltada para estudantes,
professores e qualquer pessoa que queira entender o mecanismo de débito e crédito,
a equação patrimonial e os lançamentos contábeis fundamentais.

---

## O que tem no app

### 📖 Conceitos
- Equação patrimonial (Ativo = Passivo + PL) em destaque.
- Painel interativo de natureza das contas: clique em Ativo, Passivo, PL, Receita
  ou Despesa e veja o razonete demonstrar de que lado a conta aumenta.
- Explicação das partidas dobradas e do razonete (conta T).
- Atalho mental para nunca esquecer qual lado é débito e qual é crédito.

### 🧪 Laboratório de Razonetes
- Lance qualquer fato contábil: escolha a conta a débito, a conta a crédito
  e os valores (podem ser diferentes — a balança tomba e mostra o desequilíbrio).
- Botões de exemplos rápidos (integralização, compra, venda, despesa).
- Razonetes (T-accounts) gerados automaticamente para cada conta movimentada,
  com saldo calculado na natureza correta.
- **Balança patrimonial ao vivo**: inclina quando débito ≠ crédito, permanece
  nivelada quando a equação está equilibrada.
- Feedback em linguagem natural: "Bancos (Ativo) → aumentou. Capital (PL) → aumentou."

### 🎯 Exercícios
- 8 fatos contábeis clássicos do início de uma empresa.
- Para cada fato, o aluno escolhe qual conta debitar e qual creditar.
- Correção imediata com explicação pedagógica detalhada.
- Botão de Dica para quem travar.
- Progresso salvo no navegador entre sessões (localStorage).
- Barra de progresso e navegação por pontos entre exercícios.

---

## Requisitos

- **Node.js 18+** (testado com Node 22 — `node -v` para verificar).
- **VS Code** (recomendado) com as extensões ESLint e Prettier.

---

## Instalação e execução

```powershell
# 1. Entre na pasta do projeto
cd contaviva-edu

# 2. Instale as dependências (só na primeira vez)
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Abra o endereço exibido no terminal (normalmente `http://localhost:5173`).

O progresso dos exercícios é salvo automaticamente no `localStorage` do navegador.
Para zerar o progresso, abra o Console do navegador (`F12`) e execute:
```js
localStorage.removeItem("edu_progresso")
```

---

## Build de produção

```powershell
npm run build
```

Os arquivos estáticos ficam em `dist/` e podem ser servidos em qualquer
hospedagem estática (Netlify, Vercel, GitHub Pages, etc.).

---

## Estrutura do projeto

```
contaviva-edu/
├─ index.html          # ponto de entrada HTML
├─ package.json        # dependências e scripts
├─ vite.config.js      # configuração do Vite
├─ .gitignore
├─ README.md
└─ src/
   ├─ main.jsx         # bootstrap React + shim de window.storage
   └─ App.jsx          # aplicação ContaViva Edu completa
                       #   ├─ Conceitos
                       #   ├─ Laboratório de Razonetes (+ balança patrimonial)
                       #   └─ Exercícios com correção e progresso
```

---

## Depurar no VS Code

1. `Arquivo > Abrir Pasta` → selecione `contaviva-edu`.
2. Abra o terminal integrado com `Ctrl + '`.
3. `npm run dev` e abra o navegador.
4. Para breakpoints no código React, instale a extensão **Debugger for Chrome**
   (ou use o DevTools do navegador com source maps do Vite).

---

## Customizar os exercícios

Edite o array `EXERCICIOS` em `src/App.jsx`:

```js
const EXERCICIOS = [
  {
    id: 9,                                          // ID único
    enunciado: "Descrição do fato contábil.",       // enunciado para o aluno
    valor: 10000,                                   // valor do fato
    d: "caixa",                                     // código da conta a débito
    c: "receita",                                   // código da conta a crédito
    expl: "Explicação pedagógica da resposta.",     // feedback após acertar
  },
  // ...
];
```

As contas disponíveis estão no array `CONTAS` (também em `App.jsx`).
Para adicionar novas contas, inclua um objeto `{ cod, nome, grupo, nat }`:
- `grupo`: `"Ativo"`, `"Passivo"`, `"PL"`, `"Receita"` ou `"Despesa"`.
- `nat`: `"D"` (devedora) ou `"C"` (credora).

---

## Relação com o ContaViva (versão profissional)

Este projeto é **independente**. A versão profissional (`contaviva/`) inclui
escrituração multiempresa, balancete, livro razão, diário e exportação ECD (SPED
Contábil, leiaute 9). O Edu é focado exclusivamente no ensino dos fundamentos.

---

## Deploy no GitHub Pages

O projeto inclui um workflow do **GitHub Actions** que faz o build e o deploy automaticamente a cada `git push` na branch `main`.

### Passo a passo

**1. Criar o repositório no GitHub**
```
github.com → New repository → nome: contaviva-edu → Create
```

**2. Enviar o código**
```powershell
cd contaviva-edu
git init
git add .
git commit -m "feat: ContaViva Edu inicial"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/contaviva-edu.git
git push -u origin main
```

**3. Ativar o GitHub Pages**
```
Repositório → Settings → Pages
Source: GitHub Actions   ← selecione esta opção
```

**4. Ajustar o nome do repositório no workflow** *(se necessário)*

Abra `.github/workflows/deploy.yml` e altere a linha:
```yaml
VITE_BASE_PATH: /contaviva-edu/
```
para corresponder ao nome exato do seu repositório. Se o repositório se
chamar `minha-plataforma`, coloque `/minha-plataforma/`.

**Casos especiais:**
- Repositório `seu-usuario.github.io` (user page) → `VITE_BASE_PATH: /`
- Repositório de organização `org.github.io` → idem

**5. Acompanhar o deploy**
```
Repositório → Actions → Deploy — GitHub Pages
```
O link final aparece em **Settings → Pages** após o primeiro deploy (≈ 1 min).

### URL resultante
```
https://SEU_USUARIO.github.io/contaviva-edu/
```

### Deploy manual (alternativa sem Actions)
```powershell
npm run build              # gera a pasta dist/
# suba o conteúdo de dist/ para a branch gh-pages manualmente,
# ou use: npx gh-pages -d dist
```
