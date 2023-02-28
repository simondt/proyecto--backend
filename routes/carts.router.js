import { Router } from "express"
//import { CartManager } from "../index.js";
import CartsManager from "../dao/dbManagers/cartsManager.js";
//import { ProductManager } from "../index.js";
import ProductsManager from "../dao/dbManagers/productsManager.js";



const router = Router()

const c = new CartsManager
const p = new ProductsManager

router.get('/', async (req, res) => {
    const { limit } = req.query
    const products = await c.getCarts()
    if (limit) {
        const limitProducts = [...products] // guarda el array en otra variable para no perder el original
        limitProducts.splice(limit)
        res.json(limitProducts)
    }
    else {
        res.json(products)
    }

})

router.get('/:cid', async (req, res) => {
    const idCart = req.params.cid
    const cart = await c.getCartById(String(idCart))
    if (cart) {
        res.json(cart)
    } else {
        res.send('El carrito no existe')
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const cart = await c.addProductToCart(String(idCart), String(idProduct))
    if (cart) {
        res.json(cart)
    } else {
        res.send('El carrito no existe')
    }
})


router.post('/', async (req, res) => {
    await c.addCart()
    res.json({ message: "Fin." })
})

router.delete('/:cid/product/:pid', async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const cart = await c.deleteProductInCart(String(idCart), String(idProduct))
    if (cart) {
        res.json(cart)
    } else {
        res.send('El carrito no existe')
    }
})

router.delete('/:cid', async (req, res) => {
    const idCart = req.params.cid
    const cart = await c.deleteAllProductsInCart(String(idCart))
    res.json(cart)
})





export default router