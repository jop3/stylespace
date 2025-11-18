# StyleSpace - Feature Overview 🎮✨

## Översikt
StyleSpace är ett anime-inspirerat avatar-anpassningsspel med avancerad grafisk rendering och SVG-manipulation.

## 🎨 Huvudfunktioner

### 1. **Avatar-Anpassning** (Utseende-fliken)
- **Hudton**: 6 olika hudtoner (pale, light, tanned, brown, darkBrown, black)
- **Hårstilar**: 9 olika hårstilar (långt rakt, lockigt, knut, bob, kort, etc.)
- **Hårfärg**: 10+ färgalternativ
- **Ögon**: 7 olika ögonstilar (default, happy, hearts, wink, surprised, squint, side)
- **Ögonbryn**: 7 olika brynstilar
- **Mun**: 7 olika munstilar (smile, twinkle, serious, tongue, concerned, grimace)
- **Kläder**: 9 basplagg (hoodie, t-shirt, scoop neck, v-neck, blazer, etc.)
- **Klädfärg**: 10+ färgalternativ

### 2. **Klädbutik** (Kläder-fliken)
- **90+ Klädplagg** fördelat på:
  - **Överdel**: 30 items (t-shirts, hoodies, jackor)
  - **Underdel**: 30 items (jeans, kjolar, shorts)
  - **Skor**: 20 items (sneakers, boots, sandaler)
  - **Accessoarer**: 10 items (glasögon, hattar, smycken)
- **Prova-på system**: Testa kläder innan köp
- **Diamanter**: Virtual valuta för köp (💎)

### 3. **🎨 Custom Design** (NYT! Custom-fliken)
Avancerad SVG-manipulation för maximal anpassning:

#### Multi-Part Färgning
- Färga olika delar av samma plagg separat
- Exempel: Huvtröja med olika färg på kropp, huva, fickor, dragkedja

#### Mönster
- **📏 Ränder**: Horisontella eller vertikala ränder
- **⚪ Prickar**: Polkadots-mönster
- **🔲 Schack**: Schackrutigt mönster
- **🌈 Gradient**: Mjuka färgövergångar

#### Effekter
- **💫 Glow**: Lysande effekt på hår och kläder
- **🧹 Rensa**: Ta bort alla effekter

#### Export
- **📄 Ladda ner SVG**: Vektorformat för skalbarhet
- **🖼️ Ladda ner PNG**: Bildformat för delning

### 4. **Pets System** (Pets-fliken)
- **70+ Olika Pets**: Djur, varelser och kreativa companions
- **Max 3 Aktiva**: Välj upp till 3 pets som visas med din avatar
- **Animationer**: Pets studsar med söta animationer
- **Kategorier**:
  - Djur (🐶🐱🐰🐻🐼)
  - Fåglar (🦜🦩🦚🦆🦉)
  - Fantasy (🦄🐉🦋🐝)
  - Mat & Objekt (🍕🍰🎮🎵)

### 5. **Outfit System** (Outfits-fliken)
- **Spara Outfits**: Spara kompletta looks (5 💎)
- **25 Outfit-platser**: Bygg en garderob
- **Inkluderar**:
  - Alla avatar-inställningar
  - Alla kläder (överdel, underdel, skor, accessoarer)
  - Aktiva pets
- **Snabb Laddning**: Byt outfit med ett klick

### 6. **Promo-Koder** (Koder-fliken)
- **Lös in koder**: Få gratis diamanter
- **Aktiva koder**:
  - `WELCOME`: 50 💎
  - `STYLE2024`: 100 💎
  - `AVATAR`: 75 💎
  - `GLAM`: 150 💎
  - `FASHION`: 200 💎

## 🎮 Teknisk Stack

### Avatar Rendering
- **DiceBear JavaScript Library**: Avatar-generering i browsern
- **PixiJS 7.4.2**: WebGL/Canvas 2D rendering för custom layers
- **SVG.js 3.2.0**: SVG-manipulation för avancerad anpassning

### Visuella Effekter
- **Anime.js 4.2.2**: Smooth animationer
- **TinyColor2**: Färgmanipulation och konvertering

### Arkitektur
- **Hybrid System**: Kombination av DiceBear + PixiJS + SVG.js
- **Tre Rendering-modes**:
  1. **DiceBear**: Snabb, pålitlig bas-avatar
  2. **PixiJS**: Custom layers, effekter, partiklar
  3. **SVG.js**: Direkt SVG-manipulation, export

## 📊 Rendering System

### Layer Stack (z-index)
1. **Base Layer** (z:1): DiceBear avatar SVG
2. **Custom Layer** (z:2): PixiJS canvas för custom items
3. **Effects Layer**: SVG effekter och mönster
4. **Pets Layer** (z:3): Animerade pets

### Avatar Generation
```javascript
// DiceBear JS Library - Körs i browsern
const avatar = createAvatar(avataaars, {
    seed: 'unique-seed',
    skinColor: ['light'],
    top: ['longHairStraight'],
    // ... etc
});

// Konvertera till Data URI för display
const dataUri = avatar.toDataUri();
```

## 🎯 Demo-Sidor

### 1. `demo-custom-layers.html`
Test av PixiJS custom layers:
- Unicorn T-shirt
- Dragon T-shirt
- Star Pattern
- Golden Crown
- Angel Wings
- Sparkle particles

### 2. `demo-svg-manipulation.html`
Fullständig SVG-manipulation:
- Ladda DiceBear avatar
- Multi-part färgning
- Pattern applicering
- Glow effekter
- Layer management
- SVG/PNG export

## 🚀 Användning

### Starta Spelet
1. Öppna `index.html` i en modern browser
2. Anpassa din avatar med flikarna
3. Köp kläder med diamanter
4. Spara dina favorit-outfits
5. Experimentera med Custom Design!

### Custom Design
1. Gå till 🎨 **Custom** fliken
2. Klicka på mönster/effekter
3. Se förändringarna live
4. Exportera din avatar

### Full SVG-kontroll
1. Öppna `demo-svg-manipulation.html`
2. Klicka "Ladda DiceBear Avatar"
3. Använd färgväljare och knappar
4. Manipulera SVG direkt
5. Exportera som SVG eller PNG

## 📝 Utvecklingshistorik

### Fas 1: PixiJS Hybrid System ✅
- Implementerade PixiJS rendering
- Custom clothing layers
- Color tinting med TinyColor
- Pattern generation
- Particle effects

### Fas 2: SVG Manipulation ✅
- SVG.js integration
- Multi-part coloring system
- Pattern library (ränder, prickar, etc.)
- Glow filter effects
- SVG/PNG export

### Fas 3: Integration ✅
- Custom Design-flik i huvudspelet
- SVGAvatarRenderer kopplad till game.js
- Automatisk avatar-synkronisering
- Export-funktionalitet

## 🐛 Felsökning

### Avatar syns inte
- Kontrollera console-loggen
- Verifiera att DiceBear laddats: `📦 DiceBear createAvatar loaded: true`
- Kontrollera att avatar skapats: `✅ Avatar created`
- Kontrollera bildladdning: `✅ Avatar image loaded successfully!`

### Custom Design fungerar inte
- Öppna `demo-svg-manipulation.html` för full funktionalitet
- Kontrollera att SVG.js laddats: `SVG.js: ✓`
- Se felmeddelanden i console

### Animationer fungerar inte
- Kontrollera att Anime.js laddats: `Anime.js loaded: true`
- Kontrollera browser-kompatibilitet (ES6 modules krävs)

## 🎨 Framtida Funktioner

### Planerade Förbättringar
- [ ] Custom SVG-tillbehör i butiken
- [ ] Live preview av mönster innan applicering
- [ ] Färgpalett-generator
- [ ] Social delning av avatarer
- [ ] Avatar-gallerienligt
- [ ] Mini-spel för att tjäna diamanter
- [ ] Achievement system
- [ ] Daily rewards

## 📄 Licens

StyleSpace är ett hobbyprojekt skapat med:
- **DiceBear**: Open source avatar library
- **PixiJS**: Open source 2D rendering
- **SVG.js**: SVG manipulation library
- **Anime.js**: Animation library
- **TinyColor**: Color manipulation

---

**Utvecklat med ❤️ för avatar-entusiaster och anime-fans!**

🎮 **Njut av StyleSpace!** ✨
