import { ProductManager } from "../index.js";
import { Router } from "express"
const router = Router()

const p = new ProductManager

router.get('/', (req, res) => {
    const products = p.getProducts()
    res.render('home', {products})
})

export default router