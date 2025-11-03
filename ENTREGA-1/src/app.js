const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

const ProductManager = require("./data/ProductManager");
const CartManager = require("./data/CartManager");

const productManager = new ProductManager();
const cartManager = new CartManager();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const products = [
  {
    id: "b4b95cf9-4763-4d71-9e43-6d2c5cc1b0b1",
    name: "Laptop",
    description: "A high-performance laptop",
    price: 1200,
    stock: 10,
    deleted: false,
  },
  {
    id: "7a3266f8-42ce-4a21-8f86-4a6cb7c7a3a3",
    name: "Smartphone",
    description: "A latest model smartphone",
    price: 800,
    stock: 25,
    deleted: false,
  },
  {
    id: "c51df4cb-fb07-4a49-9463-6a7ff730e6e5",
    name: "Headphones",
    description: "Noise-cancelling headphones",
    price: 200,
    stock: 50,
    deleted: false,
  },
];

const carts = [];

app.get("/", (req, res) => {
  res.send("Hello ENTREGA-1!");
});

// GET all products

app.get("/api/products/", (req, res) => {
    try {
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });        
    }
});

///// PRODUCTS ROUTES //////

// GET product by ID

app.get("/api/products/:pid", (req, res) => {
    const { pid } = req.params;
    try {
        const product = products.find(p => p.id === pid);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });        
    }
});

// POST create a new product

app.post("/api/products/", (req, res) => {
    const { name, description, price, stock } = req.body;
    
    if (!name || !description || !price || !stock) {
        return res.status(400).json({ message: "Bad Request. Missing required fields." });
    }   
    const newProduct = {
        id: uuidv4(),
        name,
        description,
        price,
        stock,
    };
    products.push(newProduct);
    res.status(201).json({success: true, product: newProduct});
});

// PUT update a product

app.put("/api/products/:pid", (req, res) => {
    const { pid } = req.params;
    const { name, description, price, stock } = req.body;
    const productIndex = products.findIndex((p) => p.id === pid);
    if (!pid || !pid === null) {
        return res.status(400).json({ message: "Bad Request. Missing product ID." });
    }
    if (productIndex !== -1) {
        products[productIndex] = {
            id: pid,
            name,
            description,
            price,
            stock,
        };
        return res.status(200).json({ success: true, product: products[productIndex] });
    } else {
        return res.status(404).json({ message: "Product not found" });
    }
});

// DELETE product by id
app.delete("/api/products/:pid", (req, res) => {
    const { pid } = req.params;
    const productIndex = products.findIndex((p) => p.id === pid);
    if (!pid || !pid === null) {
        return res.status(400).json({ message: "Bad Request. Missing product ID." });
    }
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        return res.status(200).json({ success: true, message: "Product deleted successfully." });
    } else {
        return res.status(404).json({ message: "Product not found" });
    }
});

///// CART ROUTES //////

// POST create a new cart

app.post("/api/carts/", (req, res) => {
    const newCart = {
        id: uuidv4(),
        products: [],
    };
    carts.push(newCart);
    res.status(201).json({success: true, cart: newCart});
});

// GET cart by ID

app.get("/api/carts/:cid", (req, res) => {
    const { cid } = req.params;
    try {
        const cart = carts.find(c => c.id === cid);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });        
    }
});

// POST add product to cart

app.post("/api/carts/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  const cart = carts.find((c) => c.id === cid);
  const product = products.find((p) => p.id === pid);

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const existingProduct = cart.products.find((p) => p.id === pid);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.products.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  }

  res.status(200).json({ success: true, cart });
});



module.exports = app;