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

// Clothes database
const clothesDatabase = {
    tops: [
        { id: 't1', name: 'Röd T-shirt', price: 50, color: '#DC143C', type: 'tshirt' },
        { id: 't2', name: 'Blå T-shirt', price: 50, color: '#4169E1', type: 'tshirt' },
        { id: 't3', name: 'Grön T-shirt', price: 50, color: '#32CD32', type: 'tshirt' },
        { id: 't4', name: 'Lila T-shirt', price: 50, color: '#9370DB', type: 'tshirt' },
        { id: 't5', name: 'Vit T-shirt', price: 40, color: '#FFFFFF', type: 'tshirt' },
        { id: 't6', name: 'Gul T-shirt', price: 50, color: '#FFD700', type: 'tshirt' },
        { id: 't7', name: 'Rosa Tröja', price: 70, color: '#FF69B4', type: 'sweater' },
        { id: 't8', name: 'Svart Tröja', price: 70, color: '#000000', type: 'sweater' }
    ],
    bottoms: [
        { id: 'b1', name: 'Röd Kjol', price: 60, color: '#DC143C', type: 'skirt' },
        { id: 'b2', name: 'Blå Kjol', price: 60, color: '#4169E1', type: 'skirt' },
        { id: 'b3', name: 'Grön Kjol', price: 60, color: '#32CD32', type: 'skirt' },
        { id: 'b4', name: 'Rosa Kjol', price: 60, color: '#FF69B4', type: 'skirt' },
        { id: 'b5', name: 'Lila Kjol', price: 60, color: '#9370DB', type: 'skirt' },
        { id: 'b6', name: 'Vit Kjol', price: 55, color: '#FFFFFF', type: 'skirt' },
        { id: 'b7', name: 'Denim Shorts', price: 75, color: '#6495ED', type: 'shorts' },
        { id: 'b8', name: 'Svarta Shorts', price: 75, color: '#000000', type: 'shorts' },
        { id: 'b9', name: 'Vita Shorts', price: 70, color: '#FFFFFF', type: 'shorts' },
        { id: 'b10', name: 'Rosa Shorts', price: 75, color: '#FFB6C1', type: 'shorts' },
        { id: 'b11', name: 'Blå Jeans', price: 90, color: '#4682B4', type: 'jeans' },
        { id: 'b12', name: 'Svarta Byxor', price: 85, color: '#000000', type: 'pants' },
        { id: 'b13', name:'Gråa Byxor', price: 85, color: '#808080', type: 'pants' },
        { id: 'b14', name: 'Bruna Byxor', price: 85, color: '#8B4513', type: 'pants' }
    ],
    shoes: [
        { id: 's1', name: 'Vita Sneakers', price: 100, color: '#FFFFFF', type: 'sneakers' },
        { id: 's2', name: 'Svarta Boots', price: 120, color: '#000000', type: 'boots' },
        { id: 's3', name: 'Röda Skor', price: 95, color: '#DC143C', type: 'casual' },
        { id: 's4', name: 'Rosa Skor', price: 95, color: '#FF69B4', type: 'casual' },
        { id: 's5', name: 'Blå Sneakers', price: 100, color: '#4169E1', type: 'sneakers' }
    ],
    accessories: [
        { id: 'a1', name: 'Röd Keps', price: 40, color: '#DC143C', type: 'cap' },
        { id: 'a2', name: 'Blå Keps', price: 40, color: '#4169E1', type: 'cap' },
        { id: 'a3', name: 'Svart Hatt', price: 50, color: '#000000', type: 'hat' },
        { id: 'a4', name: 'Rosa Halsduk', price: 35, color: '#FF69B4', type: 'scarf' },
        { id: 'a5', name: 'Lila Halsduk', price: 35, color: '#9370DB', type: 'scarf' }
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

function drawAvatar() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;

    // Get body height scale
    const heightScale = playerData.avatar.bodyHeight === 'short' ? 0.85 :
                       playerData.avatar.bodyHeight === 'tall' ? 1.15 : 1.0;

    const bodyY = 400 * heightScale;

    // Draw body
    drawBody(centerX, bodyY, heightScale);

    // Draw head
    drawHead(centerX, 200, heightScale);

    // Draw pets
    drawPets(centerX, bodyY + 200);
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

    // Face shape
    ctx.fillStyle = playerData.avatar.skinTone;

    const faceWidth = 80;
    const faceHeight = 100;

    ctx.beginPath();

    switch (playerData.avatar.faceShape) {
        case 'round':
            ctx.ellipse(x, y, faceWidth/2, faceHeight/2, 0, 0, 2 * Math.PI);
            break;
        case 'square':
            ctx.roundRect(x - faceWidth/2, y - faceHeight/2, faceWidth, faceHeight, 10);
            break;
        case 'oval':
            ctx.ellipse(x, y, faceWidth/2 - 5, faceHeight/2, 0, 0, 2 * Math.PI);
            break;
        case 'heart':
            ctx.moveTo(x, y + faceHeight/2);
            ctx.bezierCurveTo(x - faceWidth/2, y, x - faceWidth/2, y - faceHeight/3, x, y - faceHeight/2);
            ctx.bezierCurveTo(x + faceWidth/2, y - faceHeight/3, x + faceWidth/2, y, x, y + faceHeight/2);
            break;
        case 'diamond':
            ctx.moveTo(x, y - faceHeight/2);
            ctx.lineTo(x + faceWidth/2, y);
            ctx.lineTo(x, y + faceHeight/2);
            ctx.lineTo(x - faceWidth/2, y);
            ctx.closePath();
            break;
    }

    ctx.fill();

    // Face shading
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.beginPath();
    ctx.ellipse(x - 15, y + 10, 8, 15, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 15, y + 10, 8, 15, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Draw hair (behind head)
    drawHairBack(x, y, faceWidth, faceHeight);

    // Eyes
    drawEyes(x, y - 10);

    // Nose
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.beginPath();
    ctx.ellipse(x, y + 10, 4, 6, 0, 0, Math.PI);
    ctx.fill();

    // Mouth
    ctx.strokeStyle = '#FF69B4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y + 20, 15, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // Blush
    ctx.fillStyle = 'rgba(255, 182, 193, 0.5)';
    ctx.beginPath();
    ctx.ellipse(x - 35, y + 5, 12, 8, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 35, y + 5, 12, 8, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Draw hair (front)
    drawHairFront(x, y, faceWidth, faceHeight);

    // Draw accessory on head (cap/hat)
    const currentAccessory = playerData.tryingOn.accessory || playerData.currentClothes.accessory;
    if (currentAccessory && (currentAccessory.type === 'cap' || currentAccessory.type === 'hat')) {
        ctx.fillStyle = currentAccessory.color;
        if (currentAccessory.type === 'cap') {
            // Draw cap
            ctx.beginPath();
            ctx.ellipse(x, y - faceHeight/2 - 10, faceWidth/2 + 10, 20, 0, Math.PI, 2 * Math.PI);
            ctx.fill();
            // Visor
            ctx.beginPath();
            ctx.ellipse(x + 20, y - faceHeight/2 + 5, 35, 8, 0, 0, Math.PI);
            ctx.fill();
        } else {
            // Draw hat
            ctx.beginPath();
            ctx.ellipse(x, y - faceHeight/2 - 20, faceWidth/2 + 15, 25, 0, Math.PI, 2 * Math.PI);
            ctx.fill();
            // Brim
            ctx.beginPath();
            ctx.ellipse(x, y - faceHeight/2 + 5, faceWidth/2 + 20, 8, 0, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    ctx.restore();
}

function drawEyes(x, y) {
    const eyeColor = playerData.avatar.eyeColor;
    const eyeShape = playerData.avatar.eyeShape;

    // Left eye
    drawEye(x - 25, y, eyeColor, eyeShape);
    // Right eye
    drawEye(x + 25, y, eyeColor, eyeShape);
}

function drawEye(x, y, color, shape) {
    ctx.save();

    // White of eye
    ctx.fillStyle = 'white';
    ctx.beginPath();

    switch (shape) {
        case 'round':
            ctx.ellipse(x, y, 15, 18, 0, 0, 2 * Math.PI);
            break;
        case 'almond':
            ctx.ellipse(x, y, 14, 12, 0, 0, 2 * Math.PI);
            break;
        case 'cat':
            ctx.moveTo(x - 15, y);
            ctx.quadraticCurveTo(x, y - 15, x + 15, y);
            ctx.quadraticCurveTo(x, y + 15, x - 15, y);
            break;
        case 'bigAlmond':
            ctx.ellipse(x, y, 16, 14, 0, 0, 2 * Math.PI);
            break;
    }

    ctx.fill();

    // Iris
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fill();

    // Pupil
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();

    // Highlight
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.beginPath();
    ctx.arc(x - 2, y - 2, 3, 0, 2 * Math.PI);
    ctx.fill();

    // Smaller highlight
    ctx.beginPath();
    ctx.arc(x + 3, y + 3, 1.5, 0, 2 * Math.PI);
    ctx.fill();

    // Eyelashes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const angle = (Math.PI / 6) * (i - 2);
        const startX = x + Math.cos(angle - Math.PI / 2) * 15;
        const startY = y + Math.sin(angle - Math.PI / 2) * 15;
        const endX = startX + Math.cos(angle - Math.PI / 2) * 6;
        const endY = startY + Math.sin(angle - Math.PI / 2) * 6;
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }

    ctx.restore();
}

function drawHairBack(x, y, faceWidth, faceHeight) {
    ctx.save();
    ctx.fillStyle = playerData.avatar.hairColor;

    const hairLength = playerData.avatar.hairLength;
    const hairStyle = playerData.avatar.hairStyle;

    // Back hair volume
    ctx.beginPath();
    ctx.ellipse(x, y - faceHeight/2, faceWidth/2 + 20, 35, 0, Math.PI, 2 * Math.PI);
    ctx.fill();

    // Side hair
    let sideHairLength = 0;
    switch (hairLength) {
        case 'short': sideHairLength = 60; break;
        case 'shoulder': sideHairLength = 120; break;
        case 'long': sideHairLength = 180; break;
        case 'veryLong': sideHairLength = 240; break;
    }

    // Left side
    ctx.beginPath();
    if (hairStyle === 'straight') {
        ctx.moveTo(x - faceWidth/2 - 15, y - faceHeight/2 + 10);
        ctx.lineTo(x - faceWidth/2 - 15, y + sideHairLength);
        ctx.lineTo(x - faceWidth/2 + 5, y + sideHairLength);
        ctx.lineTo(x - faceWidth/2 + 5, y - faceHeight/2 + 10);
    } else if (hairStyle === 'wavy') {
        ctx.moveTo(x - faceWidth/2 - 15, y - faceHeight/2 + 10);
        ctx.quadraticCurveTo(x - faceWidth/2 - 25, y + sideHairLength/2, x - faceWidth/2 - 15, y + sideHairLength);
        ctx.lineTo(x - faceWidth/2 + 5, y + sideHairLength);
        ctx.quadraticCurveTo(x - faceWidth/2 - 5, y + sideHairLength/2, x - faceWidth/2 + 5, y - faceHeight/2 + 10);
    } else if (hairStyle === 'curly') {
        ctx.moveTo(x - faceWidth/2 - 15, y - faceHeight/2 + 10);
        for (let i = 0; i < 5; i++) {
            const curveY = y - faceHeight/2 + 10 + (sideHairLength / 5) * i;
            ctx.quadraticCurveTo(x - faceWidth/2 - 25, curveY + sideHairLength/10, x - faceWidth/2 - 15, curveY + sideHairLength/5);
        }
        ctx.lineTo(x - faceWidth/2 + 5, y + sideHairLength);
        ctx.lineTo(x - faceWidth/2 + 5, y - faceHeight/2 + 10);
    }
    ctx.closePath();
    ctx.fill();

    // Right side (mirror)
    ctx.beginPath();
    if (hairStyle === 'straight') {
        ctx.moveTo(x + faceWidth/2 + 15, y - faceHeight/2 + 10);
        ctx.lineTo(x + faceWidth/2 + 15, y + sideHairLength);
        ctx.lineTo(x + faceWidth/2 - 5, y + sideHairLength);
        ctx.lineTo(x + faceWidth/2 - 5, y - faceHeight/2 + 10);
    } else if (hairStyle === 'wavy') {
        ctx.moveTo(x + faceWidth/2 + 15, y - faceHeight/2 + 10);
        ctx.quadraticCurveTo(x + faceWidth/2 + 25, y + sideHairLength/2, x + faceWidth/2 + 15, y + sideHairLength);
        ctx.lineTo(x + faceWidth/2 - 5, y + sideHairLength);
        ctx.quadraticCurveTo(x + faceWidth/2 + 5, y + sideHairLength/2, x + faceWidth/2 - 5, y - faceHeight/2 + 10);
    } else if (hairStyle === 'curly') {
        ctx.moveTo(x + faceWidth/2 + 15, y - faceHeight/2 + 10);
        for (let i = 0; i < 5; i++) {
            const curveY = y - faceHeight/2 + 10 + (sideHairLength / 5) * i;
            ctx.quadraticCurveTo(x + faceWidth/2 + 25, curveY + sideHairLength/10, x + faceWidth/2 + 15, curveY + sideHairLength/5);
        }
        ctx.lineTo(x + faceWidth/2 - 5, y + sideHairLength);
        ctx.lineTo(x + faceWidth/2 - 5, y - faceHeight/2 + 10);
    }
    ctx.closePath();
    ctx.fill();

    // Add hair highlights
    ctx.fillStyle = lightenColor(playerData.avatar.hairColor, 40);
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.ellipse(x - 20, y - faceHeight/2 + 10, 15, 25, -0.3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 20, y - faceHeight/2 + 10, 15, 25, 0.3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.restore();
}

function drawHairFront(x, y, faceWidth, faceHeight) {
    ctx.save();
    ctx.fillStyle = playerData.avatar.hairColor;

    const hairStyle = playerData.avatar.hairStyle;

    // Draw bangs if style includes them
    if (hairStyle === 'bangs') {
        // Bangs
        ctx.beginPath();
        ctx.moveTo(x - faceWidth/2 - 10, y - faceHeight/2);

        // Draw individual bang strands
        for (let i = -3; i <= 3; i++) {
            const bangX = x + i * 12;
            const bangY = y - faceHeight/2 + 40 + Math.abs(i) * 5;
            ctx.lineTo(bangX, bangY);
        }

        ctx.lineTo(x + faceWidth/2 + 10, y - faceHeight/2);
        ctx.closePath();
        ctx.fill();
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

    pets.forEach((pet, index) => {
        const petData = petsDatabase.find(p => p.id === pet);
        if (petData) {
            const x = startX + index * spacing;
            // Add slight bobbing animation effect (static for now)
            ctx.fillText(petData.emoji, x - 24, baseY);
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
        document.getElementById(`${tabName}-tab`).classList.add('active');
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

    alert(`Du köpte ${item.name}!`);
}

function removeClothes(slot) {
    playerData.currentClothes[slot] = null;
    playerData.tryingOn[slot] = null;
    drawAvatar();
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
    }
}

function deactivatePet(petId) {
    playerData.activePets = playerData.activePets.filter(id => id !== petId);
    populatePetsShop();
    drawAvatar();
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

    alert(`Du fick ${diamonds} diamanter! 💎`);
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

function updateDiamondDisplay() {
    document.getElementById('diamondCount').textContent = playerData.diamonds;
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
}

// Start the game when page loads
window.addEventListener('load', init);
