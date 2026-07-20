const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const products = [
  { id: 1, name: 'Oakwood Lounge Chair', category: 'Furniture', price: 349, description: 'Solid oak frame with a woven cane back, built to last decades.', image: '/chair.jpg' },
  { id: 2, name: 'Linen Sofa', category: 'Furniture', price: 899, description: 'A relaxed three-seater upholstered in washed linen.', image: '/sofa.jpg' },
  { id: 3, name: 'Arc Floor Lamp', category: 'Lighting', price: 189, description: 'Brushed brass arc lamp with a linen drum shade.', image: '/floor-lamp.jpg' },
  { id: 4, name: 'Ceramic Table Lamp', category: 'Lighting', price: 79, description: 'Hand-thrown ceramic base with a soft linen shade.', image: '/table-lamp.jpg' },
  { id: 5, name: 'Woven Wall Hanging', category: 'Decor', price: 65, description: 'Handwoven cotton and jute wall piece.', image: '/wall-hanging.jpg' },
  { id: 6, name: 'Stoneware Vase Set', category: 'Decor', price: 48, description: 'Set of three matte stoneware vases in varying heights.', image: '/vases.jpg' },
  { id: 7, name: 'Cotton Throw Blanket', category: 'Textiles', price: 59, description: 'Heavyweight cotton throw, woven in a subtle herringbone.', image: '/blanket.jpg' },
  { id: 8, name: 'Linen Cushion Cover', category: 'Textiles', price: 29, description: 'Stonewashed linen cushion cover with a hidden zip.', image: '/cushion.jpg' },
]

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000')
})