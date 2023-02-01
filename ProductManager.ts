/*
Clase ProductManager: Contenedora de productos. 

Los productos tendrán las propiedades:

1. title        --> Nombre del producto;
2. description  --> Descripción del producto;
3. price        --> Precio;
4. thumbnail    --> Ruta de imagen;
5. code         --> Código identificador;
6. stock        --> Número de piezas disponibles.

Además tendrá los métodos:

1. addProduct   --> Agrega un producto al arreglo inicial. Valida
que no se repita la propiedad 'code' y que todos los campos sean obligatorios. 
Además crea un id autoincrementable;
2. getProducts  --> Devuelve el arreglo con todos los productos creados hasta el momento;
3. getProductById > Busca en el arreglo el producto que coincida con el id. Si no coincide,
muestra en la consola un error de 'Not found'.
*/

import {insertData,readAllData} from './DataHandling'

export class Product {
    title : string;
    description : string;
    price : number;
    thumbnail : string;
    code : string;
    stock : number;

    constructor(title : string, description : string, price : number, thumbnail : string, code : string,stock : number){

        //Valido que ningún campo sea nulo
        if (!title || !description || !price || !thumbnail || !code || !stock ){            
            console.log("Cuidado. Hay campos que están vacíos");
        }
        else{
            this.title = title;
            this.description = description;
            this.price = price;
            this.thumbnail = thumbnail;
            this.code = code;
            this.stock = stock;
        }

    }
}

export class ProductManager {
    //Propiedad productos. Array vacío
    //id : number = 0;
    //producto : Product;
    path : string = '';
    constructor(path :string){
        this.path = path;
        let productos : any = [];
        insertData(this.path, productos);
    }
    addProduct(newProduct : Product) {
        
        let estaEnProductManager : boolean = false;
        let productos : Array<{id:number, producto: Product}>= readAllData(this.path);
        if (productos){
            for (let producto of productos){
                if (newProduct.code === producto.producto.code){
                    estaEnProductManager = true;
                }
            }
        }
        if (estaEnProductManager){
            console.log('Error. Este producto ya se encuentra en el ProductManager. Código repetido.');
        }
        else{
            let id = productos.length + 1 ;
            let productoNuevo : {id:number, producto: Product} = {id:id,producto: newProduct};
            productos.push(productoNuevo);
            insertData(this.path, productos);
            console.log("Producto agregado satisfactoriamente");
            console.log("Su id es: %d",id);
        }

    }

    getProducts() {
        return readAllData(this.path);
    }

    getProductById(id:number){
        let productoEncontrado : {id:number, producto: Product};     
        let productos : Array<{id:number, producto: Product}>= readAllData(this.path);   
        for (let producto of productos){
            if(producto.id == id){
                productoEncontrado = producto;
            }
        }
        if (productoEncontrado ){
            return productoEncontrado;
        }
        else{
            console.log('Error. No se encuentra tal ID')
            return null;
        }
    }

    updateProduct(id:number,campo:string,valor:any){
        let productos : Array<{id:number, producto: Product}>= readAllData(this.path);
        let indice : number = -1;
        let existeCampo : boolean = ['title','description','price','thumbnail','code','stock'].includes(campo);        
        if (productos && existeCampo){
            productos.map((producto,index) =>{
                if (producto.id == id){
                    indice = index;
                    producto.producto[campo] = valor;
                }
            }
        )
        }
        if (indice > -1 && existeCampo){
            insertData(this.path,productos);
            console.log('Se actualizó el objeto de id: ' + id + ' y campo '+campo );
        }
        else if (indice == -1 && existeCampo){
            console.log('Error al intentar actualizar el objeto. No existe el id: ' + id);
        }
        else if (indice > -1 && ! existeCampo){
            console.log('Error al intentar actualizar el objeto. No existe el campo: ' + campo);
        }
        else{
            console.log('Error al intentar actualizar el objeto. No existe ni id: ' + id + ' ni campo '+campo);
        }
    }

    

    deleteProduct(id:number){
        let productos : Array<{id:number, producto: Product}>= readAllData(this.path);
        let indice :number = -1;
        if (productos){
            productos.map((producto,index) =>{
                if (producto.id == id){
                    indice = index;
                    productos.splice(index,1);
                }
            }
        )
        }
        if (indice > -1){
            insertData(this.path,productos);
            console.log('Se eliminó el objeto de id: ' + id);
        }
        else{
            console.log('Error al intentar eliminar el objeto. No existe el id: ' + id);
        }
    }
}

