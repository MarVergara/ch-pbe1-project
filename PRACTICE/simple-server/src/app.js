const express = require("express");
const app = express();
const PORT = 3000;

const db_bicis = [
  { id: 1, marca: "Trek", color: "Rojo" },
  { id: 2, marca: "Giant", color: "Azul" },
  { id: 3, marca: "Specialized", color: "Negro" },
];

const db_triciclos = [
  { id: 1, marca: "Bicicleta de Tres Ruedas", color: "Rojo" },
  { id: 2, marca: "Triciclo Infantil", color: "Azul" },
  { id: 3, marca: "Triciclo de Carga", color: "Negro" },
];


app.get("/", (req, res) => {
  //   res.send("Hello World!!!!");
  try {
    const styles = `
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
        }
        a {
            display: inline-block;
            margin: 20px;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        a:hover {
            background-color: #45a049;
        }
        `;
    const html = `
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${styles}</style>
            <title>Mi primer server</title>
        </head>
        <body>
            <h1>Bienvenido a la API de Bicicletas y Triciclos</h1>
            <a href="/api/bicicletas">Ver Bicicletas</a>
            <a href="/api/triciclos">Ver Triciclos</a>
        </body>
        </html>
        `;
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send("Error al cargar la página de inicio");
  }
});

//// ROUTES

/// BICYCLES

// All bicycles

app.get("/api/bicicletas", (req, res) => {
    try {
        res.status(200).json(db_bicis);
        
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las bicicletas" });
        
    }
});

// bicycles by id with params

app.get("/api/bicicletas/:id", (req, res) => {
    const {id} = req.params;
    const bicicleta = db_bicis.find((b) => b.id === parseInt(id));
    
    if (bicicleta) {
        return res.status(200).json(bicicleta);
    } else {
        return  res.status(404).json({ message: "Bicicleta no encontrada" });
    }
});
    

/// TRICYCLES

// All tricycles

app.get("/api/triciclos", (req, res) => {
    try {
        res.status(200).json(db_triciclos);
        
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los triciclos" });
        
    }
});


app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
