class ProductManager{
    constructor(){
        this.products = []
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
