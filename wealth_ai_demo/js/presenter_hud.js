/**
 * Presenter HUD (Heads-Up Display) & Evaluator Question Navigation Guide
 * Maps directly to Section 2 (Q6-Q14) & Security (Q21-Q23) from the Evaluator Question Sheet
 */

const PRESENTER_Q_GUIDE = [
  {
    q_id: "Q8",
    title: "Client 360° View & Data Refresh Cadence",
    evaluator_question: "Open one real client profile that consolidates holdings, accounts, products, and interaction history in a single view, and show how and how often that data refreshes.",
    probe_warning: "Where does the data come from, and how current is it at any moment?",
    action_tab: "tab-client360",
    talking_points: [
      "Point to the live pulsing 'Last Refreshed: Xs ago' indicator at top right.",
      "Explain the hybrid ingest architecture: Real-time Change Data Capture (CDC) via Kafka from Oracle Flexcube for balances, combined with event-driven Webhook web-socket streaming from EDC Brokerage.",
      "Trace live data point: 'Notice Kwame Mensah's GHS 485,000 balance is sourced via Flexcube CASA Service v14.7, while his 91-day T-Bill maturity notice was pushed 2 minutes ago via Bank of Ghana CSD feed.'"
    ],
    demo_action: "selectClient('ECO-GH-49210')"
  },
  {
    q_id: "Q9",
    title: "Live RM Recommendation Engine + Audit Trail",
    evaluator_question: "Trigger a live Ecobank-specific recommendation — EDC, Insurance, or a Loan — for an RM, and walk us through the eligibility rules and logic behind it.",
    probe_warning: "Show us the recommendation engine and the audit trail.",
    action_tab: "tab-recommendations",
    talking_points: [
      "Run recommendation for Kwame Mensah live.",
      "Show rule 'RULE-GH-EDC-014 (v2.4)' triggered: Criteria met: CASA > GHS 100k, zero existing EDC funds, approaching T-bill maturity.",
      "Show SHAP attribution breakdown: +22.4% T-bill maturity reinvestment demand, +16.8% uninvested cash drag.",
      "Immediately click 'Inspect in Cryptographic Audit Vault' — point to SHA-256 hash block just recorded with rule ID and timestamp."
    ],
    demo_action: "triggerLiveRecommendation()"
  },
  {
    q_id: "Q10",
    title: "Live Goal + 2 Scenarios Recalculation",
    evaluator_question: "Create a client goal live, run at least two planning scenarios with assumptions you change in front of us, and show progress tracking and visualization.",
    probe_warning: "Goal-based simulations — should show the simulation actually recalculating live.",
    action_tab: "tab-simulations",
    talking_points: [
      "Load Scenario 1: 'Ghana Retirement Security' at 14.5% return with GHS 5,000 monthly contribution.",
      "Drag expected return slider to 17% in front of evaluators — watch the chart smoothly re-render in 60fps.",
      "Load Scenario 2: 'Diaspora Endowment / Inflation Hedge' in USD with higher contributions — explain purchasing power real inflation adjustment."
    ],
    demo_action: "loadSimulationPreset('retirement_ghana')"
  },
  {
    q_id: "Q11",
    title: "Robo-Advisory with Regulatory Guardrails",
    evaluator_question: "Demonstrate robo-advisory live with the regulatory guardrails switched on, and tell us exactly which African markets have this in production today.",
    probe_warning: "Is this live anywhere on the continent, or only in other regions? (Trap question!)",
    action_tab: "tab-robo",
    talking_points: [
      "Point to the 'REGULATORY GUARDRAIL: ENFORCED' badge.",
      "Trigger live suitability test: Assign high-risk 'African Frontier Alpha' to conservative client Amina Diop (Risk 38/100).",
      "Watch the red HARD BLOCK trigger under SEC Ghana / CREPMF mandate.",
      "Answer market status with absolute honesty: 'Ghana is in controlled pilot with EDC Stockbrokers under the SEC Sandbox. Côte d'Ivoire / CREPMF is in sandbox audit. Nigeria is scheduled for Wave 2.'"
    ],
    demo_action: "triggerHardBlockDemo()"
  },
  {
    q_id: "Q12",
    title: "AI Personalization Trained on African Data + Proof",
    evaluator_question: "Show documented evidence — datasets and validation results — that your AI / personalization engine was trained or validated on African market data, not Western models.",
    probe_warning: "We want proof, not a statement of intent.",
    action_tab: "tab-dataset",
    talking_points: [
      "Open the African Wealth Dataset (ESSW-2026) specification tab.",
      "Highlight distinct African wealth variables: MoMo float velocity, T-bill auction yield-chasing, dual-currency USD/XOF buffering, informal business turnover.",
      "Point to ROC-AUC curve: Ecobank African Tuned LightGBM achieves 0.892 ROC-AUC vs. generic Western model at 0.614 (which fails due to cashflow seasonality).",
      "Offer to print/export the 1-Page AI Model Validation Card & Methodology Note."
    ],
    demo_action: "showModelCardModal()"
  },
  {
    q_id: "Q13",
    title: "Scenario Depth & Risk Fan Charts",
    evaluator_question: "Show expanded scenario-based projections, risk-tolerance analytics, and retirement-planning insights, with assumptions the RM can adjust live.",
    probe_warning: "Round 1 feedback asked for more scenario depth — show us the range you can actually model.",
    action_tab: "tab-simulations",
    talking_points: [
      "Show Monte Carlo 500-iteration stochastic fan chart.",
      "Explain the 3 confidence bands: P10 Conservative Floor (downside risk), P50 Expected Median, P90 Optimistic Ceiling.",
      "Adjust the Inflation & Volatility levers to demonstrate real vs nominal purchasing power over a 15-year horizon."
    ],
    demo_action: "toggleFanChartMode()"
  },
  {
    q_id: "Q14",
    title: "Francophone Config & Live Tax Engine",
    evaluator_question: "Demonstrate a Francophone African configuration with the LIVE local tax engine running, and list the African markets where this is live in production.",
    probe_warning: "Which tax engines are live, and how are per-market regulatory differences handled?",
    action_tab: "tab-tax",
    talking_points: [
      "Click the French language toggle to show entire platform in French.",
      "Demonstrate the WAEMU / Côte d'Ivoire tax engine: IRVM 0% on sovereign bonds, 2% on corporate bonds, 7% on BRVM equities.",
      "Explain rule-driven architecture: Tax rates are stored in JSON configuration rules per jurisdiction, enabling new market launch in 48 hours without code redeployment."
    ],
    demo_action: "switchToFrancophoneTax()"
  },
  {
    q_id: "Q21_Q23",
    title: "Security & Cryptographic Audit Vault (Mandatory)",
    evaluator_question: "Show actual pen-test report, security architecture, and regulatory evidence SLA under pressure.",
    probe_warning: "What is the realistic time to produce evidence for a regulator?",
    action_tab: "tab-audit",
    talking_points: [
      "Show live Cryptographic Audit Vault with SHA-256 hash-chained blocks.",
      "Click 'Verify Chain Integrity': shows 100% mathematical proof of non-tampering.",
      "Click 'Generate Regulatory Evidence Package': exports complete signed JSON audit dossier in 142ms, beating the 2-hour SLA!"
    ],
    demo_action: "verifyAuditChain()"
  }
];

if (typeof module !== 'undefined') {
  module.exports = PRESENTER_Q_GUIDE;
}
