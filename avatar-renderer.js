// ============================================
// HYBRID AVATAR RENDERER (PixiJS + DiceBear + TinyColor)
// ============================================

class AvatarRenderer {
    constructor() {
        console.log('🎨 Initializing Hybrid Avatar Renderer...');

        // Check if libraries are loaded
        if (typeof PIXI === 'undefined') {
            console.error('❌ PixiJS not loaded!');
            return;
        }
        if (typeof tinycolor === 'undefined') {
            console.error('❌ TinyColor not loaded!');
            return;
        }

        console.log('✅ PixiJS version:', PIXI.VERSION);
        console.log('✅ TinyColor loaded');

        // PixiJS Application Setup
        this.app = new PIXI.Application({
            width: 400,
            height: 400,
            transparent: true,
            antialias: true,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true
        });

        // Add PixiJS canvas to container
        const pixiContainer = document.getElementById('pixiContainer');
        if (pixiContainer) {
            pixiContainer.appendChild(this.app.view);
            console.log('✅ PixiJS canvas added to DOM');
        }

        // Layer containers
        this.layers = {
            clothing: new PIXI.Container(),
            accessories: new PIXI.Container(),
            effects: new PIXI.Container()
        };

        // Add layers to stage in correct order
        this.app.stage.addChild(this.layers.clothing);
        this.app.stage.addChild(this.layers.accessories);
        this.app.stage.addChild(this.layers.effects);

        // Custom clothing database (extends beyond DiceBear)
        this.customAssets = {
            tshirts: [
                { id: 'custom_tshirt_unicorn', name: '🦄 Unicorn Tee', url: 'assets/tshirts/unicorn.svg', price: 100 },
                { id: 'custom_tshirt_dragon', name: '🐉 Dragon Tee', url: 'assets/tshirts/dragon.svg', price: 100 },
                { id: 'custom_tshirt_stars', name: '⭐ Star Pattern', url: 'assets/tshirts/stars.svg', price: 80 }
            ],
            accessories: [
                { id: 'custom_crown', name: '👑 Golden Crown', url: 'assets/accessories/crown.svg', price: 200 },
                { id: 'custom_wings', name: '👼 Angel Wings', url: 'assets/accessories/wings.svg', price: 150 }
            ],
            effects: [
                { id: 'sparkles', name: '✨ Sparkle Effect', price: 50 },
                { id: 'glow', name: '💫 Glow Effect', price: 75 }
            ]
        };

        console.log('🎭 Avatar Renderer initialized with', Object.keys(this.layers).length, 'layers');
    }

    // Add custom clothing layer
    addCustomClothing(textureURL, options = {}) {
        return new Promise((resolve, reject) => {
            console.log('👔 Adding custom clothing:', textureURL);

            // Load texture
            PIXI.Assets.load(textureURL).then((texture) => {
                const sprite = new PIXI.Sprite(texture);

                // Position and size
                sprite.anchor.set(0.5);
                sprite.x = 200; // Center
                sprite.y = 250; // Chest area
                sprite.width = options.width || 300;
                sprite.height = options.height || 200;

                // Apply color tint if specified
                if (options.color) {
                    const color = tinycolor(options.color);
                    sprite.tint = parseInt(color.toHex(), 16);
                    console.log('🎨 Applied tint:', color.toHexString());
                }

                // Apply effects
                if (options.glow) {
                    this.applyGlow(sprite, options.glowColor || '#FF6B9D');
                }

                // Add to clothing layer
                this.layers.clothing.addChild(sprite);
                console.log('✅ Custom clothing added');

                resolve(sprite);
            }).catch((error) => {
                console.error('❌ Failed to load texture:', error);
                reject(error);
            });
        });
    }

    // Add custom accessory
    addAccessory(textureURL, position = { x: 200, y: 100 }) {
        return new Promise((resolve, reject) => {
            console.log('✨ Adding accessory:', textureURL);

            PIXI.Assets.load(textureURL).then((texture) => {
                const sprite = new PIXI.Sprite(texture);
                sprite.anchor.set(0.5);
                sprite.x = position.x;
                sprite.y = position.y;
                sprite.width = 150;
                sprite.height = 150;

                this.layers.accessories.addChild(sprite);
                console.log('✅ Accessory added');

                resolve(sprite);
            }).catch((error) => {
                console.error('❌ Failed to load accessory:', error);
                reject(error);
            });
        });
    }

    // Apply glow effect
    applyGlow(sprite, color = '#FF6B9D') {
        const glowFilter = new PIXI.filters.BlurFilter();
        glowFilter.blur = 8;

        // Create a glow sprite
        const glow = new PIXI.Sprite(sprite.texture);
        glow.anchor.set(0.5);
        glow.x = sprite.x;
        glow.y = sprite.y;
        glow.width = sprite.width + 20;
        glow.height = sprite.height + 20;
        glow.alpha = 0.5;

        const glowColor = tinycolor(color);
        glow.tint = parseInt(glowColor.toHex(), 16);
        glow.filters = [glowFilter];

        this.layers.effects.addChildAt(glow, 0);
        console.log('✨ Glow effect applied:', glowColor.toHexString());
    }

    // Recolor existing sprite
    recolorSprite(sprite, newColor) {
        const color = tinycolor(newColor);
        sprite.tint = parseInt(color.toHex(), 16);
        console.log('🎨 Recolored sprite to:', color.toHexString());
    }

    // Create pattern overlay
    createPattern(type, color1, color2 = null) {
        console.log('🎨 Creating pattern:', type);

        const graphics = new PIXI.Graphics();

        switch (type) {
            case 'stripes':
                const stripeColor1 = tinycolor(color1);
                const stripeColor2 = color2 ? tinycolor(color2) : stripeColor1.lighten(20);

                for (let i = 0; i < 400; i += 40) {
                    graphics.beginFill(parseInt(stripeColor1.toHex(), 16));
                    graphics.drawRect(0, i, 400, 20);
                    graphics.endFill();

                    graphics.beginFill(parseInt(stripeColor2.toHex(), 16));
                    graphics.drawRect(0, i + 20, 400, 20);
                    graphics.endFill();
                }
                break;

            case 'polkadots':
                const dotColor = tinycolor(color1);
                graphics.beginFill(parseInt(dotColor.toHex(), 16));

                for (let x = 20; x < 400; x += 50) {
                    for (let y = 20; y < 400; y += 50) {
                        graphics.drawCircle(x, y, 10);
                    }
                }
                graphics.endFill();
                break;

            case 'gradient':
                // Create a gradient texture (simplified)
                const c1 = tinycolor(color1);
                const c2 = color2 ? tinycolor(color2) : c1.lighten(30);

                for (let i = 0; i < 400; i++) {
                    const ratio = i / 400;
                    const mixedColor = tinycolor.mix(c1, c2, ratio * 100);
                    graphics.beginFill(parseInt(mixedColor.toHex(), 16));
                    graphics.drawRect(0, i, 400, 1);
                    graphics.endFill();
                }
                break;
        }

        graphics.alpha = 0.5; // Semi-transparent overlay
        this.layers.clothing.addChild(graphics);
        console.log('✅ Pattern created');

        return graphics;
    }

    // Add sparkle effect
    addSparkles() {
        console.log('✨ Adding sparkle effect');

        const particleCount = 20;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const graphics = new PIXI.Graphics();
            graphics.beginFill(0xFFFFFF);
            graphics.drawStar(0, 0, 4, 4);
            graphics.endFill();

            graphics.x = Math.random() * 400;
            graphics.y = Math.random() * 400;
            graphics.alpha = Math.random();

            this.layers.effects.addChild(graphics);
            particles.push(graphics);

            // Animate sparkles
            this.animateSparkle(graphics);
        }

        return particles;
    }

    animateSparkle(sparkle) {
        // Simple animation using requestAnimationFrame
        const animate = () => {
            sparkle.alpha = Math.sin(Date.now() / 500) * 0.5 + 0.5;
            sparkle.rotation += 0.01;
            requestAnimationFrame(animate);
        };
        animate();
    }

    // Clear all custom layers
    clearCustomLayers() {
        console.log('🧹 Clearing custom layers');
        this.layers.clothing.removeChildren();
        this.layers.accessories.removeChildren();
        this.layers.effects.removeChildren();
    }

    // Clear specific layer
    clearLayer(layerName) {
        if (this.layers[layerName]) {
            this.layers[layerName].removeChildren();
            console.log(`🧹 Cleared ${layerName} layer`);
        }
    }

    // Get renderer info
    getInfo() {
        return {
            pixiVersion: PIXI.VERSION,
            layerCount: Object.keys(this.layers).length,
            clothingItems: this.layers.clothing.children.length,
            accessories: this.layers.accessories.children.length,
            effects: this.layers.effects.children.length
        };
    }

    // Destroy renderer
    destroy() {
        console.log('💥 Destroying Avatar Renderer');
        this.app.destroy(true, { children: true, texture: true, baseTexture: true });
    }
}

// ============================================
// GLOBAL AVATAR RENDERER INSTANCE
// ============================================

let avatarRenderer = null;

function initializeAvatarRenderer() {
    if (typeof PIXI === 'undefined' || typeof tinycolor === 'undefined') {
        console.warn('⚠️ PixiJS or TinyColor not loaded yet. Waiting...');
        setTimeout(initializeAvatarRenderer, 100);
        return;
    }

    avatarRenderer = new AvatarRenderer();
    console.log('✅ Global Avatar Renderer initialized');

    // Log renderer info
    console.log('📊 Renderer Info:', avatarRenderer.getInfo());
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAvatarRenderer);
} else {
    initializeAvatarRenderer();
}
