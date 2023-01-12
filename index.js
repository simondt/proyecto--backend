import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export class ProductManager{
    constructor(){
        this.products = []
        this.path = "data.json"
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        return(this.products.find(p => p.id === id))
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const product = {
            id: this.#generateID(), title, description, price, thumbnail, code, stock
        }
        if (!this.#verifyProduct(product)) { 
            this.products.push(product)
            this.#updateFile()
          } else {
              console.log("Error: producto inválido o código repetido")
          }
    }

    deleteProduct(id){
        const del = this.getProductById(id)
        if(del === undefined) {
            console.log("No existe un producto con esa ID")
        }else{
            const index = this.products.indexOf(del)
            this.products.splice(index, 1)
            this.#updateFile()
        }
    }

    updateProduct(id, field){
        const product = this.getProductById(id)
        if(field === "all"){ // si se ingresa "all" se modifica todo el objeto
            product.title = "newTitle"
            product.description = "newDescription"
            product.price = "newPrice"
            product.thumbnail = "newThumbnail"
            product.code = "newCode"
            product.stock = "newStock"
        }
        else if(Object.hasOwn(product, field) && field != "id"){ // verifica si el campo que se intenta modificar existe en el objeto, y que este no sea id
            product[field] = "new"+field.charAt(0).toUpperCase()+field.slice(1) // (hace mayuscula la primer letra de la var field)
        }
        else{
            console.log("El campo ingresado no existe o no puede ser modificado")
        }
        this.#updateFile()
    }

    #updateFile(){ // actualiza el archivo de texto
        const fs = require('fs')
        fs.writeFileSync(this.path,JSON.stringify(this.products))
    }

    #verifyProduct(product){ // verifica que no se repita el codigo y que todos los campos sean validos
        const repeatedProduct = this.products.some(p => p.code === product.code)
        const incompleteProduct = Object.values(product).includes(undefined)
        return (repeatedProduct || incompleteProduct)  
    }

    #generateID(){
        return(
            this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1
        )
    }
    
}
