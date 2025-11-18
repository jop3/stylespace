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

        // PixiJS Application Setup
        this.app = new PIXI.Application({
            width: 400,
            height: 400,
            backgroundAlpha: 0, // VIKTIGT! 0 = Transparent i Pixi v7+. "transparent: true" fungerar inte längre.
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

        // Custom clothing database
        this.customAssets = {
            tshirts: [
                { id: 'custom_tshirt_unicorn', name: '🦄 Unicorn Tee', url: 'assets/tshirts/unicorn.svg', price: 100 },
                { id: 'custom_tshirt_stars', name: '⭐ Star Pattern', url: 'assets/tshirts/stars.svg', price: 80 }
            ],
            effects: [
                { id: 'sparkles', name: '✨ Sparkle Effect', price: 50 }
            ]
        };

        // Array to hold active particles for animation
        this.particles = [];

        // Add ticker for animations (Better than requestAnimationFrame loop)
        this.app.ticker.add(() => {
            this.updateParticles();
        });

        console.log('🎭 Avatar Renderer initialized');
    }

    // Add custom clothing layer
    addCustomClothing(textureURL, options = {}) {
        return new Promise((resolve, reject) => {
            PIXI.Assets.load(textureURL).then((texture) => {
                const sprite = new PIXI.Sprite(texture);
                sprite.anchor.set(0.5);
                sprite.x = 200; 
                sprite.y = 250; 
                sprite.width = options.width || 300;
                sprite.height = options.height || 200;

                if (options.color) {
                    const color = tinycolor(options.color);
                    sprite.tint = parseInt(color.toHex(), 16);
                }

                if (options.glow) {
                    this.applyGlow(sprite, options.glowColor || '#FF6B9D');
                }

                this.layers.clothing.addChild(sprite);
                resolve(sprite);
            }).catch(reject);
        });
    }

    // Apply glow effect
    applyGlow(sprite, color = '#FF6B9D') {
        const glowFilter = new PIXI.BlurFilter();
        glowFilter.blur = 8;

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
    }

    // Create pattern overlay
    createPattern(type, color1, color2 = null) {
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

        graphics.alpha = 0.5;
        this.layers.clothing.addChild(graphics);
        return graphics;
    }

    // Add sparkle effect
    addSparkles() {
        console.log('✨ Adding sparkle effect');
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const graphics = new PIXI.Graphics();
            graphics.beginFill(0xFFFFFF);
            graphics.drawStar(0, 0, 4, 4);
            graphics.endFill();

            graphics.x = Math.random() * 400;
            graphics.y = Math.random() * 400;
            graphics.alpha = Math.random();
            
            // Random start properties for animation
            graphics.animSpeed = 0.005 + Math.random() * 0.01;
            graphics.animOffset = Math.random() * 100;

            this.layers.effects.addChild(graphics);
            this.particles.push(graphics);
        }
    }

    // Updated animation loop using Pixi Ticker
    updateParticles() {
        const now = Date.now();
        this.particles.forEach(p => {
            if (!p.destroyed) {
                p.alpha = Math.sin((now / 500) + p.animOffset) * 0.5 + 0.5;
                p.rotation += 0.01;
            }
        });
    }

    clearLayer(layerName) {
        if (this.layers[layerName]) {
            this.layers[layerName].removeChildren();
            if (layerName === 'effects') {
                this.particles = []; // Clear particles array too
            }
        }
    }

    destroy() {
        this.app.destroy(true, { children: true, texture: true, baseTexture: true });
    }
}

let avatarRenderer = null;

function initializeAvatarRenderer() {
    if (typeof PIXI === 'undefined' || typeof tinycolor === 'undefined') {
        setTimeout(initializeAvatarRenderer, 100);
        return;
    }
    avatarRenderer = new AvatarRenderer();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAvatarRenderer);
} else {
    initializeAvatarRenderer();
}