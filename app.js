import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import homeRouter from './routes/home.router.js'
import { ProductManager } from './index.js'

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))



const app = express()
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/home',homeRouter)
app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts')
})

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`)
}) 

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
  console.log('cliente conectado ', socket.id)
  const p = new ProductManager
  const products = p.getProducts()
  socketServer.emit('productListEmit', products)

  socket.on('disconnect', () => {
    console.log('cliente desconectado')
  })

  socket.on('product',(product)=>{
    p.addProduct(product.title, product.description, parseFloat(product.price), product.thumbnails? product.thumbnails:[], parseInt(product.code), parseInt(product.stock), true, product.category)
  }) // recibe un producto desde el formulario


})