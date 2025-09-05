import Product from "./Product";

const ProductsGrid = ({ products, loadCart }) => {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <Product product={product} loadCart={loadCart} key={product.id} />
        );
      })}
    </div>
  );
};

export default ProductsGrid;
