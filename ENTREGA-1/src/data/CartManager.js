const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

class CartManager {
  constructor() {
    this.path = path.join(__dirname, "carts.json");
  }

  async #readFile() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data || "[]");
    } catch (error) {
      if (error.code === "ENOENT") return [];
      throw error;
    }
  }

  async #writeFile(data) {
    try {
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error writing the file:", error);
    }
  }

  async createCart() {
    const carts = await this.#readFile();
    const newCart = { id: uuidv4(), products: [] };
    carts.push(newCart);
    await this.#writeFile(carts);
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.#readFile();
    return carts.find((c) => c.id === id);
  }

  // async addProduct(cartId, productId) {
  //   const carts = await this.#readFile();
  //   const cartIndex = carts.findIndex((c) => c.id === cartId);
  //   if (cartIndex === -1) return null;

  //   const cart = carts[cartIndex];
  //   const product = cart.products.find((p) => p.id === productId);

  //   if (product) {
  //     product.quantity += 1;
  //   } else {
  //     cart.products.push({ id: productId, quantity: 1 });
  //   }

  //   carts[cartIndex] = cart;
  //   await this.#writeFile(carts);
  //   return cart;
  // }


  async addProduct(cartId, product) {
    const carts = await this.#readFile();
    const cartIndex = carts.findIndex((c) => c.id === cartId);
    if (cartIndex === -1) return null;

    const cart = carts[cartIndex];
    const existingProduct = cart.products.find((p) => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ ...product, quantity: 1 });
    }

    carts[cartIndex] = cart;
    await this.#writeFile(carts);
    return cart;
  }
}

module.exports = CartManager;
