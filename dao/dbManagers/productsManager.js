import { productsModel } from "../models/products.model.js"

export default class ProductsManager {
    async getProducts() {
        try {
            const products = await productsModel.find().lean()
            return products
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            const product = await productsModel.find({ _id: id }).lean()
            return product
        } catch (error) {
            console.log(error)
        }
    }

    async addProduct(product) {
        try {
            const newProduct = await productsModel.create(product)
            return newProduct
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, modifiedProduct){
        try {
            await productsModel.findByIdAndUpdate(id, modifiedProduct)
        } catch (error) {
            console.log(error)
        }        
    }

    async deleteProduct(id) {
        try {
            await productsModel.deleteOne({ _id: id })
        } catch (error) {
            console.log(error)
        }
    }
}
