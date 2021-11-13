const fs = require("fs");

class Contenedor{
    constructor(url){
        this.url = url;
        this.arregloProductos = [];
    }
    //Cargar elementos al arreglo de Productos
    async loadArray(){
        //Obtenemos la información del archivo
        if(fs.existsSync(`${this.url}`)){
            const contenido = await fs.promises.readFile(`${this.url}`,'utf-8');
            //Lo almacenamos en el arreglo de Productos
            this.arregloProductos=(JSON.parse(contenido));
        }
    }
    //Crear/Agregar contenido al archivo
    async save(data){
        try {
            //Cargamos la información del arreglo
            await this.loadArray();
            //Obtenemos la logitud del arreglo
            const longitudArreglo = this.arregloProductos.length;
            //Si hay elementos en el arreglo obtenemos el último id y le aumentamos 1, de lo contrario el id a considerar será 1
            this.arregloProductos.length?data.id = (this.arregloProductos[longitudArreglo-1].id)+1:data.id = 1;
            //Agregamos el objeto al arreglo
            this.arregloProductos = [...this.arregloProductos,data]
            //Guardamos el arreglo actualizado en el archivo
            await fs.promises.writeFile(`${this.url}`,JSON.stringify(this.arregloProductos,"",2));
            //Devolvemos el ID creado
            return data.id;
        } catch (error) {
            console.log(error);
        }
    }
    //Obtener por ID y retornar el objeto con el ID
    async getById(id){
        try {
            //Cargamos la información del arreglo
            await this.loadArray();
            //Obtenemos el objeto según el ID
            const productoSeleccionado = this.arregloProductos.filter((producto)=>{
                return producto.id === id;
            });
            //Devolvemos la respuesta
            return productoSeleccionado;
        } catch (error) {
            console.log(error);
        }
    }
    //Leer el archivo y devolver todos los objetos
    async getAll(){
        try {
            //Cargamos la información del arreglo
            await this.loadArray();
            //Devolvemos el arreglo de productos
            return this.arregloProductos;
        } catch (error) {
            console.log(error);
        }
    }
    //Eliminar un objeto del archivo según ID
    async deleteById(id){
        try {
            //Cargamos la información del arreglo
            await this.loadArray();
            //Obtenemos un nuevo arreglo sin el objeto según el ID enviado
            this.arregloProductos = this.arregloProductos.filter((producto)=>{
                return producto.id !== id;
            });
            //Guardamos el arreglo actualizado en el archivo
            await fs.promises.writeFile(`${this.url}`,JSON.stringify(this.arregloProductos,"",2));
        } catch (error) {
            console.log(error);
        }
    }
    //Eliminar todos los objetos del archivo
    async deleteAll(){
        try {
            //Guardamos el arreglo vacío en el archivo
            await fs.promises.unlink(`${this.url}`);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Contenedor;
