//import { ProductManager } from "../index.js";
import ProductsManager from "../dao/dbManagers/productsManager.js"
import { productsModel } from "../dao/models/products.model.js"
import { Router } from "express"
const router = Router()

const p = new ProductsManager

router.get('/', async (req, res) => {
    const { limit = 5, page = 1, query} = req.query
    const products = await productsModel.paginate({query},{limit, page})
    let prevLink = null
    let nextLink = null
    if(products.hasPrevPage) prevLink = `localhost:8080/home/?page=${products.prevPage}`
    if(products.hasNextPage) nextLink = `localhost:8080/home/?page=${products.nextPage}`
    res.json({status:'success',payload:products.docs, totalPages:products.totalPages, prevPage:products.prevPage, prevPage:products.prevPage, page:products.page, hasPrevPage:products.hasPrevPage, hasNextPage:products.hasNextPage, prevLink:prevLink, nextLink:nextLink})
  })

export default router