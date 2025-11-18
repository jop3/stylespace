// ============================================
// SVG AVATAR RENDERER (SVG.js + TinyColor)
// Full control over DiceBear SVG with direct manipulation
//
// Works with:
// - DiceBear HTTP API (legacy)
// - DiceBear JavaScript Library (recommended)
// ============================================

class SVGAvatarRenderer {
    constructor(containerId) {
        console.log('🎨 Initializing SVG Avatar Renderer...');

        // Check if SVG.js is loaded
        if (typeof SVG === 'undefined') {
            console.error('❌ SVG.js not loaded!');
            return;
        }
        if (typeof tinycolor === 'undefined') {
            console.error('❌ TinyColor not loaded!');
            return;
        }

        console.log('✅ SVG.js loaded');
        console.log('✅ TinyColor loaded');

        // Create SVG canvas
        this.container = SVG().addTo(`#${containerId}`).size(400, 400);
        this.container.attr('id', 'svg-avatar-canvas');

        // Layer groups for organization
        this.layers = {
            base: this.container.group().attr('id', 'layer-base'),
            clothing: this.container.group().attr('id', 'layer-clothing'),
            accessories: this.container.group().attr('id', 'layer-accessories'),
            decals: this.container.group().attr('id', 'layer-decals'),
            effects: this.container.group().attr('id', 'layer-effects')
        };

        // Store references to SVG parts for manipulation
        this.svgParts = {
            hair: null,
            top: null,
            accessories: null,
            facialHair: null,
            clothes: null,
            skin: null,
            eyes: null
        };

        // Current avatar data
        this.currentAvatar = null;

        // Pattern definitions
        this.patterns = {};

        console.log('🎭 SVG Avatar Renderer initialized');
    }

    // Load DiceBear SVG from URL
    async loadDicebearSVG(url) {
        console.log('📥 Loading DiceBear SVG from:', url);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const svgText = await response.text();
            console.log('✅ SVG loaded, size:', svgText.length, 'bytes');

            // Parse and add to base layer
            await this.parseSVG(svgText);

            return svgText;
        } catch (error) {
            console.error('❌ Failed to load DiceBear SVG:', error);
            throw error;
        }
    }

    // Parse SVG and extract parts
    async parseSVG(svgText) {
        console.log('🔍 Parsing SVG...');

        // Clear existing content
        this.layers.base.clear();

        // Add SVG to base layer
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = svgText;
        const svgElement = tempDiv.querySelector('svg');

        if (!svgElement) {
            throw new Error('Invalid SVG');
        }

        // Import SVG content
        this.layers.base.svg(svgElement.innerHTML);

        // Find and store references to different parts
        this.extractSVGParts();

        console.log('✅ SVG parsed and loaded');
    }

    // Extract references to different SVG parts
    extractSVGParts() {
        console.log('🔍 Extracting SVG parts...');

        // DiceBear uses specific IDs and classes
        // We'll search for common patterns

        // Try to find hair elements
        const hairElements = this.container.find('[id*="hair"], [class*="hair"]');
        if (hairElements.length > 0) {
            this.svgParts.hair = hairElements;
            console.log('  📌 Found hair elements:', hairElements.length);
        }

        // Try to find clothing
        const clothingElements = this.container.find('[id*="clothes"], [id*="clothe"], [class*="clothes"]');
        if (clothingElements.length > 0) {
            this.svgParts.clothes = clothingElements;
            console.log('  📌 Found clothing elements:', clothingElements.length);
        }

        // Try to find accessories
        const accessoryElements = this.container.find('[id*="accessories"], [class*="accessories"]');
        if (accessoryElements.length > 0) {
            this.svgParts.accessories = accessoryElements;
            console.log('  📌 Found accessory elements:', accessoryElements.length);
        }

        // Find skin elements
        const skinElements = this.container.find('[id*="skin"], [class*="skin"]');
        if (skinElements.length > 0) {
            this.svgParts.skin = skinElements;
            console.log('  📌 Found skin elements:', skinElements.length);
        }

        // Find all fillable paths (for generic coloring)
        const allPaths = this.container.find('path, circle, rect, ellipse, polygon');
        console.log('  📌 Total colorable elements:', allPaths.length);

        // Store all elements for advanced manipulation
        this.svgParts.all = allPaths;
    }

    // Change color of specific part
    colorPart(selector, color) {
        console.log(`🎨 Coloring ${selector} with ${color}`);

        const elements = this.container.find(selector);
        if (elements.length === 0) {
            console.warn(`⚠️ No elements found for selector: ${selector}`);
            return false;
        }

        const hexColor = tinycolor(color).toHexString();

        elements.each(function() {
            // Check if element has fill attribute
            if (this.attr('fill') && this.attr('fill') !== 'none') {
                this.fill(hexColor);
            }
            // Check if element has stroke
            if (this.attr('stroke') && this.attr('stroke') !== 'none') {
                this.stroke(hexColor);
            }
        });

        console.log(`✅ Colored ${elements.length} elements`);
        return true;
    }

    // Multi-part coloring for clothing
    colorClothingParts(partColors) {
        console.log('🎨 Multi-part clothing coloring:', partColors);

        Object.entries(partColors).forEach(([partName, color]) => {
            // Try different selectors
            const selectors = [
                `[id*="${partName}"]`,
                `[class*="${partName}"]`,
                `.${partName}`,
                `#${partName}`
            ];

            let found = false;
            for (const selector of selectors) {
                if (this.colorPart(selector, color)) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                console.warn(`⚠️ Could not find part: ${partName}`);
            }
        });
    }

    // Apply pattern to element
    applyPattern(selector, patternType, colors) {
        console.log(`🎨 Applying ${patternType} pattern to ${selector}`);

        const patternId = `pattern-${patternType}-${Date.now()}`;
        const pattern = this.createPattern(patternId, patternType, colors);

        if (!pattern) {
            console.error('❌ Failed to create pattern');
            return false;
        }

        // Apply pattern to selected elements
        const elements = this.container.find(selector);
        if (elements.length === 0) {
            console.warn(`⚠️ No elements found for selector: ${selector}`);
            return false;
        }

        elements.each(function() {
            if (this.attr('fill') && this.attr('fill') !== 'none') {
                this.fill(`url(#${patternId})`);
            }
        });

        console.log(`✅ Pattern applied to ${elements.length} elements`);
        return true;
    }

    // Create SVG pattern
    createPattern(id, type, colors) {
        console.log(`🎨 Creating ${type} pattern with ID: ${id}`);

        const defs = this.container.defs();
        let patternElement;

        switch (type) {
            case 'stripes':
                patternElement = defs.pattern(20, 20, function(add) {
                    add.rect(10, 20).fill(colors[0] || '#FF6B9D');
                    add.rect(10, 20).move(10, 0).fill(colors[1] || '#4169E1');
                });
                patternElement.attr({
                    id: id,
                    patternUnits: 'userSpaceOnUse'
                });
                break;

            case 'polkadots':
                patternElement = defs.pattern(20, 20, function(add) {
                    add.rect(20, 20).fill(colors[1] || '#FFFFFF');
                    add.circle(5).move(7.5, 7.5).fill(colors[0] || '#FF6B9D');
                });
                patternElement.attr({
                    id: id,
                    patternUnits: 'userSpaceOnUse'
                });
                break;

            case 'checkerboard':
                patternElement = defs.pattern(20, 20, function(add) {
                    add.rect(10, 10).fill(colors[0] || '#FF6B9D');
                    add.rect(10, 10).move(10, 10).fill(colors[0] || '#FF6B9D');
                    add.rect(10, 10).move(10, 0).fill(colors[1] || '#4169E1');
                    add.rect(10, 10).move(0, 10).fill(colors[1] || '#4169E1');
                });
                patternElement.attr({
                    id: id,
                    patternUnits: 'userSpaceOnUse'
                });
                break;

            case 'gradient':
                // Linear gradient instead of pattern
                patternElement = defs.gradient('linear', function(add) {
                    add.stop(0, colors[0] || '#FF6B9D');
                    add.stop(1, colors[1] || '#4169E1');
                });
                patternElement.attr({ id: id });
                break;

            default:
                console.error(`❌ Unknown pattern type: ${type}`);
                return null;
        }

        this.patterns[id] = patternElement;
        return patternElement;
    }

    // Apply glow filter
    applyGlow(selector, color = '#FF6B9D', blur = 4) {
        console.log(`✨ Applying glow to ${selector}`);

        const defs = this.container.defs();
        const filterId = `glow-${Date.now()}`;

        // Create glow filter
        const filter = defs.element('filter').attr({ id: filterId });

        filter.element('feGaussianBlur')
            .attr({
                in: 'SourceGraphic',
                stdDeviation: blur,
                result: 'blur'
            });

        filter.element('feFlood')
            .attr({
                'flood-color': tinycolor(color).toHexString(),
                'flood-opacity': 0.7,
                result: 'color'
            });

        filter.element('feComposite')
            .attr({
                in: 'color',
                in2: 'blur',
                operator: 'in',
                result: 'glow'
            });

        const merge = filter.element('feMerge');
        merge.element('feMergeNode').attr({ in: 'glow' });
        merge.element('feMergeNode').attr({ in: 'SourceGraphic' });

        // Apply filter to elements
        const elements = this.container.find(selector);
        elements.each(function() {
            this.attr('filter', `url(#${filterId})`);
        });

        console.log(`✅ Glow applied to ${elements.length} elements`);
    }

    // Add custom SVG element from URL
    async addCustomSVG(url, layerName = 'decals', position = {x: 0, y: 0}, size = {width: 100, height: 100}) {
        console.log(`📥 Loading custom SVG from: ${url}`);

        try {
            const response = await fetch(url);
            const svgText = await response.text();

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = svgText;
            const svgElement = tempDiv.querySelector('svg');

            if (!svgElement) {
                throw new Error('Invalid SVG');
            }

            // Add to specified layer
            const layer = this.layers[layerName] || this.layers.decals;
            const group = layer.group();

            group.svg(svgElement.innerHTML);
            group.move(position.x, position.y);

            // Scale if needed
            if (size.width && size.height) {
                const bbox = group.bbox();
                const scaleX = size.width / bbox.width;
                const scaleY = size.height / bbox.height;
                group.scale(scaleX, scaleY);
            }

            console.log('✅ Custom SVG added');
            return group;
        } catch (error) {
            console.error('❌ Failed to load custom SVG:', error);
            throw error;
        }
    }

    // Clear specific layer
    clearLayer(layerName) {
        if (this.layers[layerName]) {
            this.layers[layerName].clear();
            console.log(`🧹 Cleared ${layerName} layer`);
        }
    }

    // Export as SVG
    exportAsSVG() {
        const svgString = this.container.svg();
        console.log('📤 Exported SVG, size:', svgString.length, 'bytes');
        return svgString;
    }

    // Export as PNG (requires conversion)
    exportAsPNG() {
        return new Promise((resolve, reject) => {
            try {
                const svgString = this.exportAsSVG();
                const blob = new Blob([svgString], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);

                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = 400;
                    canvas.height = 400;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);

                    canvas.toBlob((blob) => {
                        URL.revokeObjectURL(url);
                        resolve(blob);
                    }, 'image/png');
                };

                img.onerror = (error) => {
                    URL.revokeObjectURL(url);
                    reject(error);
                };

                img.src = url;
            } catch (error) {
                reject(error);
            }
        });
    }

    // Download as file
    downloadSVG(filename = 'avatar.svg') {
        const svgString = this.exportAsSVG();
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
        console.log('💾 SVG downloaded:', filename);
    }

    async downloadPNG(filename = 'avatar.png') {
        try {
            const blob = await this.exportAsPNG();
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();

            URL.revokeObjectURL(url);
            console.log('💾 PNG downloaded:', filename);
        } catch (error) {
            console.error('❌ Failed to download PNG:', error);
        }
    }

    // Get renderer info
    getInfo() {
        return {
            layers: Object.keys(this.layers).length,
            elements: this.svgParts.all ? this.svgParts.all.length : 0,
            patterns: Object.keys(this.patterns).length,
            parts: Object.keys(this.svgParts).filter(k => this.svgParts[k] !== null).length
        };
    }

    // Destroy renderer
    destroy() {
        console.log('💥 Destroying SVG Avatar Renderer');
        this.container.remove();
    }
}

// ============================================
// GLOBAL SVG RENDERER INSTANCE
// ============================================

let svgAvatarRenderer = null;

function initializeSVGRenderer(containerId = 'svg-avatar-container') {
    if (typeof SVG === 'undefined' || typeof tinycolor === 'undefined') {
        console.warn('⚠️ SVG.js or TinyColor not loaded yet. Waiting...');
        setTimeout(() => initializeSVGRenderer(containerId), 100);
        return;
    }

    svgAvatarRenderer = new SVGAvatarRenderer(containerId);
    console.log('✅ Global SVG Renderer initialized');
    console.log('📊 Renderer Info:', svgAvatarRenderer.getInfo());

    return svgAvatarRenderer;
}
