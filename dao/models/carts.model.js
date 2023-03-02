import mongoose from 'mongoose'

const cartsSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      quantity: 1,
      ref: 'Products',
      default: []
    }
  ]
})

cartsSchema.pre('find',function(next){
  this.populate('products')
  next()
})


export const cartsModel = mongoose.model('Carts', cartsSchema)