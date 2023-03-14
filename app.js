import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import sessionsRouter from './routes/sessions.router.js'
import viewsRouter from './routes/views.router.js'
import homeRouter from './routes/home.router.js'
//import { ProductManager } from './index.js'
import ProductsManager from './dao/dbManagers/productsManager.js'
import './src/dbConfig.js'
import CartsManager from './dao/dbManagers/cartsManager.js'
import mongoStore from 'connect-mongo'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import './passport/passportStrategies.js'


import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))



const app = express()
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use(
  session({
    store: new mongoStore({
      mongoUrl: 'mongodb+srv://hefota7735:asd@cluster0.72z6vh2.mongodb.net/sessions?retryWrites=true&w=majority'
    }),
    resave: false,
    saveUninitialized: false,
    secret: 'sessionKey',
    cookie: { maxAge: 60000 }
  })
)

app.get('/', (req, res) => {
  res.redirect('/views/register')
})


app.use('/home', homeRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.use('/views', viewsRouter)
app.use('/api/sessions', sessionsRouter)

app.use(passport.initialize())
app.use(passport.session())


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