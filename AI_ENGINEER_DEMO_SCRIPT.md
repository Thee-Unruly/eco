# Ecobank Wealth Management RFP: 2nd Demo
## AI Engineer Master Presentation Guide & Defense Playbook

> **Session Time**: 10:00 AM – 12:00 PM (Ghana Time)  
> **Audience**: Ecobank Group (Information Security, EDC Asset Management, Group HV & Wealth Management, CCB EXCO, Technology, eProcess Ghana)  
> **Your Core Window**: 10:25 AM – 11:00 AM (Section 2: Business & AI Capabilities) + Section 4 (Security Gating)

---

## 1. Executive Summary & Evaluator Mindset

In Round 1, evaluators penalized vague capability statements and theoretical AI claims. In Round 2, they are evaluating you against the **Evaluation Question Guide** with four strict criteria: `Poor | Marginal | Acceptable | Exceptional`.

### How to Win "Exceptional":
1. **Never claim a black-box model.** Always show deterministic rules + SHAP feature attributions.
2. **Never claim generic Western AI.** Prove training on the **African Wealth Dataset (ESSW-2026)** with specific African banking dynamics (MoMo float, sovereign T-Bill yield chasing, dual-currency buffering).
3. **Show, don't tell.** Manipulate sliders live, trigger the regulatory hard block in real time, and immediately open the cryptographic audit log entry that was written.
4. **Be impeccably honest about market status (Q11).** Confessing that Ghana is in SEC Sandbox pilot while Côte d'Ivoire is in sandbox staging earns high credibility; claiming full pan-African production triggers the trap question.

---

## 2. Minute-by-Minute Live Demo Walkthrough

```
10:25 AM ── [Q8]  Client 360° Profile & Live Flexcube CDC Cadence
10:30 AM ── [Q9]  Live RM Recommendation Engine + SHAP Waterfall + Audit Log
10:37 AM ── [Q10/Q13] Live Goal Planning & 60fps Monte Carlo Fan Chart
10:44 AM ── [Q11] Autonomous Robo-Advisory + Toggleable Regulatory Guardrail Hard Block
10:50 AM ── [Q12] African Wealth Dataset (ESSW-2026) & ROC-AUC Validation Proof
10:55 AM ── [Q14] Francophone WAEMU / UEMOA Localization & Configurable Tax Engine
11:00 AM ── [Q21-Q23] Security Vault & 142ms Regulator Evidence SLA Defense
```

---

### Step 1: Q8 — Client 360° View & Refresh Cadence (10:25 AM)
- **Tab**: `Client 360° & Cadence`
- **Action**: Select **Kwame Mensah (Ghana)**.
- **Talking Script**:
  > *"Notice Kwame Mensah's profile. He holds GHS 485,000 in low-yielding CASA, but our behavioral ingestion flags a GHS 350,000 91-day Bank of Ghana Treasury Bill maturing next week.*
  > *Look at the top-right corner: our refresh cadence is event-driven via Kafka Change Data Capture (CDC) directly from Oracle Flexcube v14.7. Balances update in real time without batch polling."*
- **Probe Defense**: *Where does the data come from?*
  - Answer: *"Balances flow via Flexcube Core Banking REST/CDC hooks. External holdings flow via Bank of Ghana Central Securities Depository (CSD) feeds and EDC Asset Management integration."*

---

### Step 2: Q9 — Live RM Recommendation + Explainability (10:30 AM)
- **Tab**: `AI Recommendation & XAI`
- **Action**: Click **"⚡ Run AI Recommendation Engine"**.
- **Talking Script**:
  > *"We do not deploy black-box deep learning for wealth recommendations, because banking compliance requires absolute auditability. Instead, we run a hybrid engine: deterministic eligibility rulepacks combined with a LightGBM propensity model.*
  > *Here, rule `RULE-GH-EDC-014 (v2.4)` evaluates Kwame: CASA balance exceeds GHS 100k, zero existing EDC funds, and an impending T-Bill maturity. Notice the 91% ML propensity match for **EDC Fixed Income Trust**.*
  > *Look at the SHAP feature attribution waterfall: +22.4% is driven by T-bill reinvestment demand, +16.8% by uninvested cash drag, and -3.2% by his moderate risk score.*
  > *Notice that every single recommendation automatically writes an immutable event with a SHA-256 hash to our audit ledger."*

---

### Step 3: Q10 & Q13 — Goal Planning & Monte Carlo Simulation (10:37 AM)
- **Tab**: `Goal Simulation & Fan Chart`
- **Action**:
  1. Click preset **"Ghana Retirement"**.
  2. Drag the **Expected Annual Return slider from 14.5% to 18.0%** in front of the evaluators.
  3. Show the chart redraw smoothly at 60fps.
- **Talking Script**:
  > *"For goal simulations, we built a zero-latency deterministic projection engine. Watch the canvas as I drag the return slider from 14.5% to 18% — the calculation and redraw occur in under 16 milliseconds.*
  > *Addressing Round 1 feedback regarding scenario depth: we model three distinct dimensions: Invested Capital (dashed line), Real Inflation-Adjusted Purchasing Power (amber line), and an expanded 500-iteration Monte Carlo fan chart showing the P10 Conservative Floor against the P90 Optimistic Ceiling."*

---

### Step 4: Q11 — Robo-Advisory with Regulatory Guardrails (10:44 AM)
- **Tab**: `Robo-Advisory & Guardrails`
- **Action**:
  1. Ensure **REGULATORY GUARDRAILS: ENFORCED** is active.
  2. Select strategy: **"Ecobank African Frontier Alpha (High-Beta Equities)"**.
  3. Click **"🛡️ Run Robo-Suitability Compliance Gate"**.
  4. Observe the **RED HARD BLOCK BANNER**.
- **Talking Script**:
  > *"Robo-advisory in Africa cannot operate unconstrained. Our system enforces statutory investor protection under SEC Ghana Regulation 34 and WAEMU CREPMF guidelines.*
  > *When we attempt to allocate Kwame Mensah (Risk Score 54/100) to our Frontier Alpha strategy (Portfolio Risk Index 78/100), the system triggers an immediate HARD BLOCK. Execution is halted, and a mandatory dual-key compliance waiver is logged in the audit ledger.*
  > *Regarding live markets: In Ghana, this runs in controlled pilot with EDC Stockbrokers under the SEC Regulatory Sandbox. In Côte d'Ivoire, the model is audited and staged for CREPMF approval. We do not claim unmonitored robo-execution because African regulators require RM oversight."*

---

### Step 5: Q12 — AI Personalization on African Market Data + Proof (10:50 AM)
- **Tab**: `African Market AI Evidence`
- **Action**:
  1. Review the **Sub-Saharan Wealth Dataset (ESSW-2026)** schema.
  2. Show the **ROC Curve (0.892 vs 0.614)**.
  3. Click **"📄 View Official AI Model Card & Validation Report"**.
- **Talking Script**:
  > *"Round 1 specifically challenged us to prove our AI was trained on African market data rather than Western retail models. Western models assume bi-weekly W2 paychecks and 401(k) structures. They fail in Africa.*
  > *Our models are trained on 24,500 longitudinal Sub-Saharan profiles across Ghana, Côte d'Ivoire, Nigeria, and Kenya.*
  > *We capture distinct African wealth variables: Mobile Money (MoMo) commercial float velocity, sovereign T-Bill auction yield-chasing cycles, dual-currency USD/XOF hedging ratios, and unstructured business income.*
  > *As shown in our empirical validation table, our African-tuned LightGBM achieves an ROC-AUC of 0.892 with a Population Stability Index of 0.041. In contrast, an off-the-shelf Western model degrades to 0.614 ROC-AUC due to seasonal cashflow disintermediation."*

---

### Step 6: Q14 — Francophone Localization & Live Tax Engine (10:55 AM)
- **Tab**: `Francophone Tax Engine`
- **Action**:
  1. Click top **"FR 🇫🇷"** toggle to display French interface.
  2. Select **"Côte d'Ivoire / WAEMU"** and asset **"Obligations d'Entreprises Privées"**.
  3. Click **"Calculate Statutory Net Return"** (showing IRVM 2% deduction).
  4. Click **"Edit Rate"** in the rules table to show dynamic JSON configuration.
- **Talking Script**:
  > *"Pour nos filiales francophones en Côte d'Ivoire et dans la zone UEMOA, la plateforme s'adapte instantanément en français.*
  > *Our tax engine is completely decoupled as configurable data rules. Under WAEMU Directive 02/2010, regional sovereign bonds enjoy 0% IRVM tax exemption, whereas private corporate bonds incur a 2% reduced rate, and listed BRVM equities 7%.*
  > *Because these rules are stored in JSON configuration, onboarding a new CEMAC or WAEMU affiliate requires zero core application recompilation."*

---

### Step 7: Q21-Q23 — Security Architecture & 142ms SLA (11:00 AM)
- **Tab**: `Cryptographic Audit Vault`
- **Action**:
  1. Click **"✓ Verify Cryptographic Chain Integrity"** (shows green verified).
  2. Click **"🚨 Simulate Tamper Attack"** (shows red security alarm).
  3. Click **"📥 Export Regulator Dossier (SLA Test)"** (downloads package in 142ms).
- **Talking Script**:
  > *"Addressing Section 4 security requirements: all AI recommendations, suitability checks, and portfolio allocations are written into an append-only, SHA-256 hash-chained cryptographic vault.*
  > *When I run chain verification, the system mathematically validates every block. If a rogue actor tampers with even one byte in historical records, the hash chain breaks instantly, triggering a SOC alert.*
  > *Finally, regarding the regulatory SLA probe: our automated compliance pipeline exports a complete, cryptographically signed audit dossier in 142 milliseconds — easily beating the committed 2-hour SLA."*

---

## 3. Quick Reference: Evaluator Probe Defense Table

| Question | Likely Evaluator Trap / Probe | Your Winning Counter-Argument |
| :--- | :--- | :--- |
| **Q8** | *"Is data really real-time or just batch overnight?"* | "Real-time via Kafka CDC on Oracle Flexcube 14.7 accounting events + CSD/EDC broker webhooks. You can see the live pulse indicator updating every 2-4 seconds." |
| **Q9** | *"Is this a black box AI that our compliance officers cannot defend to the central bank?"* | "Zero black-box logic. We use deterministic rulepacks audited with TreeSHAP feature attributions, backed by an immutable SHA-256 audit trail." |
| **Q10** | *"Can your simulation handle high inflation and currency depreciation in Africa?"* | "Yes. Our sliders specifically model real purchasing power discounted by local inflation (up to 18%) and include 500-iteration Monte Carlo stochastic volatility bands." |
| **Q11** | *"Is your robo-adviser live in all 33 Ecobank countries?"* | "No, and any vendor claiming that is not being honest with you. In Ghana, it operates in controlled pilot with EDC Stockbrokers under the SEC Sandbox. In Côte d'Ivoire, it is staged for CREPMF. We enforce mandatory RM oversight." |
| **Q12** | *"Prove you didn't just wrap an open-source American model."* | "Open-source American models fail on African cashflow volatility. Our model features MoMo liquidity velocity, T-Bill auction cycles, and dual-currency hedging, achieving 0.892 ROC-AUC." |
| **Q14** | *"How hard is it to add a new Francophone market with different tax laws?"* | "Under 48 hours. Tax rules are stored as externalized JSON configuration schemas. We update the tax table without touching the core code." |
| **Q23** | *"How long does it take to produce evidence for the Bank of Ghana or BCEAO?"* | "Our cryptographic vault compiles and signs the regulatory dossier in under 200 milliseconds, exceeding the 2-hour emergency SLA." |
