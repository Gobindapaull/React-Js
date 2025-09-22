
import Product from './Product'

const products = [{
    name: "Bike",
    price: "215000"
},
{
    name: "computer",
    price: "107000"
},
{
    name: "Phone",
    price: "15000"
}]
const ProductList = () => {

    const callback = (element, index) => {
        return (
            <Product {...element} key={index} />
        )
    }

    return (
        <div>
            {
                products.map(callback)
            }
        </div>
    );

}

export default ProductList
