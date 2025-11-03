const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const users = [
  {
    id: "1",
    nombre: "Juan",
    apellido: "Perez",
    edad: 25,
    genero: "M",
    deleted: false,
  },
  {
    id: "2",
    nombre: "Maria",
    apellido: "Lopez",
    edad: 30,
    genero: "F",
    deleted: false,
  },
  {
    id: "3",
    nombre: "Pedro",
    apellido: "Gomez",
    edad: 35,
    genero: "M",
    deleted: false,
  },
];


app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET all users

app.get("/api/users", (req, res) => {
    try {
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });        
    }
});

// POST create a new user

app.post("/api/users", (req, res) => {
    const { nombre, apellido, edad, genero } = req.body;

    if (!nombre || !apellido || !edad || !genero) {
        return res.status(400).json({ message: "Bad Request. Missing required fields." });
    }
    const newUser = {
        id: uuidv4(),
        nombre,
        apellido,
        edad,
        genero,
    };
    users.push(newUser);
    res.status(201).json({success: true, user: newUser});
});

// PUT update a user

app.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, edad, genero } = req.body;
    const userIndex = users.findIndex((u) => u.id === id);
    if (!id || !id === null) {
        return res.status(400).json({ message: "Bad Request. Missing user ID." });
    }
    if (userIndex !== -1) {
        users[userIndex] = {
            id: id,
            nombre,
            apellido,
            edad,
            genero,
        };
        return res.status(200).json({ success: true, user: users[userIndex] });
    } else {
        return res.status(404).json({ message: "User not found" });
    }
});

// DELETE (soft) user
app.delete("/api/users/soft/:id", (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex((u) => u.id === id);
    if (!id || !id === null) {
        return res.status(400).json({ message: "Bad Request. Missing user ID." });
    }
    if (userIndex !== -1) {
        users[userIndex].deleted = true;
        return res.status(200).json({ success: true, user: users[userIndex] });
    } else {
        return res.status(404).json({ message: "User not found" });
    }
});

// Delete (hard) user
app.delete("/api/users/hard/:id", (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex((u) => u.id === id);
    if (!id || !id === null) {
        return res.status(400).json({ message: "Bad Request. Missing user ID." });
    }
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return res.status(200).json({ success: true, message: "User deleted permanently." });
    } else {
        return res.status(404).json({ message: "User not found" });
    }
});

module.exports = app;