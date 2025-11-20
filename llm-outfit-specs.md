# LLM Outfit Generation System

## Overview

Detta system låter en LLM generera kompletta karaktärsoutfits genom att skapa JSON-specifikationer som direkt kan importeras i spelet.

## Outfit Spec Format

En komplett outfit-spec består av:

```json
{
  "description": "A sporty girl with oversized hoodie and jeans",
  "face": {
    "style": "avataaars",
    "sex": "female",
    "skinColor": "light",
    "hairColor": "724133",
    "top": "longHairStraight",
    "eyes": "happy",
    "eyebrow": "default",
    "mouth": "smile"
  },
  "outfit": {
    "top": {
      "assetId": "hoodie_colorblock",
      "colors": ["#3498DB", "#E74C3C", "#2C3E50"]
    },
    "bottom": {
      "assetId": "pants_jeans",
      "colors": ["#4A90E2", "#2E5C8A", "#5BA3F5"]
    },
    "shoes": {
      "assetId": "shoes_sneakers_red",
      "colors": ["#e74c3c", "#c0392b", "#fff"]
    },
    "accessories": [
      {
        "assetId": "accessory_watch_digital",
        "colors": ["#2C3E50", "#27AE60"]
      },
      {
        "assetId": "hat_baseball_cap",
        "colors": ["#3498DB", "#fff"]
      }
    ]
  }
}
```

## Available Assets

### Tops

#### Hoodies
- `hoodie_basic_grey` - Basic Grey Hoodie
- `hoodie_zip_black` - Black Zip Hoodie
- `hoodie_colorblock` - Colorblock Hoodie

#### Jackets
- `jacket_leather` - Leather Jacket
- `jacket_bomber` - Bomber Jacket
- `jacket_denim` - Denim Jacket

#### Dresses
- `dress_summer` - Summer Dress
- `dress_party` - Party Dress

#### T-Shirts (20 designs)
- `tshirt_cat_love` - 😻 Cat Love
- `tshirt_gaming_pro` - 🎮 Pro Gamer
- `tshirt_coffee_addict` - ☕ Coffee Addict
- `tshirt_space_explorer` - 🚀 Space Explorer
- `tshirt_music_lover` - 🎵 Music Lover
- `tshirt_pizza_slice` - 🍕 Pizza Slice
- `tshirt_rainbow_vibes` - 🌈 Rainbow Vibes
- `tshirt_sushi_roll` - 🍣 Sushi Roll
- `tshirt_cactus_cool` - 🌵 Cactus Cool
- `tshirt_panda_cute` - 🐼 Panda Cute
- `tshirt_burger_lover` - 🍔 Burger Lover
- `tshirt_donut_dreams` - 🍩 Donut Dreams
- `tshirt_dog_friend` - 🐕 Dog Best Friend
- `tshirt_code_ninja` - 💻 Code Ninja
- `tshirt_mountain` - ⛰️ Mountain Explorer
- `tshirt_ocean` - 🌊 Ocean Vibes
- `tshirt_skateboard` - 🛹 Skateboard Life
- `tshirt_taco` - 🌮 Taco Tuesday
- `tshirt_robot` - 🤖 Robot Future
- `tshirt_fox` - 🦊 Clever Fox

### Bottoms

#### Pants
- `pants_jeans` - Blue Jeans
- `pants_joggers` - Grey Joggers

#### Skirts
- `skirt_mini` - Mini Skirt
- `skirt_pleated` - Pleated Skirt

#### Shorts
- `shorts_denim` - Denim Shorts

### Shoes
- `shoes_sneakers_red` - Red Sneakers
- `shoes_boots_black` - Black Boots
- `shoes_heels_red` - Red Heels
- `shoes_sandals` - Beach Sandals
- `shoes_boots_winter` - Winter Boots

### Accessories

#### Eyewear
- `accessory_sunglasses_cool` - 😎 Cool Sunglasses
- `accessory_glasses_nerd` - 🤓 Nerd Glasses
- `accessory_glasses_aviator` - 🕶️ Aviator Glasses
- `accessory_glasses_cateye` - 👓 Cat Eye Glasses

#### Watches
- `accessory_watch_digital` - ⌚ Digital Watch
- `accessory_watch_luxury` - ⌚ Luxury Watch

#### Other Accessories
- `accessory_scarf` - 🧣 Winter Scarf
- `accessory_crown` - 👑 Golden Crown
- `accessory_wings` - 👼 Angel Wings

### Jewelry
- `jewelry_heart_necklace` - 💝 Heart Necklace
- `jewelry_diamond_earrings` - 💎 Diamond Earrings
- `jewelry_bracelet_gold` - 💫 Gold Bracelet
- `jewelry_ring_diamond` - 💍 Diamond Ring
- `jewelry_chain_silver` - ⛓️ Silver Chain

### Hats
- `hat_beanie` - 🧢 Warm Beanie
- `hat_baseball_cap` - 🧢 Baseball Cap
- `hat_fedora` - 🎩 Classic Fedora
- `hat_party` - 🎉 Party Hat

### Bags
- `bag_backpack` - 🎒 Cool Backpack
- `bag_purse` - 👜 Elegant Purse
- `bag_messenger` - 💼 Messenger Bag

## Alternative Spec Formats

### Using Search Instead of Asset IDs

```json
{
  "outfit": {
    "top": {
      "search": {
        "tags": ["hoodie", "casual"]
      },
      "colors": ["#3498DB", "#E74C3C"]
    },
    "bottom": {
      "search": {
        "tags": ["jeans", "blue"]
      },
      "colors": ["#4A90E2"]
    }
  }
}
```

### Using Type and Style

```json
{
  "outfit": {
    "top": {
      "type": "hoodies",
      "style": "colorblock",
      "colors": ["#FF6B9D", "#4169E1", "#FFD700"]
    }
  }
}
```

### Custom Positioning

```json
{
  "outfit": {
    "accessories": [
      {
        "assetId": "accessory_crown",
        "colors": ["#FFD700", "#FF6B9D"],
        "position": {
          "x": 140,
          "y": 10,
          "scale": 0.7,
          "rotation": 5
        }
      }
    ]
  }
}
```

## Example Outfits

### Example 1: Sporty Casual

```json
{
  "description": "Sporty and casual outfit with colorful hoodie",
  "face": {
    "style": "avataaars",
    "sex": "female",
    "skinColor": "light",
    "hairColor": "auburn",
    "top": "longHairStraight",
    "eyes": "happy",
    "mouth": "smile"
  },
  "outfit": {
    "top": {
      "assetId": "hoodie_colorblock",
      "colors": ["#3498DB", "#E74C3C", "#2C3E50"]
    },
    "bottom": {
      "assetId": "pants_joggers",
      "colors": ["#808080", "#505050", "#fff"]
    },
    "shoes": {
      "assetId": "shoes_sneakers_red",
      "colors": ["#E74C3C", "#C0392B", "#fff"]
    },
    "accessories": [
      {
        "assetId": "hat_baseball_cap",
        "colors": ["#3498DB", "#fff"]
      }
    ]
  }
}
```

### Example 2: Elegant Evening

```json
{
  "description": "Elegant party outfit with dress and jewelry",
  "face": {
    "style": "avataaars",
    "sex": "female",
    "skinColor": "tanned",
    "hairColor": "black",
    "top": "longHairCurly",
    "eyes": "happy",
    "mouth": "smile"
  },
  "outfit": {
    "top": {
      "assetId": "dress_party",
      "colors": ["#000", "#FFD700", "#C0C0C0"]
    },
    "shoes": {
      "assetId": "shoes_heels_red",
      "colors": ["#DC143C", "#B22222", "#8B0000"]
    },
    "accessories": [
      {
        "assetId": "jewelry_diamond_earrings",
        "colors": ["#FFD700", "#4ECDC4"]
      },
      {
        "assetId": "jewelry_heart_necklace",
        "colors": ["#FFD700", "#e74c3c"]
      },
      {
        "assetId": "bag_purse",
        "colors": ["#8B4513", "#DAA520"]
      }
    ]
  }
}
```

### Example 3: Gamer Nerd

```json
{
  "description": "Geeky gamer with gaming t-shirt and casual style",
  "face": {
    "style": "avataaars",
    "sex": "male",
    "skinColor": "pale",
    "hairColor": "brown",
    "top": "shortHairShortFlat",
    "eyes": "default",
    "mouth": "default"
  },
  "outfit": {
    "top": {
      "assetId": "tshirt_gaming_pro",
      "colors": ["#1a1a2e", "#0f3460", "#e94560"]
    },
    "bottom": {
      "assetId": "pants_jeans",
      "colors": ["#2E5C8A", "#1a3a5c", "#3a6ea5"]
    },
    "shoes": {
      "assetId": "shoes_sneakers_red",
      "colors": ["#e94560", "#c0392b", "#fff"]
    },
    "accessories": [
      {
        "assetId": "accessory_glasses_nerd",
        "colors": ["#000", "#E3F2FD"]
      },
      {
        "assetId": "bag_backpack",
        "colors": ["#1a1a2e", "#0f3460", "#2c3e50"]
      }
    ]
  }
}
```

### Example 4: Winter Cozy

```json
{
  "description": "Cozy winter outfit with warm colors",
  "face": {
    "style": "avataaars",
    "sex": "female",
    "skinColor": "light",
    "hairColor": "blonde",
    "top": "longHairStraight",
    "eyes": "happy",
    "mouth": "smile"
  },
  "outfit": {
    "top": {
      "assetId": "jacket_bomber",
      "colors": ["#8B4513", "#A0522D", "#FFD700"]
    },
    "bottom": {
      "assetId": "pants_jeans",
      "colors": ["#4A90E2", "#2E5C8A", "#5BA3F5"]
    },
    "shoes": {
      "assetId": "shoes_boots_winter",
      "colors": ["#8B4513", "#654321", "#fff"]
    },
    "accessories": [
      {
        "assetId": "hat_beanie",
        "colors": ["#E74C3C", "#C0392B", "#fff"]
      },
      {
        "assetId": "accessory_scarf",
        "colors": ["#E74C3C", "#C0392B", "#fff"]
      }
    ]
  }
}
```

### Example 5: Edgy Rock

```json
{
  "description": "Edgy rock style with leather jacket",
  "face": {
    "style": "avataaars",
    "sex": "male",
    "skinColor": "light",
    "hairColor": "black",
    "top": "shortHairShaggyMullet",
    "eyes": "default",
    "mouth": "serious",
    "facialHairType": "BeardLight"
  },
  "outfit": {
    "top": {
      "assetId": "jacket_leather",
      "colors": ["#1a1a1a", "#2a2a2a", "#7F8C8D"]
    },
    "bottom": {
      "assetId": "pants_jeans",
      "colors": ["#1a1a1a", "#2a2a2a", "#3a3a3a"]
    },
    "shoes": {
      "assetId": "shoes_boots_black",
      "colors": ["#1a1a1a", "#2c3e50", "#c0c0c0"]
    },
    "accessories": [
      {
        "assetId": "accessory_sunglasses_cool",
        "colors": ["#000", "#1a1a1a"]
      },
      {
        "assetId": "jewelry_chain_silver",
        "colors": ["#C0C0C0", "#A9A9A9"]
      }
    ]
  }
}
```

## LLM Instructions

When generating outfit specs:

1. **Choose a theme** - Start with a description/personality
2. **Match the face** - Select appropriate DiceBear options for the character
3. **Build the outfit** - Choose assets that match the theme
4. **Color coordination** - Use complementary colors (3-5 colors per item)
5. **Add accessories** - 1-3 accessories maximum for best results
6. **Test combinations** - Some items work better together than others

## Color Tips

- **Hoodies/Jackets**: 3 colors (main, accent, details)
- **Pants/Skirts**: 2-3 colors (main, shadow, highlight)
- **Shoes**: 2-3 colors
- **Accessories**: 1-2 colors
- **Use hex codes** like `#FF6B9D` or `#4169E1`

## Common Color Schemes

### Vibrant Pop
```json
["#FF6B9D", "#4169E1", "#FFD700"]
```

### Earthy Natural
```json
["#8B4513", "#A0522D", "#DAA520"]
```

### Cool Blue
```json
["#3498DB", "#2980B9", "#E8F4F8"]
```

### Warm Sunset
```json
["#E74C3C", "#F39C12", "#F9E79F"]
```

### Monochrome Dark
```json
["#1a1a1a", "#2C3E50", "#7F8C8D"]
```

### Pastel Dream
```json
["#FFB6C1", "#E6E6FA", "#F0E68C"]
```
