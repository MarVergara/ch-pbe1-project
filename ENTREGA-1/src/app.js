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

// const products = [
//   {
//     id: "b4b95cf9-4763-4d71-9e43-6d2c5cc1b0b1",
//     name: "Laptop",
//     description: "A high-performance laptop",
//     price: 1200,
//     stock: 10,
//     deleted: false,
//   },
//   {
//     id: "7a3266f8-42ce-4a21-8f86-4a6cb7c7a3a3",
//     name: "Smartphone",
//     description: "A latest model smartphone",
//     price: 800,
//     stock: 25,
//     deleted: false,
//   },
//   {
//     id: "c51df4cb-fb07-4a49-9463-6a7ff730e6e5",
//     name: "Headphones",
//     description: "Noise-cancelling headphones",
//     price: 200,
//     stock: 50,
//     deleted: false,
//   },
// ];

// const carts = [];

app.get("/", (req, res) => {
  res.send("Hello ENTREGA-1!");
});

//// ----- PRODUCTS -----  ////

// GET all products

// app.get("/api/products/", (req, res) => {
//     try {
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });        
//     }
// });


app.get("/api/products", async (req, res) => {
  try {
    const products = await productManager.getAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// GET product by ID

// app.get("/api/products/:pid", (req, res) => {
//     const { pid } = req.params;
//     try {
//         const product = products.find(p => p.id === pid);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });        
//     }
// });

app.get("/api/products/:pid", async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST create a new product

// app.post("/api/products/", (req, res) => {
//     const { name, description, price, stock } = req.body;
    
//     if (!name || !description || !price || !stock) {
//         return res.status(400).json({ message: "Bad Request. Missing required fields." });
//     }   
//     const newProduct = {
//         id: uuidv4(),
//         name,
//         description,
//         price,
//         stock,
//     };
//     products.push(newProduct);
//     res.status(201).json({success: true, product: newProduct});
// });



app.post("/api/products", async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    if (!name || !description || price == null || stock == null) {
      return res.status(400).json({ message: "Bad Request. Missing required fields." });
    }
    const newProduct = await productManager.create({ name, description, price, stock });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT update a product

// app.put("/api/products/:pid", (req, res) => {
//     const { pid } = req.params;
//     const { name, description, price, stock } = req.body;
//     const productIndex = products.findIndex((p) => p.id === pid);
//     if (!pid || !pid === null) {
//         return res.status(400).json({ message: "Bad Request. Missing product ID." });
//     }
//     if (productIndex !== -1) {
//         products[productIndex] = {
//             id: pid,
//             name,
//             description,
//             price,
//             stock,
//         };
//         return res.status(200).json({ success: true, product: products[productIndex] });
//     } else {
//         return res.status(404).json({ message: "Product not found" });
//     }
// });


app.put("/api/products/:pid", async (req, res) => {
  try {
    const updated = await productManager.update(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updated); 
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// DELETE product by id
// app.delete("/api/products/:pid", (req, res) => {
//     const { pid } = req.params;
//     const productIndex = products.findIndex((p) => p.id === pid);
//     if (!pid || !pid === null) {
//         return res.status(400).json({ message: "Bad Request. Missing product ID." });
//     }
//     if (productIndex !== -1) {
//         products.splice(productIndex, 1);
//         return res.status(200).json({ success: true, message: "Product deleted successfully." });
//     } else {
//         return res.status(404).json({ message: "Product not found" });
//     }
// });

app.delete("/api/products/:pid", async (req, res) => {
  try {
    const deleted = await productManager.delete(req.params.pid);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted" }); 
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/// ----- CARTS  -----  ////

// POST create a new cart

// app.post("/api/carts/", (req, res) => {
//     const newCart = {
//         id: uuidv4(),
//         products: [],
//     };
//     carts.push(newCart);
//     res.status(201).json({success: true, cart: newCart});
// });


app.post("/api/carts", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// GET cart by ID

// app.get("/api/carts/:cid", (req, res) => {
//     const { cid } = req.params;
//     try {
//         const cart = carts.find(c => c.id === cid);
//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });        
//     }
// });

app.get("/api/carts/:cid", async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart); 
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// POST add product to cart

// app.post("/api/carts/:cid/product/:pid", (req, res) => {
//   const { cid, pid } = req.params;
//   const cart = carts.find((c) => c.id === cid);
//   const product = products.find((p) => p.id === pid);

//   if (!cart) {
//     return res.status(404).json({ message: "Cart not found" });
//   }

//   if (!product) {
//     return res.status(404).json({ message: "Product not found" });
//   }

//   const existingProduct = cart.products.find((p) => p.id === pid);

//   if (existingProduct) {
//     existingProduct.quantity += 1;
//   } else {
//     cart.products.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
//   }

//   res.status(200).json({ success: true, cart });
// });


app.post("/api/carts/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const product = await productManager.getById(pid);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const productToAdd = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      quantity: 1,
    };

    const updated = await cartManager.addProduct(cid, productToAdd);
    if (!updated) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(updated);
  } catch (err) {
    console.error(err); //debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = app;