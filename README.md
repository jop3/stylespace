# 🎨 StyleSpace - Avatar Customization Game

Ett modernt avatar-anpassningsspel med vektorgrafik, LLM-integration och glassmorphic design.

---

## 🚀 Snabbstart

### 1. Klona Projektet (redan gjort!)
```bash
git clone https://github.com/jop3/stylespace.git
cd stylespace
```

### 2. Starta en Lokal Server

**Option A: Python 3 (Rekommenderat)**
```bash
python3 -m http.server 8080
```

**Option B: Python 2**
```bash
python -m SimpleHTTPServer 8080
```

**Option C: Node.js (npx)**
```bash
npx http-server -p 8080
```

**Option D: PHP**
```bash
php -S localhost:8080
```

### 3. Öppna i Webbläsaren
```
http://localhost:8080
```

**Klart!** 🎉 Inga npm install, inga dependencies att installera!

---

## 📦 Vad är detta?

StyleSpace är ett interaktivt avatar-anpassningsspel där du kan:
- 🎨 Skapa och customiza avatarer med 26+ stilar (DiceBear)
- 👔 Välja kläder från 62+ SVG-assets
- 🤖 Importera LLM-genererade outfits via JSON
- 💎 Tjäna diamanter och köpa nya items
- 🐾 Samla pets och accessoarer
- 📊 Tracka progression med achievements
- 💾 Spara din avatar lokalt

---

## 🎮 Hur Man Använder

### Grundläggande Navigation

1. **Utseende-tab** - Anpassa ansiktet, hår, ögon, kläder
2. **Kläder-tab** - Shoppa nya kläder med diamanter
3. **🎨 Custom-tab** - Avancerade features:
   - LLM Outfit Generator (klistra in JSON)
   - Multi-part färgning
   - Mönster och effekter
   - Dev Mode toggle
4. **Pets-tab** - Köp och visa pets
5. **Outfits-tab** - Spara och ladda kompletta looks
6. **⭐ Progress-tab** - Se stats och achievements
7. **Koder-tab** - Använd cheat codes

### Quick Actions
- 🎲 **Slumpa** - Randomisera hela avataren
- ↶ **Undo** - Ångra senaste ändring
- ↷ **Redo** - Gör om ändring
- 💾 **Auto-save** - Sparas automatiskt i localStorage

---

## 🤖 LLM Outfit Generator

### Hur det fungerar:

1. Gå till **🎨 Custom** tab
2. Se "🤖 LLM Outfit Generator" sektionen
3. Klistra in en JSON-spec eller tryck på en preset-knapp

### Exempel JSON:
```json
{
  "outfit": {
    "top": {
      "assetId": "hoodie_colorblock",
      "colors": ["#3498DB", "#E74C3C", "#2C3E50"]
    },
    "bottom": {
      "assetId": "pants_jeans",
      "colors": ["#4A90E2", "#2E5C8A"]
    },
    "shoes": {
      "assetId": "shoes_sneakers_red",
      "colors": ["#E74C3C", "#fff"]
    }
  }
}
```

### Presets:
- 🏃 **Sporty** - Athletic hoodie look
- 👗 **Elegant** - Party dress with jewelry
- 🎮 **Gamer** - Gaming tshirt + nerdy glasses
- ❄️ **Winter** - Bomber jacket + warm accessories
- 🎸 **Rock** - Leather jacket + edgy style

---

## 💡 Tips & Tricks

### Dev Mode
1. Gå till **🎨 Custom** tab
2. Aktivera "🔓 Dev Mode"
3. **Alla items blir gratis!** 🎉

### Snabba Diamanter
Använd cheat codes i **Koder** tab:
- `DIAMONDS` - 10,000 💎
- `RICH` - 50,000 💎
- `BILLIONAIRE` - 1,000,000 💎

---

## 🐛 Felsökning

### Avataren Visas Inte
- Kolla att du kör via web server (inte file://)
- Öppna Developer Console (F12) för errors
- Vänta 2-3 sekunder för DiceBear att ladda

### Styling Ser Fel Ut
- Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
- Rensa browser cache

### Localhost Fungerar Inte
- Testa annan port: `python3 -m http.server 3000`
- Kolla att ingen annan process använder porten

---

## 📚 Dokumentation

- `llm-outfit-specs.md` - Komplett guide för LLM outfit-generering
- `UI-IMPROVEMENTS.md` - Alla nya UI/UX features
- `TEST-RESULTS.md` - Testresultat och coverage

---

## 🎉 Njut av StyleSpace!

**Senast uppdaterad:** November 2025
**Version:** 2.0 (LLM Outfit System + Modern UI)
