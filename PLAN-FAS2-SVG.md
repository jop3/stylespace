# 📋 Fas 2: Full Custom SVG Manipulation - Implementation Plan

## 🎯 Mål
Skapa ett parallellt rendering-system som ger **full kontroll** över DiceBear SVG:en genom direkt manipulation, vilket möjliggör:
- Multi-part coloring (ändra färg på olika delar av samma klädesplagg)
- Offline-mode med lokalt sparade SVG:er
- Interaktiv drag-and-drop för decals/stickers
- Custom pattern overlays på specifika delar
- Mer granular kontroll än API:et tillåter

---

## 🛠️ Tech Stack

### Bibliotek
- **SVG.js** (3.2.0) - SVG manipulation och animation
- **Fabric.js** (5.3.0) - Interaktiv canvas med drag-and-drop
- **TinyColor2** (1.6.0) - Färgmanipulation (redan integrerat)
- **Anime.js** (4.2.2) - Animationer (redan integrerat)

### Filstruktur
```
stylespace/
├── svg-avatar-renderer.js       # SVG manipulation system
├── fabric-interactive.js        # Fabric.js interaktiv layer
├── assets/
│   ├── dicebear-cache/          # Cached DiceBear SVGs
│   ├── svg-parts/               # Individual SVG parts
│   │   ├── hair/
│   │   ├── clothes/
│   │   ├── accessories/
│   │   └── patterns/
│   └── decals/                  # User-placeable decals
├── demo-svg-manipulation.html   # Demo för SVG system
└── index-svg.html               # Huvudspel med SVG system
```

---

## 📝 Implementation Steps

### **Steg 1: SVG.js Integration** (1-2 timmar)

#### 1.1 Setup
```javascript
// svg-avatar-renderer.js
class SVGAvatarRenderer {
    constructor(containerId) {
        this.container = SVG().addTo(`#${containerId}`).size(400, 400);
        this.layers = {
            base: this.container.group(),
            clothing: this.container.group(),
            accessories: this.container.group(),
            decals: this.container.group()
        };
    }

    async loadDicebearSVG(url) {
        const response = await fetch(url);
        const svgText = await response.text();

        // Parse and add to base layer
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgElement = svgDoc.documentElement;

        this.baseSVG = this.layers.base.svg(svgElement.outerHTML);
        return this.baseSVG;
    }
}
```

#### 1.2 SVG Element Targeting
```javascript
// Find and manipulate specific SVG paths
findAndColorPart(partId, color) {
    const element = this.container.findOne(`#${partId}`);
    if (element) {
        element.fill(tinycolor(color).toHexString());
    }
}

// Multi-part coloring for clothes
colorClothingParts(parts) {
    // parts = { base: '#FF6B9D', collar: '#4169E1', buttons: '#FFD700' }
    Object.entries(parts).forEach(([partName, color]) => {
        this.findAndColorPart(`clothing-${partName}`, color);
    });
}
```

#### 1.3 Pattern Overlays
```javascript
addPatternToClothing(patternType, colors) {
    const clothingBounds = this.getClothingBounds();
    const pattern = this.createSVGPattern(patternType, colors);

    // Create clip path based on clothing shape
    const clipPath = this.container.clip();
    clipPath.add(this.layers.clothing.clone());

    pattern.clipWith(clipPath);
    this.layers.clothing.addChild(pattern);
}
```

---

### **Steg 2: Fabric.js Interactive Layer** (2-3 timmar)

#### 2.1 Setup Fabric Canvas
```javascript
// fabric-interactive.js
class FabricInteractiveLayer {
    constructor(canvasId) {
        this.canvas = new fabric.Canvas(canvasId, {
            width: 400,
            height: 400,
            backgroundColor: 'transparent'
        });

        this.decals = [];
        this.setupEventHandlers();
    }

    addDecal(imageUrl, options = {}) {
        fabric.Image.fromURL(imageUrl, (img) => {
            img.set({
                left: options.x || 200,
                top: options.y || 200,
                scaleX: options.scale || 0.5,
                scaleY: options.scale || 0.5,
                angle: options.rotation || 0
            });

            this.canvas.add(img);
            this.decals.push(img);
            this.canvas.setActiveObject(img);
        });
    }

    setupEventHandlers() {
        // Double-click to delete
        this.canvas.on('mouse:dblclick', (e) => {
            if (e.target) {
                this.canvas.remove(e.target);
                this.decals = this.decals.filter(d => d !== e.target);
            }
        });

        // Right-click for context menu
        this.canvas.on('mouse:down', (e) => {
            if (e.button === 3 && e.target) {
                this.showContextMenu(e.target, e.pointer);
            }
        });
    }

    exportToImage() {
        return this.canvas.toDataURL({
            format: 'png',
            quality: 1
        });
    }
}
```

#### 2.2 Decal Library
```javascript
const decalLibrary = {
    stickers: [
        { id: 'heart', url: 'assets/decals/heart.svg', price: 10 },
        { id: 'star', url: 'assets/decals/star.svg', price: 10 },
        { id: 'flower', url: 'assets/decals/flower.svg', price: 15 },
        { id: 'skull', url: 'assets/decals/skull.svg', price: 20 },
        { id: 'lightning', url: 'assets/decals/lightning.svg', price: 15 }
    ],
    text: [
        { id: 'cool', text: 'COOL', font: 'Arial Black', price: 20 },
        { id: 'love', text: '❤️', font: 'Arial', price: 15 },
        { id: 'emoji', text: '😎', font: 'Arial', price: 10 }
    ]
};

addTextDecal(text, options = {}) {
    const fabricText = new fabric.Text(text, {
        left: options.x || 200,
        top: options.y || 200,
        fontSize: options.fontSize || 30,
        fontFamily: options.font || 'Arial',
        fill: options.color || '#000000',
        stroke: options.stroke || '#FFFFFF',
        strokeWidth: options.strokeWidth || 2
    });

    this.canvas.add(fabricText);
    this.canvas.setActiveObject(fabricText);
}
```

---

### **Steg 3: DiceBear SVG Caching & Offline Mode** (1-2 timmar)

#### 3.1 Cache System
```javascript
// dicebear-cache.js
class DicebearCache {
    constructor() {
        this.cacheDir = 'assets/dicebear-cache/';
        this.db = {}; // Could use IndexedDB for persistence
    }

    async fetchAndCache(avatarConfig) {
        const cacheKey = this.generateCacheKey(avatarConfig);

        // Check cache first
        if (this.db[cacheKey]) {
            console.log('📦 Loading from cache:', cacheKey);
            return this.db[cacheKey];
        }

        // Fetch from API
        const url = this.buildDicebearURL(avatarConfig);
        const response = await fetch(url);
        const svgText = await response.text();

        // Cache it
        this.db[cacheKey] = svgText;
        console.log('💾 Cached:', cacheKey);

        return svgText;
    }

    generateCacheKey(config) {
        return Object.entries(config)
            .sort()
            .map(([k, v]) => `${k}=${v}`)
            .join('&');
    }

    async downloadForOffline(config) {
        const svg = await this.fetchAndCache(config);
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        // Trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = `avatar-${Date.now()}.svg`;
        a.click();
    }
}
```

#### 3.2 SVG Part Extraction
```javascript
// Extract individual parts from DiceBear SVG for mixing
async extractSVGParts(svgText) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');

    const parts = {
        hair: doc.querySelector('[id*="hair"]'),
        top: doc.querySelector('[id*="top"]'),
        accessories: doc.querySelector('[id*="accessories"]'),
        // ... etc
    };

    // Save each part as separate SVG
    for (const [name, element] of Object.entries(parts)) {
        if (element) {
            await this.savePart(name, element);
        }
    }

    return parts;
}
```

---

### **Steg 4: Multi-Part Clothing System** (2-3 timmar)

#### 4.1 Custom Clothing SVG Template
```xml
<!-- assets/svg-parts/clothes/hoodie-multipart.svg -->
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  <g id="hoodie">
    <!-- Base body -->
    <path id="hoodie-body" d="M 50,50 L 250,50 L 250,180 L 50,180 Z" fill="#4169E1"/>

    <!-- Hood -->
    <path id="hoodie-hood" d="M 80,40 Q 150,20 220,40 L 220,80 L 80,80 Z" fill="#1E3A8A"/>

    <!-- Pockets -->
    <rect id="hoodie-pocket-left" x="70" y="120" width="50" height="40" fill="#1E3A8A"/>
    <rect id="hoodie-pocket-right" x="180" y="120" width="50" height="40" fill="#1E3A8A"/>

    <!-- Zipper -->
    <line id="hoodie-zipper" x1="150" y1="50" x2="150" y2="180" stroke="#FFD700" stroke-width="3"/>

    <!-- Drawstrings -->
    <circle id="hoodie-string-left" cx="120" cy="60" r="3" fill="#FFFFFF"/>
    <circle id="hoodie-string-right" cx="180" cy="60" r="3" fill="#FFFFFF"/>
  </g>
</svg>
```

#### 4.2 Multi-Part Controller
```javascript
class MultiPartClothingController {
    constructor(svgRenderer) {
        this.renderer = svgRenderer;
        this.parts = {};
    }

    loadClothing(clothingId) {
        const svg = SVG().svg(clothingTemplates[clothingId]);

        // Extract all parts with IDs
        svg.find('[id]').forEach(element => {
            const id = element.attr('id');
            this.parts[id] = element;
        });

        this.renderer.layers.clothing.add(svg);
    }

    colorPart(partId, color) {
        if (this.parts[partId]) {
            this.parts[partId].fill(tinycolor(color).toHexString());
        }
    }

    applyMaterialTexture(partId, textureUrl) {
        // Apply texture as pattern fill
        const pattern = this.renderer.container.pattern(100, 100, (add) => {
            add.image(textureUrl);
        });

        if (this.parts[partId]) {
            this.parts[partId].fill(pattern);
        }
    }

    // Color palette for multi-part customization
    getColorPalette() {
        return {
            body: this.parts['hoodie-body']?.fill(),
            hood: this.parts['hoodie-hood']?.fill(),
            pockets: this.parts['hoodie-pocket-left']?.fill(),
            zipper: this.parts['hoodie-zipper']?.stroke()
        };
    }
}
```

---

### **Steg 5: Pattern & Texture System** (2-3 timmar)

#### 5.1 SVG Pattern Library
```javascript
const svgPatterns = {
    stripes: (color1, color2, angle = 0) => `
        <pattern id="stripes" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(${angle})">
            <rect width="10" height="20" fill="${color1}"/>
            <rect x="10" width="10" height="20" fill="${color2}"/>
        </pattern>
    `,

    polkadots: (dotColor, bgColor, size = 5) => `
        <pattern id="polkadots" patternUnits="userSpaceOnUse" width="20" height="20">
            <rect width="20" height="20" fill="${bgColor}"/>
            <circle cx="10" cy="10" r="${size}" fill="${dotColor}"/>
        </pattern>
    `,

    checkerboard: (color1, color2, size = 10) => `
        <pattern id="checkerboard" patternUnits="userSpaceOnUse" width="${size*2}" height="${size*2}">
            <rect width="${size}" height="${size}" fill="${color1}"/>
            <rect x="${size}" y="${size}" width="${size}" height="${size}" fill="${color1}"/>
            <rect x="${size}" width="${size}" height="${size}" fill="${color2}"/>
            <rect y="${size}" width="${size}" height="${size}" fill="${color2}"/>
        </pattern>
    `,

    gradient: (color1, color2, direction = 'vertical') => `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="${direction === 'horizontal' ? '100%' : '0%'}" y2="${direction === 'vertical' ? '100%' : '0%'}">
            <stop offset="0%" style="stop-color:${color1}"/>
            <stop offset="100%" style="stop-color:${color2}"/>
        </linearGradient>
    `
};

class PatternController {
    applyPattern(targetElement, patternType, ...colors) {
        const patternDef = svgPatterns[patternType](...colors);

        // Add pattern to defs
        const defs = this.renderer.container.defs();
        defs.svg(patternDef);

        // Apply to element
        targetElement.fill(`url(#${patternType})`);
    }
}
```

#### 5.2 Texture Mapping
```javascript
// Load real fabric textures
const fabricTextures = {
    denim: 'assets/textures/denim.jpg',
    leather: 'assets/textures/leather.jpg',
    cotton: 'assets/textures/cotton.jpg',
    silk: 'assets/textures/silk.jpg',
    velvet: 'assets/textures/velvet.jpg'
};

applyFabricTexture(element, textureName) {
    const pattern = this.renderer.container.pattern(200, 200, (add) => {
        add.image(fabricTextures[textureName]).size(200, 200);
    });

    element.fill(pattern);

    // Add color overlay
    element.css({
        'mix-blend-mode': 'multiply'
    });
}
```

---

### **Steg 6: UI Integration** (3-4 timmar)

#### 6.1 New Tab: "Custom Design"
```html
<!-- In index.html -->
<div class="tab-content" id="custom-tab">
    <div class="customization-section">
        <h3>🎨 Custom Design Studio</h3>

        <!-- Rendering Mode Toggle -->
        <div class="mode-toggle">
            <button class="mode-btn active" data-mode="svg">SVG Mode</button>
            <button class="mode-btn" data-mode="pixi">PixiJS Mode</button>
        </div>

        <!-- Multi-Part Coloring -->
        <div class="multi-part-section">
            <h4>Färglägg Delar</h4>
            <div id="partColorControls">
                <!-- Dynamically generated based on loaded clothing -->
            </div>
        </div>

        <!-- Pattern Selection -->
        <div class="pattern-section">
            <h4>Mönster</h4>
            <select id="patternSelect">
                <option value="">Inget mönster</option>
                <option value="stripes">Ränder</option>
                <option value="polkadots">Prickar</option>
                <option value="checkerboard">Schack</option>
                <option value="gradient">Gradient</option>
            </select>
            <input type="color" id="patternColor1" value="#FF6B9D">
            <input type="color" id="patternColor2" value="#4169E1">
            <button onclick="applyPattern()">Applicera</button>
        </div>

        <!-- Decal Studio -->
        <div class="decal-section">
            <h4>Decals & Stickers</h4>
            <div class="decal-library">
                <!-- Decal thumbnails -->
            </div>
            <button onclick="enableDecalMode()">Lägg till Decal</button>
        </div>

        <!-- Export Options -->
        <div class="export-section">
            <button onclick="exportAsImage()">💾 Exportera som PNG</button>
            <button onclick="exportAsSVG()">📄 Exportera som SVG</button>
        </div>
    </div>
</div>
```

#### 6.2 Color Picker Component
```javascript
// Advanced color picker with presets
class ColorPickerController {
    constructor(targetElementId) {
        this.target = targetElementId;
        this.createPicker();
    }

    createPicker() {
        const picker = document.createElement('div');
        picker.className = 'color-picker-panel';
        picker.innerHTML = `
            <input type="color" id="colorInput">
            <div class="color-presets">
                ${this.createPresets()}
            </div>
            <div class="color-controls">
                <label>Ljushet: <input type="range" min="0" max="100" id="lightness"></label>
                <label>Mättnad: <input type="range" min="0" max="100" id="saturation"></label>
            </div>
        `;

        this.setupEventListeners(picker);
        return picker;
    }

    createPresets() {
        const presets = [
            '#FF6B9D', '#4169E1', '#32CD32', '#FFD700',
            '#DC143C', '#9370DB', '#40E0D0', '#FFA500'
        ];

        return presets.map(color =>
            `<div class="preset-color" style="background: ${color}" data-color="${color}"></div>`
        ).join('');
    }
}
```

---

### **Steg 7: Advanced Features** (4-5 timmar)

#### 7.1 Layer Blending Modes
```javascript
applyBlendMode(layer, mode) {
    // CSS blend modes: multiply, screen, overlay, etc.
    layer.css({
        'mix-blend-mode': mode,
        'opacity': mode === 'multiply' ? 0.7 : 1
    });
}
```

#### 7.2 SVG Filters & Effects
```javascript
const svgFilters = {
    glow: `
        <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    `,

    shadow: `
        <filter id="shadow">
            <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.5"/>
        </filter>
    `,

    emboss: `
        <filter id="emboss">
            <feConvolveMatrix
                kernelMatrix="3 0 0 0 0 0 0 0 -3"/>
        </filter>
    `
};

applyFilter(element, filterName) {
    element.attr('filter', `url(#${filterName})`);
}
```

#### 7.3 Animation Sequences
```javascript
// Animate SVG paths
animateDrawing(path) {
    const length = path.length();

    path.css({
        'stroke-dasharray': length,
        'stroke-dashoffset': length
    });

    anime({
        targets: path.node,
        strokeDashoffset: [length, 0],
        duration: 2000,
        easing: 'easeInOutQuad'
    });
}
```

---

## 📊 Progress Tracking

### Phase 1: Foundation (Week 1)
- [ ] SVG.js integration
- [ ] Basic SVG loading and manipulation
- [ ] Color changing functionality
- [ ] Demo page

### Phase 2: Interaction (Week 2)
- [ ] Fabric.js integration
- [ ] Decal system
- [ ] Drag-and-drop functionality
- [ ] Context menus

### Phase 3: Advanced (Week 3)
- [ ] Multi-part clothing
- [ ] Pattern system
- [ ] Texture mapping
- [ ] Cache system

### Phase 4: UI Polish (Week 4)
- [ ] Custom Design tab
- [ ] Color picker
- [ ] Export functions
- [ ] Integration with outfit system

---

## 🎯 Success Metrics

✅ **Must Have:**
- Load DiceBear SVG and manipulate colors
- Multi-part coloring (minimum 3 parts per item)
- Basic pattern overlay (stripes, dots)
- Export as PNG/SVG
- Works offline with cached SVGs

🎁 **Nice to Have:**
- Fabric.js decal system
- Advanced filters and effects
- Custom texture mapping
- Animation sequences
- User-uploaded patterns

🚀 **Future:**
- AI-powered design suggestions
- Community design sharing
- Marketplace for custom designs
- 3D avatar preview

---

## 💡 Key Advantages vs PixiJS

| Feature | PixiJS (Fas 1) | SVG.js (Fas 2) |
|---------|----------------|----------------|
| **Granularity** | Sprite-level | Path-level |
| **File Format** | PNG/JPG sprites | SVG vectors |
| **Scalability** | Fixed resolution | Infinite scaling |
| **File Size** | Larger | Smaller |
| **Manipulation** | Tinting | True recoloring |
| **Multi-part** | Multiple sprites | Single SVG |
| **Export** | PNG only | SVG + PNG |
| **Offline** | Needs assets | Can inline SVG |

---

## 🔄 Integration Strategy

### Parallel Systems
```javascript
// Game will support both renderers
const rendererConfig = {
    mode: 'svg', // or 'pixi'
    fallback: 'pixi' // if SVG fails
};

class AvatarManager {
    constructor(config) {
        if (config.mode === 'svg') {
            this.renderer = new SVGAvatarRenderer();
        } else {
            this.renderer = new PixiAvatarRenderer();
        }
    }

    // Unified API
    addClothing(item, options) {
        return this.renderer.addClothing(item, options);
    }

    changeColor(part, color) {
        return this.renderer.changeColor(part, color);
    }
}
```

### User Choice
```javascript
// Let users choose their preferred renderer
function showRendererChoice() {
    return new Promise(resolve => {
        const dialog = `
            <div class="renderer-choice">
                <h3>Välj Rendering Mode</h3>
                <div class="choice-option">
                    <input type="radio" name="renderer" value="svg" id="svg-mode">
                    <label for="svg-mode">
                        <strong>SVG Mode</strong>
                        <small>Mer kontroll, multi-part coloring</small>
                    </label>
                </div>
                <div class="choice-option">
                    <input type="radio" name="renderer" value="pixi" id="pixi-mode" checked>
                    <label for="pixi-mode">
                        <strong>PixiJS Mode</strong>
                        <small>Snabbare, effects, particles</small>
                    </label>
                </div>
                <button onclick="confirmChoice()">Välj</button>
            </div>
        `;
        // Show dialog and resolve with choice
    });
}
```

---

## 📅 Timeline Estimate

| Week | Focus | Hours | Deliverables |
|------|-------|-------|--------------|
| **1** | Foundation | 8-10h | SVG loader, color manipulation, demo |
| **2** | Interaction | 8-10h | Fabric.js, decals, drag-drop |
| **3** | Advanced | 10-12h | Multi-part, patterns, cache |
| **4** | Polish | 6-8h | UI, export, integration |

**Total:** ~40 hours for full implementation

---

## 🚀 Quick Start (för dig att testa)

### Minimal Working Example
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/@svgdotjs/svg.js@3.2.0/dist/svg.min.js"></script>
</head>
<body>
    <div id="avatar-svg"></div>
    <button onclick="changeHairColor()">Change Hair Color</button>

    <script>
        const draw = SVG().addTo('#avatar-svg').size(400, 400);

        fetch('https://api.dicebear.com/9.x/avataaars/svg?...')
            .then(r => r.text())
            .then(svg => {
                draw.svg(svg);

                // Find and manipulate hair
                const hair = draw.findOne('[id*="hair"]');
                if (hair) {
                    window.changeHairColor = () => {
                        hair.fill('#FF6B9D');
                    };
                }
            });
    </script>
</body>
</html>
```

---

## ❓ Next Steps - Ditt Val!

**Vill du:**
1. ✅ **Börja implementera Fas 2 nu?**
2. 🎨 **Först förbättra PixiJS-systemet mer?**
3. 🔀 **Fokusera på UI-integration för båda systemen?**
4. 📦 **Skapa en "renderer switcher" så users kan välja?**
5. 💡 **Något helt annat?**

Säg bara vad du vill göra härnäst! 🚀
