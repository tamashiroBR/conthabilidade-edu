import React, { useState, useEffect, useMemo } from "react";
import {
  GraduationCap, BookOpen, FlaskConical, Scale, RotateCcw,
  CheckCircle2, XCircle, Lightbulb, ArrowRight, Sparkles, Trash2, Plus, Package, Layers
} from "lucide-react";

/* ============================================================================
   ContHabilidade Edu — Ferramenta Educacional
   ========================================================================== */

/* plano de contas didático */
const CONTAS = [
  { cod: "caixa", nome: "Caixa", grupo: "Ativo", nat: "D" },
  { cod: "bancos", nome: "Bancos", grupo: "Ativo", nat: "D" },
  { cod: "merc", nome: "Mercadorias", grupo: "Ativo", nat: "D" },
  { cod: "clientes", nome: "Clientes", grupo: "Ativo", nat: "D" },
  { cod: "moveis", nome: "Móveis e Utensílios", grupo: "Ativo", nat: "D" },
  { cod: "fornec", nome: "Fornecedores", grupo: "Passivo", nat: "C" },
  { cod: "emprest", nome: "Empréstimos a Pagar", grupo: "Passivo", nat: "C" },
  { cod: "salpagar", nome: "Salários a Pagar", grupo: "Passivo", nat: "C" },
  { cod: "capital", nome: "Capital Social", grupo: "PL", nat: "C" },
  { cod: "receita", nome: "Receita de Vendas", grupo: "Receita", nat: "C" },
  { cod: "despaluguel", nome: "Despesa de Aluguel", grupo: "Despesa", nat: "D" },
  { cod: "despsal", nome: "Despesa de Salários", grupo: "Despesa", nat: "D" },
];
const byCod = Object.fromEntries(CONTAS.map((c) => [c.cod, c]));
const nomeConta = (cod) => byCod[cod]?.nome || cod;

const GRUPO_INFO = {
  Ativo: { nat: "D", aumenta: "débito", cor: "#0d6efd" },
  Despesa: { nat: "D", aumenta: "débito", cor: "#0d6efd" },
  Passivo: { nat: "C", aumenta: "crédito", cor: "#dc3545" },
  PL: { nat: "C", aumenta: "crédito", cor: "#dc3545" },
  Receita: { nat: "C", aumenta: "crédito", cor: "#dc3545" },
};

const fmt = (n) => "R$ " + (Number(n) || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ============================ APP ============================ */
export default function App() {
  const [aba, setAba] = useState("conceitos");
  return (
    <>
      <style>{CSS}</style>
      <div className="edu">
        <header className="edu-head">
          <div className="edu-brand">
            <div className="edu-logo"><GraduationCap size={22} /></div>
            <div><h1>ContHabilidade <span>Edu</span></h1><p>Ferramenta educacional</p></div>
          </div>
          <nav className="edu-nav">
            {[["conceitos", "Conceitos", BookOpen], ["lab", "Razonetes", FlaskConical], ["estoque", "Estoque", Package]]
              .map(([k, l, Ic]) => (
                <button key={k} className={`edu-tab ${aba === k ? "on" : ""}`} onClick={() => setAba(k)}>
                  <Ic size={16} /> {l}
                </button>
              ))}
          </nav>
        </header>
        <main className="edu-main">
          {aba === "conceitos" && <Conceitos />}
          {aba === "lab" && <Laboratorio />}
          {aba === "estoque" && <Estoque />}
        </main>
      </div>
    </>
  );
}

/* ============================ CONCEITOS ============================ */
function Conceitos() {
  const [grupoSel, setGrupoSel] = useState("Ativo");
  const info = GRUPO_INFO[grupoSel];
  return (
    <div className="sec">
      <div className="card hero-eq">
        <span className="kicker">A equação fundamental</span>
        <div className="eq">
          <span className="eq-a">ATIVO</span>
          <span className="eq-op">=</span>
          <span className="eq-p">PASSIVO</span>
          <span className="eq-op">+</span>
          <span className="eq-pl">PATRIMÔNIO LÍQUIDO</span>
        </div>
        <p>O que a empresa <b>tem</b> (Ativo) é igual ao que ela <b>deve a terceiros</b> (Passivo) somado ao que pertence aos <b>sócios</b> (Patrimônio Líquido). Todo registro contábil mantém essa igualdade.</p>
      </div>

      <div className="card">
        <h3 className="card-t"><Sparkles size={17} /> Como saber se é débito ou crédito?</h3>
        <p className="lead">Cada conta tem uma <b>natureza</b>. Veja de que lado ela <b>aumenta</b>. Toque num grupo:</p>
        <div className="grupos">
          {Object.keys(GRUPO_INFO).map((g) => (
            <button key={g} className={`grupo ${grupoSel === g ? "on" : ""}`}
              style={grupoSel === g ? { borderColor: GRUPO_INFO[g].cor, color: GRUPO_INFO[g].cor } : {}}
              onClick={() => setGrupoSel(g)}>{g}</button>
          ))}
        </div>
        <div className="razonete-demo">
          <div className="rz">
            <div className="rz-nome">{grupoSel}</div>
            <div className="rz-corpo">
              <div className={`rz-lado ${info.nat === "D" ? "ativo" : ""}`}>
                <span className="rz-lab">Débito</span>
                {info.nat === "D" && <span className="rz-sinal">▲ aumenta</span>}
                {info.nat === "C" && <span className="rz-sinal dim">▼ diminui</span>}
              </div>
              <div className={`rz-lado ${info.nat === "C" ? "ativo" : ""}`}>
                <span className="rz-lab">Crédito</span>
                {info.nat === "C" && <span className="rz-sinal">▲ aumenta</span>}
                {info.nat === "D" && <span className="rz-sinal dim">▼ diminui</span>}
              </div>
            </div>
          </div>
          <p className="razao-txt">
            <b>{grupoSel}</b> é de natureza <b style={{ color: info.cor }}>{info.nat === "D" ? "devedora" : "credora"}</b>,
            então <b>aumenta a {info.aumenta}</b> e diminui do lado oposto.
          </p>
        </div>
      </div>

      <div className="cards-2">
        <div className="card">
          <h3 className="card-t"><Scale size={17} /> Partidas dobradas</h3>
          <p>Para todo <b>débito</b> existe um <b>crédito</b> de igual valor. Por isso a equação nunca sai do lugar: cada fato é registrado em pelo menos duas contas, e a soma dos débitos sempre iguala a soma dos créditos.</p>
        </div>
        <div className="card">
          <h3 className="card-t"><BookOpen size={17} /> Razonete (conta T)</h3>
          <p>É a representação em forma de "T" de uma conta: <b>débitos à esquerda</b>, <b>créditos à direita</b>. O <b>saldo</b> fica do lado da natureza da conta. É a ferramenta clássica para enxergar os lançamentos.</p>
        </div>
      </div>

      <div className="dica">
        <Lightbulb size={18} />
        <p><b>Atalho mental:</b> Ativo e Despesa caminham juntos (natureza devedora, aumentam a débito). Passivo, PL e Receita caminham juntos (natureza credora, aumentam a crédito).</p>
      </div>
    </div>
  );
}

/* ============================ LABORATÓRIO DE RAZONETES ============================ */

const PRESETS_MISTO = [
  {
    txt: "Integralização de capital",
    historico: "Integralização de capital social",
    d: [{ conta: "bancos",   valor: 50000 }],
    c: [{ conta: "capital",  valor: 50000 }],
  },
  {
    txt: "Venda mista — à vista e a prazo",
    historico: "Venda de mercadorias (parte à vista, parte a prazo)",
    d: [{ conta: "caixa",    valor: 6000 }, { conta: "clientes", valor: 4000 }],
    c: [{ conta: "receita",  valor: 10000 }],
  },
  {
    txt: "Pagamento com caixa e bancos",
    historico: "Pagamento de fornecedor via caixa e bancos",
    d: [{ conta: "fornec",   valor: 8000 }],
    c: [{ conta: "caixa",    valor: 3000 }, { conta: "bancos", valor: 5000 }],
  },
  {
    txt: "Folha de pagamento (MISTO)",
    historico: "Registro da folha — salários e provisões",
    d: [{ conta: "despsal",  valor: 9000 }, { conta: "despaluguel", valor: 1000 }],
    c: [{ conta: "bancos",   valor: 7500 }, { conta: "salpagar",    valor: 2500 }],
  },
];

function tipoLancamento(nd, nc) {
  if (nd === 1 && nc === 1) return { label: "SIMPLES",   cor: "#0d6efd" };
  if (nd >  1 && nc === 1) return { label: "COMPOSTO",  cor: "#6f42c1" };
  if (nd === 1 && nc >  1) return { label: "COMPOSTO",  cor: "#6f42c1" };
  return                          { label: "MISTO",     cor: "#fd7e14" };
}

function Laboratorio() {
  const parseMoney = (s) => {
    const v = parseFloat(String(s || "").replace(/\./g, "").replace(",", "."));
    return isNaN(v) ? 0 : v;
  };
  const fmtN = (n) =>
    (Number(n) || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtBRL = (n) => "R$ " + fmtN(n);

  /* ── estado ── */
  const [lancamentos, setLancamentos] = useState([]);
  const [partD, setPartD] = useState([{ conta: "", valor: "" }]);
  const [partC, setPartC] = useState([{ conta: "", valor: "" }]);
  const [historico, setHistorico] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [touched,  setTouched]  = useState(false);  // alerta só aparece após interação

  /* persistência */
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("edu_lab");
        if (r?.value) setLancamentos(JSON.parse(r.value));
      } catch {}
    })();
  }, []);
  const persist = async (novos) => {
    setLancamentos(novos);
    try { await window.storage.set("edu_lab", JSON.stringify(novos)); } catch {}
  };

  /* ── manipulação das partidas ── */
  const updD = (i, f, v) => { setTouched(true); setPartD((ps) => ps.map((p, idx) => idx === i ? { ...p, [f]: v } : p)); };
  const updC = (i, f, v) => { setTouched(true); setPartC((ps) => ps.map((p, idx) => idx === i ? { ...p, [f]: v } : p)); };
  const addD = () => { setTouched(true); setPartD((ps) => [...ps, { conta: "", valor: "" }]); };
  const addC = () => { setTouched(true); setPartC((ps) => [...ps, { conta: "", valor: "" }]); };
  const remD = (i) => { if (partD.length > 1) { setTouched(true); setPartD((ps) => ps.filter((_, idx) => idx !== i)); } };
  const remC = (i) => { if (partC.length > 1) { setTouched(true); setPartC((ps) => ps.filter((_, idx) => idx !== i)); } };

  /* ── validação em tempo real ── */
  const validacao = useMemo(() => {
    // Totais calculados sempre (usados na linha "Total D/C" abaixo dos campos)
    const vd = partD.map((p) => parseMoney(p.valor));
    const vc = partC.map((p) => parseMoney(p.valor));
    const totD = vd.reduce((s, v) => s + v, 0);
    const totC = vc.reduce((s, v) => s + v, 0);

    // Alertas só aparecem quando o usuário preencheu valor em AMBOS os lados
    const algumCampo = touched && totD > 0 && totC > 0;
    if (!algumCampo) return { erros: [], avisos: [], pronto: false, algumCampo: false, totD, totC };

    const erros = [], avisos = [];

    if (partD.some((p) => !p.conta))
      erros.push({ cod: "SEM_CONTA_D", titulo: "Conta de débito não selecionada",
        msg: "Selecione uma conta para cada linha de débito.", dica: "" });
    if (partC.some((p) => !p.conta))
      erros.push({ cod: "SEM_CONTA_C", titulo: "Conta de crédito não selecionada",
        msg: "Selecione uma conta para cada linha de crédito.", dica: "" });
    if (vd.some((v) => v <= 0))
      erros.push({ cod: "VALOR_D_ZERO", titulo: "Valor de débito inválido",
        msg: "Todos os valores de débito devem ser maiores que zero.", dica: "" });
    if (vc.some((v) => v <= 0))
      erros.push({ cod: "VALOR_C_ZERO", titulo: "Valor de crédito inválido",
        msg: "Todos os valores de crédito devem ser maiores que zero.", dica: "" });

    /* mesma conta nos dois lados */
    const codsD = new Set(partD.filter((p) => p.conta).map((p) => p.conta));
    const codsC = new Set(partC.filter((p) => p.conta).map((p) => p.conta));
    const inter = [...codsD].filter((c) => codsC.has(c));
    if (inter.length > 0)
      erros.push({ cod: "CONTA_AMBOS_LADOS",
        titulo: `Conta nos dois lados: ${inter.map((c) => byCod[c]?.nome).join(", ")}`,
        msg: "A mesma conta não pode aparecer ao mesmo tempo no débito e no crédito.",
        dica: "Lançamentos mistos podem ter várias contas de cada lado, mas cada conta deve aparecer em apenas um lado." });

    /* desequilíbrio */
    if (totD > 0 && totC > 0 && Math.abs(totD - totC) > 0.005)
      erros.push({ cod: "DESEQUILIBRADO", titulo: "Lançamento desequilibrado",
        msg: `Total débito ${fmtBRL(totD)} ≠ Total crédito ${fmtBRL(totC)} — diferença de ${fmtBRL(Math.abs(totD - totC))}.`,
        dica: "Em partidas dobradas, a soma de todos os débitos deve sempre igualar a soma de todos os créditos." });

    /* avisos pedagógicos */
    partD.forEach((p) => {
      if (byCod[p.conta]?.grupo === "Receita")
        avisos.push({ cod: "DEBITA_RECEITA", titulo: `Débito em Receita (${byCod[p.conta]?.nome})`,
          msg: "Contas de Receita normalmente aumentam a crédito. Debitá-las as reduz — válido em estornos e encerramentos, mas incomum em operações normais." });
    });
    partC.forEach((p) => {
      if (byCod[p.conta]?.grupo === "Despesa")
        avisos.push({ cod: "CREDITA_DESPESA", titulo: `Crédito em Despesa (${byCod[p.conta]?.nome})`,
          msg: "Contas de Despesa normalmente aumentam a débito. Creditá-las as reduz — válido em estornos." });
    });

    const tipo = tipoLancamento(partD.length, partC.length);
    const pronto = erros.length === 0 && totD > 0 && totC > 0
      && partD.every((p) => p.conta) && partC.every((p) => p.conta);
    return { erros, avisos, pronto, algumCampo, totD, totC, tipo };
  }, [partD, partC, historico, touched]);

  /* ── lançar ── */
  const aplicarForm = () => {
    if (!validacao.pronto) return;
    const novoLanc = {
      id: Date.now(),
      historico: historico.trim() || "Lançamento sem histórico",
      tipo: validacao.tipo.label,
      partidas: [
        ...partD.map((p) => ({ conta: p.conta, lado: "D", valor: parseMoney(p.valor) })),
        ...partC.map((p) => ({ conta: p.conta, lado: "C", valor: parseMoney(p.valor) })),
      ],
    };
    persist([...lancamentos, novoLanc]);
    const nomesD = partD.map((p) => byCod[p.conta]?.nome).join(", ");
    const nomesC = partC.map((p) => byCod[p.conta]?.nome).join(", ");
    setFeedback({ tipo: validacao.tipo, totD: validacao.totD, nomesD, nomesC });
    setPartD([{ conta: "", valor: "" }]);
    setPartC([{ conta: "", valor: "" }]);
    setHistorico("");
    setTouched(false);  // form limpo: suprimir alertas até próxima interação
  };

  const aplicarPreset = (p) => {
    setPartD(p.d.map((x) => ({ conta: x.conta, valor: String(x.valor) })));
    setPartC(p.c.map((x) => ({ conta: x.conta, valor: String(x.valor) })));
    setHistorico(p.historico);
    setFeedback(null);
    setTouched(true);   // preset preenche valores; mostrar estado pronto
  };

  const removerLanc = (id) => persist(lancamentos.filter((l) => l.id !== id));
  const limpar     = () => { persist([]); setFeedback(null); setTouched(false); };

  /* ── razonetes ── */
  const razonetes = useMemo(() => {
    const map = {};
    for (const l of lancamentos)
      for (const p of l.partidas) {
        if (!map[p.conta]) map[p.conta] = { d: 0, c: 0, lancD: [], lancC: [] };
        if (p.lado === "D") { map[p.conta].d += p.valor; map[p.conta].lancD.push(p.valor); }
        else                { map[p.conta].c += p.valor; map[p.conta].lancC.push(p.valor); }
      }
    return CONTAS.filter((c) => map[c.cod]).map((c) => {
      const r   = map[c.cod];
      const saldo = c.nat === "D" ? r.d - r.c : r.c - r.d;
      return { ...c, ...r, saldo, ladoSaldo: saldo >= 0 ? c.nat : (c.nat === "D" ? "C" : "D") };
    });
  }, [lancamentos]);

  /* ── equação patrimonial ── */
  const eq = useMemo(() => {
    let ativo = 0, passivo = 0, pl = 0, rec = 0, desp = 0;
    for (const r of razonetes) {
      const s = r.saldo;
      if      (r.grupo === "Ativo")   ativo   += s;
      else if (r.grupo === "Passivo") passivo  += s;
      else if (r.grupo === "PL")      pl       += s;
      else if (r.grupo === "Receita") rec      += s;
      else if (r.grupo === "Despesa") desp     += s;
    }
    return { ativo, passivoPl: passivo + pl + rec - desp };
  }, [razonetes]);

  const diff = eq.ativo - eq.passivoPl;
  const equilibrado = Math.abs(diff) < 0.005;
  const ang  = Math.max(-12, Math.min(12,
    diff / Math.max(1, Math.abs(eq.ativo) + Math.abs(eq.passivoPl)) * 60));

  /* ── render ── */
  return (
    <div className="sec">

      {/* ── balança ── */}
      <div className="board">
        <div className="board-top">
          <span className="board-t">Equação patrimonial</span>
          <span className={`board-tag ${equilibrado ? "ok" : "no"}`}>
            {equilibrado ? <><CheckCircle2 size={14}/> equilibrada</> : <><XCircle size={14}/> desequilibrada</>}
          </span>
        </div>
        <svg viewBox="0 0 320 120" className="balanca">
          <line x1="160" y1="20" x2="160" y2="100" stroke="#adb5bd" strokeWidth="3" strokeLinecap="round"/>
          <g transform={`rotate(${ang} 160 28)`}>
            <line x1="40" y1="28" x2="280" y2="28" stroke="#adb5bd" strokeWidth="3" strokeLinecap="round"/>
            <g transform="translate(40 28)"><circle r="3" fill="#6c757d"/>
              <rect x="-34" y="14" width="68" height="30" rx="6" fill="#0d6efd"/>
              <text x="0" y="33" textAnchor="middle" className="pan-l">Ativo</text></g>
            <g transform="translate(280 28)"><circle r="3" fill="#6c757d"/>
              <rect x="-44" y="14" width="88" height="30" rx="6" fill="#dc3545"/>
              <text x="0" y="33" textAnchor="middle" className="pan-l">Passivo + PL</text></g>
          </g>
          <polygon points="150,100 170,100 160,70" fill="#6c757d"/>
        </svg>
        <div className="board-vals">
          <span><i style={{ background: "#0d6efd" }}/>Ativo <b>{fmtBRL(eq.ativo)}</b></span>
          <span><i style={{ background: "#dc3545" }}/>Passivo + PL <b>{fmtBRL(eq.passivoPl)}</b></span>
        </div>
      </div>

      {/* ── formulário de lançamento ── */}
      <div className="card">
        <div className="card-t-row">
          <h3 className="card-t"><Plus size={17}/> Lançar um fato</h3>
          {lancamentos.length > 0 && (
            <button className="btn-ghost" onClick={limpar}><RotateCcw size={14}/> Limpar tudo</button>
          )}
        </div>

        {/* histórico */}
        <input
          className="hist-input"
          placeholder="Histórico do lançamento (ex.: Venda de mercadorias à vista)"
          value={historico}
          onChange={(e) => { setTouched(true); setHistorico(e.target.value); }}
        />

        {/* partidas — duas colunas */}
        <div className="split-cols">
          {/* DÉBITO */}
          <div className="split-col split-col-d">
            <div className="split-col-title">DÉBITO</div>
            {partD.map((p, i) => (
              <div key={i} className="split-row">
                <select value={p.conta} onChange={(e) => updD(i, "conta", e.target.value)} className="split-sel">
                  <option value="">Selecione a conta…</option>
                  {CONTAS.map((c) => <option key={c.cod} value={c.cod}>{c.nome}</option>)}
                </select>
                <input inputMode="decimal" placeholder="Valor"
                  className="split-val mono" value={p.valor}
                  onChange={(e) => updD(i, "valor", e.target.value)}/>
                {partD.length > 1 && (
                  <button className="split-rem" onClick={() => remD(i)}>
                    <Trash2 size={13}/>
                  </button>
                )}
              </div>
            ))}
            <button className="split-add" onClick={addD}><Plus size={13}/> linha</button>
            <div className="split-total">
              Total D: <b className="mono">{fmtBRL(validacao.totD)}</b>
            </div>
          </div>

          {/* CRÉDITO */}
          <div className="split-col split-col-c">
            <div className="split-col-title">CRÉDITO</div>
            {partC.map((p, i) => (
              <div key={i} className="split-row">
                <select value={p.conta} onChange={(e) => updC(i, "conta", e.target.value)} className="split-sel">
                  <option value="">Selecione a conta…</option>
                  {CONTAS.map((c) => <option key={c.cod} value={c.cod}>{c.nome}</option>)}
                </select>
                <input inputMode="decimal" placeholder="Valor"
                  className="split-val mono" value={p.valor}
                  onChange={(e) => updC(i, "valor", e.target.value)}/>
                {partC.length > 1 && (
                  <button className="split-rem" onClick={() => remC(i)}>
                    <Trash2 size={13}/>
                  </button>
                )}
              </div>
            ))}
            <button className="split-add" onClick={addC}><Plus size={13}/> linha</button>
            <div className="split-total">
              Total C: <b className="mono">{fmtBRL(validacao.totC)}</b>
            </div>
          </div>
        </div>

        {/* validação */}
        {validacao.algumCampo && (
          <div className="valid-panel">
            {validacao.erros.map((e, i) => (
              <div key={i} className="alerta alerta-erro">
                <XCircle size={15}/>
                <div className="alerta-body">
                  <b>{e.titulo}</b>
                  <span>{e.msg}</span>
                  {e.dica && <span className="alerta-dica"><Lightbulb size={12}/> {e.dica}</span>}
                </div>
              </div>
            ))}
            {validacao.avisos.map((a, i) => (
              <div key={i} className="alerta alerta-aviso">
                <Lightbulb size={15}/>
                <div className="alerta-body"><b>{a.titulo}</b><span>{a.msg}</span></div>
              </div>
            ))}
            {validacao.pronto && validacao.erros.length === 0 && (
              <div className="alerta alerta-ok">
                <CheckCircle2 size={15}/>
                <span>
                  Lançamento{" "}
                  <b style={{ color: validacao.tipo.cor }}>{validacao.tipo.label}</b>
                  {" "}({partD.length}D/{partC.length}C) — pronto para registrar.
                </span>
              </div>
            )}
          </div>
        )}

        {/* botão + presets */}
        <div className="lanc-acoes">
          <button className="btn" disabled={!validacao.pronto} onClick={aplicarForm}>
            Registrar nos razonetes <ArrowRight size={16}/>
          </button>
        </div>

        <div className="presets">
          <span>Exemplos:</span>
          {PRESETS_MISTO.map((p, i) => (
            <button key={i} className="preset" onClick={() => aplicarPreset(p)}>{p.txt}</button>
          ))}
        </div>

        {feedback && (
          <div className="fb ok">
            <CheckCircle2 size={16}/>
            <span>
              Lançamento{" "}
              <b style={{ color: feedback.tipo.cor }}>{feedback.tipo.label}</b>{" "}
              registrado. Débito(s): <b>{feedback.nomesD}</b> — Crédito(s): <b>{feedback.nomesC}</b>.
            </span>
          </div>
        )}
      </div>

      {/* ── razonetes ── */}
      {razonetes.length > 0 && (
        <div className="card">
          <h3 className="card-t"><BookOpen size={17}/> Razonetes</h3>
          <div className="rz-grid">
            {razonetes.map((r) => (
              <div key={r.cod} className="rz2">
                <div className="rz2-nome">{r.nome}<span>{r.grupo}</span></div>
                <div className="rz2-t">
                  <div className="rz2-col">
                    {r.lancD.map((v, i) => (
                      <span key={i} className="mono">{fmtN(v)}</span>
                    ))}
                  </div>
                  <div className="rz2-col rz2-c">
                    {r.lancC.map((v, i) => (
                      <span key={i} className="mono">{fmtN(v)}</span>
                    ))}
                  </div>
                </div>
                <div className={`rz2-saldo ${r.ladoSaldo === "D" ? "d" : "c"}`}>
                  Saldo {r.ladoSaldo}:{" "}
                  <b className="mono">{fmtN(Math.abs(r.saldo))}</b>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── mini diário ── */}
      {lancamentos.length > 0 && (
        <div className="card">
          <h3 className="card-t"><Layers size={17}/> Lançamentos registrados</h3>
          <div className="mini-diario">
            {lancamentos.map((l) => {
              const tipo = tipoLancamento(
                l.partidas.filter((p) => p.lado === "D").length,
                l.partidas.filter((p) => p.lado === "C").length
              );
              return (
                <div key={l.id} className="md-item">
                  <div className="md-head">
                    <span className="md-tipo" style={{ color: tipo.cor, borderColor: tipo.cor }}>
                      {tipo.label}
                    </span>
                    <span className="md-hist">{l.historico}</span>
                    <button className="split-rem" onClick={() => removerLanc(l.id)}
                      title="Estornar lançamento"><Trash2 size={13}/></button>
                  </div>
                  <div className="md-partidas">
                    {l.partidas.map((p, i) => (
                      <div key={i} className={`md-p md-p-${p.lado}`}>
                        <span className={`dc dc-${p.lado === "D" ? "d" : "c"}`}
                          style={{ fontSize: 10, padding: "2px 7px" }}>{p.lado}</span>
                        <span>{byCod[p.conta]?.nome}</span>
                        <span className="mono">R$ {fmtN(p.valor)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


/* ============================ CONTROLE DE ESTOQUE ============================ */

const METODOS = {
  peps: 'PEPS — Primeiro a Entrar, Primeiro a Sair',
  ueps: 'UEPS — Último a Entrar, Primeiro a Sair',
  cmp:  'Custo Médio Ponderado Móvel',
};

const PRESET_MOVS = [
  { id:1, tipo:'E', data:'2026-01-05', descricao:'Saldo inicial',    qtd:100, valorUnit:10.00 },
  { id:2, tipo:'E', data:'2026-01-15', descricao:'Compra — lote 2', qtd:50,  valorUnit:12.00 },
  { id:3, tipo:'S', data:'2026-01-22', descricao:'Venda de mercadorias', qtd:80,  valorUnit:0 },
  { id:4, tipo:'E', data:'2026-02-04', descricao:'Compra — lote 3', qtd:60,  valorUnit:15.00 },
  { id:5, tipo:'S', data:'2026-02-19', descricao:'Venda de mercadorias', qtd:70,  valorUnit:0 },
];

/* Algoritmo único para PEPS, UEPS e CMP.
   PEPS  → novos lotes vão para o FIM   da fila (FIFO).
   UEPS  → novos lotes vão para o INÍCIO da fila (LIFO).
   CMP   → recalcula custo médio após cada entrada; saídas usam o médio atual. */
function calcFicha(movs, metodo) {
  let layers = [];   // [{ qtd, vu }] — lotes disponíveis (PEPS/UEPS)
  let cmpVU  = 0;   // custo médio corrente (CMP)
  let sldQtd = 0, sldTotal = 0;
  const ficha = [];

  for (const m of movs) {
    const vu  = Number(m.valorUnit) || 0;
    const qtd = Number(m.qtd)       || 0;

    if (m.tipo === 'E') {
      const total = qtd * vu;
      if (metodo === 'cmp') {
        sldQtd   += qtd;
        sldTotal += total;
        cmpVU     = sldQtd > 0 ? sldTotal / sldQtd : vu;
        ficha.push({ ...m, entQtd:qtd, entVU:vu, entTotal:total,
          saiQtd:0, saiVU:0, saiTotal:0, sldQtd, sldVU:cmpVU, sldTotal });
      } else {
        layers = metodo === 'peps'
          ? [...layers, { qtd, vu }]         // PEPS: lote mais antigo no início
          : [{ qtd, vu }, ...layers];         // UEPS: lote mais recente no início
        sldQtd   += qtd;
        sldTotal += total;
        ficha.push({ ...m, entQtd:qtd, entVU:vu, entTotal:total,
          saiQtd:0, saiVU:0, saiTotal:0,
          sldQtd, sldVU:sldQtd > 0 ? sldTotal / sldQtd : 0, sldTotal });
      }
    } else {
      /* saída — consome lotes na ordem da fila */
      let needed = qtd, custo = 0;
      if (metodo === 'cmp') {
        custo     = needed * cmpVU;
        sldQtd   -= needed;
        sldTotal -= custo;
        if (sldQtd   < 0) sldQtd   = 0;
        if (sldTotal < 0) sldTotal = 0;
        ficha.push({ ...m, saiQtd:qtd, saiVU:cmpVU, saiTotal:custo,
          entQtd:0, entVU:0, entTotal:0, sldQtd, sldVU:cmpVU, sldTotal });
      } else {
        const lay = layers.map(l => ({ ...l }));
        while (needed > 0 && lay.length > 0) {
          if (lay[0].qtd <= needed) {
            custo  += lay[0].qtd * lay[0].vu;
            needed -= lay[0].qtd;
            lay.shift();
          } else {
            custo     += needed * lay[0].vu;
            lay[0].qtd -= needed;
            needed      = 0;
          }
        }
        layers    = lay;
        const vuM  = qtd > 0 ? custo / qtd : 0;
        sldQtd   -= qtd;
        sldTotal -= custo;
        if (sldQtd   < 0) sldQtd   = 0;
        if (sldTotal < 0) sldTotal = 0;
        ficha.push({ ...m, saiQtd:qtd, saiVU:vuM, saiTotal:custo,
          entQtd:0, entVU:0, entTotal:0,
          sldQtd, sldVU:sldQtd > 0 ? sldTotal / sldQtd : 0, sldTotal });
      }
    }
  }
  return ficha;
}

function Estoque() {
  const [movs,   setMovs]   = useState([]);
  const [metodo, setMetodo] = useState('peps');
  const [form,   setForm]   = useState({ tipo:'E', data:'', descricao:'', qtd:'', valorUnit:'' });
  const fmtN   = (n) => (Number(n)||0).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
  const fmtDt  = (iso) => { if (!iso) return ''; const [y,mo,d] = iso.split('-'); return d+'/'+mo+'/'+y; };

  useEffect(() => {
    (async () => {
      try { const r = await window.storage.get('edu_estoque'); if (r?.value) setMovs(JSON.parse(r.value)); }
      catch {}
    })();
  }, []);
  const persist = async (m) => {
    setMovs(m);
    try { await window.storage.set('edu_estoque', JSON.stringify(m)); } catch {}
  };

  const fichas = useMemo(() => ({
    peps: calcFicha(movs, 'peps'),
    ueps: calcFicha(movs, 'ueps'),
    cmp:  calcFicha(movs, 'cmp'),
  }), [movs]);

  const resumo = useMemo(() => {
    const r = (f) => ({
      cmv: f.filter(x => x.tipo==='S').reduce((s,x) => s+x.saiTotal, 0),
      est: f.length ? f[f.length-1].sldTotal : 0,
      qtd: f.length ? f[f.length-1].sldQtd  : 0,
    });
    return { peps:r(fichas.peps), ueps:r(fichas.ueps), cmp:r(fichas.cmp) };
  }, [fichas]);

  const addMov = () => {
    const { tipo, data, descricao, qtd, valorUnit } = form;
    if (!data || !descricao.trim() || !qtd) return;
    if (tipo === 'E' && !valorUnit) return;
    const novo = { id:Date.now(), tipo, data, descricao:descricao.trim(),
                   qtd:Number(qtd), valorUnit: tipo==='E' ? Number(valorUnit) : 0 };
    persist([...movs, novo].sort((a,b) => a.data.localeCompare(b.data)));
    setForm(f => ({ ...f, descricao:'', qtd:'', valorUnit:'' }));
  };
  const remMov = (id) => persist(movs.filter(m => m.id !== id));
  const carregarPreset = () => persist(PRESET_MOVS);
  const limpar = () => persist([]);

  const ficha = fichas[metodo];

  return (
    <div className="sec">

      {/* cabeçalho didático */}
      <div className="card hero-eq" style={{padding:'18px 20px'}}>
        <span className="kicker">Avaliação de Estoques</span>
        <div style={{display:'flex',gap:18,marginTop:12,flexWrap:'wrap'}}>
          <div style={{flex:1,minWidth:200}}>
            <p style={{color:'#cfe0da',fontSize:'14px',lineHeight:1.6}}>
              O mesmo conjunto de compras e vendas gera <b>resultados diferentes</b> conforme o critério de avaliação:
              o CMV (Custo das Mercadorias Vendidas) e o estoque final variam entre os métodos. Compare os três na mesma ficha.
            </p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:4}}>
            {Object.entries(METODOS).map(([k,v]) => (
              <span key={k} style={{fontSize:12.5,color:'#a9c2bb'}}>
                <b style={{color:k===metodo?'#f4c95d':'#cfe0da'}}>{k.toUpperCase()}</b> — {v.split('—')[0].trim()}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* formulário de movimentações */}
      <div className="card">
        <div className="card-t-row">
          <h3 className="card-t"><Plus size={17}/> Movimentações</h3>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {movs.length > 0 && (
              <button className="btn-ghost" onClick={limpar}><RotateCcw size={14}/> Limpar</button>
            )}
            <button className="btn-ghost" onClick={carregarPreset}><Sparkles size={14}/> Exemplo clássico</button>
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <div style={{display:'grid',gridTemplateColumns:'96px 1fr 1fr',gap:8}}>
            <select value={form.tipo} onChange={e=>setForm(f=>({...f,tipo:e.target.value}))} className="est-sel">
              <option value="E">Entrada</option>
              <option value="S">Saída</option>
            </select>
            <input type="date" value={form.data} onChange={e=>setForm(f=>({...f,data:e.target.value}))} className="est-inp"/>
            <input placeholder="Histórico" value={form.descricao} onChange={e=>setForm(f=>({...f,descricao:e.target.value}))} className="est-inp"/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:form.tipo==='E'?'1fr 1fr auto':'1fr auto',gap:8}}>
            <input inputMode="decimal" placeholder="Quantidade" value={form.qtd}
              onChange={e=>setForm(f=>({...f,qtd:e.target.value}))} className="est-inp"/>
            {form.tipo === 'E' && (
              <input inputMode="decimal" placeholder="Custo unitário (R$)" value={form.valorUnit}
                onChange={e=>setForm(f=>({...f,valorUnit:e.target.value}))} className="est-inp"/>
            )}
            <button className="btn" onClick={addMov}>Adicionar</button>
          </div>
        </div>

        {movs.length > 0 && (
          <div className="mov-lista">
            {[...movs].sort((a,b)=>a.data.localeCompare(b.data)).map(m => (
              <div key={m.id} className={`mov-item ${m.tipo==='E'?'ent':'sai'}`}>
                <span className={`dc ${m.tipo==='E'?'dc-d':'dc-c'}`} style={{fontSize:11,padding:'3px 8px'}}>
                  {m.tipo==='E'?'ENTRADA':'SAÍDA'}
                </span>
                <span className="mono" style={{fontSize:12,color:'#3a7c6e',whiteSpace:'nowrap'}}>{fmtDt(m.data)}</span>
                <span style={{flex:1,fontSize:13}}>{m.descricao}</span>
                <span className="mono" style={{fontSize:13,whiteSpace:'nowrap'}}>
                  {fmtN(m.qtd)} un{m.tipo==='E'?' · R$ '+fmtN(m.valorUnit):''}
                </span>
                <button className="est-del" onClick={()=>remMov(m.id)}><Trash2 size={13}/></button>
              </div>
            ))}
          </div>
        )}
      </div>

      {movs.length > 0 && (<>
        {/* ficha de estoque */}
        <div className="card">
          <div className="card-t-row" style={{flexWrap:'wrap',gap:10}}>
            <h3 className="card-t"><Layers size={17}/> Ficha de Estoque</h3>
            <div className="met-tabs">
              {Object.keys(METODOS).map(k => (
                <button key={k} className={`met-tab ${metodo===k?'on':''}`} onClick={()=>setMetodo(k)}>
                  {k.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <p style={{fontSize:12.5,color:'var(--soft)',marginBottom:12}}>{METODOS[metodo]}</p>

          <div className="ficha-wrap">
            <table className="ficha">
              <thead>
                <tr>
                  <th rowSpan={2} className="col-data">Data</th>
                  <th rowSpan={2} className="col-hist">Histórico</th>
                  <th colSpan={3} className="th-ent">ENTRADA</th>
                  <th colSpan={3} className="th-sai">SAÍDA</th>
                  <th colSpan={3} className="th-sld">SALDO</th>
                </tr>
                <tr>
                  {['Qtd','V.Unit','Total','Qtd','V.Unit','Total','Qtd','V.Unit','Total']
                    .map((h,i) => (
                      <th key={i} className={`col-num ${i<3?'th-ent':i<6?'th-sai':'th-sld'}`}>{h}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {ficha.map((r,i) => (
                  <tr key={i} className={r.tipo==='E'?'row-e':'row-s'}>
                    <td className="col-data mono">{fmtDt(r.data)}</td>
                    <td className="col-hist">{r.descricao}</td>
                    <td className="col-num mono">{r.entQtd||'—'}</td>
                    <td className="col-num mono">{r.entVU  ? fmtN(r.entVU)  : '—'}</td>
                    <td className="col-num mono">{r.entTotal? fmtN(r.entTotal):'—'}</td>
                    <td className="col-num mono">{r.saiQtd||'—'}</td>
                    <td className="col-num mono">{r.saiVU  ? fmtN(r.saiVU)  : '—'}</td>
                    <td className="col-num mono">{r.saiTotal? fmtN(r.saiTotal):'—'}</td>
                    <td className="col-num mono">{r.sldQtd||'—'}</td>
                    <td className="col-num mono">{r.sldVU  ? fmtN(r.sldVU)  : '—'}</td>
                    <td className="col-num mono">{r.sldTotal? fmtN(r.sldTotal):'—'}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={5} className="col-hist" style={{fontWeight:700}}>CMV Total (saídas)</td>
                  <td className="col-num mono" style={{fontWeight:700,color:'#9a3f23'}}>
                    {fmtN(resumo[metodo].cmv)}
                  </td>
                  <td colSpan={2}/>
                  <td colSpan={2} style={{textAlign:'right',fontWeight:700,fontSize:12.5}}>Estoque final</td>
                  <td className="col-num mono" style={{fontWeight:700,color:'#1a5c3c'}}>
                    {fmtN(resumo[metodo].est)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* comparativo */}
        <div className="card">
          <h3 className="card-t"><Scale size={17}/> Comparativo — Impacto no Resultado</h3>
          <div className="comp-grid">
            {[['peps','PEPS'],['ueps','UEPS'],['cmp','Custo Médio']].map(([k,l]) => (
              <div key={k} className={`comp-card ${metodo===k?'sel':''}`} onClick={()=>setMetodo(k)}>
                <div className="comp-nome">{l}</div>
                <div className="comp-item">
                  <span>CMV</span>
                  <b className="mono">R$ {fmtN(resumo[k].cmv)}</b>
                </div>
                <div className="comp-item">
                  <span>Estoque final</span>
                  <b className="mono">R$ {fmtN(resumo[k].est)}</b>
                </div>
                <div className="comp-item">
                  <span>Qtd. em estoque</span>
                  <b className="mono">{fmtN(resumo[k].qtd)} un</b>
                </div>
                <div className="comp-item total">
                  <span>CMV + Estoque</span>
                  <b className="mono">R$ {fmtN(resumo[k].cmv + resumo[k].est)}</b>
                </div>
              </div>
            ))}
          </div>

          <div className="dica" style={{marginTop:14}}>
            <Lightbulb size={17}/>
            <p>
              <b>Regulação brasileira:</b> o CPC 16 (equivalente ao IAS 2) admite apenas <b>PEPS</b> e
              <b> Custo Médio Ponderado</b> para a escrituração societária. O <b>UEPS</b> foi abolido da
              contabilidade brasileira na adoção das normas internacionais (2008) e está incluído aqui
              <i> exclusivamente para fins didáticos e de comparação</i>. Note também que CMV + Estoque final
              deve sempre igualar o total das entradas (veja a última linha da tabela acima).
            </p>
          </div>
        </div>
      </>)}
    </div>
  );
}

/* ============================ CSS ============================ */
const CSS = `
/* ── Bootstrap-like Theme ───────────────────────────────────────────
   Paleta, tipografia e componentes inspirados no Bootstrap 5.3.
   Sistema de fontes nativo (sem carregamento de web fonts externas).
────────────────────────────────────────────────────────────────────── */

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.edu{
  --bs-blue:#0d6efd; --bs-indigo:#6610f2; --bs-purple:#6f42c1;
  --bs-orange:#fd7e14; --bs-green:#198754; --bs-red:#dc3545;
  --bs-yellow:#ffc107;
  --bs-gray-100:#f8f9fa; --bs-gray-200:#e9ecef; --bs-gray-300:#dee2e6;
  --bs-gray-400:#ced4da; --bs-gray-500:#adb5bd; --bs-gray-600:#6c757d;
  --bs-gray-700:#495057; --bs-gray-800:#343a40; --bs-gray-900:#212529;
  --bs-body-bg:#f8f9fa; --bs-card-bg:#ffffff;
  min-height:100vh;
  background-color:var(--bs-body-bg);
  color:var(--bs-gray-900);
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,
    "Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji",
    "Segoe UI Emoji";
  font-size:1rem;
  line-height:1.5;
}
.mono{font-family:SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono",
  "Courier New",monospace;font-size:.875em;font-variant-numeric:tabular-nums;}

/* ── NAVBAR ──────────────────────────────────────────────────────── */
.edu-head{background-color:var(--bs-gray-900);padding:0 1rem;
  display:flex;flex-direction:column;}
.edu-brand{display:flex;align-items:center;gap:.75rem;padding:.625rem 0;}
.edu-logo{width:36px;height:36px;border-radius:.375rem;background:var(--bs-blue);
  display:grid;place-items:center;color:#fff;}
.edu-brand h1{font-size:1.25rem;font-weight:700;color:#fff;line-height:1.2;letter-spacing:normal;}
.edu-brand h1 span{color:#6ea8fe;}
.edu-brand p{font-size:.75rem;color:var(--bs-gray-500);margin-top:1px;}
.edu-nav{display:flex;overflow-x:auto;}
.edu-tab{display:inline-flex;align-items:center;gap:.375rem;white-space:nowrap;
  background:transparent;border:none;border-bottom:3px solid transparent;
  color:rgba(255,255,255,.55);font-family:inherit;font-size:.875rem;font-weight:500;
  padding:.625rem 1rem;cursor:pointer;transition:color .15s,border-color .15s;}
.edu-tab:hover{color:rgba(255,255,255,.8);}
.edu-tab.on{color:#fff;border-bottom-color:var(--bs-blue);}

/* ── LAYOUT ──────────────────────────────────────────────────────── */
.edu-main{max-width:960px;width:100%;margin:0 auto;padding:1.5rem 1rem;}
.sec{display:flex;flex-direction:column;gap:1rem;
  animation:rise .2s ease both;}
@keyframes rise{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}

/* ── CARD ────────────────────────────────────────────────────────── */
.card{background:var(--bs-card-bg);border:1px solid var(--bs-gray-300);
  border-radius:.5rem;padding:1.25rem;
  box-shadow:0 .125rem .25rem rgba(0,0,0,.075);}
.cards-2{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
.card-t{font-size:1rem;font-weight:600;color:var(--bs-gray-900);
  display:flex;align-items:center;gap:.5rem;margin-bottom:.875rem;}
.card-t-row{display:flex;align-items:center;justify-content:space-between;
  margin-bottom:.875rem;}
.card-t-row .card-t{margin-bottom:0;}
.card p{font-size:.9375rem;color:var(--bs-gray-700);line-height:1.5;}
.lead{margin-bottom:.75rem;}

/* ── HERO (EQUAÇÃO) ──────────────────────────────────────────────── */
.hero-eq{background:var(--bs-gray-900);color:#fff;border:none;}
.hero-eq .kicker{font-size:.6875rem;font-weight:600;text-transform:uppercase;
  letter-spacing:.1em;color:#6ea8fe;}
.hero-eq p{color:var(--bs-gray-400);margin-top:.75rem;font-size:.875rem;}
.eq{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem .875rem;
  margin-top:.75rem;font-size:1.375rem;font-weight:700;}
.eq-a{color:#6ea8fe;}
.eq-p{color:#f1aeb5;}
.eq-pl{color:var(--bs-yellow);}
.eq-op{color:var(--bs-gray-500);}

/* ── SELECTOR DE GRUPO ───────────────────────────────────────────── */
.grupos{display:flex;flex-wrap:wrap;gap:.375rem;margin-bottom:.875rem;}
.grupo{background:var(--bs-gray-100);border:1px solid var(--bs-gray-300);
  border-radius:20px;padding:.25rem .75rem;font-family:inherit;font-size:.8125rem;
  font-weight:500;color:var(--bs-gray-600);cursor:pointer;transition:all .15s;}
.grupo:hover{background:var(--bs-gray-200);}
.grupo.on{background:#fff;font-weight:600;}
.razonete-demo{display:flex;gap:1.125rem;align-items:center;flex-wrap:wrap;}
.rz{background:var(--bs-gray-900);border-radius:.5rem;padding:.75rem .875rem;
  min-width:210px;color:#fff;}
.rz-nome{text-align:center;font-weight:600;padding-bottom:.5rem;
  border-bottom:1px solid rgba(255,255,255,.15);font-size:.9375rem;}
.rz-corpo{display:grid;grid-template-columns:1fr 1fr;}
.rz-lado{padding:.625rem .5rem;text-align:center;opacity:.35;}
.rz-lado:first-child{border-right:1px solid rgba(255,255,255,.15);}
.rz-lado.ativo{opacity:1;}
.rz-lab{display:block;font-size:.6875rem;color:var(--bs-gray-400);
  text-transform:uppercase;letter-spacing:.05em;}
.rz-sinal{display:block;margin-top:.375rem;font-weight:600;
  color:var(--bs-yellow);font-size:.8125rem;}
.rz-sinal.dim{color:#f1aeb5;}
.razao-txt{flex:1;min-width:200px;font-size:.9375rem;}

/* ── DICA / BANNER ───────────────────────────────────────────────── */
.dica{display:flex;gap:.75rem;background:#fff3cd;border:1px solid #ffecb5;
  border-radius:.375rem;padding:.875rem 1rem;color:#664d03;font-size:.875rem;}
.dica svg{flex-shrink:0;margin-top:1px;color:#997404;}
.dica.done{background:#d1e7dd;border-color:#badbcc;color:#0f5132;}
.dica.done svg{color:var(--bs-green);}
.dica b{font-weight:600;}
.dica p{font-size:.875rem;line-height:1.5;margin-top:.25rem;color:inherit;}

/* ── BALANÇA (BOARD) ─────────────────────────────────────────────── */
.board{background:#fff;border:1px solid var(--bs-gray-300);border-radius:.5rem;
  padding:1.25rem;box-shadow:0 .125rem .25rem rgba(0,0,0,.075);}
.board-top{display:flex;justify-content:space-between;align-items:center;
  margin-bottom:.25rem;}
.board-t{font-weight:600;font-size:.9375rem;color:var(--bs-gray-900);}
.board-tag{display:inline-flex;align-items:center;gap:.3125rem;font-size:.75rem;
  font-weight:600;padding:.25rem .625rem;border-radius:20px;}
.board-tag.ok{background:#d1e7dd;color:#0f5132;}
.board-tag.no{background:#f8d7da;color:#842029;}
.balanca{width:100%;height:120px;display:block;}
.pan-l{fill:#fff;font-size:11px;font-weight:600;font-family:inherit;}
.board-vals{display:flex;justify-content:space-around;font-size:.8125rem;
  color:var(--bs-gray-600);margin-top:.25rem;}
.board-vals i{display:inline-block;width:10px;height:10px;border-radius:2px;
  margin-right:.375rem;vertical-align:middle;}
.board-vals b{color:var(--bs-gray-900);font-weight:600;}

/* ── FORMULÁRIO DE LANÇAMENTO ────────────────────────────────────── */
.hist-input{width:100%;border:1px solid var(--bs-gray-400);border-radius:.375rem;
  padding:.375rem .75rem;font-family:inherit;font-size:.875rem;background:#fff;
  color:var(--bs-gray-900);margin-bottom:.875rem;transition:border-color .15s,box-shadow .15s;}
.hist-input:focus{border-color:#86b7fe;outline:0;
  box-shadow:0 0 0 .25rem rgba(13,110,253,.25);}
.split-cols{display:grid;grid-template-columns:1fr 1fr;gap:.875rem;margin-bottom:.75rem;}
.split-col{display:flex;flex-direction:column;gap:.5rem;
  border-radius:.5rem;padding:.875rem;border:1px solid;}
.split-col-d{background:#e7f3ff;border-color:#b6d4fe;}
.split-col-c{background:#fff5f5;border-color:#f1aeb5;}
.split-col-title{font-weight:700;font-size:.6875rem;letter-spacing:.1em;
  text-transform:uppercase;margin-bottom:.125rem;}
.split-col-d .split-col-title{color:#084298;}
.split-col-c .split-col-title{color:#842029;}
.split-row{display:grid;grid-template-columns:1fr 90px auto;gap:.375rem;align-items:center;}
.split-sel{border:1px solid var(--bs-gray-400);border-radius:.375rem;
  padding:.3125rem .625rem;font-family:inherit;font-size:.8125rem;
  background:#fff;color:var(--bs-gray-900);transition:border-color .15s,box-shadow .15s;}
.split-sel:focus{border-color:#86b7fe;outline:0;box-shadow:0 0 0 .25rem rgba(13,110,253,.25);}
.split-val{border:1px solid var(--bs-gray-400);border-radius:.375rem;
  padding:.3125rem .625rem;font-family:inherit;font-size:.8125rem;
  text-align:right;background:#fff;width:100%;
  transition:border-color .15s,box-shadow .15s;}
.split-val:focus{border-color:#86b7fe;outline:0;box-shadow:0 0 0 .25rem rgba(13,110,253,.25);}
.split-rem{background:transparent;border:none;color:var(--bs-gray-500);cursor:pointer;
  padding:.25rem;border-radius:.25rem;display:inline-flex;align-items:center;}
.split-rem:hover{color:var(--bs-red);background:#f8d7da;}
.split-add{background:transparent;border:1px dashed var(--bs-gray-400);
  border-radius:.375rem;padding:.3125rem .625rem;font-family:inherit;
  font-size:.75rem;color:var(--bs-gray-700);cursor:pointer;
  display:inline-flex;align-items:center;gap:.25rem;align-self:flex-start;}
.split-add:hover{background:rgba(0,0,0,.04);}
.split-total{font-size:.8125rem;font-weight:600;padding-top:.25rem;}
.split-col-d .split-total{color:#084298;}
.split-col-c .split-total{color:#842029;}
.lanc-acoes{display:flex;align-items:center;gap:.75rem;margin:.625rem 0 .25rem;}

/* ── BOTÕES ──────────────────────────────────────────────────────── */
.btn{background:var(--bs-blue);color:#fff;border:1px solid var(--bs-blue);
  border-radius:.375rem;padding:.375rem .75rem;font-family:inherit;
  font-size:.875rem;font-weight:400;cursor:pointer;
  display:inline-flex;align-items:center;gap:.375rem;
  transition:color .15s,background-color .15s,border-color .15s;line-height:1.5;}
.btn:hover:not(:disabled){background:#0b5ed7;border-color:#0a58ca;}
.btn:disabled{opacity:.65;cursor:not-allowed;}
.btn-ghost{background:transparent;color:var(--bs-gray-600);
  border:1px solid var(--bs-gray-400);border-radius:.375rem;
  padding:.375rem .75rem;font-family:inherit;font-size:.875rem;cursor:pointer;
  display:inline-flex;align-items:center;gap:.375rem;transition:all .15s;}
.btn-ghost:hover{background:var(--bs-gray-200);color:var(--bs-gray-900);}

/* ── PRESETS ─────────────────────────────────────────────────────── */
.presets{display:flex;flex-wrap:wrap;gap:.375rem;align-items:center;margin-top:.875rem;}
.presets span{font-size:.75rem;color:var(--bs-gray-600);}
.preset{background:var(--bs-gray-100);border:1px solid var(--bs-gray-300);
  border-radius:20px;padding:.25rem .75rem;font-family:inherit;
  font-size:.75rem;color:var(--bs-gray-700);cursor:pointer;transition:background .15s;}
.preset:hover{background:var(--bs-gray-200);}

/* ── FEEDBACK ────────────────────────────────────────────────────── */
.fb{display:flex;gap:.625rem;margin-top:.875rem;padding:.75rem 1rem;
  border-radius:.375rem;font-size:.875rem;line-height:1.5;border:1px solid transparent;}
.fb svg{flex-shrink:0;margin-top:1px;}
.fb.ok{background:#d1e7dd;color:#0f5132;border-color:#badbcc;}
.fb.no{background:#f8d7da;color:#842029;border-color:#f5c2c7;}
.fb.dica2{background:#fff3cd;color:#664d03;border-color:#ffecb5;}

/* ── ALERTAS DE VALIDAÇÃO ────────────────────────────────────────── */
.valid-panel{display:flex;flex-direction:column;gap:.5rem;margin:.625rem 0 .25rem;}
.alerta{display:flex;gap:.625rem;padding:.75rem 1rem;border-radius:.375rem;
  font-size:.875rem;line-height:1.45;align-items:flex-start;border:1px solid transparent;}
.alerta svg{flex-shrink:0;margin-top:1px;}
.alerta-body{display:flex;flex-direction:column;gap:.125rem;}
.alerta-body b{font-size:.875rem;font-weight:600;}
.alerta-body span{opacity:.9;}
.alerta-dica{display:flex;align-items:center;gap:.25rem;
  font-size:.75rem;opacity:.8;margin-top:.125rem;}
.alerta-erro{background:#f8d7da;color:#842029;border-color:#f5c2c7;}
.alerta-aviso{background:#fff3cd;color:#664d03;border-color:#ffecb5;}
.alerta-ok{background:#d1e7dd;color:#0f5132;border-color:#badbcc;
  font-weight:500;align-items:center;}
.alerta-quase{background:#fff3cd;color:#664d03;border-color:#ffecb5;}
.tentativas-badge{font-size:.75rem;color:var(--bs-gray-600);font-weight:600;
  padding:.25rem .625rem;background:var(--bs-gray-200);
  border-radius:20px;border:1px solid var(--bs-gray-300);}

/* ── RAZONETES ───────────────────────────────────────────────────── */
.rz-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:.875rem;}
.rz2{border:1px solid var(--bs-gray-300);border-radius:.5rem;overflow:hidden;}
.rz2-nome{background:var(--bs-gray-800);color:#fff;padding:.5rem .75rem;
  font-weight:600;font-size:.875rem;display:flex;justify-content:space-between;align-items:center;}
.rz2-nome span{font-size:.6875rem;color:var(--bs-gray-400);font-weight:400;}
.rz2-t{display:grid;grid-template-columns:1fr 1fr;min-height:55px;}
.rz2-col{display:flex;flex-direction:column;gap:2px;padding:.625rem;
  font-size:.8125rem;text-align:right;}
.rz2-col:first-child{border-right:1px solid var(--bs-gray-200);color:#084298;}
.rz2-c{color:#842029;}
.rz2-saldo{padding:.5rem .75rem;font-size:.8125rem;border-top:1px solid var(--bs-gray-200);}
.rz2-saldo.d{color:#084298;background:#e7f3ff;}
.rz2-saldo.c{color:#842029;background:#fff5f5;}

/* ── MINI-DIÁRIO ─────────────────────────────────────────────────── */
.mini-diario{display:flex;flex-direction:column;gap:.625rem;}
.md-item{border:1px solid var(--bs-gray-300);border-radius:.5rem;overflow:hidden;}
.md-head{display:flex;align-items:center;gap:.625rem;
  background:var(--bs-gray-100);padding:.5625rem .875rem;
  border-bottom:1px solid var(--bs-gray-200);}
.md-tipo{font-size:.6875rem;font-weight:700;border:1px solid;
  border-radius:.25rem;padding:.1875rem .5rem;letter-spacing:.03em;text-transform:uppercase;}
.md-hist{flex:1;font-size:.875rem;font-weight:500;color:var(--bs-gray-900);}
.md-partidas{padding:.375rem .875rem .625rem;display:flex;flex-direction:column;gap:.25rem;}
.md-p{display:flex;align-items:center;gap:.625rem;font-size:.8125rem;color:var(--bs-gray-700);}
.md-p-D .dc{background:#cfe2ff;color:#084298;}
.md-p-C .dc{background:#f8d7da;color:#842029;}
.md-p span:last-child{margin-left:auto;font-weight:500;color:var(--bs-gray-900);}

/* ── DC BADGES ───────────────────────────────────────────────────── */
.dc{font-size:.6875rem;font-weight:700;text-align:center;
  padding:.25rem .5rem;border-radius:.25rem;}
.dc-d{background:#cfe2ff;color:#084298;}
.dc-c{background:#f8d7da;color:#842029;}

/* ── PROGRESSO ───────────────────────────────────────────────────── */
.prog{display:flex;align-items:center;gap:.75rem;}
.prog-bar{flex:1;height:8px;background:var(--bs-gray-200);border-radius:4px;overflow:hidden;}
.prog-bar div{height:100%;background:var(--bs-blue);border-radius:4px;transition:width .4s;}
.prog span{font-size:.8125rem;color:var(--bs-gray-600);font-weight:500;white-space:nowrap;}

/* ── EXERCÍCIOS ──────────────────────────────────────────────────── */
.ex-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem;}
.ex-num{font-weight:600;font-size:.9375rem;color:var(--bs-gray-600);}
.ex-done{display:inline-flex;align-items:center;gap:.3125rem;font-size:.75rem;
  font-weight:600;color:var(--bs-green);background:#d1e7dd;
  padding:.1875rem .625rem;border-radius:20px;}
.ex-enun{font-size:1rem !important;color:var(--bs-gray-900) !important;font-weight:500;}
.ex-valor{margin-top:.25rem;font-size:.875rem !important;color:var(--bs-gray-600) !important;}
.ex-form{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin:1rem 0;}
.ex-form label{display:flex;flex-direction:column;gap:.375rem;}
.ex-form select{border:1px solid var(--bs-gray-400);border-radius:.375rem;
  padding:.375rem .75rem;font-family:inherit;font-size:.875rem;background:#fff;}
.ex-form select:focus{border-color:#86b7fe;outline:0;
  box-shadow:0 0 0 .25rem rgba(13,110,253,.25);}
.ex-acoes{display:flex;gap:.5rem;align-items:center;}
.ex-nav{display:flex;align-items:center;justify-content:space-between;
  margin-top:1rem;gap:.5rem;}
.nav-b{background:transparent;border:none;font-family:inherit;font-size:.875rem;
  font-weight:500;color:var(--bs-blue);cursor:pointer;padding:0;}
.nav-b:disabled{opacity:.4;cursor:not-allowed;}
.ex-dots{display:flex;gap:.4375rem;}
.dot{width:10px;height:10px;border-radius:50%;border:2px solid var(--bs-gray-300);
  background:#fff;cursor:pointer;padding:0;}
.dot.ok{background:var(--bs-blue);border-color:var(--bs-blue);}
.dot.cur{border-color:var(--bs-blue);transform:scale(1.25);}

/* ── CONTROLE DE ESTOQUE ─────────────────────────────────────────── */
.est-sel,.est-inp{border:1px solid var(--bs-gray-400);border-radius:.375rem;
  padding:.375rem .75rem;font-family:inherit;font-size:.875rem;
  background:#fff;color:var(--bs-gray-900);}
.est-sel:focus,.est-inp:focus{border-color:#86b7fe;outline:0;
  box-shadow:0 0 0 .25rem rgba(13,110,253,.25);}
.est-del{background:transparent;border:none;color:var(--bs-gray-500);
  cursor:pointer;padding:.25rem;border-radius:.25rem;display:inline-flex;}
.est-del:hover{color:var(--bs-red);background:#f8d7da;}
.mov-lista{display:flex;flex-direction:column;gap:.375rem;margin-top:.875rem;}
.mov-item{display:flex;align-items:center;gap:.625rem;padding:.5rem .75rem;
  border-radius:.375rem;font-size:.8125rem;border:1px solid;}
.mov-item.ent{background:#e7f3ff;border-color:#b6d4fe;}
.mov-item.sai{background:#fff5f5;border-color:#f1aeb5;}
.met-tabs{display:flex;gap:.25rem;}
.met-tab{border:1px solid var(--bs-gray-300);border-radius:.375rem;
  padding:.3125rem .875rem;font-family:inherit;font-size:.8125rem;font-weight:600;
  background:#fff;color:var(--bs-gray-600);cursor:pointer;transition:all .15s;}
.met-tab.on{background:var(--bs-blue);color:#fff;border-color:var(--bs-blue);}
.ficha-wrap{overflow-x:auto;border:1px solid var(--bs-gray-300);border-radius:.5rem;}
.ficha{width:100%;border-collapse:collapse;min-width:680px;font-size:.8125rem;}
.ficha th{padding:.5rem .625rem;font-size:.6875rem;text-transform:uppercase;
  letter-spacing:.04em;font-weight:700;}
.ficha td{padding:.4375rem .625rem;border-bottom:1px solid var(--bs-gray-200);}
.ficha td.col-data,.ficha td.col-hist{text-align:left;}
.ficha td.col-num{text-align:right;white-space:nowrap;}
.col-data{min-width:80px;}
.col-hist{text-align:left;min-width:130px;}
.th-ent{background:#cfe2ff;color:#084298;text-align:center;}
.th-sai{background:#f8d7da;color:#842029;text-align:center;}
.th-sld{background:#d1e7dd;color:#0f5132;text-align:center;}
.row-e{background:#f8fbff;}
.row-s{background:#fffafa;}
.ficha tbody tr:hover{background:var(--bs-gray-100);}
.ficha tfoot td{background:var(--bs-gray-800);color:#fff;font-size:.8125rem;
  border-top:2px solid var(--bs-gray-400);}
.comp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.875rem;margin-top:.5rem;}
.comp-card{border:2px solid var(--bs-gray-300);border-radius:.5rem;
  padding:1rem;cursor:pointer;transition:all .15s;}
.comp-card:hover{border-color:var(--bs-gray-400);background:var(--bs-gray-100);}
.comp-card.sel{border-color:var(--bs-blue);background:#e7f3ff;}
.comp-nome{font-weight:700;font-size:1.0625rem;color:var(--bs-gray-900);margin-bottom:.75rem;}
.comp-item{display:flex;justify-content:space-between;align-items:center;
  padding:.375rem 0;border-bottom:1px dashed var(--bs-gray-200);font-size:.8125rem;}
.comp-item:last-child{border:none;padding-top:.625rem;}
.comp-item span{color:var(--bs-gray-600);}
.comp-item.total span,.comp-item.total b{font-weight:700;color:var(--bs-gray-900);font-size:.875rem;}

/* ── RESPONSIVE ──────────────────────────────────────────────────── */
@media(max-width:620px){
  .cards-2{grid-template-columns:1fr;}
  .ex-form{grid-template-columns:1fr;}
  .split-cols{grid-template-columns:1fr;}
  .split-row{grid-template-columns:1fr 80px auto;}
  .comp-grid{grid-template-columns:1fr;}
  .met-tabs{flex-wrap:wrap;}
}

`;
