const { expect } = require('@playwright/test');

class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { level: 1 });
    this.addToCart = page.getByRole('button', { name: 'Add to cart', exact: true });
    this.wishlistLabel = page.getByText('Wishlist', { exact: true });
  }

  image(name) {
    return this.page.getByRole('img', { name, exact: true });
  }

  price(value) {
    return this.page.getByText(value, { exact: true });
  }

  sku(value) {
    return this.page.getByText(`SKU:${value}`, { exact: true });
  }

  stock(value) {
    return this.page.getByText(value, { exact: true });
  }

  description(value) {
    return this.page.getByText(value, { exact: true });
  }

  async expectProduct(product) {
    await expect(this.heading).toHaveText(product.name);
    await expect(this.image(product.imageAlt)).toBeVisible();
    await expect(this.price(product.price)).toBeVisible();
    await expect(this.sku(product.sku)).toBeVisible();
    await expect(this.description(product.description)).toBeVisible();
    await expect(this.stock(product.stock)).toBeVisible();
    await expect(this.addToCart).toBeVisible();
    await expect(this.wishlistLabel).toBeVisible();
    await expect(this.page.getByRole('heading', {
      name: `Reviews (${product.reviewCount})`,
      exact: true
    })).toBeVisible();
  }
}

module.exports = { ProductDetailsPage };
