// ============================================
// SVG COLOR REMAPPER
// Makes existing SVGs with hardcoded colors customizable
// Intelligently replaces colors while preserving structure
// ============================================

class SVGColorRemapper {
    constructor() {
        console.log('🎨 SVG Color Remapper initialized');
    }

    /**
     * Load SVG from URL and extract all colors
     * @param {string} url - URL to SVG file
     * @returns {Promise<Object>} - SVG data with extracted colors
     */
    async loadAndAnalyzeSVG(url) {
        try {
            const response = await fetch(url);
            const svgText = await response.text();

            // Parse SVG
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');

            if (!svgElement) {
                throw new Error('Invalid SVG');
            }

            // Extract all colors used
            const colors = this.extractColors(svgElement);

            console.log(`📊 Found ${colors.size} unique colors in SVG`);

            return {
                svgElement: svgElement.cloneNode(true),
                svgText,
                colors: Array.from(colors),
                url
            };
        } catch (error) {
            console.error('❌ Failed to load SVG:', error);
            throw error;
        }
    }

    /**
     * Extract all unique colors from SVG
     * @param {SVGElement} svgElement - SVG element to analyze
     * @returns {Set<string>} - Set of color values
     */
    extractColors(svgElement) {
        const colors = new Set();
        const colorRegex = /#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|rgb\([^)]+\)|rgba\([^)]+\)/g;

        // Check all elements with fill or stroke attributes
        const elements = svgElement.querySelectorAll('*');

        elements.forEach(el => {
            const fill = el.getAttribute('fill');
            const stroke = el.getAttribute('stroke');

            if (fill && fill !== 'none' && fill !== 'transparent') {
                colors.add(fill.toLowerCase());
            }
            if (stroke && stroke !== 'none' && stroke !== 'transparent') {
                colors.add(stroke.toLowerCase());
            }
        });

        // Also check inline styles
        elements.forEach(el => {
            const style = el.getAttribute('style');
            if (style) {
                const matches = style.match(colorRegex);
                if (matches) {
                    matches.forEach(color => colors.add(color.toLowerCase()));
                }
            }
        });

        return colors;
    }

    /**
     * Remap colors in SVG based on color mapping
     * @param {SVGElement} svgElement - SVG element to modify
     * @param {Object} colorMap - Mapping of old colors to new colors
     * @returns {SVGElement} - Modified SVG element
     */
    remapColors(svgElement, colorMap) {
        const clone = svgElement.cloneNode(true);
        const elements = clone.querySelectorAll('*');

        // Normalize color map keys to lowercase
        const normalizedMap = {};
        Object.keys(colorMap).forEach(key => {
            normalizedMap[key.toLowerCase()] = colorMap[key];
        });

        elements.forEach(el => {
            // Remap fill
            const fill = el.getAttribute('fill');
            if (fill && normalizedMap[fill.toLowerCase()]) {
                el.setAttribute('fill', normalizedMap[fill.toLowerCase()]);
            }

            // Remap stroke
            const stroke = el.getAttribute('stroke');
            if (stroke && normalizedMap[stroke.toLowerCase()]) {
                el.setAttribute('stroke', normalizedMap[stroke.toLowerCase()]);
            }

            // Remap in style attribute
            const style = el.getAttribute('style');
            if (style) {
                let newStyle = style;
                Object.keys(normalizedMap).forEach(oldColor => {
                    const regex = new RegExp(oldColor, 'gi');
                    newStyle = newStyle.replace(regex, normalizedMap[oldColor]);
                });
                el.setAttribute('style', newStyle);
            }
        });

        console.log('✅ Colors remapped successfully');
        return clone;
    }

    /**
     * Create intelligent color mapping based on brightness
     * Groups colors by brightness and maps to target palette
     * @param {Array<string>} originalColors - Original colors from SVG
     * @param {Object} targetPalette - Target color palette
     * @returns {Object} - Color mapping
     */
    createIntelligentMapping(originalColors, targetPalette) {
        // Sort colors by brightness
        const sortedColors = [...originalColors].sort((a, b) => {
            return this.getBrightness(a) - this.getBrightness(b);
        });

        const mapping = {};

        // Map darkest to primary, mid to accent, lightest to highlight
        const paletteKeys = Object.keys(targetPalette);

        sortedColors.forEach((color, index) => {
            const paletteIndex = Math.floor((index / sortedColors.length) * paletteKeys.length);
            const targetKey = paletteKeys[Math.min(paletteIndex, paletteKeys.length - 1)];
            mapping[color] = targetPalette[targetKey];
        });

        console.log('🎨 Created intelligent color mapping:', mapping);
        return mapping;
    }

    /**
     * Get brightness value of a color (0-255)
     * @param {string} color - Color in hex or rgb format
     * @returns {number} - Brightness value
     */
    getBrightness(color) {
        let r, g, b;

        // Parse hex color
        if (color.startsWith('#')) {
            const hex = color.replace('#', '');
            if (hex.length === 3) {
                r = parseInt(hex[0] + hex[0], 16);
                g = parseInt(hex[1] + hex[1], 16);
                b = parseInt(hex[2] + hex[2], 16);
            } else {
                r = parseInt(hex.substr(0, 2), 16);
                g = parseInt(hex.substr(2, 2), 16);
                b = parseInt(hex.substr(4, 2), 16);
            }
        }
        // Parse rgb/rgba
        else if (color.startsWith('rgb')) {
            const matches = color.match(/\d+/g);
            if (matches) {
                r = parseInt(matches[0]);
                g = parseInt(matches[1]);
                b = parseInt(matches[2]);
            }
        }

        // Calculate perceived brightness
        return (r * 299 + g * 587 + b * 114) / 1000;
    }

    /**
     * Convert SVG element to data URI
     * @param {SVGElement} svgElement - SVG element
     * @returns {string} - Data URI
     */
    toDataURI(svgElement) {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        return 'data:image/svg+xml;base64,' + btoa(svgString);
    }

    /**
     * Convert SVG element to string
     * @param {SVGElement} svgElement - SVG element
     * @returns {string} - SVG string
     */
    toString(svgElement) {
        const serializer = new XMLSerializer();
        return serializer.serializeToString(svgElement);
    }

    /**
     * Apply color scheme to SVG (main function for external use)
     * @param {string} svgUrl - URL to SVG file
     * @param {Object} colorScheme - Color scheme to apply
     * @returns {Promise<Object>} - Result with modified SVG
     */
    async applyColorScheme(svgUrl, colorScheme) {
        // Load and analyze SVG
        const svgData = await this.loadAndAnalyzeSVG(svgUrl);

        // Create color mapping
        const colorMap = this.createIntelligentMapping(svgData.colors, colorScheme);

        // Remap colors
        const remappedSVG = this.remapColors(svgData.svgElement, colorMap);

        return {
            svgElement: remappedSVG,
            dataURI: this.toDataURI(remappedSVG),
            svgString: this.toString(remappedSVG),
            originalColors: svgData.colors,
            colorMap
        };
    }

    /**
     * Apply manual color mapping (when you know exact color replacements)
     * @param {string} svgUrl - URL to SVG file
     * @param {Object} colorMap - Exact color mapping {oldColor: newColor}
     * @returns {Promise<Object>} - Result with modified SVG
     */
    async applyManualMapping(svgUrl, colorMap) {
        const svgData = await this.loadAndAnalyzeSVG(svgUrl);
        const remappedSVG = this.remapColors(svgData.svgElement, colorMap);

        return {
            svgElement: remappedSVG,
            dataURI: this.toDataURI(remappedSVG),
            svgString: this.toString(remappedSVG),
            originalColors: svgData.colors,
            colorMap
        };
    }
}

// ============================================
// GLOBAL INSTANCE
// ============================================

const svgColorRemapper = new SVGColorRemapper();

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SVGColorRemapper;
}
