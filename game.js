// ============================================
// IMPORTS - DiceBear Library
// ============================================

import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';

// ============================================
// PLAYER DATA
// ============================================

const playerData = {
    avatar: {
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
        facialHairColor: ''
    },
    diamonds: 100,
    ownedClothes: [],
    currentClothes: { top: null, bottom: null, shoes: null, accessory: null },
    tryingOn: { top: null, bottom: null, shoes: null, accessory: null },
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
        if (typeof createAvatar === 'undefined' || typeof avataaars === 'undefined') {
            console.error('❌ DiceBear not loaded!');
            return null;
        }

        const options = {
            seed: 'stylespace-' + Date.now(),
            skinColor: [playerData.avatar.skinColor],
            top: [playerData.avatar.top],
            hairColor: [playerData.avatar.hairColor],
            eyes: [playerData.avatar.eyes],
            eyebrow: [playerData.avatar.eyebrow],
            mouth: [playerData.avatar.mouth],
            clothesType: [playerData.avatar.clotheType],
            clothesColor: [playerData.avatar.clotheColor],
            backgroundColor: ['transparent']
        };

        if (playerData.avatar.accessories) {
            options.accessories = [playerData.avatar.accessories];
            options.accessoriesColor = ['262E33'];
        }

        return createAvatar(avataaars, options);
    } catch (error) {
        console.error('❌ Error generating avatar:', error);
        return null;
    }
}

function updateAvatar() {
    try {
        const avatarImg = document.getElementById('avatarDisplay');
        const avatar = generateAvatar();

        if (!avatar) return;

        const dataUri = avatar.toDataUri();
        avatarImg.src = dataUri;

        // Update SVG renderer if available
        if (typeof svgAvatarRenderer !== 'undefined' && svgAvatarRenderer && avatar) {
            const svgString = avatar.toString();
            svgAvatarRenderer.parseSVG(svgString).catch(err => {
                console.error('Failed to update SVG renderer:', err);
            });
        }
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
// DATA & SHOPS
// ============================================

const promoCodes = {
    'WELCOME': { diamonds: 50 },
    'STYLE100': { diamonds: 100 },
    'FASHION': { diamonds: 75 },
    'AVATAR': { diamonds: 150 }
};

const petsDatabase = [
    { id: 'dog', name: '🐕 Hund', emoji: '🐕', price: 50 },
    { id: 'cat', name: '🐱 Katt', emoji: '🐱', price: 50 },
    { id: 'rabbit', name: '🐰 Kanin', emoji: '🐰', price: 40 },
    { id: 'hamster', name: '🐹 Hamster', emoji: '🐹', price: 30 },
    { id: 'bird', name: '🐦 Fågel', emoji: '🐦', price: 45 },
    { id: 'fish', name: '🐠 Fisk', emoji: '🐠', price: 25 },
    { id: 'dragon', name: '🐉 Drake', emoji: '🐉', price: 200 }
];

const clothesDatabase = {
    tops: [
        { id: 'tshirt_1', name: 'Basis T-shirt', color: '#FFFFFF', price: 20 },
        { id: 'tshirt_2', name: 'Svart T-shirt', color: '#000000', price: 20 },
        { id: 'hoodie_1', name: 'Rosa Hoodie', color: '#FF6B9D', price: 50 },
        { id: 'hoodie_2', name: 'Blå Hoodie', color: '#4169E1', price: 50 }
    ],
    bottoms: [
        { id: 'jeans_1', name: 'Blå Jeans', color: '#1E3A8A', price: 40 },
        { id: 'jeans_2', name: 'Svarta Jeans', color: '#000000', price: 40 },
        { id: 'skirt_1', name: 'Rosa Kjol', color: '#FFB6C1', price: 35 }
    ],
    shoes: [
        { id: 'sneakers_1', name: 'Vita Sneakers', color: '#FFFFFF', price: 50 },
        { id: 'sneakers_2', name: 'Svarta Sneakers', color: '#000000', price: 50 }
    ],
    accessories: [
        { id: 'hat_1', name: 'Baseball Keps', color: '#DC143C', price: 30 },
        { id: 'hat_2', name: 'Beanie', color: '#2C3E50', price: 25 }
    ]
};

// ============================================
// UI INTERACTIONS
// ============================================

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        const activeTab = document.getElementById(`${tabName}-tab`);
        activeTab.classList.add('active');

        if (typeof anime !== 'undefined') {
            animateTabSwitch(activeTab);
            if (tabName === 'clothes' || tabName === 'pets') {
                setTimeout(() => animateShopItems(), 100);
            }
        }
    });
});

document.querySelectorAll('.option-btn, .color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const value = btn.dataset.value;
        const siblings = btn.parentElement.querySelectorAll(`[data-type="${type}"]`);
        siblings.forEach(s => s.classList.remove('selected'));
        btn.classList.add('selected');
        playerData.avatar[type] = value;
        updateAvatar();
        if (typeof anime !== 'undefined') animateAvatarChange();
    });
});

// ============================================
// SHOP LOGIC
// ============================================

function populateShop() {
    const shopContainer = document.getElementById('clothesShop');
    shopContainer.innerHTML = '';
    const categories = [
        { name: 'Överdel', items: clothesDatabase.tops },
        { name: 'Underdel', items: clothesDatabase.bottoms },
        { name: 'Skor', items: clothesDatabase.shoes },
        { name: 'Accessoarer', items: clothesDatabase.accessories }
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
                    <div style="display: flex; align-items: center;">${colorPreview} <h4 style="margin: 0;">${item.name}</h4></div>
                    <span style="color: #FFD700; font-weight: bold;">${item.price} 💎</span>
                </div>
                <div class="shop-item-buttons">
                    ${!owned ? `<button class="shop-btn buy-btn" id="btn-${item.id}">Köp</button>` : '<span style="color: #4CAF50;">✓ Ägs</span>'}
                </div>
            `;
            categoryDiv.appendChild(itemDiv);
            
            // Add listener manually to avoid inline string function issues
            if(!owned) {
                setTimeout(() => {
                    document.getElementById(`btn-${item.id}`)?.addEventListener('click', () => buyClothes(item.id, item.price));
                }, 0);
            }
        });
        shopContainer.appendChild(categoryDiv);
    });
}

function buyClothes(itemId, price) {
    if (playerData.ownedClothes.includes(itemId)) return;
    if (playerData.diamonds < price) {
        alert('Du har inte tillräckligt med diamanter!');
        return;
    }
    playerData.diamonds -= price;
    playerData.ownedClothes.push(itemId);
    updateDiamondDisplay();
    populateShop();
    alert(`Köpt!`);
}

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
                <span style="font-size: 30px; margin-right:10px;">${pet.emoji}</span>
                <div><h4 style="margin: 0;">${pet.name}</h4></div>
                <span style="color: #FFD700;">${pet.price} 💎</span>
            </div>
            <div class="shop-item-buttons">
                ${!owned ? `<button class="shop-btn" onclick="window.game.buyPet('${pet.id}', ${pet.price})">Köp</button>` : ''}
                ${owned && !active ? `<button class="shop-btn" onclick="window.game.activatePet('${pet.id}')">Aktivera</button>` : ''}
                ${active ? `<button class="shop-btn" onclick="window.game.deactivatePet('${pet.id}')">Avaktivera</button>` : ''}
            </div>
        `;
        shopContainer.appendChild(petDiv);
    });
    updateActivePetsList();
}

// Global scope exports for inline HTML onclicks (temporary fix for module scope)
window.game = {
    buyPet: (id, price) => {
        if (playerData.diamonds >= price && !playerData.ownedPets.includes(id)) {
            playerData.diamonds -= price;
            playerData.ownedPets.push(id);
            updateDiamondDisplay();
            populatePetsShop();
        }
    },
    activatePet: (id) => {
        if (playerData.activePets.length < 3 && !playerData.activePets.includes(id)) {
            playerData.activePets.push(id);
            populatePetsShop();
            updatePetsDisplay();
        }
    },
    deactivatePet: (id) => {
        playerData.activePets = playerData.activePets.filter(p => p !== id);
        populatePetsShop();
        updatePetsDisplay();
    }
};

function updateActivePetsList() {
    const listContainer = document.getElementById('activePetsList');
    listContainer.innerHTML = '';
    playerData.activePets.forEach(petId => {
        const pet = petsDatabase.find(p => p.id === petId);
        if (pet) {
            const badge = document.createElement('div');
            badge.className = 'pet-badge';
            badge.innerHTML = `${pet.emoji} <span style="cursor:pointer; margin-left:5px;" onclick="window.game.deactivatePet('${pet.id}')">×</span>`;
            listContainer.appendChild(badge);
        }
    });
}

// ============================================
// UTILS & ANIMATION
// ============================================

function updateDiamondDisplay() {
    document.getElementById('diamondCount').textContent = playerData.diamonds;
    if (typeof anime !== 'undefined') {
        anime({
            targets: '.diamonds-display',
            scale: [1, 1.2, 1],
            duration: 300
        });
    }
}

function animateTabSwitch(target) {
    anime({ targets: target, opacity: [0, 1], translateY: [10, 0], duration: 400, easing: 'easeOutQuad' });
}
function animateShopItems() {
    anime({ targets: '.shop-item', opacity: [0, 1], translateY: [20, 0], delay: anime.stagger(50) });
}
function animateAvatarChange() {
    anime({ targets: '#avatarDisplay', scale: [0.9, 1], opacity: [0.5, 1], duration: 400 });
}

// ============================================
// INITIALIZATION
// ============================================

let svgAvatarRenderer = null;

function initializeSVGRenderer() {
    if (typeof SVG === 'undefined') return;
    try {
        // Ensure container exists
        let container = document.getElementById('svg-manipulation-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'svg-manipulation-container';
            container.style.display = 'none';
            document.body.appendChild(container);
        }
        svgAvatarRenderer = new SVGAvatarRenderer('svg-manipulation-container');
        console.log('✅ SVG Renderer initialized');
    } catch (error) {
        console.error('❌ Failed to initialize SVG renderer:', error);
    }
}

function init() {
    console.log('🎮 Initializing StyleSpace...');
    
    // Corrected Case Sensitivity for default selections matching HTML values (lowercase)
    document.querySelector('[data-type="skinColor"][data-value="light"]')?.classList.add('selected');
    document.querySelector('[data-type="top"][data-value="longHairStraight"]')?.classList.add('selected');
    document.querySelector('[data-type="eyes"][data-value="default"]')?.classList.add('selected');
    document.querySelector('[data-type="eyebrow"][data-value="default"]')?.classList.add('selected');
    document.querySelector('[data-type="mouth"][data-value="smile"]')?.classList.add('selected');
    document.querySelector('[data-type="clotheType"][data-value="hoodie"]')?.classList.add('selected');

    populateShop();
    populatePetsShop();
    updateAvatar();

    // Initialize SVG logic safely
    if (document.readyState === 'complete') {
        initializeSVGRenderer();
    } else {
        window.addEventListener('load', initializeSVGRenderer);
    }
    
    // Animations
    if (typeof anime !== 'undefined') {
        anime({ targets: '.game-container', opacity: [0, 1], duration: 1000, easing: 'easeOutExpo' });
    }
}

// Initialize when module loads
init();