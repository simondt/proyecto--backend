import { cartsModel } from '../models/carts.model.js'
import ProductsManager from './productsManager.js'

export default class CartsManager{

    async getCarts() {
        try {
            const carts = await cartsModel.find().lean()
            return carts
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(id) {
        try {
            const cart = await cartsModel.find({ _id: id }).lean()
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async addCart(cart) {
        try {
            const newCart = await cartsModel.create(cart)
            return newCart
        } catch (error) {
            console.log(error)
        }
    }

    async updateCart(id, modifiedCart){
        try {
            await cartsModel.findByIdAndUpdate(id, modifiedCart)
        } catch (error) {
            console.log(error)
        }        
    }

    async deleteCart(id) {
        try {
            await cartsModel.deleteOne({ _id: id })
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(id, productId){
        try {
            const cart = await cartsModel.findById(id)
            /*
            const product = cart.products.find(pid => pid === productId)
            if(product){
                product
            }*/
            cart.products.push(productId)
            cart.save()
            return cart
        } catch (error) {
            console.log(error)
        }

    }

    async deleteProductInCart(id, productId){
        try {
            const cart = await cartsModel.findById(id)
            const p = new ProductsManager
            const index = cart.products.indexOf(p.getProductById(productId))
            if(index){
                cart.products.splice(index, 1)
                cart.save()
            }
            else{
                console.log('Producto no encontrado en el carrito')
            }
            return cart
        } catch (error) {
            console.log(error)
        }

    }

    async deleteAllProductsInCart(id){
        try {
            const cart = await cartsModel.findById(id)
            if(cart){
                cart.products = []
                cart.save()
                console.log('Carrito vaciado')
            }
            else{
                console.log('Carrito inexistente')
            }
        } catch (error) {
            console.log(error)
        }
    }
    
}