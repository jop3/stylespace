# 🎮 StyleSpace - Instruktioner

## ⚠️ VIKTIGT: Hur man kör spelet

Spelet **måste** köras via en web server, inte direkt från fil-systemet (file://).

### Metod 1: Python Web Server (Rekommenderad)

1. Öppna en terminal i `stylespace` mappen
2. Kör:
   ```bash
   python3 -m http.server 8888
   ```
3. Öppna webbläsaren och gå till: `http://localhost:8888`
4. Öppna Developer Tools (F12) och se i Console för debug-loggar

### Metod 2: Node.js http-server

1. Installera (om du inte har det):
   ```bash
   npm install -g http-server
   ```
2. Kör i `stylespace` mappen:
   ```bash
   http-server -p 8888
   ```
3. Öppna: `http://localhost:8888`

### Metod 3: VS Code Live Server

1. Installera "Live Server" extension i VS Code
2. Högerklicka på `index.html`
3. Välj "Open with Live Server"

## 🔍 Debugging

När du öppnar spelet, öppna Console (F12) och du ska se:

```
🎮 Initializing StyleSpace...
📦 Anime.js loaded: true
✨ Anime.js version: 4.2.2
🎬 Starting animations...
💨 Starting avatar breathing animation...
💨 Avatar breathing animation created: [Object]
✅ All animations started!
```

Om du **INTE** ser dessa meddelanden, så laddas inte anime.js korrekt.

## 🎭 Animationer som ska synas

### Direkt vid laddning:
- Header glider in från toppen
- Paneler glider in från sidorna
- Diamant-ikonen roterar kontinuerligt
- Avatar har subtil andnings-rörelse (upp och ner)
- Pets hoppar och svänger (om du har aktiverat några)

### Vid interaktion:
- Knappar växer när du hovrar över dem
- Avatar fader/skalar när du ändrar utseende
- Diamanter bouncar när du köper något
- Shop items animeras in när du byter flik

## 🐛 Felsökning

### Problem: "Anime.js not loaded"
- Kontrollera att du har internet-anslutning
- Kör spelet via web server (se ovan)
- Kolla Console för fel-meddelanden

### Problem: "Inga animationer syns"
- Öppna Console och leta efter fel
- Kontrollera att du ser "✅ All animations started!"
- Prova att refresha sidan (Ctrl+F5)

### Problem: "TypeError: anime is not a function"
- CDN kan vara blockerad eller långsam
- Försök med en annan CDN eller ladda ner anime.js lokalt

## 📝 Test-fil

En `test-anime.html` fil finns också i mappen för att testa att anime.js fungerar isolerat.

Öppna den via web server: `http://localhost:8888/test-anime.html`

Du ska se en rosa box som:
- Roterar 360 grader
- Hoppar upp och ner
- Skalar sig större och mindre
- Loopar kontinuerligt
