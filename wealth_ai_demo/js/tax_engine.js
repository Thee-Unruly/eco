/**
 * Configurable African Tax Engine & Localization Module
 * Answers: Q14 (Francophone configuration, live local tax engine, market status) & Q4 (French localization)
 */

const TAX_RULES_CONFIG = {
  jurisdictions: {
    GH: {
      name: "Ghana (GRA - Ghana Revenue Authority)",
      currency: "GHS",
      status: "Live in Production",
      rules: [
        {
          asset_type: "Fixed Income (Sovereign T-Bills & Government Bonds)",
          rate_percent: 0.0,
          citation: "Income Tax Act 2015 (Act 896) - Sovereign Debt Interest Tax Exemption",
          is_withholding: true
        },
        {
          asset_type: "Mutual Funds & Collective Investment Schemes (EDC)",
          rate_percent: 0.0,
          citation: "Securities Industry Act 2016 (Act 929) - Resident CIS Distribution Exemption",
          is_withholding: false
        },
        {
          asset_type: "Corporate Debt & Commercial Paper",
          rate_percent: 8.0,
          citation: "Withholding Tax on Corporate Debt Securities (Non-resident 15%)",
          is_withholding: true
        },
        {
          asset_type: "Listed Equity Dividends (GSE)",
          rate_percent: 8.0,
          citation: "Final Withholding Tax on GSE Listed Securities Dividends",
          is_withholding: true
        }
      ]
    },
    CI_WAEMU: {
      name: "Côte d'Ivoire & WAEMU/UEMOA (Direction Générale des Impôts)",
      currency: "XOF",
      status: "Live in Production",
      rules: [
        {
          asset_type: "Obligations d'État UEMOA (Sovereign Bonds >= 5 years)",
          rate_percent: 0.0,
          citation: "Directive UEMOA No. 02/2010/CM/UEMOA - Exonération Totale d'IRVM sur Emprunts d'État",
          is_withholding: true
        },
        {
          asset_type: "Obligations d'Entreprises Privées (Corporate Bonds >= 5 yrs)",
          rate_percent: 2.0,
          citation: "Code Général des Impôts CI Art. 165 - Taux Réduit IRVM 2%",
          is_withholding: true
        },
        {
          asset_type: "Actions cotées BRVM & Dividendes (Listed BRVM Equities)",
          rate_percent: 7.0,
          citation: "IRVM Taux BRVM Harmonisé UEMOA",
          is_withholding: true
        },
        {
          asset_type: "Comptes à Terme / Dépôts Rémunérés (Short-term Fixed Deposits)",
          rate_percent: 10.0,
          citation: "Impôt sur le Revenu des Créances (IRC) 10%",
          is_withholding: true
        }
      ]
    },
    NG: {
      name: "Nigeria (FIRS - Federal Inland Revenue Service)",
      currency: "NGN",
      status: "Configured / Staging Sandbox",
      rules: [
        {
          asset_type: "FGN Sovereign Bonds & Treasury Bills",
          rate_percent: 0.0,
          citation: "Companies Income Tax Exemption Order (FGN Bonds)",
          is_withholding: false
        },
        {
          asset_type: "Equities & Dividend Withholding",
          rate_percent: 10.0,
          citation: "Finance Act WHT on Equities Distributions",
          is_withholding: true
        }
      ]
    }
  }
};

class AfricanTaxEngine {
  constructor() {
    this.config = TAX_RULES_CONFIG;
  }

  calculateNetYield(grossReturnPercent, assetType, countryCode = "GH") {
    const jurisdiction = this.config.jurisdictions[countryCode] || this.config.jurisdictions["GH"];
    const matchedRule = jurisdiction.rules.find(r => r.asset_type.toLowerCase().includes(assetType.toLowerCase())) 
      || { rate_percent: 0.0, citation: "Standard Base Rate" };

    const taxDeductionPercent = (grossReturnPercent * matchedRule.rate_percent) / 100;
    const netReturnPercent = grossReturnPercent - taxDeductionPercent;

    return {
      country: jurisdiction.name,
      currency: jurisdiction.currency,
      status: jurisdiction.status,
      assetType: assetType,
      grossYield: grossReturnPercent,
      taxRate: matchedRule.rate_percent,
      taxWithheldPercent: parseFloat(taxDeductionPercent.toFixed(2)),
      netYield: parseFloat(netReturnPercent.toFixed(2)),
      legalCitation: matchedRule.citation
    };
  }

  getJurisdictionRules(countryCode) {
    return this.config.jurisdictions[countryCode] || this.config.jurisdictions["GH"];
  }

  updateTaxRule(countryCode, ruleIndex, newRate) {
    if (this.config.jurisdictions[countryCode] && this.config.jurisdictions[countryCode].rules[ruleIndex]) {
      this.config.jurisdictions[countryCode].rules[ruleIndex].rate_percent = parseFloat(newRate);
      return true;
    }
    return false;
  }
}

// Bilingual Dictionary for Live French/English Toggle (Q4 & Q14)
const I18N_DICTIONARY = {
  en: {
    app_title: "Ecobank WealthAI Studio",
    subtitle: "Enterprise Wealth Management Platform & AI Inference Center",
    nav_client360: "Client 360 & Cadence",
    nav_recommendations: "AI Recommendation & XAI",
    nav_simulations: "Goal Simulation & Fan Chart",
    nav_robo: "Robo-Advisory & Guardrails",
    nav_dataset: "African Market AI Evidence",
    nav_tax: "Francophone Tax Engine",
    nav_audit: "Cryptographic Audit Vault",
    nav_presenter: "Presenter HUD & Q-Guide",
    status_refreshed: "Data Refreshed",
    btn_trigger_rec: "Run AI Recommendation Engine",
    btn_verify_audit: "Verify Cryptographic Audit Chain",
    guardrails_active: "REGULATORY GUARDRAILS: ENFORCED",
    guardrails_inactive: "GUARDRAILS: SIMULATION OVERRIDE",
    hard_block_title: "REGULATORY HARD BLOCK TRIGGERED",
    model_provenance: "Trained on 24,500 Sub-Saharan Transactions"
  },
  fr: {
    app_title: "Studio IA de Gestion de Fortune Ecobank",
    subtitle: "Plateforme d'Entreprise de Banque Privée et Moteur d'Inférence IA",
    nav_client360: "Vue Client 360° et Cadence",
    nav_recommendations: "Recommandations IA & XAI",
    nav_simulations: "Simulation d'Objectifs & Éventail",
    nav_robo: "Robo-Advisory & Garde-Fous Réglementaires",
    nav_dataset: "Preuve IA & Données Africaines",
    nav_tax: "Moteur Fiscal Francophone (UEMOA)",
    nav_audit: "Registre d'Audit Cryptographique",
    nav_presenter: "HUD Présentateur & Guide Questions",
    status_refreshed: "Données Actualisées",
    btn_trigger_rec: "Exécuter le Moteur de Recommandation IA",
    btn_verify_audit: "Vérifier la Chaîne d'Audit Cryptographique",
    guardrails_active: "GARDE-FOUS RÉGLEMENTAIRES : ACTIFS (CREPMF/UEMOA)",
    guardrails_inactive: "GARDE-FOUS : DÉSACTIVÉS (MODE SIMULATION)",
    hard_block_title: "BLOCAGE RÉGLEMENTAIRE STRICT DÉCLENCHÉ",
    model_provenance: "Entraîné sur 24 500 Transactions Subsahariennes"
  }
};

if (typeof module !== 'undefined') {
  module.exports = { AfricanTaxEngine, I18N_DICTIONARY, TAX_RULES_CONFIG };
}
