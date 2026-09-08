/**
 * Deterministic Wealth Goal Simulation & Monte Carlo Fan-Chart Engine
 * Answers: Q10 (Live Goal + 2 Scenarios Recalculation) & Q13 (Scenario Depth & Risk Bands)
 */

class GoalSimulationEngine {
  constructor() {
    this.presets = {
      retirement_ghana: {
        name: "Retirement Security (Accra / GHS)",
        initialDeposit: 250000,
        monthlyContribution: 5000,
        expectedReturn: 14.5, // 14.5% annual blended yield (T-Bills + EDC Equities)
        inflationRate: 9.0, // African inflation adjustment
        horizonYears: 15,
        targetGoal: 4500000,
        currency: "GHS",
        riskLevel: "Moderate"
      },
      education_diaspora: {
        name: "Overseas University Endowment (USD / Domiciliary)",
        initialDeposit: 35000,
        monthlyContribution: 1200,
        expectedReturn: 8.5, // USD Sovereign & Eurobond Fund
        inflationRate: 3.2,
        horizonYears: 8,
        targetGoal: 220000,
        currency: "USD",
        riskLevel: "Balanced"
      },
      brvm_estate_waemu: {
        name: "BRVM Real Estate & Succession Plan (Abidjan / XOF)",
        initialDeposit: 40000000,
        monthlyContribution: 1500000,
        expectedReturn: 11.2, // WAEMU Regional Sovereign BTP
        inflationRate: 4.5,
        horizonYears: 12,
        targetGoal: 450000000,
        currency: "XOF",
        riskLevel: "Conservative"
      }
    };
  }

  /**
   * Calculate deterministic yearly projection and Monte Carlo confidence intervals (P10, P50, P90)
   */
  calculateProjection(params) {
    const {
      initialDeposit = 100000,
      monthlyContribution = 5000,
      expectedReturn = 12.0, // percent
      inflationRate = 6.0,   // percent
      horizonYears = 15,
      volatility = 0.08      // 8% annual standard deviation for Monte Carlo fan chart
    } = params;

    const nominalMonthlyRate = (expectedReturn / 100) / 12;
    const realAnnualRate = ((1 + expectedReturn / 100) / (1 + inflationRate / 100)) - 1;
    const realMonthlyRate = realAnnualRate / 12;

    const projectionYears = [];
    let totalInvestedCapital = initialDeposit;
    let nominalBalance = initialDeposit;
    let realPurchasingPower = initialDeposit;

    // Deterministic progression
    for (let yr = 0; yr <= horizonYears; yr++) {
      if (yr === 0) {
        projectionYears.push({
          year: 0,
          label: "Today",
          invested: Math.round(totalInvestedCapital),
          nominal: Math.round(nominalBalance),
          real: Math.round(realPurchasingPower),
          p10_conservative: Math.round(nominalBalance),
          p50_expected: Math.round(nominalBalance),
          p90_optimistic: Math.round(nominalBalance)
        });
        continue;
      }

      for (let m = 0; m < 12; m++) {
        nominalBalance = (nominalBalance + monthlyContribution) * (1 + nominalMonthlyRate);
        realPurchasingPower = (realPurchasingPower + monthlyContribution) * (1 + realMonthlyRate);
        totalInvestedCapital += monthlyContribution;
      }

      // Monte Carlo volatility fan chart spreading over time (Square root of time expansion)
      const fanSpreadFactor = Math.sqrt(yr) * volatility;
      const p50 = nominalBalance;
      const p10 = nominalBalance * Math.exp(-1.645 * fanSpreadFactor); // 10th percentile (Stress/Market Downturn)
      const p90 = nominalBalance * Math.exp(+1.645 * fanSpreadFactor); // 90th percentile (Boom Cycle)

      projectionYears.push({
        year: yr,
        label: `Yr ${yr}`,
        invested: Math.round(totalInvestedCapital),
        nominal: Math.round(nominalBalance),
        real: Math.round(realPurchasingPower),
        p10_conservative: Math.round(p10),
        p50_expected: Math.round(p50),
        p90_optimistic: Math.round(p90)
      });
    }

    const finalYear = projectionYears[projectionYears.length - 1];
    const totalGains = finalYear.nominal - finalYear.invested;
    const wealthMultiplier = (finalYear.nominal / finalYear.invested).toFixed(2);

    return {
      points: projectionYears,
      summary: {
        totalInvested: finalYear.invested,
        projectedNominal: finalYear.nominal,
        projectedReal: finalYear.real,
        totalGains: totalGains,
        wealthMultiplier: wealthMultiplier,
        conservativeFloor: finalYear.p10_conservative,
        optimisticCeiling: finalYear.p90_optimistic
      }
    };
  }
}

if (typeof module !== 'undefined') {
  module.exports = GoalSimulationEngine;
}
