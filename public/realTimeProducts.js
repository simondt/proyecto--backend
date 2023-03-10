const socket = io()
const productList = document.getElementById('productList')
const productForm = document.getElementById('productForm')

productForm.onsubmit = (e) => {
  e.preventDefault()
  const title = document.getElementById('title').value
  const description = document.getElementById('description').value
  const price = document.getElementById('price').value
  const code = document.getElementById('code').value
  const stock = document.getElementById('stock').value
  const category = document.getElementById('category').value

  socket.emit('product', { title, description, price, code, stock, category })
}

socket.on('productListEmit', (products) => {
  let data = ''
  products.forEach((p) => {
    data += `<li><h3>Producto ${p.title} </h3>
    <p>${p.description}, $${p.price}, codigo: ${p.code}, stock: ${p.stock}, estado: ${p.status}, categoria: ${p.category}</p></li>
     <button id="${p._id}">Agregar al carrito</button> 
    `
  })
  productList.innerHTML = data
  products.forEach((p) => {
    const deleteButton = document.getElementById(p._id)
    /*
    deleteButton.onclick = (e) =>{
      e.preventDefault()
      socket.emit('productDeleteEmit', p._id)
    }  */
    const cartButton = document.getElementById(p._id)
    cartButton.onclick = (e) =>{
      e.preventDefault()
      socket.emit('addToCartEmit', p._id)
    }  
  })
}) 
