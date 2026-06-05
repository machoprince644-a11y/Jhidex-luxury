// Product Database
const products = [
    {
        id: 1,
        name: 'Premium Black Suit',
        category: 'suits',
        price: 450,
        description: 'Elegantly tailored premium black suit with superior fabric quality and impeccable finishing.',
        featured: true,
        new: true,
        emoji: '👔',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Navy', 'Gray']
    },
    {
        id: 2,
        name: 'Italian Leather Oxford',
        category: 'shoes',
        price: 280,
        description: 'Handcrafted Italian leather shoes with premium comfort and timeless design.',
        featured: true,
        new: false,
        emoji: '👞',
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        colors: ['Black', 'Brown', 'Cognac']
    },
    {
        id: 3,
        name: 'Silk Tie Collection',
        category: 'accessories',
        price: 85,
        description: 'Premium 100% silk ties in various colors and patterns for the discerning gentleman.',
        featured: true,
        new: true,
        emoji: '🎀',
        sizes: ['One Size'],
        colors: ['Navy', 'Burgundy', 'Silver', 'Gold']
    },
    {
        id: 4,
        name: 'Premium Casual Shirt',
        category: 'casual',
        price: 120,
        description: 'High-quality casual shirt perfect for everyday wear with superior comfort.',
        featured: true,
        new: false,
        emoji: '👕',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Navy', 'Light Blue', 'Beige']
    },
    {
        id: 5,
        name: 'Navy Blazer',
        category: 'suits',
        price: 320,
        description: 'Classic navy blazer with refined tailoring and premium wool fabric.',
        featured: false,
        new: true,
        emoji: '🧥',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Navy', 'Black', 'Charcoal']
    },
    {
        id: 6,
        name: 'Designer Loafers',
        category: 'shoes',
        price: 350,
        description: 'Sophisticated designer loafers with Italian craftsmanship and premium materials.',
        featured: false,
        new: true,
        emoji: '👞',
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        colors: ['Black', 'Brown', 'Tan']
    },
    {
        id: 7,
        name: 'Leather Belt',
        category: 'accessories',
        price: 95,
        description: 'Premium leather belt with elegant buckle and superior durability.',
        featured: false,
        new: false,
        emoji: '⌚',
        sizes: ['30', '32', '34', '36', '38', '40', '42'],
        colors: ['Black', 'Brown', 'Cognac']
    },
    {
        id: 8,
        name: 'Luxury Watch',
        category: 'accessories',
        price: 1200,
        description: 'Premium luxury watch with Swiss movement and sapphire crystal.',
        featured: true,
        new: true,
        emoji: '⌚',
        sizes: ['One Size'],
        colors: ['Silver', 'Gold', 'Rose Gold']
    },
    {
        id: 9,
        name: 'Wool Trousers',
        category: 'suits',
        price: 180,
        description: 'Premium wool trousers with perfect drape and superior comfort.',
        featured: false,
        new: false,
        emoji: '👖',
        sizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
        colors: ['Black', 'Navy', 'Gray', 'Charcoal']
    },
    {
        id: 10,
        name: 'Casual Polo',
        category: 'casual',
        price: 75,
        description: 'Premium casual polo shirt made from high-quality cotton blend.',
        featured: false,
        new: true,
        emoji: '👕',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White', 'Navy', 'Red', 'Green']
    },
    {
        id: 11,
        name: 'Three-Piece Suit',
        category: 'suits',
        price: 650,
        description: 'Complete three-piece suit with vest for the most formal occasions.',
        featured: true,
        new: false,
        emoji: '👔',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Navy', 'Charcoal']
    },
    {
        id: 12,
        name: 'Designer Sunglasses',
        category: 'accessories',
        price: 320,
        description: 'Premium designer sunglasses with UV protection and stylish design.',
        featured: false,
        new: true,
        emoji: '😎',
        sizes: ['One Size'],
        colors: ['Black', 'Brown', 'Gold']
    }
];

// Filter products by category
function getProductsByCategory(category) {
    return products.filter(p => p.category === category);
}