

const Product = (props) => {
  return (
    <div>
        <h2>Image</h2>
        <h3>{props.name}</h3>
        <h4>{props.price}</h4>
        <p>-----------------------------</p>
    </div>
  )
}

export default Product
