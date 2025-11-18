// ============================================
// IMPORTS - DiceBear Library
// ============================================

import { createAvatar } from '@dicebear/core';
import {
    avataaars,
    adventurer,
    adventurerNeutral,
    bigEars,
    bigEarsNeutral,
    bigSmile,
    bottts,
    botttsNeutral,
    croodles,
    croodlesNeutral,
    funEmoji,
    icons,
    identicon,
    initials,
    lorelei,
    loreleiNeutral,
    micah,
    miniavs,
    notionists,
    notionistsNeutral,
    openPeeps,
    personas,
    pixelArt,
    pixelArtNeutral,
    rings,
    shapes,
    thumbs
} from '@dicebear/collection';

// Avatar styles mapping
const avatarStyles = {
    avataaars: { style: avataaars, name: 'Avataaars', supportsCustomization: true },
    adventurer: { style: adventurer, name: 'Adventurer', supportsCustomization: true },
    adventurerNeutral: { style: adventurerNeutral, name: 'Adventurer Neutral', supportsCustomization: true },
    bigEars: { style: bigEars, name: 'Big Ears', supportsCustomization: true },
    bigEarsNeutral: { style: bigEarsNeutral, name: 'Big Ears Neutral', supportsCustomization: true },
    bigSmile: { style: bigSmile, name: 'Big Smile', supportsCustomization: true },
    bottts: { style: bottts, name: 'Bottts (Robot)', supportsCustomization: false },
    botttsNeutral: { style: botttsNeutral, name: 'Bottts Neutral', supportsCustomization: false },
    croodles: { style: croodles, name: 'Croodles', supportsCustomization: true },
    croodlesNeutral: { style: croodlesNeutral, name: 'Croodles Neutral', supportsCustomization: true },
    funEmoji: { style: funEmoji, name: 'Fun Emoji', supportsCustomization: false },
    icons: { style: icons, name: 'Icons', supportsCustomization: false },
    identicon: { style: identicon, name: 'Identicon', supportsCustomization: false },
    initials: { style: initials, name: 'Initials', supportsCustomization: false },
    lorelei: { style: lorelei, name: 'Lorelei', supportsCustomization: true },
    loreleiNeutral: { style: loreleiNeutral, name: 'Lorelei Neutral', supportsCustomization: true },
    micah: { style: micah, name: 'Micah', supportsCustomization: true },
    miniavs: { style: miniavs, name: 'Miniavs', supportsCustomization: false },
    notionists: { style: notionists, name: 'Notionists', supportsCustomization: false },
    notionistsNeutral: { style: notionistsNeutral, name: 'Notionists Neutral', supportsCustomization: false },
    openPeeps: { style: openPeeps, name: 'Open Peeps', supportsCustomization: true },
    personas: { style: personas, name: 'Personas', supportsCustomization: true },
    pixelArt: { style: pixelArt, name: 'Pixel Art', supportsCustomization: false },
    pixelArtNeutral: { style: pixelArtNeutral, name: 'Pixel Art Neutral', supportsCustomization: false },
    rings: { style: rings, name: 'Rings', supportsCustomization: false },
    shapes: { style: shapes, name: 'Shapes', supportsCustomization: false },
    thumbs: { style: thumbs, name: 'Thumbs', supportsCustomization: false }
};

// ============================================
// PLAYER DATA
// ============================================

const playerData = {
    // DiceBear avatar properties
    avatar: {
        style: 'avataaars', // Current DiceBear style
        seed: 'stylespace-user', // Static seed - won't randomize on updates
        sex: 'female', // 'male' or 'female'
        skinColor: 'light',
        top: 'longHairStraight',
        hairColor: '724133',
        eyes: 'default',
        eyebrow: 'default',
        mouth: 'smile',
        accessories: '',
        clotheType: 'hoodie',
        clotheColor: '4169E1',
        facialHairType: '',
        facialHairColor: '',
        backgroundColor: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' // Avatar container background
    },
    diamonds: 100,
    devMode: false, // Toggle to unlock everything for free
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

// ============================================
// DICEBEAR AVATAR GENERATION
// ============================================

function generateAvatar() {
    try {
        // Check if DiceBear is loaded
        if (typeof createAvatar === 'undefined') {
            console.error('❌ DiceBear not loaded!');
            return null;
        }

        // Get selected style
        const styleName = playerData.avatar.style || 'avataaars';
        const styleConfig = avatarStyles[styleName];

        if (!styleConfig) {
            console.error('❌ Unknown avatar style:', styleName);
            return null;
        }

        // Base options for all styles
        const options = {
            seed: playerData.avatar.seed,
            backgroundColor: ['transparent']
        };

        // Add customization options only for styles that support it
        if (styleConfig.supportsCustomization) {
            // Add common customization options
            if (playerData.avatar.skinColor) options.skinColor = [playerData.avatar.skinColor];
            if (playerData.avatar.top) options.top = [playerData.avatar.top];
            if (playerData.avatar.hairColor) options.hairColor = [playerData.avatar.hairColor];
            if (playerData.avatar.eyes) options.eyes = [playerData.avatar.eyes];
            if (playerData.avatar.eyebrow) options.eyebrow = [playerData.avatar.eyebrow];
            if (playerData.avatar.mouth) options.mouth = [playerData.avatar.mouth];
            if (playerData.avatar.clotheType) options.clothesType = [playerData.avatar.clotheType];
            if (playerData.avatar.clotheColor) options.clothesColor = [playerData.avatar.clotheColor];

            // Add accessories if selected
            if (playerData.avatar.accessories) {
                options.accessories = [playerData.avatar.accessories];
                options.accessoriesColor = ['262E33'];
            }

            // Add facial hair if selected
            if (playerData.avatar.facialHairType) {
                options.facialHairType = [playerData.avatar.facialHairType];
                options.facialHairColor = [playerData.avatar.facialHairColor || playerData.avatar.hairColor];
            }
        }

        console.log('🎨 Generating avatar with style:', styleName, 'options:', options);

        // Create avatar using selected style
        const avatar = createAvatar(styleConfig.style, options);
        console.log('✅ Avatar created');

        return avatar;
    } catch (error) {
        console.error('❌ Error generating avatar:', error);
        return null;
    }
}

// Change avatar style
function changeAvatarStyle(styleName) {
    console.log(`🎨 Changing avatar style to: ${styleName}`);

    const styleConfig = avatarStyles[styleName];
    if (!styleConfig) {
        console.error('❌ Unknown avatar style:', styleName);
        return;
    }

    // Update playerData
    playerData.avatar.style = styleName;

    // Regenerate avatar with new style
    updateAvatar();

    // Show info about customization support
    if (!styleConfig.supportsCustomization) {
        console.log('ℹ️ Note: This style does not support detailed customization');
    }

    // Animate the change
    if (typeof anime !== 'undefined') {
        animateAvatarChange();
    }
}
// Make globally accessible for HTML onchange handler
window.changeAvatarStyle = changeAvatarStyle;

function updateAvatar() {
    try {
        const avatarImg = document.getElementById('avatarDisplay');
        const avatar = generateAvatar();

        if (!avatar) {
            console.error('❌ Avatar generation failed - avatar is null');
            return;
        }

        // Convert avatar to data URI
        const dataUri = avatar.toDataUri();
        console.log('📊 Data URI length:', dataUri.length);
        console.log('📝 Data URI preview:', dataUri.substring(0, 100) + '...');

        console.log('🖼️ Updating avatar image');
        avatarImg.src = dataUri;

        // Verify image loaded
        avatarImg.onload = () => {
            console.log('✅ Avatar image loaded successfully!');
        };
        avatarImg.onerror = (error) => {
            console.error('❌ Avatar image failed to load:', error);
        };

        // Update SVG renderer if available
        if (svgAvatarRenderer && avatar) {
            const svgString = avatar.toString();
            svgAvatarRenderer.parseSVG(svgString).catch(err => {
                console.error('Failed to update SVG renderer:', err);
            });
        }

        // Update avatar container background color
        const avatarContainer = document.getElementById('avatarContainer');
        if (avatarContainer && playerData.avatar.backgroundColor) {
            avatarContainer.style.background = playerData.avatar.backgroundColor;
        }

        // Update pets display
        updatePetsDisplay();
    } catch (error) {
        console.error('❌ Error updating avatar:', error);
    }
}

function updatePetsDisplay() {
    const petsContainer = document.getElementById('petsContainer');
    petsContainer.innerHTML = '';

    playerData.activePets.forEach(petId => {
        const pet = petsDatabase.find(p => p.id === petId);
        if (pet) {
            const petSpan = document.createElement('span');
            petSpan.textContent = pet.emoji;
            petSpan.style.animation = 'petBounce 1s ease-in-out infinite';
            petsContainer.appendChild(petSpan);
        }
    });
}

// ============================================
// PROMO CODES
// ============================================

const promoCodes = {
    'WELCOME': { diamonds: 50 },
    'STYLE100': { diamonds: 100 },
    'FASHION': { diamonds: 75 },
    'AVATAR': { diamonds: 150 }
};

// ============================================
// PETS DATABASE
// ============================================

const petsDatabase = [
    { id: 'dog', name: '🐕 Hund', emoji: '🐕', price: 50 },
    { id: 'cat', name: '🐱 Katt', emoji: '🐱', price: 50 },
    { id: 'rabbit', name: '🐰 Kanin', emoji: '🐰', price: 40 },
    { id: 'hamster', name: '🐹 Hamster', emoji: '🐹', price: 30 },
    { id: 'bird', name: '🐦 Fågel', emoji: '🐦', price: 45 },
    { id: 'fish', name: '🐠 Fisk', emoji: '🐠', price: 25 },
    { id: 'dragon', name: '🐉 Drake', emoji: '🐉', price: 200 }
];

// ============================================
// CLOTHES DATABASE (for extra items beyond DiceBear)
// ============================================

const clothesDatabase = {
    tops: [
        { id: 'tshirt_1', name: 'Basis T-shirt', color: '#FFFFFF', price: 20 },
        { id: 'tshirt_2', name: 'Svart T-shirt', color: '#000000', price: 20 },
        { id: 'hoodie_1', name: 'Rosa Hoodie', color: '#FF6B9D', price: 50 },
        { id: 'hoodie_2', name: 'Blå Hoodie', color: '#4169E1', price: 50 },
        { id: 'jacket_1', name: 'Läder Jacka', color: '#2C2C2C', price: 100 },
        { id: 'sweater_1', name: 'Varm Tröja', color: '#8B4513', price: 60 }
    ],
    bottoms: [
        { id: 'jeans_1', name: 'Blå Jeans', color: '#1E3A8A', price: 40 },
        { id: 'jeans_2', name: 'Svarta Jeans', color: '#000000', price: 40 },
        { id: 'skirt_1', name: 'Rosa Kjol', color: '#FFB6C1', price: 35 },
        { id: 'skirt_2', name: 'Svart Kjol', color: '#000000', price: 35 },
        { id: 'shorts_1', name: 'Denim Shorts', color: '#6B8E23', price: 30 }
    ],
    shoes: [
        { id: 'sneakers_1', name: 'Vita Sneakers', color: '#FFFFFF', price: 50 },
        { id: 'sneakers_2', name: 'Svarta Sneakers', color: '#000000', price: 50 },
        { id: 'boots_1', name: 'Bruna Boots', color: '#8B4513', price: 80 },
        { id: 'sandals_1', name: 'Sandaler', color: '#F5DEB3', price: 25 }
    ],
    accessories: [
        { id: 'hat_1', name: 'Baseball Keps', color: '#DC143C', price: 30 },
        { id: 'hat_2', name: 'Beanie', color: '#2C3E50', price: 25 },
        { id: 'scarf_1', name: 'Varm Halsduk', color: '#FF6B9D', price: 20 },
        { id: 'bag_1', name: 'Mini Väska', color: '#FFD700', price: 60 }
    ]
};

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
        if (typeof anime !== 'undefined') {
            animateTabSwitch(activeTab);

            // Animate shop items if switching to clothes or pets tab
            if (tabName === 'clothes' || tabName === 'pets') {
                setTimeout(() => animateShopItems(), 100);
            }
        }
    });
});

// Avatar customization
document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const value = btn.dataset.value;

        console.log(`🎨 Changing ${type} to ${value}`);

        // Update selection visual
        const siblings = btn.parentElement.querySelectorAll('.option-btn');
        siblings.forEach(s => s.classList.remove('selected'));
        btn.classList.add('selected');

        // Special handling for sex changes
        if (type === 'sex') {
            playerData.avatar.sex = value;

            // Update hair to match gender (optional, for better defaults)
            if (value === 'male') {
                // Default male hairstyles
                if (playerData.avatar.top.includes('long')) {
                    playerData.avatar.top = 'shortHairShortFlat';
                }
            } else if (value === 'female') {
                // Default female hairstyles
                if (!playerData.avatar.top.includes('long')) {
                    playerData.avatar.top = 'longHairStraight';
                }
            }
        } else {
            // Normal update for other attributes
            playerData.avatar[type] = value;
        }

        updateAvatar();

        if (typeof anime !== 'undefined') {
            animateAvatarChange();
        }
    });
});

document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const value = btn.dataset.value;

        console.log(`🎨 Changing ${type} to ${value}`);

        // Update selection visual
        const siblings = btn.parentElement.querySelectorAll('.color-btn');
        siblings.forEach(s => s.classList.remove('selected'));
        btn.classList.add('selected');

        // Update avatar
        playerData.avatar[type] = value;
        updateAvatar();

        if (typeof anime !== 'undefined') {
            animateAvatarChange();
        }
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
            const owned = playerData.devMode || playerData.ownedClothes.includes(item.id);
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
                    <span style="color: #FFD700; font-weight: bold;">${playerData.devMode ? 'FREE' : item.price + ' 💎'}</span>
                </div>
                <div class="shop-item-buttons">
                    ${!owned ? `<button class="shop-btn buy-btn" onclick="buyClothes('${item.id}', ${item.price})">${playerData.devMode ? 'Få' : 'Köp'}</button>` : '<span style="color: #4CAF50; font-size: 0.9rem;">✓ Ägs redan</span>'}
                </div>
            `;

            categoryDiv.appendChild(itemDiv);
        });

        shopContainer.appendChild(categoryDiv);
    });

    // Animate shop items entrance
    if (typeof anime !== 'undefined') {
        setTimeout(() => animateShopItems(), 100);
    }
}

function buyClothes(itemId, price) {
    // Check if already owned
    if (playerData.ownedClothes.includes(itemId)) {
        alert('Du äger redan detta plagg!');
        return;
    }

    // Dev mode - get items for free
    if (playerData.devMode) {
        playerData.ownedClothes.push(itemId);
    } else {
        // Normal mode - check diamonds and pay
        if (playerData.diamonds < price) {
            alert('Du har inte tillräckligt med diamanter!');
            return;
        }
        playerData.diamonds -= price;
        playerData.ownedClothes.push(itemId);
    }

    // Find the item
    let item = null;
    Object.values(clothesDatabase).forEach(category => {
        const found = category.find(i => i.id === itemId);
        if (found) item = found;
    });

    updateDiamondDisplay();
    populateShop();

    // Animate diamond display on purchase
    if (typeof anime !== 'undefined' && typeof anime.animate === 'function') {
        anime.animate('.diamonds-display', {
            scale: [1, 1.15, 1],
            duration: 500,
            easing: 'easeOutElastic(1, .5)'
        });
    }

    alert(`Du köpte ${item.name}!`);
}

// ============================================
// PETS FUNCTIONALITY
// ============================================

function populatePetsShop() {
    const shopContainer = document.getElementById('petsShop');
    shopContainer.innerHTML = '';

    petsDatabase.forEach(pet => {
        const owned = playerData.devMode || playerData.ownedPets.includes(pet.id);
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
                <span style="color: #FFD700; font-weight: bold;">${playerData.devMode ? 'FREE' : pet.price + ' 💎'}</span>
            </div>
            <div class="shop-item-buttons">
                ${!owned ? `<button class="shop-btn buy-btn" onclick="buyPet('${pet.id}', ${pet.price})">${playerData.devMode ? 'Få' : 'Köp'}</button>` : ''}
                ${owned && !active ? `<button class="shop-btn try-btn" onclick="activatePet('${pet.id}')">Aktivera</button>` : ''}
                ${active ? `<button class="shop-btn remove-btn" onclick="deactivatePet('${pet.id}')">Avaktivera</button>` : ''}
            </div>
        `;

        shopContainer.appendChild(petDiv);
    });

    updateActivePetsList();

    // Animate shop items entrance
    if (typeof anime !== 'undefined') {
        setTimeout(() => animateShopItems(), 100);
    }
}

function buyPet(petId, price) {
    if (playerData.ownedPets.includes(petId)) {
        alert('Du äger redan denna pet!');
        return;
    }

    // Dev mode - get pets for free
    if (playerData.devMode) {
        playerData.ownedPets.push(petId);
    } else {
        // Normal mode - check diamonds and pay
        if (playerData.diamonds < price) {
            alert('Du har inte tillräckligt med diamanter!');
            return;
        }
        playerData.diamonds -= price;
        playerData.ownedPets.push(petId);
    }

    const pet = petsDatabase.find(p => p.id === petId);

    updateDiamondDisplay();
    populatePetsShop();

    // Animate diamond display on purchase
    if (typeof anime !== 'undefined' && typeof anime.animate === 'function') {
        anime.animate('.diamonds-display', {
            scale: [1, 1.15, 1],
            duration: 500,
            easing: 'easeOutElastic(1, .5)'
        });
    }

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
        updatePetsDisplay();

        if (typeof anime !== 'undefined') {
            animateAvatarChange();
        }
    }
}

function deactivatePet(petId) {
    playerData.activePets = playerData.activePets.filter(id => id !== petId);
    populatePetsShop();
    updatePetsDisplay();

    if (typeof anime !== 'undefined') {
        animateAvatarChange();
    }
}

function updateActivePetsList() {
    const listContainer = document.getElementById('activePetsList');
    listContainer.innerHTML = '';

    if (playerData.activePets.length === 0) {
        listContainer.innerHTML = '<p style="color: #999; font-size: 0.9rem;">Inga aktiva pets</p>';
        return;
    }

    playerData.activePets.forEach(petId => {
        const pet = petsDatabase.find(p => p.id === petId);
        if (pet) {
            const badge = document.createElement('div');
            badge.className = 'pet-badge';
            badge.innerHTML = `
                <span style="font-size: 24px;">${pet.emoji}</span>
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
        const petsList = outfit.pets.map(petId => {
            const pet = petsDatabase.find(p => p.id === petId);
            return pet ? pet.emoji : '';
        }).join(' ');

        const outfitDiv = document.createElement('div');
        outfitDiv.className = 'outfit-item';

        outfitDiv.innerHTML = `
            <h4>${outfit.name}</h4>
            <p style="color: #666; font-size: 0.9rem; margin: 5px 0;">
                Avatar anpassning sparad
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
        avatar: { ...playerData.avatar },
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

    playerData.avatar = { ...outfit.avatar };
    playerData.currentClothes = { ...outfit.clothes };
    playerData.activePets = [...outfit.pets];

    // Clear trying on
    playerData.tryingOn = { top: null, bottom: null, shoes: null, accessory: null };

    updateAvatar();
    populatePetsShop();

    if (typeof anime !== 'undefined') {
        animateAvatarChange();
    }

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
    if (typeof anime !== 'undefined' && typeof anime.animate === 'function') {
        anime.animate('.diamonds-display', {
            scale: [1, 1.3, 1],
            rotate: [0, 15, -15, 0],
            duration: 800,
            easing: 'easeOutElastic(1, .5)'
        });

        anime.animate('.diamond-icon', {
            scale: [1, 1.5, 1],
            duration: 600,
            easing: 'easeOutBack'
        });
    }

    alert(`Du fick ${diamonds} diamanter! 💎`);
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

function updateDiamondDisplay() {
    document.getElementById('diamondCount').textContent = playerData.diamonds;
}

// ============================================
// ANIMATIONS WITH ANIME.JS
// ============================================

// Avatar animation
let avatarBreathingAnimation = null;

function startAvatarBreathing() {
    console.log('💨 Starting avatar breathing animation...');

    if (typeof anime === 'undefined' || typeof anime.animate !== 'function') {
        console.log('⚠️ Anime.js not available, skipping breathing animation');
        return;
    }

    if (avatarBreathingAnimation) {
        avatarBreathingAnimation.pause();
    }

    avatarBreathingAnimation = anime.animate('#avatarDisplay', {
        translateY: [0, -10, 0],
        scale: [1, 1.01, 1],
        duration: 3000,
        easing: 'easeInOutSine',
        loop: true
    });
    console.log('💨 Avatar breathing animation created');
}

function animateAvatarChange() {
    // Stop breathing temporarily
    if (avatarBreathingAnimation) {
        avatarBreathingAnimation.pause();
    }

    // Quick fade + scale effect
    if (typeof anime !== 'undefined' && typeof anime.animate === 'function') {
        anime.animate('#avatarDisplay', {
            opacity: [0.7, 1],
            scale: [0.95, 1],
            duration: 400,
            easing: 'easeOutCubic',
            onComplete: () => {
                // Resume breathing after change
                startAvatarBreathing();
            }
        });
    }
}

// UI entrance animations
function animateUIEntrance() {
    console.log('🎨 Starting UI entrance animations...');

    if (typeof anime === 'undefined' || typeof anime.animate !== 'function') {
        console.log('⚠️ Anime.js not available, skipping animations');
        return;
    }

    // Animate header
    anime.animate('.game-header', {
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo'
    });

    // Animate left panel
    anime.animate('.left-panel', {
        translateX: [-100, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 200,
        easing: 'easeOutExpo'
    });

    // Animate right panel (avatar)
    anime.animate('.right-panel', {
        translateX: [100, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 200,
        easing: 'easeOutExpo'
    });

    // Stagger animate customization sections
    anime.animate('.customization-section', {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(100, {start: 400}),
        easing: 'easeOutQuad'
    });

    console.log('🎨 UI entrance animations created');
}

// Button hover animations
function setupButtonAnimations() {
    console.log('🔘 Setting up button animations...');

    if (typeof anime === 'undefined' || typeof anime.animate !== 'function') {
        console.log('⚠️ Anime.js not available, skipping button animations');
        return;
    }

    const buttons = document.querySelectorAll('.option-btn, .color-btn, .shop-btn, .tab-btn');
    console.log(`🔘 Found ${buttons.length} buttons to animate`);

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            anime.animate(this, {
                scale: 1.08,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });

        btn.addEventListener('mouseleave', function() {
            anime.animate(this, {
                scale: 1,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });

        btn.addEventListener('click', function() {
            anime.animate(this, {
                scale: [1, 0.9, 1.05, 1],
                duration: 400,
                easing: 'easeOutElastic(1, .6)'
            });
        });
    });
}

// Diamond sparkle effect
function createDiamondSparkle() {
    console.log('💎 Starting diamond sparkle animation...');

    if (typeof anime === 'undefined' || typeof anime.animate !== 'function') {
        console.log('⚠️ Anime.js not available, skipping diamond sparkle');
        return;
    }

    anime.animate('.diamond-icon', {
        rotate: [0, 360],
        duration: 2000,
        easing: 'linear',
        loop: true
    });

    anime.animate('.diamonds-display', {
        scale: [1, 1.1, 1],
        duration: 2000,
        easing: 'easeInOutSine',
        loop: true
    });
    console.log('💎 Diamond animations started');
}

// Shop item entrance animation
function animateShopItems() {
    if (typeof anime === 'undefined' || typeof anime.animate !== 'function') {
        return;
    }

    anime.animate('.shop-item', {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: anime.stagger(50),
        easing: 'easeOutQuad'
    });
}

// Tab switching animation
function animateTabSwitch(tabContent) {
    if (typeof anime === 'undefined' || typeof anime.animate !== 'function') {
        return;
    }

    anime.animate(tabContent, {
        translateX: [50, 0],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutCubic'
    });
}

// ============================================
// INITIALIZATION
// ============================================

// Global SVG Avatar Renderer instance
let svgAvatarRenderer = null;

function initializeSVGRenderer() {
    // Check if SVG.js is loaded
    if (typeof SVG === 'undefined') {
        console.error('❌ SVG.js not loaded! SVG manipulation will not work.');
        return null;
    }

    // We'll use the main avatar for SVG manipulation
    // For now, create a hidden container for SVG operations
    const svgContainer = document.createElement('div');
    svgContainer.id = 'svg-manipulation-container';
    svgContainer.style.display = 'none';
    document.body.appendChild(svgContainer);

    try {
        svgAvatarRenderer = new SVGAvatarRenderer('svg-manipulation-container');
        console.log('✅ SVG Avatar Renderer initialized');
        return svgAvatarRenderer;
    } catch (error) {
        console.error('❌ Failed to initialize SVG renderer:', error);
        return null;
    }
}

// ============================================
// CUSTOM DESIGN FUNCTIONS
// ============================================

function applyMultiPartColoring() {
    if (!svgAvatarRenderer) {
        alert('SVG Renderer inte initierad än. Prova igen om en stund!');
        return;
    }

    try {
        // Example multi-part coloring for hoodie
        svgAvatarRenderer.colorClothingParts({
            'hoodie': '#DC143C',      // Red body
            'hood': '#FF6347',        // Tomato hood
            'pocket': '#FFD700',      // Gold pockets
            'zipper': '#4169E1',      // Blue zipper
            'string': '#00CED1'       // Turquoise strings
        });

        alert('🌈 Multi-part färgning applicerad!\nOlika delar av plagget har nu olika färger.');
    } catch (error) {
        console.error('Error applying multi-part coloring:', error);
        alert('⚠️ Kunde inte applicera multi-part färgning: ' + error.message);
    }
}

function applyPattern(patternType) {
    if (!svgAvatarRenderer) {
        alert('SVG Renderer inte initierad än. Prova igen om en stund!');
        return;
    }

    try {
        const colors = ['#FF6B9D', '#4169E1']; // Pink and blue

        const success = svgAvatarRenderer.applyPattern(
            '[id*="clothes"]',
            patternType,
            colors
        );

        if (success) {
            alert(`✅ ${patternType} mönster applicerat på kläder!`);
        } else {
            alert('⚠️ Kunde inte applicera mönster. Kontrollera att avatar är laddad.');
        }
    } catch (error) {
        console.error('Error applying pattern:', error);
        alert('⚠️ Kunde inte applicera mönster: ' + error.message);
    }
}

function applyGlowEffect() {
    if (!svgAvatarRenderer) {
        alert('SVG Renderer inte initierad än. Prova igen om en stund!');
        return;
    }

    try {
        svgAvatarRenderer.applyGlow(
            '[id*="hair"], [id*="clothes"]',
            '#FF6B9D',
            4
        );

        alert('💫 Glow-effekt applicerad på hår och kläder!');
    } catch (error) {
        console.error('Error applying glow:', error);
        alert('⚠️ Kunde inte applicera glow: ' + error.message);
    }
}

function clearEffects() {
    if (!svgAvatarRenderer) {
        alert('SVG Renderer inte initierad än. Prova igen om en stund!');
        return;
    }

    try {
        svgAvatarRenderer.clearLayer('effects');
        alert('🧹 Effekter rensade!');
    } catch (error) {
        console.error('Error clearing effects:', error);
        alert('⚠️ Kunde inte rensa effekter: ' + error.message);
    }
}

function exportAvatarSVG() {
    if (!svgAvatarRenderer) {
        alert('SVG Renderer inte initierad än. Öppna demo-svg-manipulation.html för full export-funktionalitet!');
        return;
    }

    try {
        svgAvatarRenderer.downloadSVG('stylespace-avatar.svg');
        alert('💾 SVG-fil nedladdad!');
    } catch (error) {
        console.error('Error exporting SVG:', error);
        alert('⚠️ Kunde inte exportera SVG: ' + error.message);
    }
}

async function exportAvatarPNG() {
    if (!svgAvatarRenderer) {
        alert('SVG Renderer inte initierad än. Öppna demo-svg-manipulation.html för full export-funktionalitet!');
        return;
    }

    try {
        await svgAvatarRenderer.downloadPNG('stylespace-avatar.png');
        alert('💾 PNG-fil nedladdad!');
    } catch (error) {
        console.error('Error exporting PNG:', error);
        alert('⚠️ Kunde inte exportera PNG: ' + error.message);
    }
}

// ============================================
// DEV MODE
// ============================================

function toggleDevMode() {
    playerData.devMode = !playerData.devMode;

    const statusSpan = document.getElementById('devModeStatus');
    const toggle = document.getElementById('devModeToggle');

    if (playerData.devMode) {
        statusSpan.textContent = 'PÅ ✓';
        statusSpan.style.color = '#4CAF50';
        console.log('🔓 Dev Mode AKTIVERAD - Alla items gratis!');
    } else {
        statusSpan.textContent = 'AV';
        statusSpan.style.color = 'white';
        console.log('🔒 Dev Mode AVAKTIVERAD');
    }

    // Update shops to reflect dev mode changes
    populateShop();
    populatePetsShop();
    updateDiamondDisplay();
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
    console.log('🎮 Initializing StyleSpace with DiceBear...');
    console.log('📦 Anime.js loaded:', typeof anime !== 'undefined');
    if (typeof anime !== 'undefined') {
        console.log('✨ Anime.js version:', anime.version);
    }

    // Check DiceBear loading
    console.log('📦 DiceBear createAvatar loaded:', typeof createAvatar !== 'undefined');
    console.log('📦 DiceBear avataaars loaded:', typeof avataaars !== 'undefined');

    if (typeof createAvatar === 'undefined' || typeof avataaars === 'undefined') {
        console.error('❌ DiceBear library not loaded! Check import map and network.');
    }

    // Set default selections
    document.querySelector('[data-type="skinColor"][data-value="Light"]')?.classList.add('selected');
    document.querySelector('[data-type="top"][data-value="LongHairStraight"]')?.classList.add('selected');
    document.querySelector('[data-type="eyes"][data-value="Default"]')?.classList.add('selected');
    document.querySelector('[data-type="eyebrow"][data-value="Default"]')?.classList.add('selected');
    document.querySelector('[data-type="mouth"][data-value="Smile"]')?.classList.add('selected');
    document.querySelector('[data-type="clotheType"][data-value="Hoodie"]')?.classList.add('selected');

    // Initialize shops and lists
    populateShop();
    populatePetsShop();
    populateOutfitsList();

    // Generate initial avatar
    updateAvatar();

    // Initialize SVG Avatar Renderer for Custom Design features
    setTimeout(() => {
        initializeSVGRenderer();

        // Load current avatar into SVG renderer if available
        if (svgAvatarRenderer) {
            const avatar = generateAvatar();
            if (avatar) {
                const svgString = avatar.toString();
                svgAvatarRenderer.parseSVG(svgString).catch(err => {
                    console.error('Failed to load avatar into SVG renderer:', err);
                });
            }
        }
    }, 500); // Delay to ensure everything is loaded

    // Start anime.js animations
    console.log('🎬 Starting animations...');
    if (typeof anime !== 'undefined') {
        animateUIEntrance();
        startAvatarBreathing();
        createDiamondSparkle();
        setupButtonAnimations();
        console.log('✅ All animations started!');
    } else {
        console.error('❌ Anime.js not loaded! Animations will not work.');
    }
}

// Expose functions globally for HTML event handlers
window.toggleDevMode = toggleDevMode;
window.applyMultiPartColoring = applyMultiPartColoring;
window.applyPattern = applyPattern;
window.applyGlowEffect = applyGlowEffect;
window.clearEffects = clearEffects;
window.exportAvatarSVG = exportAvatarSVG;
window.exportAvatarPNG = exportAvatarPNG;

// Start the game when page loads
window.addEventListener('load', init);
