// ============================================
// POLYFILLS & COMPATIBILITY
// ============================================

// Polyfill for roundRect (for older browsers)
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
        if (width < 2 * radius) radius = width / 2;
        if (height < 2 * radius) radius = height / 2;
        this.beginPath();
        this.moveTo(x + radius, y);
        this.arcTo(x + width, y, x + width, y + height, radius);
        this.arcTo(x + width, y + height, x, y + height, radius);
        this.arcTo(x, y + height, x, y, radius);
        this.arcTo(x, y, x + width, y, radius);
        this.closePath();
        return this;
    };
}

// ============================================
// GAME STATE & DATA
// ============================================

// Player data
const playerData = {
    diamonds: 100,
    avatar: {
        faceShape: 'oval',
        skinTone: '#FFE0BD',
        eyeShape: 'round',
        eyeColor: '#654321',
        hairLength: 'shoulder',
        hairStyle: 'straight',
        hairColor: '#654321',
        bodyShape: 'slim',
        bodyHeight: 'medium'
    },
    ownedClothes: [],
    currentClothes: {
        top: null,
        bottom: null,
        shoes: null,
        accessory: null
    },
    tryingOn: {
        top: null,
        bottom: null,
        shoes: null,
        accessory: null
    },
    ownedPets: [],
    activePets: [],
    savedOutfits: [],
    usedCodes: []
};

// Clothes database - MASSIVELY EXPANDED
const clothesDatabase = {
    tops: [
        // T-shirts - Basic Colors
        { id: 't1', name: 'Röd T-shirt', price: 50, color: '#DC143C', type: 'tshirt' },
        { id: 't2', name: 'Blå T-shirt', price: 50, color: '#4169E1', type: 'tshirt' },
        { id: 't3', name: 'Grön T-shirt', price: 50, color: '#32CD32', type: 'tshirt' },
        { id: 't4', name: 'Lila T-shirt', price: 50, color: '#9370DB', type: 'tshirt' },
        { id: 't5', name: 'Vit T-shirt', price: 40, color: '#FFFFFF', type: 'tshirt' },
        { id: 't6', name: 'Gul T-shirt', price: 50, color: '#FFD700', type: 'tshirt' },
        { id: 't7', name: 'Svart T-shirt', price: 45, color: '#000000', type: 'tshirt' },
        { id: 't8', name: 'Orange T-shirt', price: 50, color: '#FF8C00', type: 'tshirt' },
        { id: 't9', name: 'Turkos T-shirt', price: 50, color: '#40E0D0', type: 'tshirt' },
        { id: 't10', name: 'Mint T-shirt', price: 50, color: '#98FF98', type: 'tshirt' },
        { id: 't11', name: 'Lavendel T-shirt', price: 50, color: '#E6E6FA', type: 'tshirt' },
        { id: 't12', name: 'Persika T-shirt', price: 50, color: '#FFDAB9', type: 'tshirt' },

        // Sweaters & Hoodies
        { id: 't13', name: 'Rosa Tröja', price: 70, color: '#FF69B4', type: 'sweater' },
        { id: 't14', name: 'Svart Tröja', price: 70, color: '#000000', type: 'sweater' },
        { id: 't15', name: 'Grå Hoodie', price: 85, color: '#808080', type: 'sweater' },
        { id: 't16', name: 'Blå Hoodie', price: 85, color: '#1E90FF', type: 'sweater' },
        { id: 't17', name: 'Lila Hoodie', price: 85, color: '#8A2BE2', type: 'sweater' },
        { id: 't18', name: 'Grön Tröja', price: 70, color: '#228B22', type: 'sweater' },
        { id: 't19', name: 'Vit Hoodie', price: 80, color: '#F8F8FF', type: 'sweater' },
        { id: 't20', name: 'Beige Tröja', price: 70, color: '#F5F5DC', type: 'sweater' },

        // Special Tops
        { id: 't21', name: 'Randig Topp', price: 65, color: '#FF1493', type: 'tshirt' },
        { id: 't22', name: 'Polka Dot Blus', price: 75, color: '#FFB6C1', type: 'tshirt' },
        { id: 't23', name: 'Neon Rosa Top', price: 60, color: '#FF006E', type: 'tshirt' },
        { id: 't24', name: 'Denim Skjorta', price: 95, color: '#4682B4', type: 'sweater' }
    ],
    bottoms: [
        // Kjolar
        { id: 'b1', name: 'Röd Kjol', price: 60, color: '#DC143C', type: 'skirt' },
        { id: 'b2', name: 'Blå Kjol', price: 60, color: '#4169E1', type: 'skirt' },
        { id: 'b3', name: 'Grön Kjol', price: 60, color: '#32CD32', type: 'skirt' },
        { id: 'b4', name: 'Rosa Kjol', price: 60, color: '#FF69B4', type: 'skirt' },
        { id: 'b5', name: 'Lila Kjol', price: 60, color: '#9370DB', type: 'skirt' },
        { id: 'b6', name: 'Vit Kjol', price: 55, color: '#FFFFFF', type: 'skirt' },
        { id: 'b7', name: 'Svart Kjol', price: 60, color: '#000000', type: 'skirt' },
        { id: 'b8', name: 'Gul Kjol', price: 60, color: '#FFD700', type: 'skirt' },
        { id: 'b9', name: 'Turkos Kjol', price: 60, color: '#40E0D0', type: 'skirt' },
        { id: 'b10', name: 'Lavendel Kjol', price: 65, color: '#E6E6FA', type: 'skirt' },
        { id: 'b11', name: 'Plisserad Kjol Rosa', price: 75, color: '#FFB6C1', type: 'skirt' },
        { id: 'b12', name: 'Plisserad Kjol Blå', price: 75, color: '#87CEEB', type: 'skirt' },

        // Shorts
        { id: 'b13', name: 'Denim Shorts', price: 75, color: '#6495ED', type: 'shorts' },
        { id: 'b14', name: 'Svarta Shorts', price: 75, color: '#000000', type: 'shorts' },
        { id: 'b15', name: 'Vita Shorts', price: 70, color: '#FFFFFF', type: 'shorts' },
        { id: 'b16', name: 'Rosa Shorts', price: 75, color: '#FFB6C1', type: 'shorts' },
        { id: 'b17', name: 'Beige Shorts', price: 75, color: '#F5DEB3', type: 'shorts' },
        { id: 'b18', name: 'Röda Shorts', price: 75, color: '#FF6347', type: 'shorts' },
        { id: 'b19', name: 'Turkos Shorts', price: 75, color: '#48D1CC', type: 'shorts' },

        // Jeans & Byxor
        { id: 'b20', name: 'Blå Jeans', price: 90, color: '#4682B4', type: 'jeans' },
        { id: 'b21', name: 'Svarta Jeans', price: 90, color: '#2F4F4F', type: 'jeans' },
        { id: 'b22', name: 'Vita Jeans', price: 95, color: '#F0F8FF', type: 'jeans' },
        { id: 'b23', name: 'Ljusa Jeans', price: 90, color: '#B0C4DE', type: 'jeans' },
        { id: 'b24', name: 'Svarta Byxor', price: 85, color: '#000000', type: 'pants' },
        { id: 'b25', name: 'Gråa Byxor', price: 85, color: '#808080', type: 'pants' },
        { id: 'b26', name: 'Bruna Byxor', price: 85, color: '#8B4513', type: 'pants' },
        { id: 'b27', name: 'Beige Byxor', price: 85, color: '#D2B48C', type: 'pants' },
        { id: 'b28', name: 'Olivgröna Byxor', price: 90, color: '#556B2F', type: 'pants' },
        { id: 'b29', name: 'Marinblå Byxor', price: 85, color: '#000080', type: 'pants' }
    ],
    shoes: [
        // Sneakers
        { id: 's1', name: 'Vita Sneakers', price: 100, color: '#FFFFFF', type: 'sneakers' },
        { id: 's2', name: 'Svarta Sneakers', price: 100, color: '#000000', type: 'sneakers' },
        { id: 's3', name: 'Blå Sneakers', price: 100, color: '#4169E1', type: 'sneakers' },
        { id: 's4', name: 'Rosa Sneakers', price: 100, color: '#FF69B4', type: 'sneakers' },
        { id: 's5', name: 'Röda Sneakers', price: 100, color: '#DC143C', type: 'sneakers' },
        { id: 's6', name: 'Gröna Sneakers', price: 100, color: '#32CD32', type: 'sneakers' },
        { id: 's7', name: 'Lila Sneakers', price: 100, color: '#9370DB', type: 'sneakers' },
        { id: 's8', name: 'Turkos Sneakers', price: 100, color: '#40E0D0', type: 'sneakers' },

        // Boots
        { id: 's9', name: 'Svarta Boots', price: 120, color: '#000000', type: 'boots' },
        { id: 's10', name: 'Bruna Boots', price: 120, color: '#8B4513', type: 'boots' },
        { id: 's11', name: 'Vita Boots', price: 125, color: '#FFFFFF', type: 'boots' },
        { id: 's12', name: 'Röda Boots', price: 120, color: '#8B0000', type: 'boots' },

        // Casual
        { id: 's13', name: 'Röda Skor', price: 95, color: '#DC143C', type: 'casual' },
        { id: 's14', name: 'Rosa Skor', price: 95, color: '#FF69B4', type: 'casual' },
        { id: 's15', name: 'Blå Loafers', price: 110, color: '#4169E1', type: 'casual' },
        { id: 's16', name: 'Svarta Mary Janes', price: 105, color: '#000000', type: 'casual' },
        { id: 's17', name: 'Beige Sandaler', price: 85, color: '#F5DEB3', type: 'casual' }
    ],
    accessories: [
        // Kepsar
        { id: 'a1', name: 'Röd Keps', price: 40, color: '#DC143C', type: 'cap' },
        { id: 'a2', name: 'Blå Keps', price: 40, color: '#4169E1', type: 'cap' },
        { id: 'a3', name: 'Svart Keps', price: 40, color: '#000000', type: 'cap' },
        { id: 'a4', name: 'Vit Keps', price: 40, color: '#FFFFFF', type: 'cap' },
        { id: 'a5', name: 'Rosa Keps', price: 40, color: '#FF69B4', type: 'cap' },
        { id: 'a6', name: 'Grön Keps', price: 40, color: '#32CD32', type: 'cap' },
        { id: 'a7', name: 'Lila Keps', price: 40, color: '#9370DB', type: 'cap' },

        // Hattar
        { id: 'a8', name: 'Svart Hatt', price: 50, color: '#000000', type: 'hat' },
        { id: 'a9', name: 'Beige Hatt', price: 50, color: '#F5DEB3', type: 'hat' },
        { id: 'a10', name: 'Brun Hatt', price: 50, color: '#8B4513', type: 'hat' },
        { id: 'a11', name: 'Vit Solhatt', price: 55, color: '#FFFFFF', type: 'hat' },
        { id: 'a12', name: 'Rosa Hatt', price: 50, color: '#FFB6C1', type: 'hat' },

        // Halsdukar
        { id: 'a13', name: 'Rosa Halsduk', price: 35, color: '#FF69B4', type: 'scarf' },
        { id: 'a14', name: 'Lila Halsduk', price: 35, color: '#9370DB', type: 'scarf' },
        { id: 'a15', name: 'Blå Halsduk', price: 35, color: '#4169E1', type: 'scarf' },
        { id: 'a16', name: 'Röd Halsduk', price: 35, color: '#DC143C', type: 'scarf' },
        { id: 'a17', name: 'Grön Halsduk', price: 35, color: '#32CD32', type: 'scarf' },
        { id: 'a18', name: 'Turkos Halsduk', price: 35, color: '#40E0D0', type: 'scarf' },
        { id: 'a19', name: 'Gul Halsduk', price: 35, color: '#FFD700', type: 'scarf' },
        { id: 'a20', name: 'Vit Halsduk', price: 35, color: '#FFFFFF', type: 'scarf' }
    ]
};

// Pets database
const petsDatabase = [
    { id: 'pet1', name: 'Hund', price: 150, emoji: '🐕', type: 'dog' },
    { id: 'pet2', name: 'Katt', price: 120, emoji: '🐈', type: 'cat' },
    { id: 'pet3', name: 'Papegoja', price: 200, emoji: '🦜', type: 'parrot' },
    { id: 'pet4', name: 'Kanin', price: 100, emoji: '🐰', type: 'rabbit' },
    { id: 'pet5', name: 'Fisk', price: 80, emoji: '🐠', type: 'fish' },
    { id: 'pet6', name: 'Fågel', price: 90, emoji: '🐦', type: 'bird' },
    { id: 'pet7', name: 'Hamster', price: 85, emoji: '🐹', type: 'hamster' }
];

// Promo codes
const promoCodes = {
    'GRATIS100': { diamonds: 100, used: false },
    'MEGA500': { diamonds: 500, used: false },
    'SUPERRIK': { diamonds: 1000, used: false },
    'START50': { diamonds: 50, used: false }
};

// ============================================
// CANVAS & RENDERING
// ============================================

const canvas = document.getElementById('avatarCanvas');
const ctx = canvas.getContext('2d');

// Enable anti-aliasing
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';

function drawAvatar() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;

    // Chibi proportions - bigger head, smaller body
    const heightScale = playerData.avatar.bodyHeight === 'short' ? 0.75 :
                       playerData.avatar.bodyHeight === 'tall' ? 1.0 : 0.85;

    const headY = 220;
    const bodyY = 480 * heightScale;

    // Draw body first (behind head)
    drawBody(centerX, bodyY, heightScale);

    // Draw head (larger, more anime-style)
    drawHead(centerX, headY, heightScale);

    // Draw pets
    drawPets(centerX, bodyY + 180);
}

function drawBody(x, y, scale) {
    const bodyWidth = playerData.avatar.bodyShape === 'slim' ? 80 :
                     playerData.avatar.bodyShape === 'athletic' ? 100 : 110;

    ctx.save();

    // Body (torso)
    ctx.fillStyle = playerData.avatar.skinTone;

    // Neck
    ctx.fillRect(x - 15, y - 120 * scale, 30, 40 * scale);

    // Main body
    const torsoHeight = 150 * scale;
    const torsoY = y - 80 * scale;

    ctx.beginPath();
    ctx.roundRect(x - bodyWidth/2, torsoY, bodyWidth, torsoHeight, 20);
    ctx.fill();

    // Draw clothes
    const currentTop = playerData.tryingOn.top || playerData.currentClothes.top;
    const currentBottom = playerData.tryingOn.bottom || playerData.currentClothes.bottom;
    const currentShoes = playerData.tryingOn.shoes || playerData.currentClothes.shoes;
    const currentAccessory = playerData.tryingOn.accessory || playerData.currentClothes.accessory;

    // Draw top
    if (currentTop) {
        ctx.fillStyle = currentTop.color;
        ctx.beginPath();
        ctx.roundRect(x - bodyWidth/2, torsoY, bodyWidth, torsoHeight * 0.6, 15);
        ctx.fill();

        // Add shading
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(x - bodyWidth/2, torsoY + 20, 15, torsoHeight * 0.4);
    }

    // Arms
    ctx.fillStyle = playerData.avatar.skinTone;
    // Left arm
    ctx.beginPath();
    ctx.ellipse(x - bodyWidth/2 - 20, torsoY + 40, 15, 60 * scale, Math.PI / 6, 0, 2 * Math.PI);
    ctx.fill();
    // Right arm
    ctx.beginPath();
    ctx.ellipse(x + bodyWidth/2 + 20, torsoY + 40, 15, 60 * scale, -Math.PI / 6, 0, 2 * Math.PI);
    ctx.fill();

    // Legs
    const legsY = y + 70 * scale;
    const legHeight = 180 * scale;

    // Draw bottom clothing
    if (currentBottom) {
        ctx.fillStyle = currentBottom.color;

        if (currentBottom.type === 'skirt') {
            // Draw skirt
            ctx.beginPath();
            ctx.moveTo(x - bodyWidth/2, legsY - 10);
            ctx.lineTo(x - bodyWidth/2 - 20, legsY + 60);
            ctx.lineTo(x + bodyWidth/2 + 20, legsY + 60);
            ctx.lineTo(x + bodyWidth/2, legsY - 10);
            ctx.closePath();
            ctx.fill();

            // Add ruffles effect
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.lineWidth = 2;
            ctx.stroke();
        } else if (currentBottom.type === 'shorts') {
            // Draw shorts (end at knees)
            const shortsHeight = legHeight * 0.3;
            // Left short leg
            ctx.fillRect(x - bodyWidth/2 + 5, legsY - 10, bodyWidth/2 - 15, shortsHeight);
            // Right short leg
            ctx.fillRect(x + 10, legsY - 10, bodyWidth/2 - 15, shortsHeight);

            // Skin below shorts
            ctx.fillStyle = playerData.avatar.skinTone;
            // Left leg lower
            ctx.beginPath();
            ctx.roundRect(x - bodyWidth/2 + 10, legsY + shortsHeight - 10, 25, legHeight - shortsHeight, 5);
            ctx.fill();
            // Right leg lower
            ctx.beginPath();
            ctx.roundRect(x + 15, legsY + shortsHeight - 10, 25, legHeight - shortsHeight, 5);
            ctx.fill();
        } else {
            // Draw pants/jeans (full length)
            // Left pant leg
            ctx.fillRect(x - bodyWidth/2 + 5, legsY - 10, bodyWidth/2 - 15, legHeight);
            // Right pant leg
            ctx.fillRect(x + 10, legsY - 10, bodyWidth/2 - 15, legHeight);

            // Add seam line for jeans
            if (currentBottom.type === 'jeans') {
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x - bodyWidth/4, legsY);
                ctx.lineTo(x - bodyWidth/4, legsY + legHeight);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x + bodyWidth/4, legsY);
                ctx.lineTo(x + bodyWidth/4, legsY + legHeight);
                ctx.stroke();
            }
        }
    } else {
        // No clothes, draw skin legs
        ctx.fillStyle = playerData.avatar.skinTone;
        // Left leg
        ctx.beginPath();
        ctx.roundRect(x - bodyWidth/2 + 10, legsY - 10, 25, legHeight, 5);
        ctx.fill();
        // Right leg
        ctx.beginPath();
        ctx.roundRect(x + 15, legsY - 10, 25, legHeight, 5);
        ctx.fill();
    }

    // Draw shoes
    if (currentShoes) {
        ctx.fillStyle = currentShoes.color;
        const shoeY = legsY + legHeight - 10;
        // Left shoe
        ctx.beginPath();
        ctx.ellipse(x - bodyWidth/2 + 22, shoeY, 18, 12, 0, 0, 2 * Math.PI);
        ctx.fill();
        // Right shoe
        ctx.beginPath();
        ctx.ellipse(x + 27, shoeY, 18, 12, 0, 0, 2 * Math.PI);
        ctx.fill();

        // Shoe highlights
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.ellipse(x - bodyWidth/2 + 22, shoeY - 3, 8, 5, 0, 0, Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x + 27, shoeY - 3, 8, 5, 0, 0, Math.PI);
        ctx.fill();
    }

    // Draw accessory (hat/cap on body position, scarf on neck)
    if (currentAccessory) {
        if (currentAccessory.type === 'scarf') {
            ctx.fillStyle = currentAccessory.color;
            ctx.fillRect(x - 20, y - 115 * scale, 40, 15);
            // Add pattern
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            for (let i = 0; i < 3; i++) {
                ctx.fillRect(x - 15 + i * 15, y - 113 * scale, 3, 11);
            }
        }
    }

    ctx.restore();
}

function drawHead(x, y, scale) {
    ctx.save();

    // Larger head for anime/chibi style
    const faceWidth = 120;
    const faceHeight = 130;

    // Draw hair (behind head) first
    drawHairBack(x, y, faceWidth, faceHeight);

    // Face shape with gradient shading
    const skinGradient = ctx.createRadialGradient(x, y - 10, 0, x, y, faceHeight/1.5);
    skinGradient.addColorStop(0, lightenColor(playerData.avatar.skinTone, 10));
    skinGradient.addColorStop(1, playerData.avatar.skinTone);
    ctx.fillStyle = skinGradient;

    ctx.beginPath();

    switch (playerData.avatar.faceShape) {
        case 'round':
            ctx.ellipse(x, y, faceWidth/2, faceHeight/2, 0, 0, 2 * Math.PI);
            break;
        case 'square':
            ctx.roundRect(x - faceWidth/2, y - faceHeight/2, faceWidth, faceHeight, 15);
            break;
        case 'oval':
            ctx.ellipse(x, y, faceWidth/2 - 8, faceHeight/2 + 5, 0, 0, 2 * Math.PI);
            break;
        case 'heart':
            ctx.moveTo(x, y + faceHeight/2);
            ctx.bezierCurveTo(x - faceWidth/2, y, x - faceWidth/2, y - faceHeight/3, x, y - faceHeight/2);
            ctx.bezierCurveTo(x + faceWidth/2, y - faceHeight/3, x + faceWidth/2, y, x, y + faceHeight/2);
            break;
        case 'diamond':
            ctx.moveTo(x, y - faceHeight/2);
            ctx.quadraticCurveTo(x + faceWidth/2, y, x, y + faceHeight/2);
            ctx.quadraticCurveTo(x - faceWidth/2, y, x, y - faceHeight/2);
            break;
    }

    ctx.fill();

    // Soft face contour shading
    ctx.fillStyle = 'rgba(0,0,0,0.04)';
    ctx.beginPath();
    ctx.ellipse(x - 20, y + 15, 12, 20, -0.2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 20, y + 15, 12, 20, 0.2, 0, 2 * Math.PI);
    ctx.fill();

    // Chin highlight
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath();
    ctx.ellipse(x, y - 25, 25, 30, 0, 0, Math.PI);
    ctx.fill();

    // Eyes - MUCH larger for anime style
    drawAnimeEyes(x, y - 15);

    // Nose - subtle
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.beginPath();
    ctx.ellipse(x, y + 15, 3, 5, 0, 0, Math.PI);
    ctx.fill();

    // Mouth - cute anime style
    ctx.strokeStyle = '#FF69B4';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(x, y + 28, 12, 0.3, Math.PI - 0.3);
    ctx.stroke();

    // Lip gloss effect
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x - 6, y + 26, 4, 0.5, Math.PI - 0.5);
    ctx.stroke();

    // Blush - larger and softer
    const blushGradient = ctx.createRadialGradient(x - 45, y + 10, 0, x - 45, y + 10, 18);
    blushGradient.addColorStop(0, 'rgba(255, 182, 193, 0.6)');
    blushGradient.addColorStop(1, 'rgba(255, 182, 193, 0)');
    ctx.fillStyle = blushGradient;
    ctx.beginPath();
    ctx.ellipse(x - 45, y + 10, 18, 12, 0, 0, 2 * Math.PI);
    ctx.fill();

    const blushGradient2 = ctx.createRadialGradient(x + 45, y + 10, 0, x + 45, y + 10, 18);
    blushGradient2.addColorStop(0, 'rgba(255, 182, 193, 0.6)');
    blushGradient2.addColorStop(1, 'rgba(255, 182, 193, 0)');
    ctx.fillStyle = blushGradient2;
    ctx.beginPath();
    ctx.ellipse(x + 45, y + 10, 18, 12, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Draw hair (front) over everything
    drawHairFront(x, y, faceWidth, faceHeight);

    // Draw accessory on head (cap/hat)
    const currentAccessory = playerData.tryingOn.accessory || playerData.currentClothes.accessory;
    if (currentAccessory && (currentAccessory.type === 'cap' || currentAccessory.type === 'hat')) {
        ctx.fillStyle = currentAccessory.color;
        if (currentAccessory.type === 'cap') {
            // Draw cap
            ctx.beginPath();
            ctx.ellipse(x, y - faceHeight/2 - 15, faceWidth/2 + 15, 25, 0, Math.PI, 2 * Math.PI);
            ctx.fill();
            // Visor
            ctx.beginPath();
            ctx.ellipse(x + 25, y - faceHeight/2 + 8, 40, 10, 0, 0, Math.PI);
            ctx.fill();
            // Cap shading
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            ctx.beginPath();
            ctx.ellipse(x - 10, y - faceHeight/2 - 10, 15, 10, 0, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            // Draw hat
            ctx.beginPath();
            ctx.ellipse(x, y - faceHeight/2 - 25, faceWidth/2 + 20, 30, 0, Math.PI, 2 * Math.PI);
            ctx.fill();
            // Brim
            ctx.beginPath();
            ctx.ellipse(x, y - faceHeight/2 + 5, faceWidth/2 + 25, 10, 0, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    ctx.restore();
}

function drawAnimeEyes(x, y) {
    const eyeColor = playerData.avatar.eyeColor;
    const eyeShape = playerData.avatar.eyeShape;

    // Eyes are MUCH bigger and more spaced for anime look
    const eyeSpacing = 35;

    // Left eye
    drawAnimeEye(x - eyeSpacing, y, eyeColor, eyeShape, false);
    // Right eye
    drawAnimeEye(x + eyeSpacing, y, eyeColor, eyeShape, true);
}

function drawAnimeEye(x, y, color, shape, isRight) {
    ctx.save();

    // Much larger eyes for anime style
    const eyeWidth = shape === 'round' || shape === 'bigAlmond' ? 24 : 22;
    const eyeHeight = shape === 'round' ? 28 : shape === 'bigAlmond' ? 26 : 20;

    // Eye shadow/makeup
    ctx.fillStyle = 'rgba(200, 150, 200, 0.15)';
    ctx.beginPath();
    ctx.ellipse(x, y - 3, eyeWidth + 3, eyeHeight + 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    // White of eye with gradient
    const whiteGradient = ctx.createRadialGradient(x, y, 0, x, y, eyeHeight);
    whiteGradient.addColorStop(0, '#FFFFFF');
    whiteGradient.addColorStop(1, '#F5F5F5');
    ctx.fillStyle = whiteGradient;

    ctx.beginPath();

    switch (shape) {
        case 'round':
            ctx.ellipse(x, y, eyeWidth, eyeHeight, 0, 0, 2 * Math.PI);
            break;
        case 'almond':
            ctx.ellipse(x, y, eyeWidth - 2, eyeHeight - 6, 0, 0, 2 * Math.PI);
            break;
        case 'cat':
            ctx.moveTo(x - eyeWidth, y);
            ctx.quadraticCurveTo(x, y - eyeHeight, x + eyeWidth, y);
            ctx.quadraticCurveTo(x, y + eyeHeight - 5, x - eyeWidth, y);
            break;
        case 'bigAlmond':
            ctx.ellipse(x, y, eyeWidth, eyeHeight - 2, 0, 0, 2 * Math.PI);
            break;
    }

    ctx.fill();

    // Iris with gradient
    const irisSize = 14;
    const irisGradient = ctx.createRadialGradient(x, y + 2, 0, x, y, irisSize);
    irisGradient.addColorStop(0, lightenColor(color, 30));
    irisGradient.addColorStop(0.5, color);
    irisGradient.addColorStop(1, darkenColor(color, 20));

    ctx.fillStyle = irisGradient;
    ctx.beginPath();
    ctx.arc(x, y + 2, irisSize, 0, 2 * Math.PI);
    ctx.fill();

    // Iris detail ring
    ctx.strokeStyle = darkenColor(color, 30);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y + 2, irisSize - 2, 0, 2 * Math.PI);
    ctx.stroke();

    // Pupil
    const pupilGradient = ctx.createRadialGradient(x, y + 2, 0, x, y + 2, 7);
    pupilGradient.addColorStop(0, '#000000');
    pupilGradient.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = pupilGradient;
    ctx.beginPath();
    ctx.arc(x, y + 2, 7, 0, 2 * Math.PI);
    ctx.fill();

    // Multiple highlights for sparkly anime eyes
    // Main highlight
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath();
    ctx.ellipse(x - 6, y - 6, 6, 8, -0.3, 0, 2 * Math.PI);
    ctx.fill();

    // Secondary highlight
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath();
    ctx.arc(x + 5, y - 2, 3, 0, 2 * Math.PI);
    ctx.fill();

    // Small sparkle
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath();
    ctx.arc(x - 3, y + 6, 2, 0, 2 * Math.PI);
    ctx.fill();

    // Bottom shine
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.beginPath();
    ctx.ellipse(x, y + irisSize - 3, irisSize - 4, 3, 0, 0, Math.PI);
    ctx.fill();

    // Upper eyelid
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();

    if (shape === 'cat') {
        ctx.moveTo(x - eyeWidth - 4, y);
        ctx.quadraticCurveTo(x, y - eyeHeight - 5, x + eyeWidth + 4, y);
    } else {
        ctx.ellipse(x, y, eyeWidth + 2, eyeHeight + 2, 0, Math.PI, 2 * Math.PI);
    }
    ctx.stroke();

    // Lower eyelid (thinner)
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(x, y, eyeWidth - 2, eyeHeight - 2, 0, 0, Math.PI);
    ctx.stroke();

    // Eyelashes - longer and more dramatic
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';

    // Upper lashes
    for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        const angle = (Math.PI / 7) * i - Math.PI/2;
        const startX = x + Math.cos(angle - Math.PI / 2) * eyeWidth;
        const startY = y + Math.sin(angle - Math.PI / 2) * eyeHeight;
        const lashLength = i === 1 || i === 5 ? 12 : i === 3 ? 14 : 10;
        const endX = startX + Math.cos(angle - Math.PI / 2) * lashLength;
        const endY = startY + Math.sin(angle - Math.PI / 2) * lashLength;
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }

    // Corner highlight (inner eye)
    ctx.fillStyle = 'rgba(255, 200, 220, 0.6)';
    ctx.beginPath();
    ctx.arc(isRight ? x - eyeWidth + 3 : x + eyeWidth - 3, y, 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
}

// Keep old function for compatibility, redirect to new one
function drawEyes(x, y) {
    drawAnimeEyes(x, y);
}

function drawHairBack(x, y, faceWidth, faceHeight) {
    ctx.save();

    const hairLength = playerData.avatar.hairLength;
    const hairStyle = playerData.avatar.hairStyle;
    const hairColor = playerData.avatar.hairColor;

    // Create gradient for more depth
    const hairGradient = ctx.createLinearGradient(x - faceWidth, y - faceHeight/2, x + faceWidth, y + 100);
    hairGradient.addColorStop(0, lightenColor(hairColor, 15));
    hairGradient.addColorStop(0.5, hairColor);
    hairGradient.addColorStop(1, darkenColor(hairColor, 10));
    ctx.fillStyle = hairGradient;

    // Back hair volume - bigger for anime style
    ctx.beginPath();
    ctx.ellipse(x, y - faceHeight/2 - 5, faceWidth/2 + 30, 45, 0, Math.PI, 2 * Math.PI);
    ctx.fill();

    // Shadow under top hair
    ctx.fillStyle = darkenColor(hairColor, 15);
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.ellipse(x, y - faceHeight/2 + 30, faceWidth/2 + 25, 15, 0, 0, Math.PI);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Side hair
    let sideHairLength = 0;
    switch (hairLength) {
        case 'short': sideHairLength = 70; break;
        case 'shoulder': sideHairLength = 140; break;
        case 'long': sideHairLength = 210; break;
        case 'veryLong': sideHairLength = 280; break;
    }

    // Hair strands with gradient
    ctx.fillStyle = hairGradient;

    // Left side
    ctx.beginPath();
    if (hairStyle === 'straight') {
        ctx.moveTo(x - faceWidth/2 - 20, y - faceHeight/2 + 15);
        ctx.lineTo(x - faceWidth/2 - 18, y + sideHairLength);
        ctx.lineTo(x - faceWidth/2 + 8, y + sideHairLength - 5);
        ctx.lineTo(x - faceWidth/2 + 5, y - faceHeight/2 + 15);
    } else if (hairStyle === 'wavy') {
        ctx.moveTo(x - faceWidth/2 - 20, y - faceHeight/2 + 15);
        ctx.quadraticCurveTo(x - faceWidth/2 - 32, y + sideHairLength/2, x - faceWidth/2 - 18, y + sideHairLength);
        ctx.lineTo(x - faceWidth/2 + 8, y + sideHairLength - 5);
        ctx.quadraticCurveTo(x - faceWidth/2 - 8, y + sideHairLength/2, x - faceWidth/2 + 5, y - faceHeight/2 + 15);
    } else if (hairStyle === 'curly') {
        ctx.moveTo(x - faceWidth/2 - 20, y - faceHeight/2 + 15);
        for (let i = 0; i < 6; i++) {
            const curveY = y - faceHeight/2 + 15 + (sideHairLength / 6) * i;
            ctx.quadraticCurveTo(x - faceWidth/2 - 32, curveY + sideHairLength/12, x - faceWidth/2 - 20, curveY + sideHairLength/6);
        }
        ctx.lineTo(x - faceWidth/2 + 8, y + sideHairLength - 5);
        ctx.lineTo(x - faceWidth/2 + 5, y - faceHeight/2 + 15);
    } else if (hairStyle === 'bangs') {
        ctx.moveTo(x - faceWidth/2 - 20, y - faceHeight/2 + 15);
        ctx.lineTo(x - faceWidth/2 - 18, y + sideHairLength);
        ctx.lineTo(x - faceWidth/2 + 8, y + sideHairLength - 5);
        ctx.lineTo(x - faceWidth/2 + 5, y - faceHeight/2 + 15);
    }
    ctx.closePath();
    ctx.fill();

    // Right side (mirror)
    ctx.beginPath();
    if (hairStyle === 'straight') {
        ctx.moveTo(x + faceWidth/2 + 20, y - faceHeight/2 + 15);
        ctx.lineTo(x + faceWidth/2 + 18, y + sideHairLength);
        ctx.lineTo(x + faceWidth/2 - 8, y + sideHairLength - 5);
        ctx.lineTo(x + faceWidth/2 - 5, y - faceHeight/2 + 15);
    } else if (hairStyle === 'wavy') {
        ctx.moveTo(x + faceWidth/2 + 20, y - faceHeight/2 + 15);
        ctx.quadraticCurveTo(x + faceWidth/2 + 32, y + sideHairLength/2, x + faceWidth/2 + 18, y + sideHairLength);
        ctx.lineTo(x + faceWidth/2 - 8, y + sideHairLength - 5);
        ctx.quadraticCurveTo(x + faceWidth/2 + 8, y + sideHairLength/2, x + faceWidth/2 - 5, y - faceHeight/2 + 15);
    } else if (hairStyle === 'curly') {
        ctx.moveTo(x + faceWidth/2 + 20, y - faceHeight/2 + 15);
        for (let i = 0; i < 6; i++) {
            const curveY = y - faceHeight/2 + 15 + (sideHairLength / 6) * i;
            ctx.quadraticCurveTo(x + faceWidth/2 + 32, curveY + sideHairLength/12, x + faceWidth/2 + 20, curveY + sideHairLength/6);
        }
        ctx.lineTo(x + faceWidth/2 - 8, y + sideHairLength - 5);
        ctx.lineTo(x + faceWidth/2 - 5, y - faceHeight/2 + 15);
    } else if (hairStyle === 'bangs') {
        ctx.moveTo(x + faceWidth/2 + 20, y - faceHeight/2 + 15);
        ctx.lineTo(x + faceWidth/2 + 18, y + sideHairLength);
        ctx.lineTo(x + faceWidth/2 - 8, y + sideHairLength - 5);
        ctx.lineTo(x + faceWidth/2 - 5, y - faceHeight/2 + 15);
    }
    ctx.closePath();
    ctx.fill();

    // Add multiple hair highlights for depth
    ctx.fillStyle = lightenColor(hairColor, 50);
    ctx.globalAlpha = 0.35;

    // Main highlights on top
    ctx.beginPath();
    ctx.ellipse(x - 25, y - faceHeight/2 + 5, 20, 35, -0.4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 25, y - faceHeight/2 + 5, 20, 35, 0.4, 0, 2 * Math.PI);
    ctx.fill();

    // Secondary highlights
    ctx.fillStyle = lightenColor(hairColor, 35);
    ctx.globalAlpha = 0.25;
    ctx.beginPath();
    ctx.ellipse(x - 35, y + sideHairLength/3, 12, 40, -0.2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 35, y + sideHairLength/3, 12, 40, 0.2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.restore();
}

function drawHairFront(x, y, faceWidth, faceHeight) {
    ctx.save();

    const hairStyle = playerData.avatar.hairStyle;
    const hairColor = playerData.avatar.hairColor;

    // Draw bangs if style includes them
    if (hairStyle === 'bangs') {
        // Gradient for bangs
        const bangGradient = ctx.createLinearGradient(x, y - faceHeight/2, x, y - faceHeight/2 + 60);
        bangGradient.addColorStop(0, lightenColor(hairColor, 20));
        bangGradient.addColorStop(1, hairColor);
        ctx.fillStyle = bangGradient;

        // Main bangs shape
        ctx.beginPath();
        ctx.moveTo(x - faceWidth/2 - 15, y - faceHeight/2 - 5);

        // Draw individual bang strands with more detail
        for (let i = -4; i <= 4; i++) {
            const bangX = x + i * 15;
            const bangY = y - faceHeight/2 + 45 + Math.abs(i) * 6;
            // Add curve to each strand
            if (i < 4) {
                ctx.quadraticCurveTo(bangX - 5, bangY - 10, bangX, bangY);
            } else {
                ctx.lineTo(bangX, bangY);
            }
        }

        ctx.lineTo(x + faceWidth/2 + 15, y - faceHeight/2 - 5);
        ctx.closePath();
        ctx.fill();

        // Add highlights to bangs
        ctx.fillStyle = lightenColor(hairColor, 45);
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.ellipse(x - 20, y - faceHeight/2 + 20, 15, 25, -0.2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x + 15, y - faceHeight/2 + 20, 15, 25, 0.2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Add separation lines between bangs for more detail
        ctx.strokeStyle = darkenColor(hairColor, 20);
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.3;
        for (let i = -3; i <= 3; i++) {
            const lineX = x + i * 15;
            ctx.beginPath();
            ctx.moveTo(lineX, y - faceHeight/2 + 5);
            ctx.lineTo(lineX, y - faceHeight/2 + 40 + Math.abs(i) * 5);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }

    ctx.restore();
}

function drawPets(centerX, baseY) {
    const pets = playerData.activePets;

    if (pets.length === 0) return;

    ctx.save();
    ctx.font = '48px Arial';

    const spacing = 80;
    const startX = centerX - (pets.length - 1) * spacing / 2;
    const time = Date.now() / 1000; // Time in seconds

    pets.forEach((pet, index) => {
        const petData = petsDatabase.find(p => p.id === pet);
        if (petData) {
            const x = startX + index * spacing;

            // Add bobbing animation with phase offset for each pet
            const phaseOffset = index * 0.5; // Different timing for each pet
            const bobAmount = Math.sin(time * 2 + phaseOffset) * 8; // Gentle up/down movement

            // Add slight horizontal sway
            const swayAmount = Math.sin(time * 1.5 + phaseOffset) * 3;

            ctx.fillText(petData.emoji, x - 24 + swayAmount, baseY + bobAmount);
        }
    });

    ctx.restore();
}

// Helper function to lighten colors
function lightenColor(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 +
           (G<255?G<1?0:G:255)*0x100 +
           (B<255?B<1?0:B:255))
           .toString(16).slice(1);
}

// Helper function to darken colors
function darkenColor(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R>0?R:0)*0x10000 +
           (G>0?G:0)*0x100 +
           (B>0?B:0))
           .toString(16).slice(1);
}

// ============================================
// UI INTERACTIONS
// ============================================

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;

        // Update button states
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        const activeTab = document.getElementById(`${tabName}-tab`);
        activeTab.classList.add('active');

        // Animate tab switch
        animateTabSwitch(activeTab);

        // Animate shop items if switching to clothes or pets tab
        if (tabName === 'clothes' || tabName === 'pets') {
            setTimeout(() => animateShopItems(), 100);
        }
    });
});

// Appearance customization
document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const value = btn.dataset.value;

        // Update selection visual
        const siblings = btn.parentElement.querySelectorAll('.option-btn');
        siblings.forEach(s => s.classList.remove('selected'));
        btn.classList.add('selected');

        // Update avatar
        playerData.avatar[type] = value;
        drawAvatar();
        animateAvatarChange();
    });
});

document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const value = btn.dataset.value;

        // Update selection visual
        const siblings = btn.parentElement.querySelectorAll('.color-btn');
        siblings.forEach(s => s.classList.remove('selected'));
        btn.classList.add('selected');

        // Update avatar
        playerData.avatar[type] = value;
        drawAvatar();
        animateAvatarChange();
    });
});

// ============================================
// SHOP FUNCTIONALITY
// ============================================

function populateShop() {
    const shopContainer = document.getElementById('clothesShop');
    shopContainer.innerHTML = '';

    // Add all clothing categories
    const categories = [
        { name: 'Överdel', items: clothesDatabase.tops, slot: 'top' },
        { name: 'Underdel', items: clothesDatabase.bottoms, slot: 'bottom' },
        { name: 'Skor', items: clothesDatabase.shoes, slot: 'shoes' },
        { name: 'Accessoarer', items: clothesDatabase.accessories, slot: 'accessory' }
    ];

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'customization-section';
        categoryDiv.innerHTML = `<h3>${category.name}</h3>`;

        category.items.forEach(item => {
            const owned = playerData.ownedClothes.includes(item.id);
            const itemDiv = document.createElement('div');
            itemDiv.className = 'shop-item';

            const colorPreview = `<div style="width: 30px; height: 30px; background: ${item.color}; border-radius: 50%; display: inline-block; margin-right: 10px; border: 2px solid #ddd;"></div>`;

            itemDiv.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center;">
                        ${colorPreview}
                        <h4 style="margin: 0;">${item.name}</h4>
                        ${owned ? '<span class="owned-label">Ägs</span>' : ''}
                    </div>
                    <span style="color: #FFD700; font-weight: bold;">${item.price} 💎</span>
                </div>
                <div class="shop-item-buttons">
                    <button class="shop-btn try-btn" onclick="tryClothes('${category.slot}', '${item.id}')">Prova</button>
                    ${!owned ? `<button class="shop-btn buy-btn" onclick="buyClothes('${item.id}', ${item.price})">Köp</button>` : ''}
                    <button class="shop-btn remove-btn" onclick="removeClothes('${category.slot}')">Ta av</button>
                </div>
            `;

            categoryDiv.appendChild(itemDiv);
        });

        shopContainer.appendChild(categoryDiv);
    });

    // Animate shop items entrance
    setTimeout(() => animateShopItems(), 100);
}

function tryClothes(slot, itemId) {
    // Find the item
    let item = null;
    Object.values(clothesDatabase).forEach(category => {
        const found = category.find(i => i.id === itemId);
        if (found) item = found;
    });

    if (item) {
        playerData.tryingOn[slot] = item;
        drawAvatar();
        animateAvatarChange();
    }
}

function buyClothes(itemId, price) {
    // Check if already owned
    if (playerData.ownedClothes.includes(itemId)) {
        alert('Du äger redan detta plagg!');
        return;
    }

    // Check if enough diamonds
    if (playerData.diamonds < price) {
        alert('Du har inte tillräckligt med diamanter!');
        return;
    }

    // Buy the item
    playerData.diamonds -= price;
    playerData.ownedClothes.push(itemId);

    // Find the item and add to current clothes
    let item = null;
    let slot = null;

    if (clothesDatabase.tops.find(i => i.id === itemId)) {
        item = clothesDatabase.tops.find(i => i.id === itemId);
        slot = 'top';
    } else if (clothesDatabase.bottoms.find(i => i.id === itemId)) {
        item = clothesDatabase.bottoms.find(i => i.id === itemId);
        slot = 'bottom';
    } else if (clothesDatabase.shoes.find(i => i.id === itemId)) {
        item = clothesDatabase.shoes.find(i => i.id === itemId);
        slot = 'shoes';
    } else if (clothesDatabase.accessories.find(i => i.id === itemId)) {
        item = clothesDatabase.accessories.find(i => i.id === itemId);
        slot = 'accessory';
    }

    if (item && slot) {
        playerData.currentClothes[slot] = item;
        playerData.tryingOn[slot] = null; // Clear trying on
    }

    updateDiamondDisplay();
    populateShop();
    drawAvatar();
    animateAvatarChange();

    // Animate diamond display on purchase
    anime({
        targets: '.diamonds-display',
        scale: [1, 1.15, 1],
        duration: 500,
        easing: 'easeOutElastic(1, .5)'
    });

    alert(`Du köpte ${item.name}!`);
}

function removeClothes(slot) {
    playerData.currentClothes[slot] = null;
    playerData.tryingOn[slot] = null;
    drawAvatar();
    animateAvatarChange();
}

// ============================================
// PETS FUNCTIONALITY
// ============================================

function populatePetsShop() {
    const shopContainer = document.getElementById('petsShop');
    shopContainer.innerHTML = '';

    petsDatabase.forEach(pet => {
        const owned = playerData.ownedPets.includes(pet.id);
        const active = playerData.activePets.includes(pet.id);

        const petDiv = document.createElement('div');
        petDiv.className = 'shop-item';

        petDiv.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span style="font-size: 40px;">${pet.emoji}</span>
                    <div>
                        <h4 style="margin: 0;">${pet.name}</h4>
                        ${owned ? '<span class="owned-label">Ägs</span>' : ''}
                        ${active ? '<span class="owned-label" style="background: #2196F3;">Aktiv</span>' : ''}
                    </div>
                </div>
                <span style="color: #FFD700; font-weight: bold;">${pet.price} 💎</span>
            </div>
            <div class="shop-item-buttons">
                ${!owned ? `<button class="shop-btn buy-btn" onclick="buyPet('${pet.id}', ${pet.price})">Köp</button>` : ''}
                ${owned && !active ? `<button class="shop-btn try-btn" onclick="activatePet('${pet.id}')">Aktivera</button>` : ''}
                ${active ? `<button class="shop-btn remove-btn" onclick="deactivatePet('${pet.id}')">Avaktivera</button>` : ''}
            </div>
        `;

        shopContainer.appendChild(petDiv);
    });

    updateActivePetsList();

    // Animate shop items entrance
    setTimeout(() => animateShopItems(), 100);
}

function buyPet(petId, price) {
    if (playerData.ownedPets.includes(petId)) {
        alert('Du äger redan denna pet!');
        return;
    }

    if (playerData.diamonds < price) {
        alert('Du har inte tillräckligt med diamanter!');
        return;
    }

    playerData.diamonds -= price;
    playerData.ownedPets.push(petId);

    const pet = petsDatabase.find(p => p.id === petId);

    updateDiamondDisplay();
    populatePetsShop();

    // Animate diamond display on purchase
    anime({
        targets: '.diamonds-display',
        scale: [1, 1.15, 1],
        duration: 500,
        easing: 'easeOutElastic(1, .5)'
    });

    alert(`Du köpte ${pet.name}!`);
}

function activatePet(petId) {
    if (playerData.activePets.length >= 3) {
        alert('Du kan bara ha 3 aktiva pets!');
        return;
    }

    if (!playerData.activePets.includes(petId)) {
        playerData.activePets.push(petId);
        populatePetsShop();
        drawAvatar();
        animateAvatarChange();
    }
}

function deactivatePet(petId) {
    playerData.activePets = playerData.activePets.filter(id => id !== petId);
    populatePetsShop();
    drawAvatar();
    animateAvatarChange();
}

function updateActivePetsList() {
    const listContainer = document.getElementById('activePetsList');
    listContainer.innerHTML = '';

    if (playerData.activePets.length === 0) {
        listContainer.innerHTML = '<p style="color: #999;">Inga aktiva pets</p>';
        return;
    }

    playerData.activePets.forEach(petId => {
        const pet = petsDatabase.find(p => p.id === petId);
        if (pet) {
            const badge = document.createElement('div');
            badge.className = 'active-pet-badge';
            badge.innerHTML = `
                <span style="font-size: 24px;">${pet.emoji}</span>
                <span>${pet.name}</span>
                <button class="remove-pet-btn" onclick="deactivatePet('${pet.id}')">×</button>
            `;
            listContainer.appendChild(badge);
        }
    });
}

// ============================================
// OUTFITS FUNCTIONALITY
// ============================================

function populateOutfitsList() {
    const listContainer = document.getElementById('outfitsList');
    listContainer.innerHTML = '';

    if (playerData.savedOutfits.length === 0) {
        listContainer.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">Inga sparade outfits än</p>';
        return;
    }

    playerData.savedOutfits.forEach((outfit, index) => {
        const outfitDiv = document.createElement('div');
        outfitDiv.className = 'outfit-item';

        const clothingList = [];
        Object.entries(outfit.clothes).forEach(([slot, item]) => {
            if (item) clothingList.push(item.name);
        });

        const petsList = outfit.pets.map(petId => {
            const pet = petsDatabase.find(p => p.id === petId);
            return pet ? pet.emoji : '';
        }).join(' ');

        outfitDiv.innerHTML = `
            <h4>${outfit.name}</h4>
            <p style="color: #666; font-size: 0.9rem; margin: 5px 0;">
                ${clothingList.length > 0 ? clothingList.join(', ') : 'Inga kläder'}
            </p>
            ${petsList ? `<p style="font-size: 24px; margin: 5px 0;">${petsList}</p>` : ''}
            <div class="outfit-buttons">
                <button class="shop-btn load-btn" onclick="loadOutfit(${index})">Ladda</button>
                <button class="shop-btn delete-btn" onclick="deleteOutfit(${index})">Ta bort</button>
            </div>
        `;

        listContainer.appendChild(outfitDiv);
    });
}

document.getElementById('saveOutfitBtn').addEventListener('click', () => {
    if (playerData.savedOutfits.length >= 25) {
        alert('Du har redan 25 sparade outfits! Ta bort en för att spara fler.');
        return;
    }

    if (playerData.diamonds < 5) {
        alert('Du behöver 5 diamanter för att spara en outfit!');
        return;
    }

    const name = prompt('Namnge din outfit:');
    if (!name) return;

    const outfit = {
        name: name,
        clothes: { ...playerData.currentClothes },
        pets: [...playerData.activePets]
    };

    playerData.savedOutfits.push(outfit);
    playerData.diamonds -= 5;

    updateDiamondDisplay();
    populateOutfitsList();

    alert('Outfit sparad!');
});

function loadOutfit(index) {
    const outfit = playerData.savedOutfits[index];
    if (!outfit) return;

    playerData.currentClothes = { ...outfit.clothes };
    playerData.activePets = [...outfit.pets];

    // Clear trying on
    playerData.tryingOn = { top: null, bottom: null, shoes: null, accessory: null };

    drawAvatar();
    populatePetsShop();
    animateAvatarChange();

    alert(`Outfit "${outfit.name}" laddad!`);
}

function deleteOutfit(index) {
    if (confirm('Är du säker på att du vill ta bort denna outfit?')) {
        playerData.savedOutfits.splice(index, 1);
        populateOutfitsList();
    }
}

// ============================================
// CODES FUNCTIONALITY
// ============================================

document.getElementById('redeemCodeBtn').addEventListener('click', () => {
    const input = document.getElementById('codeInput');
    const code = input.value.trim().toUpperCase();

    if (!code) {
        alert('Ange en kod!');
        return;
    }

    if (!promoCodes[code]) {
        alert('Ogiltig kod!');
        return;
    }

    if (playerData.usedCodes.includes(code)) {
        alert('Du har redan använt denna kod!');
        return;
    }

    const diamonds = promoCodes[code].diamonds;
    playerData.diamonds += diamonds;
    playerData.usedCodes.push(code);

    updateDiamondDisplay();
    input.value = '';

    // Celebrate with animation!
    anime({
        targets: '.diamonds-display',
        scale: [1, 1.3, 1],
        rotate: [0, 15, -15, 0],
        duration: 800,
        easing: 'easeOutElastic(1, .5)'
    });

    anime({
        targets: '.diamond-icon',
        scale: [1, 1.5, 1],
        duration: 600,
        easing: 'easeOutBack'
    });

    alert(`Du fick ${diamonds} diamanter! 💎`);
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

function updateDiamondDisplay() {
    document.getElementById('diamondCount').textContent = playerData.diamonds;

    // Animate diamond count change with anime.js
    anime({
        targets: '#diamondCount',
        scale: [1, 1.3, 1],
        duration: 500,
        easing: 'easeOutElastic(1, .5)'
    });
}

// ============================================
// ANIMATIONS WITH ANIME.JS
// ============================================

// Avatar breathing/idle animation
let avatarBreathingAnimation = null;
let petAnimations = [];

function startAvatarBreathing() {
    // Subtle breathing effect on canvas
    if (avatarBreathingAnimation) {
        avatarBreathingAnimation.pause();
    }

    avatarBreathingAnimation = anime({
        targets: '#avatarCanvas',
        translateY: [0, -3, 0],
        duration: 3000,
        easing: 'easeInOutSine',
        loop: true
    });
}

function stopAvatarBreathing() {
    if (avatarBreathingAnimation) {
        avatarBreathingAnimation.pause();
    }
}

// Pet hopping/bouncing animations
let petAnimationLoop = null;

function startPetAnimations() {
    // Clear any existing pet animation loop
    if (petAnimationLoop) {
        cancelAnimationFrame(petAnimationLoop);
    }

    // Start continuous animation loop for pets
    function animatePets() {
        drawAvatar(); // Redraw with updated time for pet animations
        petAnimationLoop = requestAnimationFrame(animatePets);
    }

    animatePets();
}

function stopPetAnimations() {
    if (petAnimationLoop) {
        cancelAnimationFrame(petAnimationLoop);
        petAnimationLoop = null;
    }
}

// Smooth transition when avatar changes
function animateAvatarChange() {
    // Stop breathing temporarily
    stopAvatarBreathing();

    // Quick fade + scale effect
    anime({
        targets: '#avatarCanvas',
        opacity: [0.7, 1],
        scale: [0.95, 1],
        duration: 400,
        easing: 'easeOutCubic',
        complete: () => {
            // Resume breathing after change
            startAvatarBreathing();
        }
    });
}

// UI entrance animations
function animateUIEntrance() {
    // Animate header
    anime({
        targets: '.game-header',
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo'
    });

    // Animate left panel
    anime({
        targets: '.left-panel',
        translateX: [-100, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 200,
        easing: 'easeOutExpo'
    });

    // Animate right panel (avatar)
    anime({
        targets: '.right-panel',
        translateX: [100, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 200,
        easing: 'easeOutExpo'
    });

    // Stagger animate customization sections
    anime({
        targets: '.customization-section',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(100, {start: 400}),
        easing: 'easeOutQuad'
    });
}

// Button hover animations (enhanced)
function setupButtonAnimations() {
    // Add hover animations to all buttons
    document.querySelectorAll('.option-btn, .color-btn, .shop-btn, .tab-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.08,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });

        btn.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });

        btn.addEventListener('click', function() {
            // Click animation
            anime({
                targets: this,
                scale: [1, 0.9, 1.05, 1],
                duration: 400,
                easing: 'easeOutElastic(1, .6)'
            });
        });
    });
}

// Diamond sparkle effect
function createDiamondSparkle() {
    const diamondDisplay = document.querySelector('.diamonds-display');

    anime({
        targets: '.diamond-icon',
        rotate: [0, 360],
        duration: 2000,
        easing: 'linear',
        loop: true
    });

    // Pulse effect
    anime({
        targets: '.diamonds-display',
        scale: [1, 1.05, 1],
        duration: 2000,
        easing: 'easeInOutSine',
        loop: true
    });
}

// Shop item entrance animation
function animateShopItems() {
    anime({
        targets: '.shop-item',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: anime.stagger(50),
        easing: 'easeOutQuad'
    });
}

// Clothing purchase animation
function animateClothingPurchase(itemElement) {
    // Success animation
    anime({
        targets: itemElement,
        backgroundColor: ['#ffffff', '#4CAF50', '#ffffff'],
        duration: 1000,
        easing: 'easeInOutQuad'
    });

    anime({
        targets: itemElement,
        scale: [1, 1.05, 1],
        duration: 600,
        easing: 'easeOutElastic(1, .5)'
    });
}

// Tab switching animation
function animateTabSwitch(tabContent) {
    anime({
        targets: tabContent,
        translateX: [50, 0],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutCubic'
    });
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Set default selections
    document.querySelector('[data-type="faceShape"][data-value="oval"]')?.classList.add('selected');
    document.querySelector('[data-type="skinTone"][data-value="#FFE0BD"]')?.classList.add('selected');
    document.querySelector('[data-type="eyeShape"][data-value="round"]')?.classList.add('selected');
    document.querySelector('[data-type="eyeColor"][data-value="#654321"]')?.classList.add('selected');
    document.querySelector('[data-type="hairLength"][data-value="shoulder"]')?.classList.add('selected');
    document.querySelector('[data-type="hairStyle"][data-value="straight"]')?.classList.add('selected');
    document.querySelector('[data-type="hairColor"][data-value="#654321"]')?.classList.add('selected');
    document.querySelector('[data-type="bodyShape"][data-value="slim"]')?.classList.add('selected');
    document.querySelector('[data-type="bodyHeight"][data-value="medium"]')?.classList.add('selected');

    // Initialize shops and lists
    populateShop();
    populatePetsShop();
    populateOutfitsList();

    // Draw initial avatar
    drawAvatar();

    // Start anime.js animations
    animateUIEntrance();
    startAvatarBreathing();
    createDiamondSparkle();
    setupButtonAnimations();
    startPetAnimations(); // Start continuous pet animation loop
}

// Start the game when page loads
window.addEventListener('load', init);
