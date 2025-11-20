# 🤖 LLM-Driven Vector Character Design System

## Overview

Ett kraftfullt system för att skapa detaljerade karaktärer med vektorgrafik som kan genereras helt av en LLM genom JSON-specifikationer.

## Vad är nytt?

### 1. **SVG Color Remapper** (`svg-color-remapper.js`)
- Gör befintliga SVG:er med hardcodade färger anpassningsbara
- Intelligent färgmappning baserad på brightness
- Stödjer både automatisk och manuell färgremapping

### 2. **Clothing Engine** (`clothing-engine.js`)
- Komplett LLM-driven outfit-system
- Integrerar med 62 befintliga SVG-assets
- Stödjer tops, bottoms, shoes, accessories
- Automatisk positionering och skalning

### 3. **Asset Database** (redan finns!)
- 62 SVG-assets i 12 kategorier
- T-shirts, hoodies, jackets, pants, shoes, accessories, jewelry, hats, bags, etc.
- Alla assets har metadata (colors, tags, price)

### 4. **LLM Outfit Import UI**
- Nytt UI i "🎨 Custom" tab
- Textarea för att klistra in LLM-genererade JSON-specs
- 5 preset outfits (Sporty, Elegant, Gamer, Winter, Rock)
- "Ladda Exempel" för att se JSON-format

## Hur använder man systemet?

### För Användare:

1. **Öppna spelet** i webbläsaren
2. **Gå till "🎨 Custom" tab**
3. **Välj ett alternativ:**
   - Tryck på en preset-knapp (🏃 Sporty, 👗 Elegant, etc.)
   - Tryck på "📋 Ladda Exempel" för att se JSON-formatet
   - Klistra in din egen JSON-spec från en LLM

4. **Tryck på "✨ Applicera Outfit"**

### För LLM:er:

En LLM kan generera outfits genom att skapa JSON i detta format:

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
    },
    "accessories": [
      {
        "assetId": "accessory_watch_digital",
        "colors": ["#2C3E50", "#27AE60"]
      }
    ]
  }
}
```

## Tillgängliga Assets

Se `llm-outfit-specs.md` för fullständig lista med:
- 20 T-shirt designs
- 3 Hoodies
- 3 Jackets
- 2 Dresses
- 2 Skirts
- 2 Pants
- 1 Shorts
- 6 Shoes
- 9 Accessories (eyewear, watches, scarf, crown, wings)
- 5 Jewelry items
- 4 Hats
- 3 Bags

## Exempel Outfits

I mappen `example-outfits/` finns 5 färdiga exempel:
- `casual-summer.json` - Sommar-outfit
- `tech-geek.json` - Geek-outfit med coding t-shirt
- `party-night.json` - Glamorös festoutfit
- `streetwear-urban.json` - Urban streetwear
- `kawaii-cute.json` - Kawaii cute stil

## Teknisk Arkitektur

```
User/LLM
    ↓
JSON Outfit Spec
    ↓
ClothingEngine.applyOutfit()
    ↓
SVGColorRemapper (färganpassning)
    ↓
SVGAvatarRenderer (rendering)
    ↓
Layered SVG Display
```

## Filstruktur

```
stylespace/
├── svg-color-remapper.js         # Gör SVG:er färganpassningsbara
├── clothing-engine.js             # LLM-driven outfit engine
├── llm-outfit-specs.md            # Komplett dokumentation för LLM:er
├── LLM-OUTFIT-SYSTEM-README.md    # Denna fil
├── assets/
│   ├── asset-database.js          # 62 SVG assets med metadata
│   ├── tshirts/                   # 20 t-shirt designs
│   ├── hoodies/                   # 3 hoodies
│   ├── jackets/                   # 3 jackets
│   ├── pants/                     # 2 pants
│   ├── shoes/                     # 6 shoes
│   ├── accessories/               # 9 accessories
│   ├── jewelry/                   # 5 jewelry
│   ├── hats/                      # 4 hats
│   └── bags/                      # 3 bags
└── example-outfits/
    ├── casual-summer.json
    ├── tech-geek.json
    ├── party-night.json
    ├── streetwear-urban.json
    └── kawaii-cute.json
```

## API för LLM:er

### Basic Outfit Spec
```json
{
  "outfit": {
    "top": { "assetId": "...", "colors": [...] },
    "bottom": { "assetId": "...", "colors": [...] },
    "shoes": { "assetId": "...", "colors": [...] },
    "accessories": [...]
  }
}
```

### Med Search (istället för assetId)
```json
{
  "outfit": {
    "top": {
      "search": { "tags": ["hoodie", "casual"] },
      "colors": ["#3498DB", "#E74C3C"]
    }
  }
}
```

### Med Type/Style
```json
{
  "outfit": {
    "top": {
      "type": "hoodies",
      "style": "colorblock",
      "colors": ["#FF6B9D", "#4169E1"]
    }
  }
}
```

### Med Custom Positioning
```json
{
  "outfit": {
    "accessories": [{
      "assetId": "accessory_crown",
      "position": { "x": 140, "y": 10, "scale": 0.7 }
    }]
  }
}
```

## Färgscheman

Varje asset kan ta 2-6 färger som array:
- `colors[0]` = Primary color
- `colors[1]` = Secondary color
- `colors[2]` = Accent color
- `colors[3]` = Highlight color
- `colors[4]` = Shadow color
- `colors[5]` = Detail color

SVGColorRemapper mappar automatiskt färgerna baserat på originalfärgernas brightness.

## Fördelar med detta system

1. **LLM-Vänligt**: JSON är enkelt för LLM:er att generera
2. **Flexibelt**: Stödjer både asset IDs, search, och type/style
3. **Färganpassningsbart**: Alla assets kan få nya färger
4. **Skalbart**: Lätt att lägga till nya assets
5. **Återanvänder befintliga assets**: 62 SVG:er redan klara att användas
6. **Layer-baserat**: Clothing, accessories, effects i separata lager

## Nästa Steg

Potentiella förbättringar:
- [ ] Procedural SVG generation för unika kläder
- [ ] Fabric.js för interaktiv editing
- [ ] Pattern och texture mapping
- [ ] Animation support
- [ ] Export till olika format
- [ ] AI-driven outfit suggestions baserat på stil

## Exempel på LLM Prompt

```
Skapa en outfit-spec för en sportig tjej som gillar gaming.
Använd följande format:

{
  "outfit": {
    "top": {"assetId": "...", "colors": [...]},
    "bottom": {"assetId": "...", "colors": [...]},
    "shoes": {"assetId": "...", "colors": [...]},
    "accessories": [...]
  }
}

Tillgängliga assets finns i llm-outfit-specs.md.
```

## Support

För frågor eller problem:
- Se `llm-outfit-specs.md` för fullständig dokumentation
- Kolla `example-outfits/` för färdiga exempel
- Öppna Developer Console för debug-meddelanden
