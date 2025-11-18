// ============================================
// STYLESPACE - SVG ASSET DATABASE
// Gigantiskt bibliotek med SVG-assets
// 60+ unique items across 12 categories!
// ============================================

const SVGAssetDatabase = {
    // ============================================
    // T-SHIRTS (20 items)
    // ============================================
    tshirts: [
        {
            id: 'tshirt_cat_love',
            name: '😻 Cat Love',
            category: 'cute',
            file: 'assets/tshirts/cat-love.svg',
            price: 150,
            colors: ['#FFB6C1', '#FF69B4', '#FF1493'],
            tags: ['cute', 'cats', 'pink', 'kawaii', 'meow']
        },
        {
            id: 'tshirt_gaming_pro',
            name: '🎮 Pro Gamer',
            category: 'gaming',
            file: 'assets/tshirts/gaming-pro.svg',
            price: 180,
            colors: ['#1a1a2e', '#0f3460', '#e94560'],
            tags: ['gaming', 'esports', 'controller', 'nerd', 'tech']
        },
        {
            id: 'tshirt_coffee_addict',
            name: '☕ Coffee Addict',
            category: 'lifestyle',
            file: 'assets/tshirts/coffee-addict.svg',
            price: 140,
            colors: ['#D2691E', '#8B4513', '#FFFACD'],
            tags: ['coffee', 'caffeine', 'morning', 'lifestyle']
        },
        {
            id: 'tshirt_space_explorer',
            name: '🚀 Space Explorer',
            category: 'space',
            file: 'assets/tshirts/space-explorer.svg',
            price: 200,
            colors: ['#0a0e27', '#e74c3c', '#3498db'],
            tags: ['space', 'rocket', 'planets', 'astronomy', 'sci-fi']
        },
        {
            id: 'tshirt_music_lover',
            name: '🎵 Music Lover',
            category: 'music',
            file: 'assets/tshirts/music-lover.svg',
            price: 160,
            colors: ['#9b59b6', '#8e44ad', '#f1c40f'],
            tags: ['music', 'headphones', 'beats', 'melody']
        },
        {
            id: 'tshirt_pizza_slice',
            name: '🍕 Pizza Slice',
            category: 'food',
            file: 'assets/tshirts/pizza-slice.svg',
            price: 135,
            colors: ['#ff6b6b', '#feca57', '#e74c3c'],
            tags: ['pizza', 'food', 'pepperoni', 'yummy', 'italian']
        },
        {
            id: 'tshirt_rainbow_vibes',
            name: '🌈 Rainbow Vibes',
            category: 'positive',
            file: 'assets/tshirts/rainbow-vibes.svg',
            price: 145,
            colors: ['#fff', '#e74c3c', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6'],
            tags: ['rainbow', 'positive', 'vibes', 'colorful', 'happy']
        },
        {
            id: 'tshirt_sushi_roll',
            name: '🍣 Sushi Roll',
            category: 'food',
            file: 'assets/tshirts/sushi-roll.svg',
            price: 145,
            colors: ['#fff5f0', '#ff6b6b', '#2ecc71', '#f39c12'],
            tags: ['sushi', 'food', 'japanese', 'chopsticks', 'asian']
        },
        {
            id: 'tshirt_cactus_cool',
            name: '🌵 Cactus Cool',
            category: 'nature',
            file: 'assets/tshirts/cactus-cool.svg',
            price: 140,
            colors: ['#f0fff4', '#2ecc71', '#27ae60'],
            tags: ['cactus', 'funny', 'desert', 'prick', 'sunglasses']
        },
        {
            id: 'tshirt_panda_cute',
            name: '🐼 Panda Cute',
            category: 'cute',
            file: 'assets/tshirts/panda-cute.svg',
            price: 155,
            colors: ['#fff', '#1a1a1a', '#2ecc71'],
            tags: ['panda', 'cute', 'bamboo', 'wild', 'animals']
        },
        {
            id: 'tshirt_burger_lover',
            name: '🍔 Burger Lover',
            category: 'food',
            file: 'assets/tshirts/burger-lover.svg',
            price: 140,
            colors: ['#FFF8DC', '#D2691E', '#8B4513', '#FFD700'],
            tags: ['burger', 'food', 'fast food', 'yummy', 'american']
        },
        {
            id: 'tshirt_donut_dreams',
            name: '🍩 Donut Dreams',
            category: 'food',
            file: 'assets/tshirts/donut-dreams.svg',
            price: 135,
            colors: ['#FFE4E1', '#FF69B4', '#FF1493', '#FFD700'],
            tags: ['donut', 'sweet', 'dessert', 'sprinkles', 'happy']
        },
        {
            id: 'tshirt_dog_friend',
            name: '🐕 Dog Best Friend',
            category: 'animals',
            file: 'assets/tshirts/dog-best-friend.svg',
            price: 150,
            colors: ['#fff', '#D2691E', '#8B4513'],
            tags: ['dog', 'pet', 'friend', 'loyal', 'puppy']
        },
        {
            id: 'tshirt_code_ninja',
            name: '💻 Code Ninja',
            category: 'tech',
            file: 'assets/tshirts/code-ninja.svg',
            price: 180,
            colors: ['#1a1a1a', '#00FF00'],
            tags: ['code', 'programming', 'tech', 'nerd', 'developer', 'hacker']
        },
        {
            id: 'tshirt_mountain',
            name: '⛰️ Mountain Explorer',
            category: 'nature',
            file: 'assets/tshirts/mountain-explorer.svg',
            price: 165,
            colors: ['#F0F8FF', '#4682B4', '#5F9EA0'],
            tags: ['mountain', 'nature', 'hiking', 'explorer', 'outdoor']
        },
        {
            id: 'tshirt_ocean',
            name: '🌊 Ocean Vibes',
            category: 'nature',
            file: 'assets/tshirts/ocean-vibes.svg',
            price: 150,
            colors: ['#E0F7FA', '#00BCD4', '#0097A7'],
            tags: ['ocean', 'waves', 'beach', 'water', 'summer']
        },
        {
            id: 'tshirt_skateboard',
            name: '🛹 Skateboard Life',
            category: 'sports',
            file: 'assets/tshirts/skateboard-life.svg',
            price: 170,
            colors: ['#2C3E50', '#E74C3C', '#3498DB'],
            tags: ['skateboard', 'sports', 'extreme', 'skate', 'urban']
        },
        {
            id: 'tshirt_taco',
            name: '🌮 Taco Tuesday',
            category: 'food',
            file: 'assets/tshirts/taco-tuesday.svg',
            price: 140,
            colors: ['#FFF5E1', '#F4A460', '#D2691E'],
            tags: ['taco', 'mexican', 'food', 'tuesday', 'yummy']
        },
        {
            id: 'tshirt_robot',
            name: '🤖 Robot Future',
            category: 'tech',
            file: 'assets/tshirts/robot-future.svg',
            price: 185,
            colors: ['#34495E', '#95A5A6', '#3498DB'],
            tags: ['robot', 'tech', 'future', 'ai', 'sci-fi']
        },
        {
            id: 'tshirt_fox',
            name: '🦊 Clever Fox',
            category: 'animals',
            file: 'assets/tshirts/fox-clever.svg',
            price: 155,
            colors: ['#fff', '#FF8C00', '#FF6347'],
            tags: ['fox', 'clever', 'animals', 'cute', 'smart']
        }
    ],

    // ============================================
    // ACCESSORIES (9 items)
    // ============================================
    accessories: [
        {
            id: 'accessory_sunglasses_cool',
            name: '😎 Cool Sunglasses',
            category: 'eyewear',
            file: 'assets/accessories/sunglasses-cool.svg',
            price: 100,
            colors: ['#000', '#1a1a1a'],
            tags: ['sunglasses', 'cool', 'summer', 'style', 'black']
        },
        {
            id: 'accessory_glasses_nerd',
            name: '🤓 Nerd Glasses',
            category: 'eyewear',
            file: 'assets/accessories/glasses-nerd.svg',
            price: 80,
            colors: ['#000', '#E3F2FD'],
            tags: ['glasses', 'nerd', 'geek', 'smart', 'tape']
        },
        {
            id: 'accessory_glasses_aviator',
            name: '🕶️ Aviator Glasses',
            category: 'eyewear',
            file: 'assets/accessories/glasses-aviator.svg',
            price: 120,
            colors: ['#FFD700', '#B8860B'],
            tags: ['aviator', 'sunglasses', 'gold', 'pilot', 'retro']
        },
        {
            id: 'accessory_glasses_cateye',
            name: '👓 Cat Eye Glasses',
            category: 'eyewear',
            file: 'assets/accessories/glasses-cat-eye.svg',
            price: 110,
            colors: ['#FF1493', '#C71585'],
            tags: ['glasses', 'cat eye', 'pink', 'retro', 'vintage']
        },
        {
            id: 'accessory_watch_digital',
            name: '⌚ Digital Watch',
            category: 'watches',
            file: 'assets/accessories/watch-digital.svg',
            price: 150,
            colors: ['#2C3E50', '#27AE60'],
            tags: ['watch', 'digital', 'tech', 'time', 'sport']
        },
        {
            id: 'accessory_watch_luxury',
            name: '⌚ Luxury Watch',
            category: 'watches',
            file: 'assets/accessories/watch-luxury.svg',
            price: 300,
            colors: ['#DAA520', '#F5F5DC', '#E74C3C'],
            tags: ['watch', 'luxury', 'gold', 'elegant', 'expensive']
        },
        {
            id: 'accessory_scarf',
            name: '🧣 Winter Scarf',
            category: 'scarves',
            file: 'assets/accessories/scarf-winter.svg',
            price: 90,
            colors: ['#E74C3C', '#C0392B', '#fff'],
            tags: ['scarf', 'winter', 'warm', 'cozy', 'red']
        },
        {
            id: 'accessory_crown',
            name: '👑 Golden Crown',
            category: 'royal',
            file: 'assets/accessories/crown.svg',
            price: 250,
            colors: ['#ffd700', '#ffed4e', '#ff6b6b'],
            tags: ['crown', 'king', 'queen', 'royal', 'gold']
        },
        {
            id: 'accessory_wings',
            name: '👼 Angel Wings',
            category: 'fantasy',
            file: 'assets/accessories/wings.svg',
            price: 200,
            colors: ['#fff', '#f0f0f0', '#ffd700'],
            tags: ['wings', 'angel', 'fly', 'feathers', 'heaven']
        }
    ],

    // ============================================
    // JEWELRY (5 items)
    // ============================================
    jewelry: [
        {
            id: 'jewelry_heart_necklace',
            name: '💝 Heart Necklace',
            category: 'necklaces',
            file: 'assets/jewelry/heart-necklace.svg',
            price: 120,
            colors: ['#FFD700', '#e74c3c', '#c0392b'],
            tags: ['heart', 'love', 'necklace', 'pendant', 'romantic']
        },
        {
            id: 'jewelry_diamond_earrings',
            name: '💎 Diamond Earrings',
            category: 'earrings',
            file: 'assets/jewelry/diamond-earrings.svg',
            price: 180,
            colors: ['#FFD700', '#4ECDC4', '#45B7D1'],
            tags: ['diamond', 'earrings', 'fancy', 'sparkle', 'elegant']
        },
        {
            id: 'jewelry_bracelet_gold',
            name: '💫 Gold Bracelet',
            category: 'bracelets',
            file: 'assets/jewelry/bracelet-gold.svg',
            price: 150,
            colors: ['#DAA520', '#FFD700', '#E74C3C'],
            tags: ['bracelet', 'gold', 'chain', 'charm', 'wrist']
        },
        {
            id: 'jewelry_ring_diamond',
            name: '💍 Diamond Ring',
            category: 'rings',
            file: 'assets/jewelry/ring-diamond.svg',
            price: 250,
            colors: ['#FFD700', '#E3F2FD', '#BBDEFB'],
            tags: ['ring', 'diamond', 'engagement', 'sparkle', 'luxury']
        },
        {
            id: 'jewelry_chain_silver',
            name: '⛓️ Silver Chain',
            category: 'necklaces',
            file: 'assets/jewelry/chain-silver.svg',
            price: 100,
            colors: ['#C0C0C0', '#A9A9A9'],
            tags: ['chain', 'silver', 'necklace', 'pendant', 'star']
        }
    ],

    // ============================================
    // SHOES (6 items)
    // ============================================
    shoes: [
        {
            id: 'shoes_sneakers_red',
            name: '👟 Red Sneakers',
            category: 'sneakers',
            file: 'assets/shoes/sneakers-red.svg',
            price: 160,
            colors: ['#e74c3c', '#c0392b', '#fff'],
            tags: ['sneakers', 'sport', 'red', 'casual', 'comfy']
        },
        {
            id: 'shoes_boots_black',
            name: '👢 Black Boots',
            category: 'boots',
            file: 'assets/shoes/boots-black.svg',
            price: 200,
            colors: ['#2c3e50', '#1a1a1a', '#c0c0c0'],
            tags: ['boots', 'black', 'leather', 'edgy', 'buckle']
        },
        {
            id: 'shoes_heels_red',
            name: '👠 Red Heels',
            category: 'heels',
            file: 'assets/shoes/heels-red.svg',
            price: 220,
            colors: ['#DC143C', '#B22222', '#8B0000'],
            tags: ['heels', 'red', 'elegant', 'party', 'stiletto']
        },
        {
            id: 'shoes_sandals',
            name: '🩴 Beach Sandals',
            category: 'sandals',
            file: 'assets/shoes/sandals-beach.svg',
            price: 80,
            colors: ['#8B4513', '#D2691E', '#DAA520'],
            tags: ['sandals', 'beach', 'summer', 'casual', 'brown']
        },
        {
            id: 'shoes_boots_winter',
            name: '🥾 Winter Boots',
            category: 'boots',
            file: 'assets/shoes/boots-winter.svg',
            price: 210,
            colors: ['#8B4513', '#654321', '#fff'],
            tags: ['boots', 'winter', 'warm', 'fur', 'snow']
        }
    ],

    // ============================================
    // HATS (4 items)
    // ============================================
    hats: [
        {
            id: 'hat_beanie',
            name: '🧢 Warm Beanie',
            category: 'beanies',
            file: 'assets/hats/beanie-warm.svg',
            price: 90,
            colors: ['#e74c3c', '#c0392b', '#fff'],
            tags: ['beanie', 'winter', 'warm', 'cozy', 'pom pom']
        },
        {
            id: 'hat_baseball_cap',
            name: '🧢 Baseball Cap',
            category: 'caps',
            file: 'assets/hats/cap-baseball.svg',
            price: 100,
            colors: ['#2563EB', '#1E40AF', '#fff'],
            tags: ['cap', 'baseball', 'sport', 'casual', 'blue']
        },
        {
            id: 'hat_fedora',
            name: '🎩 Classic Fedora',
            category: 'fedoras',
            file: 'assets/hats/fedora-classic.svg',
            price: 150,
            colors: ['#2C3E50', '#34495E', '#9B59B6'],
            tags: ['fedora', 'classic', 'elegant', 'feather', 'retro']
        },
        {
            id: 'hat_party',
            name: '🎉 Party Hat',
            category: 'party',
            file: 'assets/hats/party-hat.svg',
            price: 60,
            colors: ['#FF1493', '#FFD700', '#00CED1'],
            tags: ['party', 'celebration', 'fun', 'birthday', 'colorful']
        }
    ],

    // ============================================
    // BAGS (3 items)
    // ============================================
    bags: [
        {
            id: 'bag_backpack',
            name: '🎒 Cool Backpack',
            category: 'backpacks',
            file: 'assets/bags/backpack-cool.svg',
            price: 220,
            colors: ['#3498db', '#2980b9', '#2c3e50'],
            tags: ['backpack', 'school', 'travel', 'blue', 'practical']
        },
        {
            id: 'bag_purse',
            name: '👜 Elegant Purse',
            category: 'purses',
            file: 'assets/bags/purse-elegant.svg',
            price: 180,
            colors: ['#8B4513', '#A0522D', '#DAA520'],
            tags: ['purse', 'elegant', 'brown', 'leather', 'classy']
        },
        {
            id: 'bag_messenger',
            name: '💼 Messenger Bag',
            category: 'messenger',
            file: 'assets/bags/messenger-bag.svg',
            price: 200,
            colors: ['#2C3E50', '#34495E', '#8B4513'],
            tags: ['messenger', 'bag', 'adventure', 'travel', 'work']
        }
    ],

    // ============================================
    // HOODIES (3 items)
    // ============================================
    hoodies: [
        {
            id: 'hoodie_basic_grey',
            name: '🧥 Basic Grey Hoodie',
            category: 'hoodies',
            file: 'assets/hoodies/hoodie-basic-grey.svg',
            price: 180,
            colors: ['#808080', '#696969', '#505050'],
            tags: ['hoodie', 'grey', 'casual', 'comfy', 'basic']
        },
        {
            id: 'hoodie_zip_black',
            name: '🧥 Black Zip Hoodie',
            category: 'hoodies',
            file: 'assets/hoodies/hoodie-zip-black.svg',
            price: 200,
            colors: ['#1a1a1a', '#2a2a2a', '#FFD700'],
            tags: ['hoodie', 'black', 'zipper', 'edgy', 'gold']
        },
        {
            id: 'hoodie_colorblock',
            name: '🧥 Colorblock Hoodie',
            category: 'hoodies',
            file: 'assets/hoodies/hoodie-colorblock.svg',
            price: 210,
            colors: ['#3498DB', '#E74C3C', '#2C3E50'],
            tags: ['hoodie', 'colorblock', 'blue', 'red', 'trendy']
        }
    ],

    // ============================================
    // JACKETS (3 items)
    // ============================================
    jackets: [
        {
            id: 'jacket_leather',
            name: '🧥 Leather Jacket',
            category: 'jackets',
            file: 'assets/jackets/leather-jacket.svg',
            price: 250,
            colors: ['#1a1a1a', '#2a2a2a', '#7F8C8D'],
            tags: ['jacket', 'leather', 'black', 'edgy', 'rock', 'zipper']
        },
        {
            id: 'jacket_bomber',
            name: '✈️ Bomber Jacket',
            category: 'jackets',
            file: 'assets/jackets/bomber-jacket.svg',
            price: 230,
            colors: ['#2E7D32', '#1B5E20', '#FFD700'],
            tags: ['jacket', 'bomber', 'green', 'military', 'pilot', 'patches']
        },
        {
            id: 'jacket_denim',
            name: '👖 Denim Jacket',
            category: 'jackets',
            file: 'assets/jackets/denim-jacket.svg',
            price: 190,
            colors: ['#4A90E2', '#2E5C8A', '#5BA3F5'],
            tags: ['jacket', 'denim', 'blue', 'casual', 'jean', 'vintage']
        }
    ],

    // ============================================
    // DRESSES (2 items)
    // ============================================
    dresses: [
        {
            id: 'dress_summer',
            name: '👗 Summer Dress',
            category: 'dresses',
            file: 'assets/dresses/summer-dress.svg',
            price: 170,
            colors: ['#FFB6C1', '#FF69B4', '#FF1493'],
            tags: ['dress', 'summer', 'pink', 'floral', 'cute', 'bow']
        },
        {
            id: 'dress_party',
            name: '👗 Party Dress',
            category: 'dresses',
            file: 'assets/dresses/party-dress.svg',
            price: 220,
            colors: ['#000', '#FFD700', '#C0C0C0'],
            tags: ['dress', 'party', 'black', 'sequins', 'elegant', 'gold']
        }
    ],

    // ============================================
    // SKIRTS (2 items)
    // ============================================
    skirts: [
        {
            id: 'skirt_mini',
            name: '👗 Mini Skirt',
            category: 'skirts',
            file: 'assets/skirts/mini-skirt.svg',
            price: 120,
            colors: ['#E74C3C', '#C0392B', '#2C3E50'],
            tags: ['skirt', 'mini', 'red', 'short', 'casual', 'trendy']
        },
        {
            id: 'skirt_pleated',
            name: '👗 Pleated Skirt',
            category: 'skirts',
            file: 'assets/skirts/pleated-skirt.svg',
            price: 140,
            colors: ['#9370DB', '#8A5FD3', '#7B68EE'],
            tags: ['skirt', 'pleated', 'purple', 'school', 'cute']
        }
    ],

    // ============================================
    // PANTS (2 items)
    // ============================================
    pants: [
        {
            id: 'pants_jeans',
            name: '👖 Blue Jeans',
            category: 'pants',
            file: 'assets/pants/jeans-blue.svg',
            price: 150,
            colors: ['#4A90E2', '#2E5C8A', '#5BA3F5'],
            tags: ['jeans', 'pants', 'blue', 'denim', 'casual', 'distressed']
        },
        {
            id: 'pants_joggers',
            name: '🩳 Grey Joggers',
            category: 'pants',
            file: 'assets/pants/joggers-grey.svg',
            price: 130,
            colors: ['#808080', '#505050', '#fff'],
            tags: ['joggers', 'pants', 'grey', 'sport', 'athletic', 'comfy']
        }
    ],

    // ============================================
    // SHORTS (1 item)
    // ============================================
    shorts: [
        {
            id: 'shorts_denim',
            name: '🩳 Denim Shorts',
            category: 'shorts',
            file: 'assets/shorts/denim-shorts.svg',
            price: 110,
            colors: ['#4A90E2', '#2E5C8A', '#5BA3F5'],
            tags: ['shorts', 'denim', 'blue', 'summer', 'distressed', 'casual']
        }
    ],

    // ============================================
    // HELPER METHODS
    // ============================================

    // Get all assets
    getAllAssets() {
        return [
            ...this.tshirts,
            ...this.accessories,
            ...this.jewelry,
            ...this.shoes,
            ...this.hats,
            ...this.bags,
            ...this.hoodies,
            ...this.jackets,
            ...this.dresses,
            ...this.skirts,
            ...this.pants,
            ...this.shorts
        ];
    },

    // Get assets by category
    getByCategory(categoryType) {
        switch(categoryType.toLowerCase()) {
            case 'tshirts': return this.tshirts;
            case 'accessories': return this.accessories;
            case 'jewelry': return this.jewelry;
            case 'shoes': return this.shoes;
            case 'hats': return this.hats;
            case 'bags': return this.bags;
            case 'hoodies': return this.hoodies;
            case 'jackets': return this.jackets;
            case 'dresses': return this.dresses;
            case 'skirts': return this.skirts;
            case 'pants': return this.pants;
            case 'shorts': return this.shorts;
            default: return [];
        }
    },

    // Get asset by ID
    getById(id) {
        return this.getAllAssets().find(asset => asset.id === id);
    },

    // Search assets by tags
    searchByTags(tags) {
        const searchTags = Array.isArray(tags) ? tags : [tags];
        return this.getAllAssets().filter(asset =>
            asset.tags.some(tag =>
                searchTags.some(searchTag =>
                    tag.toLowerCase().includes(searchTag.toLowerCase())
                )
            )
        );
    },

    // Get assets by price range
    getByPriceRange(min, max) {
        return this.getAllAssets().filter(asset =>
            asset.price >= min && asset.price <= max
        );
    },

    // Get random asset
    getRandomAsset(categoryType = null) {
        const assets = categoryType ? this.getByCategory(categoryType) : this.getAllAssets();
        return assets[Math.floor(Math.random() * assets.length)];
    },

    // Get assets by color
    getByColor(colorHex) {
        return this.getAllAssets().filter(asset =>
            asset.colors.some(color =>
                color.toLowerCase() === colorHex.toLowerCase()
            )
        );
    },

    // Get all categories
    getAllCategories() {
        return ['tshirts', 'accessories', 'jewelry', 'shoes', 'hats', 'bags',
                'hoodies', 'jackets', 'dresses', 'skirts', 'pants', 'shorts'];
    },

    // Get stats
    getStats() {
        return {
            totalAssets: this.getAllAssets().length,
            tshirts: this.tshirts.length,
            accessories: this.accessories.length,
            jewelry: this.jewelry.length,
            shoes: this.shoes.length,
            hats: this.hats.length,
            bags: this.bags.length,
            hoodies: this.hoodies.length,
            jackets: this.jackets.length,
            dresses: this.dresses.length,
            skirts: this.skirts.length,
            pants: this.pants.length,
            shorts: this.shorts.length,
            categories: this.getAllCategories().length
        };
    }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SVGAssetDatabase;
}

// Log database stats on load
console.log('📦 SVG Asset Database loaded!');
console.log('📊 Stats:', SVGAssetDatabase.getStats());
console.log('🎨 Total Assets:', SVGAssetDatabase.getAllAssets().length);
