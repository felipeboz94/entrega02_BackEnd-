

/*
ProductManager es de la forma: 
{
    path: '',
    productos :  [
        producto1,
        producto2,
        ...,
        productoN
    ]
}
Los métodos:
1. addProduct   --> Agrega un producto al arreglo inicial. Valida
que no se repita la propiedad 'code' y que todos los campos sean obligatorios.
Además crea un id autoincrementable;
2. getProducts  --> Devuelve el arreglo con todos los productos creados hasta el momento;
3. getProductById > Busca en el arreglo el producto que coincida con el id. Si no coincide,
muestra en la consola un error de 'Not found'.

Luego los productos son de la forma:
{
    title : '',
    description : '',
    price : 1000,
    thumbnail : '',
    code : 01,
    stock : 1
}
*/
import {Product, ProductManager} from './ProductManager'

export function insertData(path: string, data : Array<{id:number, producto: Product}>): void{
    const fs = require('fs');
    fs.writeFileSync(path,JSON.stringify(data));
} 

export function readAllData(path:string):Array<{id:number, producto: Product}>{
    const fs = require('fs');
    try{
        const readedData = JSON.parse(fs.readFileSync(path,'utf-8'));
        return readedData;
    }
    catch (err){
        console.log(err)
        console.log('CUIDADO: Error al acceder al archivo con datos')
    }

}

