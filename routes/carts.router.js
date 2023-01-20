import { Router } from "express"
import { CartManager } from "../index.js";
import { ProductManager } from "../index.js";



const router = Router()

const c = new CartManager
const p = new ProductManager

//p.updateProduct(1,{title:"asd"})


/*p.addProduct("tv", "tv", 2000, [], 143, 23, false, "tecnologia")
p.addProduct("celu", "celu", 3000, [], 144, 43, true, "tecnologia")
p.addProduct("heladera", "heladera", 5000, [], 145, 27, true, "electrodomesticos")
p.addProduct("estufa", "heladera", 2500, [], 146, 27, true, "electrodomesticos")
p.addProduct("microondas", "microondas", 1000, [], 147, 27, true, "electrodomesticos")
p.addProduct("lavarropas", "lavarropas", 3000, [], 148, 27, true, "electrodomesticos")
p.addProduct("microprocesadora", "microprocesadora", 2700, [], 149, 27, true, "electrodomesticos")
p.addProduct("mesa", "mesa", 7000, [], 150, 27, true, "muebles")
p.addProduct("silla", "silla", 8000, [], 151, 27, true, "muebles")
p.addProduct("horno", "horno", 1000, [], 152, 27, true, "electrodomesticos")*/

router.get('/', (req, res) => {
    const {limit} = req.query
    const products = p.getProducts()
    if(limit){
      const limitProducts = [...products] // guarda el array en otra variable para no perder el original
      limitProducts.splice(limit)
      res.json(limitProducts)
    }
    else{
      res.json(products)
    }

})

router.get('/:cid',(req,res)=>{
    const idCart = req.params.cid
    const cart = c.getCartById(parseInt(idCart))
    if(cart){
        res.json(cart)
    } else {
        res.send('El carrito no existe')
    }
})

router.post('/:cid/product/:pid',(req,res)=>{
    const idCart = req.params.cid
    const cart = c.getCartById(parseInt(idCart))
    console.log(cart)
    if(cart){
        const idProduct = req.params.pid
        const product = p.getProductById(parseInt(idProduct))
        if(product){
            c.addProductToCart(parseInt(idCart),{id: product.id, quantity: 1})
        } else {
            res.send('El producto no existe')
        }
    } else {
        res.send('El carrito no existe')
    }
    res.json({message: "Fin."})
})


router.post('/',(req,res)=>{
    c.addCart()
    res.json({message: "Fin."})
})

export default router