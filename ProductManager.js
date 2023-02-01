"use strict";
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
exports.__esModule = true;
exports.ProductManager = exports.Product = void 0;
var DataHandling_1 = require("./DataHandling");
var Product = /** @class */ (function () {
    function Product(title, description, price, thumbnail, code, stock) {
        //Valido que ningún campo sea nulo
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Cuidado. Hay campos que están vacíos");
        }
        else {
            this.title = title;
            this.description = description;
            this.price = price;
            this.thumbnail = thumbnail;
            this.code = code;
            this.stock = stock;
        }
    }
    return Product;
}());
exports.Product = Product;
var ProductManager = /** @class */ (function () {
    function ProductManager(path) {
        //Propiedad productos. Array vacío
        //id : number = 0;
        //producto : Product;
        this.path = '';
        this.path = path;
        var productos = [];
        (0, DataHandling_1.insertData)(this.path, productos);
    }
    ProductManager.prototype.addProduct = function (newProduct) {
        var estaEnProductManager = false;
        var productos = (0, DataHandling_1.readAllData)(this.path);
        if (productos) {
            for (var _i = 0, productos_1 = productos; _i < productos_1.length; _i++) {
                var producto = productos_1[_i];
                if (newProduct.code === producto.producto.code) {
                    estaEnProductManager = true;
                }
            }
        }
        if (estaEnProductManager) {
            console.log('Error. Este producto ya se encuentra en el ProductManager. Código repetido.');
        }
        else {
            var id = productos.length + 1;
            var productoNuevo = { id: id, producto: newProduct };
            productos.push(productoNuevo);
            (0, DataHandling_1.insertData)(this.path, productos);
            console.log("Producto agregado satisfactoriamente");
            console.log("Su id es: %d", id);
        }
    };
    ProductManager.prototype.getProducts = function () {
        return (0, DataHandling_1.readAllData)(this.path);
    };
    ProductManager.prototype.getProductById = function (id) {
        var productoEncontrado;
        var productos = (0, DataHandling_1.readAllData)(this.path);
        for (var _i = 0, productos_2 = productos; _i < productos_2.length; _i++) {
            var producto = productos_2[_i];
            if (producto.id == id) {
                productoEncontrado = producto;
            }
        }
        if (productoEncontrado) {
            return productoEncontrado;
        }
        else {
            console.log('Error. No se encuentra tal ID');
            return null;
        }
    };
    ProductManager.prototype.updateProduct = function (id, campo, valor) {
        var productos = (0, DataHandling_1.readAllData)(this.path);
        var indice = -1;
        var existeCampo = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'].includes(campo);
        if (productos && existeCampo) {
            productos.map(function (producto, index) {
                if (producto.id == id) {
                    indice = index;
                    producto.producto[campo] = valor;
                }
            });
        }
        if (indice > -1 && existeCampo) {
            (0, DataHandling_1.insertData)(this.path, productos);
            console.log('Se actualizó el objeto de id: ' + id + ' y campo ' + campo);
        }
        else if (indice == -1 && existeCampo) {
            console.log('Error al intentar actualizar el objeto. No existe el id: ' + id);
        }
        else if (indice > -1 && !existeCampo) {
            console.log('Error al intentar actualizar el objeto. No existe el campo: ' + campo);
        }
        else {
            console.log('Error al intentar actualizar el objeto. No existe ni id: ' + id + ' ni campo ' + campo);
        }
    };
    ProductManager.prototype.deleteProduct = function (id) {
        var productos = (0, DataHandling_1.readAllData)(this.path);
        var indice = -1;
        if (productos) {
            productos.map(function (producto, index) {
                if (producto.id == id) {
                    indice = index;
                    productos.splice(index, 1);
                }
            });
        }
        if (indice > -1) {
            (0, DataHandling_1.insertData)(this.path, productos);
            console.log('Se eliminó el objeto de id: ' + id);
        }
        else {
            console.log('Error al intentar eliminar el objeto. No existe el id: ' + id);
        }
    };
    return ProductManager;
}());
exports.ProductManager = ProductManager;
