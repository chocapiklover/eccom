'use client'
import CreateProduct from '../../components/createProduct';
import CreateBrand from '../../components/createBrand';

const CreateEntities = () => {
  return (
    <div>
      <h1>Create Product and Brand</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CreateProduct />
        <CreateBrand />
      </div>
    </div>
  );
};

export default CreateEntities;