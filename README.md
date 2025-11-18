# 🎨 StyleSpace - Anime Avatar Spel

Ett anime-inspirerat avatar anpassningsspel med **DiceBear Avataaars** integration!

## ✨ Funktioner

### 🎭 Avatar Anpassning (DiceBear Powered!)
- **Hudton**: 6 olika nyanser från ljus till mörk
- **Hårstil**: 9 olika stilar (långt, kort, knut, bob, etc.)
- **Hårfärg**: 18+ färger inklusive naturliga och fantasifärger
- **Ögon**: 7 olika uttryck (glad, förvånad, hjärtan, blinkar, etc.)
- **Ögonbryn**: 7 olika stilar för olika känslor
- **Mun**: 7 olika uttryck (leende, seriös, tunga, etc.)
- **Glasögon**: 7 typer inklusive solglasögon och optikglas
- **Bas-Kläder**: 9 typer med 12 färgalternativ

### 👔 Kläder Shop
- **Överdel**: 6 items (t-shirts, hoodies, jackor)
- **Underdel**: 5 items (jeans, kjolar, shorts)
- **Skor**: 4 items (sneakers, boots, sandaler)
- **Accessoarer**: 4 items (kepsar, beanies, halsdukar, väskor)
- **Köp med diamanter** och bygg din garderob!

### 🐾 Pets System
- **7 olika pets** att välja mellan
- **Max 3 aktiva** samtidigt
- **Animerade pets** med bounce-effekt
- Pets från 25 till 200 diamanter

### 👗 Outfit System
- **Spara upp till 25 outfits**
- Varje outfit kostar 5 💎
- Inkluderar avatar anpassning, kläder OCH pets!
- Snabbt ladda sparade outfits

### 💎 Promo Koder
- `WELCOME` - 50 diamanter
- `STYLE100` - 100 diamanter
- `FASHION` - 75 diamanter
- `AVATAR` - 150 diamanter

### 🎬 Anime.js Animationer
- **Breathing avatar** - subtil upp-och-ner rörelse
- **UI entrance animations** - panels glider in
- **Button hover effects** - alla knappar animeras
- **Diamond sparkle** - kontinuerlig rotation och pulse
- **Tab switching** - smooth transitions
- **Pet animations** - bounce och hover effects
- **Purchase celebrations** - när du köper något!

## 🚀 Kom Igång

### Metod 1: Python Web Server (Rekommenderad)
```bash
cd stylespace
python3 -m http.server 8888
```
Öppna: `http://localhost:8888`

### Metod 2: Node.js http-server
```bash
npm install -g http-server
http-server -p 8888
```

### Metod 3: VS Code Live Server
1. Installera "Live Server" extension
2. Högerklicka på `index.html`
3. Välj "Open with Live Server"

## 🔍 Debug & Verifiering

Öppna Console (F12) när du kör spelet. Du ska se:

```
🎮 Initializing StyleSpace with DiceBear...
📦 Anime.js loaded: true
✨ Anime.js version: 4.2.2
🎬 Starting animations...
🎨 Starting UI entrance animations...
💨 Starting avatar breathing animation...
💎 Starting diamond sparkle animation...
🔘 Setting up button animations...
✅ All animations started!
```

## 🎨 DiceBear Integration

Detta spel använder **[DiceBear Avataaars API](https://www.dicebear.com/)** för professionell avatar-rendering:

- **SVG-baserade avatars** - skarp och skalbar
- **Avataaars style** by Pablo Stanley
- **Hundratals kombinationer** med alla anpassningsalternativ
- **Perfekt integration** med anime.js animationer

### Varför DiceBear?
- ✅ Professionell anime/cartoon stil
- ✅ Massvis med anpassningsalternativ
- ✅ SVG = skarp kvalitet i alla storlekar
- ✅ Enklare att animera än Canvas
- ✅ Ingen asset-hantering behövs
- ✅ Närmare ZEPETO-kvalitet än Canvas rendering

## 📁 Fil Struktur

```
stylespace/
├── index.html              # Huvudfil med DiceBear UI
├── game.js                 # DiceBear-baserad spel-logik
├── styles.css              # Anime-inspirerad styling
├── test-anime.html         # Testfil för anime.js
├── INSTRUKTIONER.md        # Detaljerad guide
├── README.md               # Denna fil
├── index-canvas-backup.html    # Backup av gamla Canvas-versionen
└── game-canvas-backup.js       # Backup av gamla Canvas-versionen
```

## 🛠️ Teknisk Stack

- **HTML5** - Struktur
- **CSS3** - Styling med gradients och animationer
- **Vanilla JavaScript** - No frameworks!
- **[DiceBear Avataaars API](https://www.dicebear.com/)** - Avatar rendering
- **[Anime.js 4.2.2](https://animejs.com/)** - Smooth animations
- **Client-side storage** - Allt sparas i minnet (no backend)

## 🎯 Användning

1. **Anpassa din avatar** i Utseende-fliken
2. **Köp kläder** i Kläder-fliken
3. **Adoptera pets** i Pets-fliken (max 3 aktiva)
4. **Spara outfits** i Outfits-fliken (5 💎 per outfit)
5. **Lös in koder** i Koder-fliken för gratis diamanter!

## 🎨 Avatar Exempel

Med DiceBear kan du skapa avatars som:
- Anime-pojkar och -flickor med stora uttrycksfulla ögon
- Olika hudtoner och hårstilar
- Glasögon, skägg, och andra accessories
- Färgglada kläder som matchar din stil
- ...och mycket mer!

## 🐛 Felsökning

**Problem: Avataren laddas inte**
- Kontrollera internet-anslutning (DiceBear API behöver internet)
- Öppna Console (F12) för felmeddelanden
- Kör via web server, inte file://

**Problem: Animationer fungerar inte**
- Kontrollera att anime.js laddades (se Console)
- Verifiera med test-anime.html först

## 📝 Bakgrundsfiler (Backup)

Om du vill återgå till Canvas-versionen:
```bash
mv index.html index-dicebear.html
mv game.js game-dicebear.js
mv index-canvas-backup.html index.html
mv game-canvas-backup.js game.js
```

## 🚀 Framtida Förbättringar

- [ ] Backend för persistent storage
- [ ] Multiplayer support
- [ ] Fler DiceBear styles (Bottts, Adventurer, etc.)
- [ ] Custom clothing overlays
- [ ] Mer advanced pet interactions
- [ ] Achievement system
- [ ] Daily rewards

## 📄 Licens

Detta är ett demo-projekt för utbildningsändamål.
DiceBear API är gratis att använda - se [DiceBear License](https://www.dicebear.com/).

---

**Skapad med ❤️ och anime.js ✨**
