import express from 'express'
import { ProductManager } from './index.js'

const p = new ProductManager()
p.addProduct("tv", "tv", 2000, "asd.jpg", 143, 23)
p.addProduct("celu", "celu", 3000, "asd.jpg", 144, 43)
p.addProduct("heladera", "heladera", 5000, "asd.jpg", 145, 27)
p.addProduct("estufa", "heladera", 2500, "asd.jpg", 146, 27)
p.addProduct("microondas", "microondas", 1000, "asd.jpg", 147, 27)
p.addProduct("lavarropas", "lavarropas", 3000, "asd.jpg", 148, 27)
p.addProduct("microprocesadora", "microprocesadora", 2700, "asd.jpg", 149, 27)
p.addProduct("mesa", "mesa", 7000, "asd.jpg", 150, 27)
p.addProduct("silla", "silla", 8000, "asd.jpg", 151, 27)
p.addProduct("horno", "horno", 1000, "asd.jpg", 152, 27)

const app = express()
const PORT = 8080

app.get('/products', (req, res) => {
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

app.get('/products/:pid',(req,res)=>{
    const idProduct = req.params.pid
    const product = p.getProductById(parseInt(idProduct))
    if(product){
        res.json(product)
    } else {
        res.send('El producto no existe')
    }
})

app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`)
}) 