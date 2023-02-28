import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import homeRouter from './routes/home.router.js'
//import { ProductManager } from './index.js'
import ProductsManager from './dao/dbManagers/productsManager.js'
import { productsModel } from './dao/models/products.model.js'
import './src/dbConfig.js'
import CartsManager from './dao/dbManagers/cartsManager.js'

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))



const app = express()
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/home', homeRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts')
})

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', async (socket) => {
  console.log('cliente conectado ', socket.id)
  const p = new ProductsManager
  const c = new CartsManager
  const cart = await c.addCart()
  const products = await p.getProducts()
  await socketServer.emit('productListEmit', products)

  socket.on('disconnect', () => {
    console.log('cliente desconectado')
  })

  socket.on('product', async (product) => {
    await p.addProduct(product)
    socket.emit("productListEmit", await p.getProducts())
  }) // recibe un producto desde el formulario

  socket.on('productDeleteEmit', async (pid) => {
    await p.deleteProduct(pid)
    socket.emit("productListEmit", await p.getProducts())
  })

  socket.on('addToCartEmit', async (pid) => {
    c.addProductToCart(cart.id, pid)
    socket.emit("productListEmit", await p.getProducts())
  })

})