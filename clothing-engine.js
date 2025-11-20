// ============================================
// CLOTHING ENGINE
// LLM-driven character outfit system
// Combines DiceBear faces with custom SVG clothing
// ============================================

class ClothingEngine {
    constructor(svgRenderer, assetDatabase) {
        this.svgRenderer = svgRenderer;
        this.assetDatabase = assetDatabase;
        this.colorRemapper = new SVGColorRemapper();

        // Current loaded outfit
        this.currentOutfit = {
            top: null,
            bottom: null,
            shoes: null,
            accessories: [],
            layers: []
        };

        console.log('👔 Clothing Engine initialized');
    }

    /**
     * Apply complete outfit from LLM spec
     * @param {Object} spec - Outfit specification
     * @returns {Promise<Object>} - Result with all applied items
     */
    async applyOutfit(spec) {
        console.log('👔 Applying outfit from spec:', spec);

        // Clear previous outfit
        this.clearOutfit();

        const results = {
            top: null,
            bottom: null,
            shoes: null,
            accessories: [],
            errors: []
        };

        // Apply top (hoodie, jacket, t-shirt, dress)
        if (spec.top) {
            try {
                results.top = await this.applyClothingItem(spec.top, 'top');
            } catch (error) {
                console.error('❌ Failed to apply top:', error);
                results.errors.push({ item: 'top', error: error.message });
            }
        }

        // Apply bottom (pants, skirt, shorts)
        if (spec.bottom) {
            try {
                results.bottom = await this.applyClothingItem(spec.bottom, 'bottom');
            } catch (error) {
                console.error('❌ Failed to apply bottom:', error);
                results.errors.push({ item: 'bottom', error: error.message });
            }
        }

        // Apply shoes
        if (spec.shoes) {
            try {
                results.shoes = await this.applyClothingItem(spec.shoes, 'shoes');
            } catch (error) {
                console.error('❌ Failed to apply shoes:', error);
                results.errors.push({ item: 'shoes', error: error.message });
            }
        }

        // Apply accessories (hats, jewelry, bags, etc.)
        if (spec.accessories && Array.isArray(spec.accessories)) {
            for (const accessory of spec.accessories) {
                try {
                    const result = await this.applyAccessory(accessory);
                    results.accessories.push(result);
                } catch (error) {
                    console.error('❌ Failed to apply accessory:', error);
                    results.errors.push({ item: 'accessory', error: error.message });
                }
            }
        }

        console.log('✅ Outfit applied successfully');
        return results;
    }

    /**
     * Apply a single clothing item
     * @param {Object} itemSpec - Item specification
     * @param {string} slot - Clothing slot (top, bottom, shoes)
     * @returns {Promise<Object>} - Applied item result
     */
    async applyClothingItem(itemSpec, slot) {
        console.log(`👕 Applying ${slot}:`, itemSpec);

        // Find asset by ID or search by tags
        let asset;

        if (itemSpec.assetId) {
            asset = this.assetDatabase.getById(itemSpec.assetId);
        } else if (itemSpec.search) {
            // Search by tags, name, or category
            const matches = this.assetDatabase.searchByTags(itemSpec.search.tags || []);
            asset = matches[0]; // Take first match
        } else if (itemSpec.type && itemSpec.style) {
            // Try to find by type and style (e.g., hoodies, basic)
            const category = this.assetDatabase.getByCategory(itemSpec.type);
            asset = category.find(a => a.name.toLowerCase().includes(itemSpec.style.toLowerCase()));
        }

        if (!asset) {
            throw new Error(`Could not find asset for ${slot}`);
        }

        console.log(`📦 Found asset: ${asset.name} (${asset.id})`);

        // Determine color scheme
        let colorScheme;
        if (itemSpec.colors) {
            // LLM provided specific colors
            colorScheme = this.createColorSchemeFromArray(itemSpec.colors);
        } else if (itemSpec.colorScheme) {
            // LLM provided named color scheme
            colorScheme = itemSpec.colorScheme;
        } else {
            // Use asset's default colors
            colorScheme = this.createColorSchemeFromArray(asset.colors);
        }

        // Load and remap SVG colors
        const remappedSVG = await this.colorRemapper.applyColorScheme(asset.file, colorScheme);

        // Calculate position and size based on slot
        const positioning = this.calculatePositioning(slot, itemSpec.position);

        // Add to SVG renderer
        const svgGroup = await this.addSVGToRenderer(
            remappedSVG.svgElement,
            slot,
            positioning
        );

        // Store reference
        this.currentOutfit[slot] = {
            asset,
            svgGroup,
            colorScheme,
            spec: itemSpec
        };

        return {
            asset,
            colorScheme,
            positioning
        };
    }

    /**
     * Apply accessory item
     * @param {Object} accessorySpec - Accessory specification
     * @returns {Promise<Object>} - Applied accessory result
     */
    async applyAccessory(accessorySpec) {
        console.log('💍 Applying accessory:', accessorySpec);

        // Find accessory asset
        let asset;

        if (accessorySpec.assetId) {
            asset = this.assetDatabase.getById(accessorySpec.assetId);
        } else if (accessorySpec.search) {
            const matches = this.assetDatabase.searchByTags(accessorySpec.search.tags || []);
            asset = matches[0];
        } else if (accessorySpec.type) {
            // Search in accessories, jewelry, hats, bags
            const categories = ['accessories', 'jewelry', 'hats', 'bags'];
            for (const cat of categories) {
                const items = this.assetDatabase.getByCategory(cat);
                asset = items.find(a =>
                    a.name.toLowerCase().includes(accessorySpec.type.toLowerCase()) ||
                    a.tags.includes(accessorySpec.type.toLowerCase())
                );
                if (asset) break;
            }
        }

        if (!asset) {
            throw new Error('Could not find accessory asset');
        }

        console.log(`📦 Found accessory: ${asset.name}`);

        // Color scheme
        const colorScheme = accessorySpec.colors
            ? this.createColorSchemeFromArray(accessorySpec.colors)
            : this.createColorSchemeFromArray(asset.colors);

        // Remap colors
        const remappedSVG = await this.colorRemapper.applyColorScheme(asset.file, colorScheme);

        // Position
        const positioning = accessorySpec.position || this.getDefaultAccessoryPosition(asset.category);

        // Add to renderer
        const svgGroup = await this.addSVGToRenderer(
            remappedSVG.svgElement,
            'accessories',
            positioning
        );

        // Store
        this.currentOutfit.accessories.push({
            asset,
            svgGroup,
            colorScheme,
            spec: accessorySpec
        });

        return {
            asset,
            colorScheme,
            positioning
        };
    }

    /**
     * Add SVG element to renderer at specified position
     * @param {SVGElement} svgElement - SVG element to add
     * @param {string} layer - Layer name
     * @param {Object} positioning - Position and size info
     * @returns {Promise<Object>} - SVG group reference
     */
    async addSVGToRenderer(svgElement, layer, positioning) {
        // Convert SVG element to string
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);

        // Create temporary container
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = svgString;
        const svg = tempDiv.querySelector('svg');

        // Get or create layer
        const targetLayer = this.svgRenderer.layers[layer] || this.svgRenderer.layers.clothing;

        // Import SVG
        const group = targetLayer.group();
        group.svg(svg.innerHTML);

        // Apply positioning
        group.move(positioning.x, positioning.y);

        // Apply size if specified
        if (positioning.width && positioning.height) {
            const bbox = group.bbox();
            console.log('📏 Bounding box:', bbox);

            // Guard against invalid bbox
            if (bbox && bbox.width > 0 && bbox.height > 0 && !isNaN(bbox.width) && !isNaN(bbox.height)) {
                const scaleX = positioning.width / bbox.width;
                const scaleY = positioning.height / bbox.height;

                console.log(`📐 Scale: ${scaleX}, ${scaleY}`);

                // Guard against invalid scale values
                if (!isNaN(scaleX) && !isNaN(scaleY) && isFinite(scaleX) && isFinite(scaleY)) {
                    group.scale(scaleX, scaleY);
                } else {
                    console.warn('⚠️ Invalid scale values, skipping scaling');
                }
            } else {
                console.warn('⚠️ Invalid bounding box, skipping scaling');
            }
        } else if (positioning.scale) {
            group.scale(positioning.scale);
        }

        // Apply rotation if specified
        if (positioning.rotation) {
            group.rotate(positioning.rotation);
        }

        console.log(`✅ Added SVG to ${layer} layer at (${positioning.x}, ${positioning.y})`);
        return group;
    }

    /**
     * Create color scheme object from color array
     * @param {Array<string>} colors - Array of colors
     * @returns {Object} - Color scheme with named keys
     */
    createColorSchemeFromArray(colors) {
        const scheme = {};
        const names = ['primary', 'secondary', 'accent', 'highlight', 'shadow', 'detail'];

        colors.forEach((color, index) => {
            if (index < names.length) {
                scheme[names[index]] = color;
            }
        });

        return scheme;
    }

    /**
     * Calculate positioning based on clothing slot
     * @param {string} slot - Clothing slot
     * @param {Object} override - Position override from spec
     * @returns {Object} - Position and size
     */
    calculatePositioning(slot, override = {}) {
        const defaults = {
            top: { x: 100, y: 120, width: 200, height: 150 },
            bottom: { x: 100, y: 220, width: 200, height: 150 },
            shoes: { x: 100, y: 340, width: 200, height: 60 },
            accessories: { x: 100, y: 80, width: 100, height: 100 }
        };

        return { ...defaults[slot], ...override };
    }

    /**
     * Get default position for accessory based on category
     * @param {string} category - Accessory category
     * @returns {Object} - Position
     */
    getDefaultAccessoryPosition(category) {
        const positions = {
            eyewear: { x: 120, y: 50, scale: 0.8 },
            watches: { x: 80, y: 180, scale: 0.5 },
            necklaces: { x: 140, y: 110, scale: 0.6 },
            earrings: { x: 110, y: 45, scale: 0.4 },
            bracelets: { x: 80, y: 200, scale: 0.5 },
            rings: { x: 90, y: 220, scale: 0.3 },
            scarves: { x: 120, y: 100, scale: 0.8 },
            royal: { x: 140, y: 20, scale: 0.6 },
            fantasy: { x: 80, y: 100, scale: 1.2 },
            beanies: { x: 130, y: 10, scale: 0.8 },
            caps: { x: 130, y: 10, scale: 0.8 },
            fedoras: { x: 130, y: 10, scale: 0.8 },
            party: { x: 140, y: 5, scale: 0.7 },
            backpacks: { x: 80, y: 120, scale: 0.9 },
            purses: { x: 60, y: 180, scale: 0.6 },
            messenger: { x: 70, y: 140, scale: 0.8 }
        };

        return positions[category] || { x: 100, y: 80, scale: 0.7 };
    }

    /**
     * Clear current outfit
     */
    clearOutfit() {
        console.log('🧹 Clearing outfit');

        // Clear clothing layers
        this.svgRenderer.clearLayer('clothing');
        this.svgRenderer.clearLayer('accessories');

        // Reset current outfit
        this.currentOutfit = {
            top: null,
            bottom: null,
            shoes: null,
            accessories: []
        };
    }

    /**
     * Export current outfit as spec (for saving/sharing)
     * @returns {Object} - Outfit spec
     */
    exportOutfitSpec() {
        const spec = {};

        if (this.currentOutfit.top) {
            spec.top = this.currentOutfit.top.spec;
        }
        if (this.currentOutfit.bottom) {
            spec.bottom = this.currentOutfit.bottom.spec;
        }
        if (this.currentOutfit.shoes) {
            spec.shoes = this.currentOutfit.shoes.spec;
        }
        if (this.currentOutfit.accessories.length > 0) {
            spec.accessories = this.currentOutfit.accessories.map(a => a.spec);
        }

        return spec;
    }

    /**
     * Get outfit summary
     * @returns {Object} - Outfit summary
     */
    getOutfitSummary() {
        return {
            top: this.currentOutfit.top ? this.currentOutfit.top.asset.name : null,
            bottom: this.currentOutfit.bottom ? this.currentOutfit.bottom.asset.name : null,
            shoes: this.currentOutfit.shoes ? this.currentOutfit.shoes.asset.name : null,
            accessories: this.currentOutfit.accessories.map(a => a.asset.name)
        };
    }
}

// ============================================
// GLOBAL INSTANCE
// ============================================

let clothingEngine = null;

function initializeClothingEngine() {
    if (typeof SVGAvatarRenderer === 'undefined' ||
        typeof SVGAssetDatabase === 'undefined' ||
        typeof SVGColorRemapper === 'undefined') {
        console.warn('⚠️ Dependencies not loaded yet. Waiting...');
        setTimeout(initializeClothingEngine, 100);
        return;
    }

    if (!svgAvatarRenderer) {
        console.warn('⚠️ SVG Renderer not initialized. Waiting...');
        setTimeout(initializeClothingEngine, 100);
        return;
    }

    clothingEngine = new ClothingEngine(svgAvatarRenderer, SVGAssetDatabase);
    console.log('✅ Global Clothing Engine initialized');

    return clothingEngine;
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ClothingEngine;
}
