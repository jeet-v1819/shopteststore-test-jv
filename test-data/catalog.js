// Public seed data observed on the ShopTest rendered pages (2026-10-03).
// Keep these values together so public catalog checks do not duplicate page content.
const catalog = Object.freeze({
  electronicsSlug: 'electronics',
  headphones: Object.freeze({
    name: 'Wireless Noise-Cancelling Headphones',
    detailPath: '/products/f9abef99-a894-40e7-ba3c-c283200fb657',
    imageAlt: 'Wireless Noise-Cancelling Headphones',
    price: '$199.99',
    sku: 'ELEC-WH-001',
    description: 'Premium over-ear headphones with active noise cancellation and 30h battery.',
    stock: '50 in stock',
    reviewCount: 3
  }),
  cleanCode: Object.freeze({ name: 'Clean Code' })
});

module.exports = { catalog };
