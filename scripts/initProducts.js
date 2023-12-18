const db = require("../models");
const Product = db.product;

function initProducts() {
  var products = [
    // Electronics
    {
      categoryId: 1,
      name: "iPhone 12 Max Pro",
      description: "High-quality smartphone with advanced features.",
      cost: 60000,
    },
    {
      categoryId: 1,
      name: "Smartwatch Series 5",
      description:
        "Stay connected with this sleek and feature-packed smartwatch.",
      cost: 12000,
    },
    {
      categoryId: 1,
      name: "Wireless Noise-Canceling Headphones",
      description: "Immerse yourself in music with these premium headphones.",
      cost: 8000,
    },
    {
      categoryId: 1,
      name: "4K UHD Smart TV",
      description:
        "Experience stunning visuals with this state-of-the-art smart TV.",
      cost: 45000,
    },
    {
      categoryId: 1,
      name: "Gaming Laptop",
      description:
        "Powerful laptop for gaming enthusiasts with high-end specifications.",
      cost: 70000,
    },

    // Kitchenware
    {
      categoryId: 2,
      name: "Non-Stick Bakeware Set",
      description: "Bake with ease using this durable non-stick bakeware set.",
      cost: 3000,
    },
    {
      categoryId: 2,
      name: "Blender with Multiple Attachments",
      description: "Versatile blender for smoothies, soups, and more.",
      cost: 4000,
    },
    {
      categoryId: 2,
      name: "Chef's Knife Set",
      description: "High-quality knives for precision cutting in the kitchen.",
      cost: 2500,
    },
    {
      categoryId: 2,
      name: "Stainless Steel Utensil Set",
      description:
        "Complete your kitchen with this stylish and durable utensil set.",
      cost: 2000,
    },
    {
      categoryId: 2,
      name: "Coffee Maker with Grinder",
      description:
        "Start your day right with freshly ground coffee using this coffee maker.",
      cost: 5000,
    },

    // Skincare
    {
      categoryId: 3,
      name: "Anti-Aging Serum",
      description: "Revitalize your skin with this effective anti-aging serum.",
      cost: 2000,
    },
    {
      categoryId: 3,
      name: "Hydrating Facial Mask",
      description:
        "Pamper your skin with this hydrating facial mask for a spa-like experience.",
      cost: 800,
    },
    {
      categoryId: 3,
      name: "Gentle Cleansing Oil",
      description:
        "Remove impurities with this gentle cleansing oil for a fresh face.",
      cost: 1200,
    },
    {
      categoryId: 3,
      name: "Organic Body Lotion",
      description:
        "Nourish your body with this organic and moisturizing body lotion.",
      cost: 1500,
    },
    {
      categoryId: 3,
      name: "Soothing Aloe Vera Gel",
      description:
        "Calm and refresh your skin with this soothing aloe vera gel.",
      cost: 1000,
    },
    // Sports & Outdoors
    {
      categoryId: 4,
      name: "Durable Camping Tent",
      description:
        "Stay comfortable during your outdoor adventures with this spacious camping tent.",
      cost: 3000,
    },
    {
      categoryId: 4,
      name: "Adjustable Dumbbell Set",
      description:
        "Build strength with this versatile and space-saving adjustable dumbbell set.",
      cost: 4000,
    },
    {
      categoryId: 4,
      name: "Trail Running Shoes",
      description:
        "Conquer any terrain with these durable and supportive trail running shoes.",
      cost: 2500,
    },
    {
      categoryId: 4,
      name: "Compact Folding Bike",
      description:
        "Stay active and commute easily with this compact folding bike.",
      cost: 6000,
    },
    {
      categoryId: 4,
      name: "Portable Water Bottle Filter",
      description:
        "Ensure clean and safe drinking water on your outdoor journeys with this filter bottle.",
      cost: 1000,
    },

    // Clothing & Apparel
    {
      categoryId: 5,
      name: "Leather Jacket",
      description:
        "Add a touch of style to your wardrobe with this classic leather jacket.",
      cost: 7000,
    },
    {
      categoryId: 5,
      name: "Casual Sneakers",
      description:
        "Step out in comfort and style with these trendy casual sneakers.",
      cost: 2500,
    },
    {
      categoryId: 5,
      name: "Formal Men's Suit",
      description:
        "Look sharp and sophisticated with this well-tailored formal suit for men.",
      cost: 12000,
    },
    {
      categoryId: 5,
      name: "Summer Sundress",
      description:
        "Stay cool and chic in this breezy summer sundress for women.",
      cost: 3500,
    },
    {
      categoryId: 5,
      name: "Knit Sweater",
      description:
        "Keep warm in style with this cozy and fashionable knit sweater.",
      cost: 1800,
    },

    // Home Decor
    {
      categoryId: 6,
      name: "Artificial Potted Plant",
      description:
        "Bring nature indoors with this lifelike artificial potted plant.",
      cost: 1200,
    },
    {
      categoryId: 6,
      name: "Decorative Throw Pillows",
      description:
        "Elevate your living space with these stylish and comfortable throw pillows.",
      cost: 2500,
    },
    {
      categoryId: 6,
      name: "Modern Wall Clock",
      description:
        "Add a contemporary touch to your home with this sleek and modern wall clock.",
      cost: 1800,
    },
    {
      categoryId: 6,
      name: "Soft Area Rug",
      description:
        "Create a cozy atmosphere with this soft and luxurious area rug.",
      cost: 3000,
    },
    {
      categoryId: 6,
      name: "Decorative Candle Holders",
      description:
        "Enhance the ambiance with these elegant decorative candle holders.",
      cost: 1500,
    },
    // Books & Literature
    {
      categoryId: 7,
      name: "Sci-Fi Novel",
      description:
        "Embark on a thrilling journey with this gripping science fiction novel.",
      cost: 1200,
    },
    {
      categoryId: 7,
      name: "Mystery Detective Series",
      description:
        "Solve mysteries and immerse yourself in this captivating detective series.",
      cost: 1800,
    },
    {
      categoryId: 7,
      name: "Historical Fiction Book",
      description:
        "Transport yourself to different eras with this engaging historical fiction novel.",
      cost: 1500,
    },
    {
      categoryId: 7,
      name: "Self-Help Guide",
      description:
        "Transform your life with actionable insights from this empowering self-help guide.",
      cost: 1000,
    },
    {
      categoryId: 7,
      name: "Poetry Collection",
      description:
        "Experience the beauty of language with this inspiring collection of poems.",
      cost: 800,
    },

    // Health & Wellness
    {
      categoryId: 8,
      name: "Fitness Tracker",
      description:
        "Monitor your health and fitness goals with this feature-packed fitness tracker.",
      cost: 3000,
    },
    {
      categoryId: 8,
      name: "Herbal Tea Assortment",
      description:
        "Nourish your body and soul with this delightful assortment of herbal teas.",
      cost: 1200,
    },
    {
      categoryId: 8,
      name: "Meditation Pillow",
      description:
        "Enhance your meditation practice with this comfortable and supportive meditation pillow.",
      cost: 2500,
    },
    {
      categoryId: 8,
      name: "Essential Oil Diffuser",
      description:
        "Create a calming atmosphere at home with this aromatic essential oil diffuser.",
      cost: 2000,
    },
    {
      categoryId: 8,
      name: "Wellness Journal",
      description:
        "Promote self-reflection and mindfulness with this beautifully designed wellness journal.",
      cost: 1500,
    },

    // Toys & Games
    {
      categoryId: 9,
      name: "Building Blocks Set",
      description:
        "Foster creativity and imagination with this versatile building blocks set for kids.",
      cost: 1000,
    },
    {
      categoryId: 9,
      name: "Puzzle Game for Adults",
      description:
        "Challenge your mind with this intricate and entertaining puzzle game for adults.",
      cost: 1500,
    },
    {
      categoryId: 9,
      name: "Board Game for Family Fun",
      description:
        "Enjoy quality time with your family with this engaging and entertaining board game.",
      cost: 2000,
    },
    {
      categoryId: 9,
      name: "Educational Robot Toy",
      description:
        "Combine learning and play with this interactive and educational robot toy for children.",
      cost: 2500,
    },
    {
      categoryId: 9,
      name: "Outdoor Sports Set for Kids",
      description:
        "Encourage outdoor play with this comprehensive sports set designed for kids.",
      cost: 1800,
    },

    // Jewelry & Accessories
    {
      categoryId: 10,
      name: "Diamond Stud Earrings",
      description:
        "Add a touch of elegance to your look with these timeless diamond stud earrings.",
      cost: 10000,
    },
    {
      categoryId: 10,
      name: "Leather Watch",
      description:
        "Complete your ensemble with this stylish and versatile leather-strap watch.",
      cost: 3000,
    },
    {
      categoryId: 10,
      name: "Fashionable Sunglasses",
      description:
        "Stay trendy and protect your eyes with these fashionable and UV-protective sunglasses.",
      cost: 1500,
    },
    {
      categoryId: 10,
      name: "Silver Bracelet",
      description:
        "Accentuate your wrist with this chic and versatile silver bracelet.",
      cost: 2000,
    },
    {
      categoryId: 10,
      name: "Gemstone Pendant Necklace",
      description:
        "Make a statement with this eye-catching gemstone pendant necklace.",
      cost: 12000,
    },
  ];

  Product.bulkCreate(products)
    .then(() => {
      console.log("Product table initialized");
    })
    .catch(() => {
      console.log("Error while initializing Product table");
    });
}

module.exports = initProducts;
