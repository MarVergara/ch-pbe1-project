const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
