let express = require("express");
let Contenedor = require("./contenedor");
let contenedor = new Contenedor("file/productos.txt");
let app = express();
const PORT = 8080;

app.listen(PORT,()=>{
    console.log(`Mi servidor escuchando desde htpp://localhost:${PORT}`);
});

//Raiz
app.get("/",(req,res,next)=>{
    res.send(`
        <h2>Implementación de un servidor con Express</h2>
        <p>puede usar las siguientes rutas:</p>
        <ul>
            <li>/productos</li>
            <li>/productoRandom</li>
        </ul>`);
});

//Productos
app.get("/productos",async(req,res,next)=>{
    res.send(await contenedor.getAll());
});

//Producto al azar
app.get("/productoRandom",async(req,res,next)=>{
    let indice = Math.ceil(Math.random() * 3);
    res.send(await contenedor.getById(indice));
});
