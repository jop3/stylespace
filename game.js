// ============================================
// PLAYER DATA
// ============================================

const playerData = {
    // DiceBear avatar properties
    avatar: {
        skinColor: 'Light',
        top: 'LongHairStraight',
        hairColor: '724133',
        eyes: 'Default',
        eyebrow: 'Default',
        mouth: 'Smile',
        accessories: '',
        clotheType: 'Hoodie',
        clotheColor: '4169E1',
        facialHairType: '',
        facialHairColor: ''
    },
    diamonds: 100,
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

function generateAvatarURL() {
    const baseURL = 'https://api.dicebear.com/9.x/avataaars/svg';

    const params = new URLSearchParams({
        seed: 'stylespace-' + Date.now(), // Unique seed
        skinColor: playerData.avatar.skinColor,
        top: playerData.avatar.top,
        hairColor: playerData.avatar.hairColor,
        eyes: playerData.avatar.eyes,
        eyebrow: playerData.avatar.eyebrow,
        mouth: playerData.avatar.mouth,
        clotheType: playerData.avatar.clotheType,
        clotheColor: playerData.avatar.clotheColor,
        backgroundColor: 'transparent'
    });

    // Add accessories if selected
    if (playerData.avatar.accessories) {
        params.append('accessories', playerData.avatar.accessories);
        params.append('accessoriesColor', '262E33');
    }

    // Add facial hair if selected
    if (playerData.avatar.facialHairType) {
        params.append('facialHairType', playerData.avatar.facialHairType);
        params.append('facialHairColor', playerData.avatar.facialHairColor || playerData.avatar.hairColor);
    }

    console.log('🎨 Generating avatar URL with params:', Object.fromEntries(params));

    return `${baseURL}?${params.toString()}`;
}

function updateAvatar() {
    const avatarImg = document.getElementById('avatarDisplay');
    const avatarURL = generateAvatarURL();

    console.log('🖼️ Updating avatar image:', avatarURL);
    avatarImg.src = avatarURL;

    // Update pets display
    updatePetsDisplay();
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

        // Update avatar
        playerData.avatar[type] = value;
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
                    ${!owned ? `<button class="shop-btn buy-btn" onclick="buyClothes('${item.id}', ${item.price})">Köp</button>` : '<span style="color: #4CAF50; font-size: 0.9rem;">✓ Ägs redan</span>'}
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

    // Check if enough diamonds
    if (playerData.diamonds < price) {
        alert('Du har inte tillräckligt med diamanter!');
        return;
    }

    // Buy the item
    playerData.diamonds -= price;
    playerData.ownedClothes.push(itemId);

    // Find the item
    let item = null;
    Object.values(clothesDatabase).forEach(category => {
        const found = category.find(i => i.id === itemId);
        if (found) item = found;
    });

    updateDiamondDisplay();
    populateShop();

    // Animate diamond display on purchase
    if (typeof anime !== 'undefined') {
        anime({
            targets: '.diamonds-display',
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
    if (typeof anime !== 'undefined') {
        setTimeout(() => animateShopItems(), 100);
    }
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
    if (typeof anime !== 'undefined') {
        anime({
            targets: '.diamonds-display',
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
    if (typeof anime !== 'undefined') {
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
    if (avatarBreathingAnimation) {
        avatarBreathingAnimation.pause();
    }

    avatarBreathingAnimation = anime({
        targets: '#avatarDisplay',
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
    anime({
        targets: '#avatarDisplay',
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
    console.log('🎨 Starting UI entrance animations...');

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

    console.log('🎨 UI entrance animations created');
}

// Button hover animations
function setupButtonAnimations() {
    console.log('🔘 Setting up button animations...');
    const buttons = document.querySelectorAll('.option-btn, .color-btn, .shop-btn, .tab-btn');
    console.log(`🔘 Found ${buttons.length} buttons to animate`);

    buttons.forEach(btn => {
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
    console.log('💎 Starting diamond sparkle animation...');

    anime({
        targets: '.diamond-icon',
        rotate: [0, 360],
        duration: 2000,
        easing: 'linear',
        loop: true
    });

    anime({
        targets: '.diamonds-display',
        scale: [1, 1.1, 1],
        duration: 2000,
        easing: 'easeInOutSine',
        loop: true
    });
    console.log('💎 Diamond animations started');
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
    console.log('🎮 Initializing StyleSpace with DiceBear...');
    console.log('📦 Anime.js loaded:', typeof anime !== 'undefined');
    if (typeof anime !== 'undefined') {
        console.log('✨ Anime.js version:', anime.version);
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

// Start the game when page loads
window.addEventListener('load', init);
