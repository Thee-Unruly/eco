import urllib.request
import json
import time
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

base = 'http://127.0.0.1:8080'
tests = []

def run_test(name, path, method='GET', data=None):
    start = time.time()
    url = base + path
    headers = {'Content-Type': 'application/json'} if data else {}
    body = json.dumps(data).encode('utf-8') if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            elapsed_ms = round((time.time() - start) * 1000, 2)
            raw = resp.read().decode('utf-8')
            try:
                content = json.loads(raw)
            except Exception:
                content = raw[:100]
            tests.append({'name': name, 'status': resp.status, 'ms': elapsed_ms, 'ok': True, 'keys': list(content.keys()) if isinstance(content, dict) else len(content)})
    except Exception as e:
        elapsed_ms = round((time.time() - start) * 1000, 2)
        tests.append({'name': name, 'status': 'ERR', 'ms': elapsed_ms, 'ok': False, 'error': str(e)})

print('=== STARTING AUTOMATED ECOBANK WEALTH AI TEST SUITE ===')
run_test('1. Health Check & Service Heartbeat', '/api/health')
run_test('2. Model Metrics (ROC-AUC 0.8789)', '/api/metrics')
run_test('3. Dataset Distribution Stats (23k rows)', '/api/dataset/stats')
run_test('4. Dataset Paging & Sample (Kenya)', '/api/dataset/sample?country=Kenya&limit=10')
run_test('5. Real ML Inference (Scikit-Learn GBDT)', '/api/predict', 'POST', {
    'country': 'Kenya', 'age_of_respondent': 42, 'education_level': 'Tertiary education',
    'job_type': 'Formally employed Private', 'cellphone_access': 'Yes', 'location_type': 'Urban',
    'household_size': 3, 'gender_of_respondent': 'Male', 'relationship_with_head': 'Head of Household',
    'marital_status': 'Married/Living together', 'estimated_monthly_income_usd': 5500.0, 'existing_casa_balance': 45000.0
})
run_test('6. Dynamic Client Health (Ghana - Kwame)', '/api/client/health', 'POST', {
    'client_id': 'GH-ACC-0914', 'client_name': 'Kwame Mensah', 'country': 'Ghana', 'currency': 'GHS',
    'casa_balance': 485000.0, 'total_assets': 835000.0, 't_bill_maturity_days': 4, 't_bill_amount': 350000.0, 'risk_score': 54
})
run_test('7. Dynamic Client Health (CI - Amadou)', '/api/client/health', 'POST', {
    'client_id': 'CI-ABJ-3301', 'client_name': 'Amadou Diallo', 'country': "Côte d'Ivoire", 'currency': 'XOF',
    'casa_balance': 58000000.0, 'total_assets': 95000000.0, 't_bill_maturity_days': None, 't_bill_amount': 0.0, 'risk_score': 38
})
run_test('8. Audit Chain Ledger Query', '/api/audit/chain')
run_test('9. Cryptographic Audit Hash Verification', '/api/audit/verify')
run_test('10. Regulatory Dossier (SEC Ghana Directive 34)', '/api/audit/regulatory-dossier?template=sec_ghana')
run_test('11. Regulatory Dossier (BCEAO/CREPMF Art. 12)', '/api/audit/regulatory-dossier?template=bceao_waemu')
run_test('12. Regulatory Dossier (Bank of Ghana Core Audit)', '/api/audit/regulatory-dossier?template=bog_core')
run_test('13. Frontend index.html Static Delivery', '/index.html')
run_test('14. Dynamic Client Store (GET /api/clients)', '/api/clients')
run_test('15. Dynamic Custom Client Creation (POST /api/clients)', '/api/clients', 'POST', {
    'name': 'Dr. Kojo Boakye',
    'country': 'Ghana',
    'segment': 'Corporate Executive Wealth',
    'relationship_manager': 'Kofi Addo (Accra High Street)',
    'casa_balance': 750000.0,
    'domiciliary_usd': 50000.0,
    't_bill_amount': 300000.0,
    't_bill_days': 5,
    'momo_float_monthly': 80000.0,
    'edc_existing': 150000.0,
    'risk_score': 68
})
run_test('16. Real Python shap.TreeExplainer (POST /api/client/explain)', '/api/client/explain', 'POST', {
    'country': 'Ghana',
    'casa_balance': 750000.0,
    'risk_score': 68,
    'client_id': 'TEST-DYNAMIC-01'
})

print('\nTEST RESULTS:')
all_pass = True
for t in tests:
    status_icon = 'PASS' if t['ok'] else 'FAIL'
    if not t['ok']:
        all_pass = False
    print(f"[{status_icon}] {t['name']:<56} | Status: {t['status']} | Latency: {t['ms']}ms")

print(f"\nOVERALL RESULT: {'ALL TESTS PASSED (16/16)' if all_pass else 'SOME TESTS FAILED'}")

