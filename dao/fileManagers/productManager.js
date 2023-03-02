import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export class ProductManager{
    constructor(){
        this.path = "products.json"
        const fs = require('fs')
        const data = JSON.parse(fs.readFileSync(this.path))
        this.products = data
    }

    getProducts(){
        const fs = require('fs')
        const data = JSON.parse(fs.readFileSync(this.path))
        return data
    }

    getProductById(id){
        const fs = require('fs')
        const data = JSON.parse(fs.readFileSync(this.path))
        return(data.find(p => p.id === id))
    }

    addProduct(title, description, price, thumbnails, code, stock, status = true, category){
        const product = {
            id: this.#generateID(), title, description, price, thumbnails, code, stock, status, category
        }
        if (!this.#verifyProduct(product)) { 
            this.products.push(product)
            this.#updateFile()
          } else {
              console.log("Error: producto inválido o código repetido")
          }
    }

    deleteProduct(id){
        const del = this.products.find(p => p.id === id)
        if(del === undefined) {
            console.log("No existe un producto con esa ID")
        }else{
            const index = this.products.indexOf(del)
            this.products.splice(index, 1)
            this.#updateFile()
        }
    }

    updateProduct(id, modifiedProduct){
        const product = this.products.find(p => p.id === id)
        if(product){
            Object.keys(modifiedProduct).forEach(field => { // itera cada una de las propiedades del objeto
                if(Object.hasOwn(product, field) && field != "id"){ // verifica si el campo que se intenta modificar existe en el objeto, y que este no sea id
                    product[field] = modifiedProduct[field]
                }
                else{
                    console.log("El campo ID no será modificado")
                }               
            });
            this.#updateFile()
        } else {console.log("No existe ningun producto con esa ID")}
    }

    #updateFile(){ // actualiza el archivo de texto
        const fs = require('fs')
        fs.writeFileSync(this.path,JSON.stringify(this.products))
    }

    #verifyProduct(product){ // verifica que no se repita el codigo y que todos los campos sean validos
        const repeatedProduct = this.products.some(p => p.code === product.code)
        const incompleteProduct = Object.values(product).includes(undefined)
        const invalidProduct = typeof product.title != "string" || typeof product.description != "string" || typeof product.price != "number" || typeof product.thumbnails != "object" || typeof product.code != "number" || typeof product.stock != "number" || typeof product.status != "boolean" || typeof product.category != "string"
        return (repeatedProduct || incompleteProduct || invalidProduct)  
    }

    #generateID(){
        return(
            this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1
        )
    }
    
}