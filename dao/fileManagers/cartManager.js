import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export class CartManager{
    constructor(){
        this.path = "carts.json"
        const fs = require('fs')
        const data = JSON.parse(fs.readFileSync(this.path))
        this.carts = data
    }

    getCarts(){
        const fs = require('fs')
        const data = JSON.parse(fs.readFileSync(this.path))
        return data
    }

    getCartById(id){
        const fs = require('fs')
        const data = JSON.parse(fs.readFileSync(this.path))
        return(data.find(c => c.id === id))
    }

    addCart(){
        const cart = {
            id: this.#generateID(), products: []
        }
        this.carts.push(cart)
        this.#updateFile()
    }

    addProductToCart(id, product){
        const cart = this.carts.find(c => c.id === id)
        const repeated = cart.products.find(p => p.id === product.id)
        if(repeated){
            repeated.quantity++             
        }
        else{
            cart.products.push(product)
        }
        this.#updateFile()
    }

    #updateFile(){ // actualiza el archivo de texto
        const fs = require('fs')
        fs.writeFileSync(this.path,JSON.stringify(this.carts))
    }

    #generateID(){
        return(
            this.carts.length === 0 ? 1 : this.carts[this.carts.length - 1].id + 1
        )
    }
    
}