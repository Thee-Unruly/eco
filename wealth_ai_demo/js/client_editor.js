/**
 * Ecobank WealthAI Studio – Client Inline Editor
 * -----------------------------------------------------------------
 * Adds to Tab 1 (Client 360° / Q8):
 *  - Double-click any balance or risk score to edit it inline
 *  - On confirm: immediately re-runs the health engine & re-renders all stats
 *  - Animated score counter on health gauge change
 *  - "Live Edit Mode" badge appears while editing
 *  - All changes flow through to Tab 2 recommendations (re-runs AI if open)
 */

(function () {
  'use strict';

  // Fields that can be edited inline: [elementId, accountKey, label, isCurrency]
  const EDITABLE_FIELDS = [
    { id: 'c360-casa-val',    key: 'casa_balance',         label: 'CASA Cash Reserves',       isCurrency: true },
    { id: 'c360-fx-val',     key: 'domiciliary_usd',       label: 'FX Domiciliary (USD)',      isCurrency: true },
    { id: 'c360-momo-val',   key: 'momo_float_monthly',    label: 'MoMo Monthly Float',        isCurrency: true },
    { id: 'c360-edc-val',    key: 'edc_existing',          label: 'EDC Asset Holdings',        isCurrency: true },
  ];

  let editModeActive = false;
  let animationFrame = null;

  // ── Bootstrap ──────────────────────────────────────────────────────────────
  window.initClientEditor = function () {
    injectEditModeBadge();
    attachEditableFields();
    wireEditModeToggle();
    injectWhatIfPanel();
  };

  // ── "LIVE EDIT MODE" banner in the Client 360 header ──────────────────────
  function injectEditModeBadge() {
    const nameEl = document.getElementById('c360-client-name');
    if (!nameEl || document.getElementById('edit-mode-badge')) return;

    const badge = document.createElement('span');
    badge.id = 'edit-mode-badge';
    badge.style.cssText = `
      display: none;
      margin-left: 10px;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 3px 8px;
      border-radius: 12px;
      background: rgba(245, 158, 11, 0.2);
      color: var(--ecobank-gold);
      border: 1px solid rgba(245, 158, 11, 0.4);
      vertical-align: middle;
      animation: pulse-glow 1.5s ease-in-out infinite;
    `;
    badge.textContent = '✎ LIVE EDIT MODE';
    nameEl.parentElement.appendChild(badge);
  }

  // ── Wire the HTML-native Edit toggle button ────────────────────────────────
  function wireEditModeToggle() {
    const toggleBtn = document.getElementById('btn-edit-mode-toggle');
    if (!toggleBtn || toggleBtn.dataset.editorWired) return;
    toggleBtn.dataset.editorWired = '1';

    toggleBtn.addEventListener('click', () => {
      editModeActive = !editModeActive;
      updateEditModeState();
    });
  }

  // ── Toggle visual state for all editable cells ─────────────────────────────
  function updateEditModeState() {
    const badge = document.getElementById('edit-mode-badge');
    const btn   = document.getElementById('btn-edit-mode-toggle');

    if (editModeActive) {
      if (badge) badge.style.display = 'inline';
      if (btn)   {
        btn.textContent = '✓ Done Editing';
        btn.className = 'btn-primary';
      }
    } else {
      if (badge) badge.style.display = 'none';
      if (btn)   {
        btn.textContent = '✎ Edit Client Balances';
        btn.className = 'btn-secondary';
      }
    }

    // Highlight editable cells
    EDITABLE_FIELDS.forEach(field => {
      const el = document.getElementById(field.id);
      if (!el) return;
      if (editModeActive) {
        el.style.cursor = 'pointer';
        el.style.borderBottom = '1.5px dashed var(--ecobank-gold)';
        el.title = `Double-click to edit ${field.label}`;
      } else {
        el.style.cursor = '';
        el.style.borderBottom = '';
        el.title = '';
      }
    });
  }

  // ── Attach double-click inline edit to each stat value ────────────────────
  function attachEditableFields() {
    EDITABLE_FIELDS.forEach(field => {
      const el = document.getElementById(field.id);
      if (!el || el.dataset.editorBound) return;
      el.dataset.editorBound = '1';

      el.addEventListener('dblclick', () => {
        if (!editModeActive) {
          // Auto-enter edit mode if they double-click without toggling
          editModeActive = true;
          updateEditModeState();
        }
        startInlineEdit(el, field);
      });
    });
  }

  // ── Inline edit widget ─────────────────────────────────────────────────────
  function startInlineEdit(el, field) {
    if (el.querySelector('input')) return; // already editing

    // Parse current numeric value from display text
    const rawText = el.textContent.replace(/[^0-9.]/g, '');
    const currentVal = parseFloat(rawText) || 0;

    const orig = el.innerHTML;

    el.innerHTML = `
      <span style="display: inline-flex; align-items: center; gap: 6px;">
        <input
          id="inline-edit-input-${field.key}"
          type="number"
          value="${currentVal}"
          min="0"
          style="
            width: 120px;
            background: #060B10;
            color: var(--ecobank-gold);
            border: 1px solid var(--ecobank-gold);
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 15px;
            font-weight: 700;
            outline: none;
          "
        />
        <button style="
          background: var(--success);
          color: #001a2c;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
        " id="inline-confirm-${field.key}">✓</button>
        <button style="
          background: rgba(239,68,68,0.3);
          color: var(--danger);
          border: 1px solid var(--danger);
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 11px;
          cursor: pointer;
        " id="inline-cancel-${field.key}">✕</button>
      </span>
    `;

    const input = document.getElementById(`inline-edit-input-${field.key}`);
    if (input) {
      input.focus();
      input.select();

      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') confirmEdit(field, el);
        if (e.key === 'Escape') { el.innerHTML = orig; updateEditModeState(); }
      });
    }

    document.getElementById(`inline-confirm-${field.key}`)?.addEventListener('click', () => confirmEdit(field, el));
    document.getElementById(`inline-cancel-${field.key}`)?.addEventListener('click',  () => { el.innerHTML = orig; });
  }

  // ── Confirm edit, update state object, re-render ──────────────────────────
  function confirmEdit(field, el) {
    const input = document.getElementById(`inline-edit-input-${field.key}`);
    if (!input) return;

    const newVal = parseFloat(input.value) || 0;

    // Update the global selected client state via a shared accessor
    const client = window._getSelectedClient?.();
    if (client) {
      client.accounts[field.key] = newVal;

      // Re-render the display value
      const currency = client.currency || 'GHS';
      if (field.key === 'domiciliary_usd') {
        el.textContent = `$${newVal.toLocaleString()} USD`;
      } else if (field.key === 'momo_float_monthly') {
        el.textContent = `${currency} ${newVal.toLocaleString()}/mo`;
      } else {
        el.textContent = `${currency} ${newVal.toLocaleString()}`;
      }

      // Flash the cell green to confirm
      el.style.color = 'var(--success)';
      el.style.transition = 'color 0.3s';
      setTimeout(() => { el.style.color = ''; }, 1200);

      // Trigger full re-calculation: health engine, alerts, co-pilot
      window._triggerClientHealthUpdate?.(client);

      // Show toast
      showEditToast(`${field.label} updated → ${currency} ${newVal.toLocaleString()}`);

      // Auto-link to simulation: update Initial Deposit slider if CASA changed
      if (field.key === 'casa_balance') {
        const simDeposit = document.getElementById('sim-deposit');
        const simDepositVal = document.getElementById('sim-deposit-val');
        if (simDeposit && newVal >= 10000 && newVal <= 1000000) {
          simDeposit.value = newVal;
          if (simDepositVal) simDepositVal.textContent = newVal.toLocaleString();
          // Fire the simulation redraw
          simDeposit.dispatchEvent(new Event('input'));
          showEditToast('Goal Simulation also updated to match new CASA balance ✓');
        }
      }
    }
  }

  // ── Animated health score counter ──────────────────────────────────────────
  window._animateHealthScore = function (fromScore, toScore) {
    const el = document.getElementById('c360-health-score-val');
    const gauge = document.getElementById('health-gauge-circle');
    if (!el) return;

    if (animationFrame) cancelAnimationFrame(animationFrame);

    const duration = 800; // ms
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(fromScore + (toScore - fromScore) * eased);

      el.textContent = current;
      if (gauge) {
        gauge.setAttribute('stroke-dasharray', `${current}, 100`);
        if (current >= 80)      gauge.setAttribute('stroke', 'var(--success)');
        else if (current >= 50) gauge.setAttribute('stroke', 'var(--ecobank-gold)');
        else                    gauge.setAttribute('stroke', 'var(--danger)');
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    }
    animationFrame = requestAnimationFrame(step);
  };

  // ── "What If" scenario scratchpad panel ───────────────────────────────────
  function injectWhatIfPanel() {
    const alertsSection = document.querySelector('#tab-client360 .card:last-child');
    if (!alertsSection || document.getElementById('what-if-panel')) return;

    const panel = document.createElement('div');
    panel.id = 'what-if-panel';
    panel.style.cssText = 'margin-top: 20px; border-top: 1px solid var(--border-subtle); padding-top: 18px;';
    panel.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <h4 style="font-size: 14px; font-weight: 800; color: var(--ecobank-cyan); margin: 0;">
          🔬 What-If Scenario Scratchpad
        </h4>
        <span style="font-size: 11px; color: var(--text-muted);">Adjust any lever to instantly see the impact on client health score</span>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">

        <!-- CASA Reallocation Slider -->
        <div style="background: rgba(0,0,0,0.25); padding: 14px; border-radius: 8px; border: 1px solid var(--border-subtle);">
          <div style="font-size: 12px; font-weight: 700; color: #fff; margin-bottom: 4px;">Reallocate CASA → EDC Fixed Income</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 10px;">
            How much of idle CASA to move into 26.4% EDC-FIT?
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-size: 11px; color: var(--text-secondary);">Reallocation Amount</span>
            <span id="whatif-realloc-val" style="font-size: 12px; font-weight: 700; color: var(--ecobank-gold);">0</span>
          </div>
          <input type="range" id="whatif-realloc" min="0" max="100" step="5" value="0"
            style="width: 100%; accent-color: var(--ecobank-cyan);"
          >
          <div id="whatif-realloc-impact" style="margin-top: 10px; font-size: 12px; color: var(--text-muted); min-height: 28px;"></div>
        </div>

        <!-- Risk Score Slider -->
        <div style="background: rgba(0,0,0,0.25); padding: 14px; border-radius: 8px; border: 1px solid var(--border-subtle);">
          <div style="font-size: 12px; font-weight: 700; color: #fff; margin-bottom: 4px;">Adjust Client Risk Tolerance</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 10px;">
            Simulate updated KYC risk profiling result
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-size: 11px; color: var(--text-secondary);">Risk Score</span>
            <span id="whatif-risk-val" style="font-size: 12px; font-weight: 700; color: var(--ecobank-gold);">54 / 100</span>
          </div>
          <input type="range" id="whatif-risk" min="10" max="95" step="1" value="54"
            style="width: 100%; accent-color: var(--ecobank-cyan);"
          >
          <div id="whatif-risk-impact" style="margin-top: 10px; font-size: 12px; color: var(--text-muted); min-height: 28px;"></div>
        </div>

      </div>

      <!-- Projected Outcome Banner -->
      <div id="whatif-outcome-banner" style="
        margin-top: 14px;
        padding: 12px 16px;
        background: rgba(0, 163, 180, 0.07);
        border: 1px solid rgba(0, 163, 180, 0.2);
        border-radius: 8px;
        font-size: 13px;
        color: var(--text-secondary);
        display: none;
      "></div>
    `;

    // Find the right insertion point — inside the main 360 card, after the alerts
    const alertsContainer = document.getElementById('c360-alerts-container');
    if (alertsContainer) {
      alertsContainer.parentElement.appendChild(panel);
    }

    // Wire up sliders
    const reallocSlider = document.getElementById('whatif-realloc');
    const riskSlider    = document.getElementById('whatif-risk');

    if (reallocSlider) {
      reallocSlider.addEventListener('input', updateWhatIfScenario);
    }
    if (riskSlider) {
      riskSlider.addEventListener('input', () => {
        const val = parseInt(riskSlider.value);
        const label = val >= 70 ? 'Growth / Aggressive' : (val >= 40 ? 'Moderate-Balanced' : 'Conservative');
        document.getElementById('whatif-risk-val').textContent = `${val} / 100 — ${label}`;
        updateWhatIfScenario();
      });
    }
  }

  function updateWhatIfScenario() {
    const client = window._getSelectedClient?.();
    if (!client) return;

    const reallocPct  = parseInt(document.getElementById('whatif-realloc')?.value) || 0;
    const newRisk     = parseInt(document.getElementById('whatif-risk')?.value) || 54;
    const casa        = client.accounts.casa_balance || 0;
    const currency    = client.currency || 'GHS';

    // Reallocation amounts
    const reallocAmt   = Math.round(casa * (reallocPct / 100));
    const remainCasa   = casa - reallocAmt;
    const edcYield     = 0.264;
    const casaYield    = 0.015;
    const annualGain   = reallocAmt * (edcYield - casaYield);

    const reallocImpact = document.getElementById('whatif-realloc-impact');
    const reallocVal    = document.getElementById('whatif-realloc-val');
    const riskImpact    = document.getElementById('whatif-risk-impact');

    if (reallocVal) reallocVal.textContent = `${currency} ${reallocAmt.toLocaleString()}`;

    if (reallocImpact) {
      if (reallocPct === 0) {
        reallocImpact.innerHTML = `<span style="color: var(--text-muted);">Move the slider to see projected annual yield gain.</span>`;
      } else {
        reallocImpact.innerHTML = `
          <span style="color: var(--success); font-weight: 700;">
            +${currency} ${Math.round(annualGain).toLocaleString()}/yr additional yield
          </span>
          <span style="color: var(--text-muted);"> · ${currency} ${remainCasa.toLocaleString()} remains liquid</span>
        `;
      }
    }

    if (riskImpact) {
      const riskMatch = (client.behavioral_traits.risk_profile || '').match(/\d+/);
      const currentRisk = riskMatch ? parseInt(riskMatch[0]) : 54;
      const diff = newRisk - currentRisk;
      if (Math.abs(diff) < 2) {
        riskImpact.innerHTML = `<span style="color: var(--text-muted);">Risk tolerance unchanged from current profile.</span>`;
      } else if (diff > 0) {
        riskImpact.innerHTML = `<span style="color: var(--ecobank-gold); font-weight: 700;">▲ Risk up ${diff} pts</span> — unlocks <em>Frontier Alpha</em> if score reaches 75+`;
      } else {
        riskImpact.innerHTML = `<span style="color: var(--ecobank-cyan); font-weight: 700;">▼ Risk down ${Math.abs(diff)} pts</span> — narrows to capital-preservation products only`;
      }
    }

    // Outcome banner
    const banner = document.getElementById('whatif-outcome-banner');
    if (banner && (reallocPct > 0 || Math.abs(newRisk - 54) > 5)) {
      banner.style.display = 'block';

      const projectedAnnualYield = Math.round(annualGain);
      const riskLabel = newRisk >= 70 ? 'Aggressive' : (newRisk >= 40 ? 'Moderate-Balanced' : 'Conservative');
      const productSuggestion = newRisk >= 70
        ? 'Ecobank African Frontier Alpha strategy becomes eligible'
        : (reallocPct > 0 ? 'EDC Fixed Income Trust is the optimal reallocation vehicle' : '');

      banner.innerHTML = `
        <strong style="color: var(--ecobank-cyan);">Projected Scenario Outcome:</strong>
        Reallocating <strong>${currency} ${reallocAmt.toLocaleString()}</strong> into EDC-FIT
        generates <strong style="color: var(--success);">+${currency} ${projectedAnnualYield.toLocaleString()}/yr</strong>
        in additional net yield.
        With a risk score of <strong>${newRisk}/100 (${riskLabel})</strong>,
        ${productSuggestion || 'current product suite remains optimal'}.
        <br><span style="font-size: 11px; color: var(--text-muted);">This is a hypothetical scenario — no data has been saved.</span>
      `;
    } else if (banner) {
      banner.style.display = 'none';
    }
  }

  // ── Toast notification ─────────────────────────────────────────────────────
  function showEditToast(message) {
    let toast = document.getElementById('editor-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'editor-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(60px);
        background: rgba(16, 185, 129, 0.95);
        color: #001a2c;
        font-weight: 700;
        font-size: 13px;
        padding: 10px 20px;
        border-radius: 24px;
        z-index: 9999;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
        opacity: 0;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        pointer-events: none;
      `;
      document.body.appendChild(toast);
    }

    toast.textContent = `✓ ${message}`;
    toast.style.transform = 'translateX(-50%) translateY(0)';
    toast.style.opacity = '1';

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(60px)';
      toast.style.opacity = '0';
    }, 2800);
  }

  // ── Boot ───────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      window.initClientEditor();
    }, 600);
  });

})();
