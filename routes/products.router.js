import { Router } from "express"
//import { ProductManager } from "../index.js"
import ProductsManager from "../dao/dbManagers/productsManager.js"
const router = Router()

const p = new ProductsManager

router.get('/', async (req, res) => {
    const products = await p.getProducts()
    if (!products) {
      res.json({ message: 'Error' })
    } else {
      res.json({ message: 'Success', products })
    }

})

router.get('/:pid', async(req,res)=>{
    const idProduct = req.params.pid
    const product = await p.getProductById(String(idProduct))
    if(product){
        res.json(product)
    } else {
        res.send('El producto no existe')
    } 

})

router.delete('/:pid', async (req,res)=>{
    const idProduct = req.params.pid
    await p.deleteProduct(String(idProduct))
    res.json({message: "Fin."})
})

router.put('/:pid', async (req,res)=>{
    const idProduct = req.params.pid
    const update = req.body
    await p.updateProduct(String(idProduct), update)
    res.json({message: "Fin."})
})

router.post('/', async(req,res)=>{
    const product = req.body
    await p.addProduct(product)
    res.json({message: "Fin.", product})
})

export default router