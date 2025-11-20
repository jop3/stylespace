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
    usedCodes: [],

    // Progression System
    level: 1,
    xp: 0,
    lastLoginDate: null,
    loginStreak: 0,
    totalLogins: 0,
    achievements: [], // Array of achievement IDs that have been unlocked

    // Statistics
    stats: {
        avatarChanges: 0,
        diamondsSpent: 0,
        diamondsEarned: 0,
        itemsPurchased: 0,
        petsPurchased: 0,
        outfitsSaved: 0,
        codesRedeemed: 0
    },

    // Undo/Redo System
    avatarHistory: [],
    historyIndex: -1
};

// ============================================
// ACHIEVEMENTS DATABASE
// ============================================

const achievementsDatabase = [
    {
        id: 'first_login',
        name: 'Välkommen!',
        description: 'Logga in första gången',
        icon: '👋',
        reward: 50,
        condition: () => playerData.totalLogins >= 1
    },
    {
        id: 'loyal_user',
        name: 'Lojal Användare',
        description: 'Logga in 7 dagar i rad',
        icon: '🔥',
        reward: 200,
        condition: () => playerData.loginStreak >= 7
    },
    {
        id: 'style_explorer',
        name: 'Stil Utforskare',
        description: 'Ändra avatar 50 gånger',
        icon: '🎨',
        reward: 100,
        condition: () => playerData.stats.avatarChanges >= 50
    },
    {
        id: 'fashionista',
        name: 'Fashionista',
        description: 'Köp 10 klädesplagg',
        icon: '👗',
        reward: 150,
        condition: () => playerData.stats.itemsPurchased >= 10
    },
    {
        id: 'pet_collector',
        name: 'Djur Samlare',
        description: 'Köp 5 pets',
        icon: '🐾',
        reward: 100,
        condition: () => playerData.stats.petsPurchased >= 5
    },
    {
        id: 'outfit_master',
        name: 'Outfit Mästare',
        description: 'Spara 10 outfits',
        icon: '💼',
        reward: 120,
        condition: () => playerData.stats.outfitsSaved >= 10
    },
    {
        id: 'big_spender',
        name: 'Stor Spenderare',
        description: 'Spendera 1000 diamanter',
        icon: '💸',
        reward: 250,
        condition: () => playerData.stats.diamondsSpent >= 1000
    },
    {
        id: 'code_hunter',
        name: 'Kod Jägare',
        description: 'Lös in 3 kampanjkoder',
        icon: '🔑',
        reward: 75,
        condition: () => playerData.stats.codesRedeemed >= 3
    },
    {
        id: 'level_5',
        name: 'Nivå 5',
        description: 'Nå nivå 5',
        icon: '⭐',
        reward: 100,
        condition: () => playerData.level >= 5
    },
    {
        id: 'level_10',
        name: 'Nivå 10',
        description: 'Nå nivå 10',
        icon: '🌟',
        reward: 200,
        condition: () => playerData.level >= 10
    },
    {
        id: 'diamond_collector',
        name: 'Diamant Samlare',
        description: 'Samla 500 diamanter totalt',
        icon: '💎',
        reward: 100,
        condition: () => playerData.stats.diamondsEarned >= 500
    },
    {
        id: 'all_styles',
        name: 'Stil Mästare',
        description: 'Prova alla 26 avatar stilar',
        icon: '🎭',
        reward: 300,
        condition: () => {
            // This would need tracking of which styles have been used
            return false; // TODO: Implement style tracking
        }
    }
];

// ============================================
// LEVEL SYSTEM CONSTANTS
// ============================================

const LEVEL_SYSTEM = {
    // XP required for each level (cumulative)
    xpPerLevel: (level) => Math.floor(100 * Math.pow(1.5, level - 1)),

    // Rewards for leveling up
    levelRewards: {
        diamonds: (level) => 50 + (level * 10), // 60 for lvl 1, 70 for lvl 2, etc.
        unlocks: {
            5: { type: 'feature', name: 'Premium Patterns' },
            10: { type: 'feature', name: 'Advanced Effects' },
            15: { type: 'feature', name: 'Custom Exports' }
        }
    },

    // XP rewards for different actions
    xpRewards: {
        avatarChange: 5,
        buyItem: 10,
        buyPet: 15,
        saveOutfit: 20,
        redeemCode: 25,
        dailyLogin: 30,
        achievementUnlock: 50
    }
};

// ============================================
// LOCALSTORAGE SAVE/LOAD SYSTEM
// ============================================

const SAVE_KEY = 'stylespace_save_v1';
const AUTO_SAVE_DELAY = 1000; // 1 second debounce
let autoSaveTimer = null;

// Save to LocalStorage
function saveToLocalStorage() {
    try {
        const saveData = JSON.stringify(playerData);
        localStorage.setItem(SAVE_KEY, saveData);
        console.log('💾 Game saved to LocalStorage');
        showSaveNotification('Sparat! ✓');
        return true;
    } catch (error) {
        console.error('❌ Error saving to LocalStorage:', error);
        showSaveNotification('Fel vid sparning!', true);
        return false;
    }
}

// Load from LocalStorage
function loadFromLocalStorage() {
    try {
        const savedData = localStorage.getItem(SAVE_KEY);
        if (savedData) {
            const loadedData = JSON.parse(savedData);

            // Merge loaded data into playerData (preserve new properties)
            Object.assign(playerData, loadedData);

            console.log('📂 Game loaded from LocalStorage');
            showSaveNotification('Laddad! ✓');
            return true;
        } else {
            console.log('ℹ️ No saved data found, using defaults');
            return false;
        }
    } catch (error) {
        console.error('❌ Error loading from LocalStorage:', error);
        showSaveNotification('Fel vid laddning!', true);
        return false;
    }
}

// Auto-save with debounce
function triggerAutoSave() {
    if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
    }
    autoSaveTimer = setTimeout(() => {
        saveToLocalStorage();
    }, AUTO_SAVE_DELAY);
}

// Export avatar data as JSON file
function exportAvatarData() {
    try {
        const dataStr = JSON.stringify(playerData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `stylespace_avatar_${Date.now()}.json`;
        link.click();

        URL.revokeObjectURL(url);
        showSaveNotification('Exporterad! ✓');
        console.log('📤 Avatar data exported');
    } catch (error) {
        console.error('❌ Error exporting avatar data:', error);
        alert('Fel vid export: ' + error.message);
    }
}

// Import avatar data from JSON file
function importAvatarData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';

    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedData = JSON.parse(event.target.result);

                // Validate data structure
                if (!importedData.avatar || !importedData.diamonds) {
                    throw new Error('Ogiltig datafil');
                }

                // Merge imported data
                Object.assign(playerData, importedData);

                // Update UI
                updateAvatar();
                updateDiamondDisplay();
                populateShop();
                populatePetsShop();
                populateOutfitsList();

                // Save to localStorage
                saveToLocalStorage();

                showSaveNotification('Importerad! ✓');
                console.log('📥 Avatar data imported');
            } catch (error) {
                console.error('❌ Error importing avatar data:', error);
                alert('Fel vid import: ' + error.message);
            }
        };

        reader.readAsText(file);
    };

    input.click();
}

// Show save notification
function showSaveNotification(message, isError = false) {
    // Remove existing notification
    const existing = document.getElementById('saveNotification');
    if (existing) {
        existing.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.id = 'saveNotification';
    notification.textContent = message;
    notification.className = `save-notification ${isError ? 'error' : 'success'}`;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove after 2 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Clear all saved data
function clearSaveData() {
    if (confirm('Är du säker på att du vill radera all sparad data? Detta går inte att ångra!')) {
        localStorage.removeItem(SAVE_KEY);
        location.reload();
    }
}

// ============================================
// DAILY LOGIN BONUS SYSTEM
// ============================================

function checkDailyBonus() {
    const now = new Date();
    const today = now.toDateString();

    // First login ever
    if (!playerData.lastLoginDate) {
        playerData.lastLoginDate = today;
        playerData.totalLogins = 1;
        playerData.loginStreak = 1;

        awardDiamonds(50, '🎉 Välkomstbonus!');
        addXP(LEVEL_SYSTEM.xpRewards.dailyLogin);
        checkAchievements();
        saveToLocalStorage();
        return;
    }

    // Check if it's a new day
    if (playerData.lastLoginDate === today) {
        console.log('✅ Already logged in today');
        return; // Already got today's bonus
    }

    // Calculate days between logins
    const lastDate = new Date(playerData.lastLoginDate);
    const daysDiff = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

    playerData.totalLogins++;

    if (daysDiff === 1) {
        // Consecutive day - increase streak
        playerData.loginStreak++;
        const bonusDiamonds = 10 + (playerData.loginStreak * 5); // More for longer streaks

        awardDiamonds(bonusDiamonds, `🔥 Dag ${playerData.loginStreak} streak bonus!`);
        addXP(LEVEL_SYSTEM.xpRewards.dailyLogin);

        // Extra reward for week streak
        if (playerData.loginStreak % 7 === 0) {
            awardDiamonds(100, '🎁 1 veckas streak bonus!');
        }
    } else {
        // Streak broken - reset
        playerData.loginStreak = 1;
        awardDiamonds(10, '💎 Daglig inloggningsbonus');
        addXP(LEVEL_SYSTEM.xpRewards.dailyLogin);
    }

    playerData.lastLoginDate = today;
    checkAchievements();
    saveToLocalStorage();
}

// ============================================
// ACHIEVEMENT SYSTEM
// ============================================

function checkAchievements() {
    let newUnlocks = 0;

    achievementsDatabase.forEach(achievement => {
        // Skip if already unlocked
        if (playerData.achievements.includes(achievement.id)) {
            return;
        }

        // Check condition
        if (achievement.condition()) {
            // Unlock achievement!
            playerData.achievements.push(achievement.id);
            newUnlocks++;

            // Award diamonds
            awardDiamonds(achievement.reward, `🏆 Achievement: ${achievement.name}!`);
            addXP(LEVEL_SYSTEM.xpRewards.achievementUnlock);

            console.log(`🏆 Achievement unlocked: ${achievement.name}`);
        }
    });

    if (newUnlocks > 0) {
        updateAchievementsDisplay();
        saveToLocalStorage();
    }

    return newUnlocks;
}

function updateAchievementsDisplay() {
    const container = document.getElementById('achievementsList');
    if (!container) return;

    container.innerHTML = '';

    achievementsDatabase.forEach(achievement => {
        const unlocked = playerData.achievements.includes(achievement.id);

        const achievementDiv = document.createElement('div');
        achievementDiv.className = `achievement-item ${unlocked ? 'unlocked' : 'locked'}`;

        const progress = achievement.condition() ? 100 : 0; // Simplified progress

        achievementDiv.innerHTML = `
            <div class="achievement-icon ${unlocked ? 'unlocked' : ''}">${achievement.icon}</div>
            <div class="achievement-info">
                <h4>${achievement.name} ${unlocked ? '✓' : ''}</h4>
                <p>${achievement.description}</p>
                <div class="achievement-reward">Belöning: ${achievement.reward} 💎</div>
            </div>
        `;

        container.appendChild(achievementDiv);
    });

    // Update progress stats
    const unlockedCount = playerData.achievements.length;
    const totalCount = achievementsDatabase.length;
    const progressElement = document.getElementById('achievementProgress');
    if (progressElement) {
        progressElement.textContent = `${unlockedCount} / ${totalCount} upplåsta`;
    }
}

// ============================================
// LEVEL & XP SYSTEM
// ============================================

function addXP(amount) {
    playerData.xp += amount;

    // Check for level up
    const xpNeeded = LEVEL_SYSTEM.xpPerLevel(playerData.level);

    while (playerData.xp >= xpNeeded) {
        playerData.xp -= xpNeeded;
        playerData.level++;

        // Award level up rewards
        const diamondReward = LEVEL_SYSTEM.levelRewards.diamonds(playerData.level);
        awardDiamonds(diamondReward, `🎊 Nivå ${playerData.level}!`);

        console.log(`🎊 LEVEL UP! Now level ${playerData.level}`);

        // Check for special unlocks
        const unlock = LEVEL_SYSTEM.levelRewards.unlocks[playerData.level];
        if (unlock) {
            showNotification(`🔓 Upplåst: ${unlock.name}!`);
        }

        // Check achievements (might unlock level-based achievements)
        checkAchievements();
    }

    updateProgressionDisplay();
}

function updateProgressionDisplay() {
    // Update level display
    const levelElement = document.getElementById('playerLevel');
    if (levelElement) {
        levelElement.textContent = playerData.level;
    }

    // Update XP progress bar
    const xpNeeded = LEVEL_SYSTEM.xpPerLevel(playerData.level);
    const xpProgress = (playerData.xp / xpNeeded) * 100;

    const progressBar = document.getElementById('xpProgressBar');
    if (progressBar) {
        progressBar.style.width = `${xpProgress}%`;
    }

    const xpText = document.getElementById('xpText');
    if (xpText) {
        xpText.textContent = `${playerData.xp} / ${xpNeeded} XP`;
    }

    // Update stats display
    updateStatsDisplay();
}

function updateStatsDisplay() {
    const statsElements = {
        'statsAvatarChanges': playerData.stats.avatarChanges,
        'statsDiamondsSpent': playerData.stats.diamondsSpent,
        'statsDiamondsEarned': playerData.stats.diamondsEarned,
        'statsItemsPurchased': playerData.stats.itemsPurchased,
        'statsPetsPurchased': playerData.stats.petsPurchased,
        'statsOutfitsSaved': playerData.stats.outfitsSaved,
        'statsLoginStreak': playerData.loginStreak,
        'statsTotalLogins': playerData.totalLogins
    };

    Object.entries(statsElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

// ============================================
// DIAMOND REWARD HELPER
// ============================================

function awardDiamonds(amount, message) {
    playerData.diamonds += amount;
    playerData.stats.diamondsEarned += amount;
    updateDiamondDisplay();

    if (message) {
        showNotification(message);
    }

    // Animate diamond display
    if (typeof anime !== 'undefined' && typeof anime.animate === 'function') {
        anime.animate('.diamonds-display', {
            scale: [1, 1.2, 1],
            duration: 500,
            easing: 'easeOutElastic(1, .5)'
        });
    }
}

function showNotification(message, type = 'success') {
    // Reuse the save notification system
    showSaveNotification(message, type === 'error');
}

// ============================================
// RANDOM AVATAR FUNCTION
// ============================================

function randomizeAvatar() {
    // Save current state to history
    saveToHistory();

    // Random style
    const styleKeys = Object.keys(avatarStyles);
    playerData.avatar.style = styleKeys[Math.floor(Math.random() * styleKeys.length)];

    // Random gender
    playerData.avatar.sex = Math.random() > 0.5 ? 'male' : 'female';

    // Random skin color
    const skinColors = ['light', 'ffdbb4', 'edb98a', 'd08b5b', 'ae5d29', '614335'];
    playerData.avatar.skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];

    // Random hair
    const hairStyles = ['noHair', 'longHairStraight', 'shortHairShortFlat', 'shortHairDreads', 'longHairCurly', 'shortHairShortCurly'];
    playerData.avatar.top = hairStyles[Math.floor(Math.random() * hairStyles.length)];

    // Random hair color
    const hairColors = ['724133', '4a312c', 'f59797', 'c93305', 'a55728', 'd6b370', 'b58143', '2c1b18'];
    playerData.avatar.hairColor = hairColors[Math.floor(Math.random() * hairColors.length)];

    // Random eyes
    const eyeTypes = ['default', 'happy', 'surprised', 'wink', 'hearts', 'cry', 'squint', 'side', 'closed'];
    playerData.avatar.eyes = eyeTypes[Math.floor(Math.random() * eyeTypes.length)];

    // Random eyebrows
    const eyebrowTypes = ['default', 'angry', 'flat', 'raised', 'sad', 'unibrow', 'up', 'down'];
    playerData.avatar.eyebrow = eyebrowTypes[Math.floor(Math.random() * eyebrowTypes.length)];

    // Random mouth
    const mouthTypes = ['smile', 'concerned', 'default', 'eating', 'grimace', 'sad', 'scream', 'serious', 'tongue', 'twinkle'];
    playerData.avatar.mouth = mouthTypes[Math.floor(Math.random() * mouthTypes.length)];

    // Random clothes
    const clotheTypes = ['hoodie', 'overall', 'shirtCrewNeck', 'shirtScoopNeck', 'shirtVNeck', 'collarSweater', 'graphicShirt'];
    playerData.avatar.clotheType = clotheTypes[Math.floor(Math.random() * clotheTypes.length)];

    // Random clothe color
    const clotheColors = ['4169E1', 'DC143C', '228B22', 'FFD700', 'FF6347', '9370DB', 'FF69B4'];
    playerData.avatar.clotheColor = clotheColors[Math.floor(Math.random() * clotheColors.length)];

    // Random background
    const backgrounds = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        '#ffecd2',
        '#fcb69f'
    ];
    playerData.avatar.backgroundColor = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    updateAvatar();
    showNotification('🎲 Avatar slumpad!');
}

// ============================================
// UNDO/REDO SYSTEM
// ============================================

function saveToHistory() {
    // Remove any redo history if we're not at the end
    if (playerData.historyIndex < playerData.avatarHistory.length - 1) {
        playerData.avatarHistory = playerData.avatarHistory.slice(0, playerData.historyIndex + 1);
    }

    // Save current avatar state
    const snapshot = JSON.parse(JSON.stringify(playerData.avatar));
    playerData.avatarHistory.push(snapshot);
    playerData.historyIndex++;

    // Limit history to 50 entries
    if (playerData.avatarHistory.length > 50) {
        playerData.avatarHistory.shift();
        playerData.historyIndex--;
    }

    updateUndoRedoButtons();
}

function undo() {
    if (playerData.historyIndex > 0) {
        playerData.historyIndex--;
        playerData.avatar = JSON.parse(JSON.stringify(playerData.avatarHistory[playerData.historyIndex]));
        updateAvatar();
        updateUndoRedoButtons();
        showNotification('↶ Undo');
    }
}

function redo() {
    if (playerData.historyIndex < playerData.avatarHistory.length - 1) {
        playerData.historyIndex++;
        playerData.avatar = JSON.parse(JSON.stringify(playerData.avatarHistory[playerData.historyIndex]));
        updateAvatar();
        updateUndoRedoButtons();
        showNotification('↷ Redo');
    }
}

function updateUndoRedoButtons() {
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');

    if (undoBtn) {
        undoBtn.disabled = playerData.historyIndex <= 0;
        undoBtn.style.opacity = playerData.historyIndex <= 0 ? '0.5' : '1';
    }

    if (redoBtn) {
        redoBtn.disabled = playerData.historyIndex >= playerData.avatarHistory.length - 1;
        redoBtn.style.opacity = playerData.historyIndex >= playerData.avatarHistory.length - 1 ? '0.5' : '1';
    }
}

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

    // Regenerate avatar with new style (includes auto-save)
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

        // Track stats (avatar changes)
        playerData.stats.avatarChanges++;

        // Save to history for undo/redo
        saveToHistory();

        // Award XP for customization
        addXP(LEVEL_SYSTEM.xpRewards.avatarChange);

        // Check achievements
        checkAchievements();

        // Auto-save changes
        triggerAutoSave();
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
        playerData.stats.diamondsSpent += price;
        playerData.ownedClothes.push(itemId);
    }

    // Find the item
    let item = null;
    Object.values(clothesDatabase).forEach(category => {
        const found = category.find(i => i.id === itemId);
        if (found) item = found;
    });

    // Track stats
    playerData.stats.itemsPurchased++;

    // Award XP
    addXP(LEVEL_SYSTEM.xpRewards.buyItem);

    // Check achievements
    checkAchievements();

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
        playerData.stats.diamondsSpent += price;
        playerData.ownedPets.push(petId);
    }

    const pet = petsDatabase.find(p => p.id === petId);

    // Track stats
    playerData.stats.petsPurchased++;

    // Award XP
    addXP(LEVEL_SYSTEM.xpRewards.buyPet);

    // Check achievements
    checkAchievements();

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
    playerData.stats.diamondsSpent += 5;

    // Track stats
    playerData.stats.outfitsSaved++;

    // Award XP
    addXP(LEVEL_SYSTEM.xpRewards.saveOutfit);

    // Check achievements
    checkAchievements();

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
    playerData.stats.diamondsEarned += diamonds;
    playerData.usedCodes.push(code);

    // Track stats
    playerData.stats.codesRedeemed++;

    // Award XP
    addXP(LEVEL_SYSTEM.xpRewards.redeemCode);

    // Check achievements
    checkAchievements();

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
// COLOR PICKERS & GRADIENT BUILDER
// ============================================

// Custom Gradient Background
function applyCustomGradient() {
    const color1 = document.getElementById('gradientColor1').value;
    const color2 = document.getElementById('gradientColor2').value;
    const angle = document.getElementById('gradientAngle').value;

    const gradient = `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`;
    playerData.avatar.backgroundColor = gradient;

    const avatarContainer = document.getElementById('avatarContainer');
    if (avatarContainer) {
        avatarContainer.style.background = gradient;
    }

    console.log('✨ Custom gradient applied:', gradient);
}

// Solid Background Color
function applySolidBackground() {
    const color = document.getElementById('solidBackgroundColor').value;
    playerData.avatar.backgroundColor = color;

    const avatarContainer = document.getElementById('avatarContainer');
    if (avatarContainer) {
        avatarContainer.style.background = color;
    }

    console.log('🎨 Solid background applied:', color);
}

// Custom Skin Color
function applyCustomSkinColor() {
    const color = document.getElementById('customSkinColor').value;
    // Convert hex to DiceBear-compatible format (remove #)
    const hexColor = color.replace('#', '');
    playerData.avatar.skinColor = hexColor;
    updateAvatar();
    console.log('🎨 Custom skin color applied:', hexColor);
}

// Custom Hair Color
function applyCustomHairColor() {
    const color = document.getElementById('customHairColor').value;
    const hexColor = color.replace('#', '');
    playerData.avatar.hairColor = hexColor;
    updateAvatar();
    console.log('🎨 Custom hair color applied:', hexColor);
}

// Custom Clothe Color
function applyCustomClotheColor() {
    const color = document.getElementById('customClotheColor').value;
    const hexColor = color.replace('#', '');
    playerData.avatar.clotheColor = hexColor;
    updateAvatar();
    console.log('🎨 Custom clothe color applied:', hexColor);
}

// Update gradient preview in real-time
function updateGradientPreview() {
    const color1 = document.getElementById('gradientColor1').value;
    const color2 = document.getElementById('gradientColor2').value;
    const angle = document.getElementById('gradientAngle').value;
    const preview = document.getElementById('gradientPreview');
    const angleValue = document.getElementById('gradientAngleValue');

    if (preview) {
        preview.style.background = `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`;
    }
    if (angleValue) {
        angleValue.textContent = `${angle}°`;
    }
}

// ============================================
// ENHANCED EFFECTS SYSTEM
// ============================================

function applyEffect(effectType) {
    if (!svgAvatarRenderer) {
        alert('SVG Renderer inte initierad än. Prova igen om en stund!');
        return;
    }

    try {
        const selector = '[id*="hair"], [id*="clothes"], [id*="face"]';

        switch(effectType) {
            case 'glow':
                svgAvatarRenderer.applyGlow(selector, '#FF6B9D', 4);
                alert('💫 Glow-effekt applicerad!');
                break;
            case 'neon':
                svgAvatarRenderer.applyGlow(selector, '#00FFFF', 8);
                alert('🌟 Neon-effekt applicerad!');
                break;
            case 'shadow':
                svgAvatarRenderer.applyShadow(selector, 2, 2, 5, 'rgba(0,0,0,0.5)');
                alert('🌑 Shadow-effekt applicerad!');
                break;
            case 'blur':
                svgAvatarRenderer.applyBlur(selector, 2);
                alert('🌫️ Blur-effekt applicerad!');
                break;
            case 'sharpen':
                alert('🔪 Sharpen-effekt kommer snart!');
                break;
            case 'vintage':
                svgAvatarRenderer.applySepia(selector, 0.7);
                alert('📷 Vintage-effekt applicerad!');
                break;
            case 'rainbow':
                svgAvatarRenderer.applyRainbow(selector);
                alert('🌈 Rainbow-effekt applicerad!');
                break;
            case 'emboss':
                alert('🗿 Emboss-effekt kommer snart!');
                break;
            case 'duotone':
                alert('🎨 Duotone-effekt kommer snart!');
                break;
            case 'pixelate':
                alert('🟦 Pixelate-effekt kommer snart!');
                break;
            case 'outline':
                svgAvatarRenderer.applyOutline(selector, 2, '#000000');
                alert('✏️ Outline-effekt applicerad!');
                break;
            default:
                alert('⚠️ Okänd effekt: ' + effectType);
        }
    } catch (error) {
        console.error('Error applying effect:', error);
        alert('⚠️ Kunde inte applicera effekt: ' + error.message);
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

    // Load saved data from LocalStorage
    loadFromLocalStorage();

    // Check daily login bonus (must be after loading data)
    checkDailyBonus();

    // Initialize progression display
    updateProgressionDisplay();
    updateAchievementsDisplay();
    updateUndoRedoButtons();

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

    // Generate initial avatar (this will NOT trigger stats/xp on first load)
    const firstLoad = playerData.stats.avatarChanges === 0;
    if (firstLoad) {
        // Disable stats tracking for initial avatar generation
        const tempStats = playerData.stats.avatarChanges;
        updateAvatar();
        playerData.stats.avatarChanges = 0; // Reset to 0 for first load
    } else {
        updateAvatar();
    }

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

// ============================================
// LLM OUTFIT SYSTEM
// ============================================

// Preset outfit specifications
const presetOutfits = {
    sporty: {
        outfit: {
            top: {
                assetId: "hoodie_colorblock",
                colors: ["#3498DB", "#E74C3C", "#2C3E50"]
            },
            bottom: {
                assetId: "pants_joggers",
                colors: ["#808080", "#505050", "#fff"]
            },
            shoes: {
                assetId: "shoes_sneakers_red",
                colors: ["#E74C3C", "#C0392B", "#fff"]
            },
            accessories: [
                {
                    assetId: "hat_baseball_cap",
                    colors: ["#3498DB", "#fff"]
                }
            ]
        }
    },
    elegant: {
        outfit: {
            top: {
                assetId: "dress_party",
                colors: ["#000", "#FFD700", "#C0C0C0"]
            },
            shoes: {
                assetId: "shoes_heels_red",
                colors: ["#DC143C", "#B22222", "#8B0000"]
            },
            accessories: [
                {
                    assetId: "jewelry_diamond_earrings",
                    colors: ["#FFD700", "#4ECDC4"]
                },
                {
                    assetId: "jewelry_heart_necklace",
                    colors: ["#FFD700", "#e74c3c"]
                }
            ]
        }
    },
    gamer: {
        outfit: {
            top: {
                assetId: "tshirt_gaming_pro",
                colors: ["#1a1a2e", "#0f3460", "#e94560"]
            },
            bottom: {
                assetId: "pants_jeans",
                colors: ["#2E5C8A", "#1a3a5c", "#3a6ea5"]
            },
            shoes: {
                assetId: "shoes_sneakers_red",
                colors: ["#e94560", "#c0392b", "#fff"]
            },
            accessories: [
                {
                    assetId: "accessory_glasses_nerd",
                    colors: ["#000", "#E3F2FD"]
                }
            ]
        }
    },
    winter: {
        outfit: {
            top: {
                assetId: "jacket_bomber",
                colors: ["#8B4513", "#A0522D", "#FFD700"]
            },
            bottom: {
                assetId: "pants_jeans",
                colors: ["#4A90E2", "#2E5C8A", "#5BA3F5"]
            },
            shoes: {
                assetId: "shoes_boots_winter",
                colors: ["#8B4513", "#654321", "#fff"]
            },
            accessories: [
                {
                    assetId: "hat_beanie",
                    colors: ["#E74C3C", "#C0392B", "#fff"]
                },
                {
                    assetId: "accessory_scarf",
                    colors: ["#E74C3C", "#C0392B", "#fff"]
                }
            ]
        }
    },
    rock: {
        outfit: {
            top: {
                assetId: "jacket_leather",
                colors: ["#1a1a1a", "#2a2a2a", "#7F8C8D"]
            },
            bottom: {
                assetId: "pants_jeans",
                colors: ["#1a1a1a", "#2a2a2a", "#3a3a3a"]
            },
            shoes: {
                assetId: "shoes_boots_black",
                colors: ["#1a1a1a", "#2c3e50", "#c0c0c0"]
            },
            accessories: [
                {
                    assetId: "accessory_sunglasses_cool",
                    colors: ["#000", "#1a1a1a"]
                },
                {
                    assetId: "jewelry_chain_silver",
                    colors: ["#C0C0C0", "#A9A9A9"]
                }
            ]
        }
    }
};

// Apply LLM outfit from textarea
async function applyLLMOutfit() {
    console.log('🤖 Applying LLM outfit...');

    // Get spec from textarea
    const textarea = document.getElementById('llmOutfitSpec');
    if (!textarea) {
        alert('❌ Textarea not found');
        return;
    }

    const specText = textarea.value.trim();
    if (!specText) {
        alert('⚠️ Klistra in en outfit-spec först!');
        return;
    }

    try {
        // Parse JSON
        const spec = JSON.parse(specText);
        console.log('📋 Parsed spec:', spec);

        // Initialize clothing engine if not done
        if (!window.clothingEngine) {
            console.log('🔧 Initializing Clothing Engine...');
            await initializeClothingEngineIfNeeded();
        }

        // Apply outfit
        const result = await window.clothingEngine.applyOutfit(spec.outfit || spec);

        // Show result
        console.log('✅ Outfit applied:', result);

        if (result.errors && result.errors.length > 0) {
            alert(`⚠️ Outfit applicerad med ${result.errors.length} varningar:\n${result.errors.map(e => e.error).join('\n')}`);
        } else {
            alert('✨ Outfit applicerad framgångsrikt!');
        }

        // Award XP for trying new features
        addXP(25, 'Testade LLM Outfit System');

    } catch (error) {
        console.error('❌ Error applying outfit:', error);
        alert('❌ Fel i outfit-spec:\n' + error.message);
    }
}

// Load example outfit into textarea
function loadExampleOutfit() {
    const example = {
        outfit: {
            top: {
                assetId: "hoodie_colorblock",
                colors: ["#3498DB", "#E74C3C", "#2C3E50"]
            },
            bottom: {
                assetId: "pants_jeans",
                colors: ["#4A90E2", "#2E5C8A", "#5BA3F5"]
            },
            shoes: {
                assetId: "shoes_sneakers_red",
                colors: ["#e74c3c", "#c0392b", "#fff"]
            },
            accessories: [
                {
                    assetId: "accessory_watch_digital",
                    colors: ["#2C3E50", "#27AE60"]
                }
            ]
        }
    };

    const textarea = document.getElementById('llmOutfitSpec');
    if (textarea) {
        textarea.value = JSON.stringify(example, null, 2);
        alert('📋 Exempel-outfit inladdat! Tryck på "Applicera Outfit" för att testa.');
    }
}

// Load preset outfit
async function loadPresetOutfit(presetName) {
    console.log('👔 Loading preset:', presetName);

    const preset = presetOutfits[presetName];
    if (!preset) {
        alert('❌ Preset inte funnen: ' + presetName);
        return;
    }

    // Load into textarea
    const textarea = document.getElementById('llmOutfitSpec');
    if (textarea) {
        textarea.value = JSON.stringify(preset, null, 2);
    }

    // Apply immediately
    await applyLLMOutfit();
}

// Clear outfit
function clearOutfit() {
    console.log('🧹 Clearing outfit...');

    if (window.clothingEngine) {
        window.clothingEngine.clearOutfit();
        alert('🧹 Outfit rensat!');
    } else {
        alert('⚠️ Clothing Engine inte initierad än');
    }
}

// Initialize clothing engine if needed
async function initializeClothingEngineIfNeeded() {
    if (window.clothingEngine) {
        return window.clothingEngine;
    }

    // Wait for dependencies
    let attempts = 0;
    while (attempts < 50) {
        if (typeof SVGAvatarRenderer !== 'undefined' &&
            typeof SVGAssetDatabase !== 'undefined' &&
            typeof SVGColorRemapper !== 'undefined' &&
            window.svgAvatarRenderer) {

            console.log('✅ All dependencies loaded, creating ClothingEngine');
            window.clothingEngine = new ClothingEngine(window.svgAvatarRenderer, SVGAssetDatabase);
            return window.clothingEngine;
        }

        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }

    throw new Error('Failed to initialize Clothing Engine - dependencies not loaded');
}

// Expose functions globally for HTML event handlers
window.toggleDevMode = toggleDevMode;
window.applyMultiPartColoring = applyMultiPartColoring;
window.applyPattern = applyPattern;
window.applyGlowEffect = applyGlowEffect;
window.applyEffect = applyEffect;
window.clearEffects = clearEffects;
window.exportAvatarSVG = exportAvatarSVG;
window.exportAvatarPNG = exportAvatarPNG;
window.applyCustomGradient = applyCustomGradient;
window.applySolidBackground = applySolidBackground;
window.applyCustomSkinColor = applyCustomSkinColor;
window.applyCustomHairColor = applyCustomHairColor;
window.applyCustomClotheColor = applyCustomClotheColor;
window.saveToLocalStorage = saveToLocalStorage;
window.exportAvatarData = exportAvatarData;
window.importAvatarData = importAvatarData;
window.clearSaveData = clearSaveData;
window.randomizeAvatar = randomizeAvatar;
window.undo = undo;
window.redo = redo;
window.applyLLMOutfit = applyLLMOutfit;
window.loadExampleOutfit = loadExampleOutfit;
window.loadPresetOutfit = loadPresetOutfit;
window.clearOutfit = clearOutfit;

// Start the game when page loads
window.addEventListener('load', init);

// Add gradient preview listeners after page loads
window.addEventListener('load', () => {
    const gradientColor1 = document.getElementById('gradientColor1');
    const gradientColor2 = document.getElementById('gradientColor2');
    const gradientAngle = document.getElementById('gradientAngle');

    if (gradientColor1) {
        gradientColor1.addEventListener('input', updateGradientPreview);
    }
    if (gradientColor2) {
        gradientColor2.addEventListener('input', updateGradientPreview);
    }
    if (gradientAngle) {
        gradientAngle.addEventListener('input', updateGradientPreview);
    }
});
