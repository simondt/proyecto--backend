class ProductManager{
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
            const fs = require('fs')
            fs.writeFileSync(this.path,JSON.stringify(this.products))
          } else [
              console.log("Ya existe un producto con ese codigo")
          ]
    }

    deleteProduct(id){
        const del = this.getProductById(id)
        if(del === undefined) {
            console.log("No existe un producto con esa ID")
        }else{
            const index = this.products.indexOf(del)
            this.products.splice(index, 1)
            const fs = require('fs')
            fs.writeFileSync(this.path,JSON.stringify(this.products))
        }
    }

    #verifyProduct(product){ // verifica que no se repita el codigo y que todos los campos sean validos
        return (this.products.some(p => p.code === product.code) || Object.values(product).includes(undefined))  
    }

    #generateID(){
        return(
            this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1
        )
    }
    
}