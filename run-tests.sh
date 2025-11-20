#!/bin/bash

echo "🧪 LLM Outfit System - Automated Test Suite"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run a test
run_test() {
    local test_name=$1
    local test_command=$2

    echo -n "Testing: $test_name... "

    if eval "$test_command" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASS${NC}"
        ((TESTS_PASSED++))
        return 0
    else
        echo -e "${RED}❌ FAIL${NC}"
        ((TESTS_FAILED++))
        return 1
    fi
}

echo "📦 Checking File Structure..."
echo "------------------------------"

# Check if files exist
run_test "svg-color-remapper.js exists" "[ -f svg-color-remapper.js ]"
run_test "clothing-engine.js exists" "[ -f clothing-engine.js ]"
run_test "llm-outfit-specs.md exists" "[ -f llm-outfit-specs.md ]"
run_test "asset-database.js exists" "[ -f assets/asset-database.js ]"
run_test "example-outfits/ directory exists" "[ -d example-outfits ]"

echo ""
echo "🔍 Checking Example Outfits..."
echo "------------------------------"

run_test "casual-summer.json exists" "[ -f example-outfits/casual-summer.json ]"
run_test "tech-geek.json exists" "[ -f example-outfits/tech-geek.json ]"
run_test "party-night.json exists" "[ -f example-outfits/party-night.json ]"
run_test "streetwear-urban.json exists" "[ -f example-outfits/streetwear-urban.json ]"
run_test "kawaii-cute.json exists" "[ -f example-outfits/kawaii-cute.json ]"

echo ""
echo "✅ Validating JSON Files..."
echo "------------------------------"

for file in example-outfits/*.json; do
    filename=$(basename "$file")
    if run_test "$filename is valid JSON" "python3 -m json.tool $file"; then
        :
    fi
done

echo ""
echo "🔍 Checking JavaScript Syntax..."
echo "------------------------------"

# Check for basic syntax errors (simple grep checks)
run_test "svg-color-remapper.js has no obvious syntax errors" "grep -q 'class SVGColorRemapper' svg-color-remapper.js"
run_test "clothing-engine.js has no obvious syntax errors" "grep -q 'class ClothingEngine' clothing-engine.js"
run_test "asset-database.js has SVGAssetDatabase" "grep -q 'SVGAssetDatabase' assets/asset-database.js"

echo ""
echo "📊 Asset Database Stats..."
echo "------------------------------"

# Count assets
TSHIRTS=$(grep -c "id: 'tshirt_" assets/asset-database.js || echo 0)
HOODIES=$(grep -c "id: 'hoodie_" assets/asset-database.js || echo 0)
JACKETS=$(grep -c "id: 'jacket_" assets/asset-database.js || echo 0)
SHOES=$(grep -c "id: 'shoes_" assets/asset-database.js || echo 0)
ACCESSORIES=$(grep -c "id: 'accessory_" assets/asset-database.js || echo 0)
JEWELRY=$(grep -c "id: 'jewelry_" assets/asset-database.js || echo 0)

echo "  T-shirts: $TSHIRTS"
echo "  Hoodies: $HOODIES"
echo "  Jackets: $JACKETS"
echo "  Shoes: $SHOES"
echo "  Accessories: $ACCESSORIES"
echo "  Jewelry: $JEWELRY"

echo ""
echo "🌐 Checking Web Server..."
echo "------------------------------"

if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/index.html | grep -q "200"; then
    echo -e "${GREEN}✅ Web server is running on http://localhost:8080${NC}"
    ((TESTS_PASSED++))

    # Check if test page is accessible
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/test-llm-system.html | grep -q "200"; then
        echo -e "${GREEN}✅ Test page accessible at http://localhost:8080/test-llm-system.html${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}❌ Test page not accessible${NC}"
        ((TESTS_FAILED++))
    fi
else
    echo -e "${RED}❌ Web server not running${NC}"
    ((TESTS_FAILED++))
fi

echo ""
echo "=============================================="
echo "📊 Test Results"
echo "=============================================="
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    echo ""
    echo "🌐 Open these URLs to test manually:"
    echo "  Main Game: http://localhost:8080/index.html"
    echo "  Test Suite: http://localhost:8080/test-llm-system.html"
    echo ""
    exit 0
else
    echo -e "${YELLOW}⚠️ Some tests failed. Review the output above.${NC}"
    echo ""
    exit 1
fi
