import {Product, ProductManager } from "./ProductManager.js"

//-------------------TESTING-------------------

//PASO 1: Se crea instancia de objeto ProductManager
let productManager = new ProductManager('./ProductManager01.json');

//PASO 2: Se llama a getProducts() de la instancia creada, y debe devolver 
//un arreglo vacío
console.log("-------------------PASO 2-------------------");
console.log(productManager.getProducts());

//PASO 3: Se crea instancia de nuevo producto y se lo agrega con addProduct()
console.log("-------------------PASO 3-------------------");
let producto = new Product('zapatilla','deportivas',1500,'Mis Documentos','xsNike',2); 
productManager.addProduct(producto);    //addProduct() ya consolea
console.log(productManager.getProducts());

//PASO 4: Se intentaagregar nuevamente el producto anterior. Debe arrojar de repetición
//por código
console.log("-------------------PASO 4-------------------");
productManager.addProduct(producto);    //addProduct() ya consolea
console.log(productManager.getProducts());

//PASO 4-intermedio: Se crea instancia de nuevo producto y se lo agrega con addProduct()
console.log("-------------------PASO 4-intermedio-------------------");
let producto2 = new Product('zapatilla2','deportivas',1500,'Mis Documentos','xsAdidas',2) 
productManager.addProduct(producto2);    //addProduct() ya consolea
console.log(productManager.getProducts());

//PASO 5: Se usa la función getProductByID con un ID correcto:
console.log("-------------------PASO 5-------------------");
console.log(productManager.getProductById(1));

//PASO 6: Se usa la función getProductByID con un ID incorrecto:
console.log("-------------------PASO 6-------------------");
console.log(productManager.getProductById(15));


//PASO 7: Se usa la función deleteProduct con un ID para eliminar el producto:
console.log("-------------------PASO 7-------------------");
productManager.deleteProduct(3);

//PASO 8: Se usa la función updateProduct con un ID para actualizar el campo del producto con el valor que diga el usuario:
console.log("-------------------PASO 8-------------------");
productManager.updateProduct(2,'description','urbanas')
console.log(productManager.getProducts());
