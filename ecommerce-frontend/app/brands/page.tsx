'use client'

import useBrands from '../../hooks/useBrands';

const BrandList = () => {
  const { brands, loading, error } = useBrands();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Brand List</h1>
      <ul>
        {brands.length > 0 ? (
          brands.map(brand => (
            <li key={brand._id}>
              {brand.name}
            </li>
          ))
        ) : (
          <li>No brands found</li>
        )}
      </ul>
    </div>
  );
};

export default BrandList;