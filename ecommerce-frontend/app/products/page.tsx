'use client'
import useProducts from '../../hooks/useProduct';

const ProductList = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.length > 0 ? (
          products.map(product => (
            <li key={product._id}>
              {product.name} - ${product.price}
            </li>
          ))
        ) : (
          <li>No products found</li>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
