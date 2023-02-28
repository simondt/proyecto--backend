import mongoose from 'mongoose'

mongoose.connect(
  'mongodb+srv://hefota7735:asd@cluster0.72z6vh2.mongodb.net/ecommerce?retryWrites=true&w=majority',
  (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Conectado a la base de datos')
    }
  }
)
