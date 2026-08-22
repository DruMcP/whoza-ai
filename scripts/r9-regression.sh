#!/usr/bin/env bash
set -euo pipefail

FAILED=0

check() {
  local name="$1"
  local actual="$2"
  local expected="$3"
  if [ "$actual" = "$expected" ]; then
    echo "✅ PASS: $name ($actual)"
  else
    echo "❌ FAIL: $name (got $actual, expected $expected)"
    FAILED=1
  fi
}

check_ge() {
  local name="$1"
  local actual="$2"
  local expected="$3"
  if [ "$actual" -ge "$expected" ]; then
    echo "✅ PASS: $name ($actual >= $expected)"
  else
    echo "❌ FAIL: $name (got $actual, expected >= $expected)"
    FAILED=1
  fi
}

check_le() {
  local name="$1"
  local actual="$2"
  local expected="$3"
  if [ "$actual" -le "$expected" ]; then
    echo "✅ PASS: $name ($actual <= $expected)"
  else
    echo "❌ FAIL: $name (got $actual, expected <= $expected)"
    FAILED=1
  fi
}

echo "=== R9 Regression Tests ==="
echo ""

# 1. Moneypenny 2020 — must be 0
MONEYPENNY_2020=$(grep -rn "Moneypenny 2020\|Moneypenny Small Business Call Report, 2020\|Moneypenny, 2020" app components lib 2>/dev/null | grep -v node_modules | wc -l || true)
check "1. Moneypenny 2020" "$MONEYPENNY_2020" "0"

# 2. AlwaysOnBooking / JP Automations — must be 0 (excluding /data page which documents removals)
FABRICATED=$(grep -rn "AlwaysOnBooking\|JP Automations\|UK micro-business survey 2025" app components lib 2>/dev/null | grep -v node_modules | grep -v "app/data/page.tsx" | wc -l || true)
check "2. Fabricated sources" "$FABRICATED" "0"

# 3. 78% hire first responder — must be 0 (excluding /data page which documents removals)
HIRE_FIRST=$(grep -rn "78%.*hire\|hire.*78%\|78%.*first responder\|78%.*first business" app components lib 2>/dev/null | grep -v node_modules | grep -v "app/data/page.tsx" | wc -l || true)
check "3. 78% hire first" "$HIRE_FIRST" "0"

# 4. Hang up without leaving — must be 0 (excluding /data page which documents removals)
HANG_UP=$(grep -rn "hang up without leaving" app components lib 2>/dev/null | grep -v node_modules | grep -v "app/data/page.tsx" | wc -l || true)
check "4. Hang up without leaving" "$HANG_UP" "0"

# 5. Ofcom 85% — must be 0
OFCOM_85=$(grep -rn "85% of UK adults" app components lib 2>/dev/null | grep -v node_modules | wc -l || true)
check "5. Ofcom 85%" "$OFCOM_85" "0"

# 6. Ofcom 90% — must be >= 5
OFCOM_90=$(grep -rn "90% of UK adults" app components lib 2>/dev/null | grep -v node_modules | wc -l || true)
check_ge "6. Ofcom 90%" "$OFCOM_90" "5"

# 7. Independent research — must be 0
INDEP_RESEARCH=$(grep -rn "independent research" app 2>/dev/null | grep -v node_modules | wc -l || true)
check "7. Independent research" "$INDEP_RESEARCH" "0"

# 7b. Independent comparison — must be 0
INDEP_COMP=$(grep -rin "independent comparison" app components 2>/dev/null | grep -v node_modules | wc -l || true)
check "7b. Independent comparison" "$INDEP_COMP" "0"

# 7c. Honest rankings — must be 0
HONEST_RANK=$(grep -rin "honest rankings" app components 2>/dev/null | grep -v node_modules | wc -l || true)
check "7c. Honest rankings" "$HONEST_RANK" "0"

# 8. 69% intact — must be >= 6
PCT_69=$(grep -rn "69%" app components lib 2>/dev/null | grep -v node_modules | wc -l || true)
check_ge "8. 69% intact" "$PCT_69" "6"

# 9. 33% intact — must be >= 9
PCT_33=$(grep -rn "33%" app components lib 2>/dev/null | grep -v node_modules | wc -l || true)
check_ge "9. 33% intact" "$PCT_33" "9"

# 10. Data page exists
if [ -f app/data/page.tsx ]; then
  echo "✅ PASS: 10. Data page present"
else
  echo "❌ FAIL: 10. Data page missing"
  FAILED=1
fi

# 11. llms.txt sync
if diff -q public/llms.txt public/.well-known/llms.txt >/dev/null 2>&1; then
  echo "✅ PASS: 11. llms.txt sync IDENTICAL"
else
  echo "❌ FAIL: 11. llms.txt sync DIFFERS"
  FAILED=1
fi

echo ""
if [ "$FAILED" -eq 0 ]; then
  echo "=== ALL CHECKS PASSED ==="
  exit 0
else
  echo "=== SOME CHECKS FAILED ==="
  exit 1
fi
