
import Product from './Product'

const product3 = {
    name: "Bike",
    price: "215000"
}
const ProductList = () => {
  return (
    <div>
        <Product name="computer" price="107000" />
        <Product name="Phone" price="15000" />
        {/* Spread operator */}
        <Product {...product3} />
    </div>
  )
}

export default ProductList
