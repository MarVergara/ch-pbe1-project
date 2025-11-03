const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

class ProductManager {
  constructor() {
    this.path = path.join(__dirname, "products.json");
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

  async getAll() {
    return await this.#readFile();
  }

  async getById(id) {
    const products = await this.#readFile();
    return products.find((p) => p.id === id);
  }

  async create(productData) {
    const products = await this.#readFile();
    const newProduct = { id: uuidv4(), ...productData };
    products.push(newProduct);
    await this.#writeFile(products);
    return newProduct;
  }

  async update(id, updates) {
    const products = await this.#readFile();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updates, id };
    await this.#writeFile(products);
    return products[index];
  }

  async delete(id) {
    const products = await this.#readFile();
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) return false;

    await this.#writeFile(filtered);
    return true;
  }
}

module.exports = ProductManager;
