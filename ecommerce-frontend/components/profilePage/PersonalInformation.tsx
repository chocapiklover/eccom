import React, { useState } from 'react';

interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface UserData {
  name: string;
  email: string;
  shippingAddress?: ShippingAddress;
}

interface PersonalInformationProps {
  userData: UserData;
  onUpdate: (updatedData: Partial<UserData>) => Promise<void>;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ userData, onUpdate }) => {
  const [name, setName] = useState(userData.name);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(userData.shippingAddress || {
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
  });

  const handleUpdate = async () => {
    await onUpdate({ name, shippingAddress });
  };

  return (
    <div className="card p-4 border border-gray-700 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Personal Information</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
        <input
          type="text"
          value={shippingAddress.line1}
          onChange={(e) => setShippingAddress({ ...shippingAddress, line1: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
        <input
          type="text"
          value={shippingAddress.line2}
          onChange={(e) => setShippingAddress({ ...shippingAddress, line2: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          value={shippingAddress.city}
          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          value={shippingAddress.state}
          onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Postal Code</label>
        <input
          type="text"
          value={shippingAddress.postal_code}
          onChange={(e) => setShippingAddress({ ...shippingAddress, postal_code: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <input
          type="text"
          value={shippingAddress.country}
          onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <button
        onClick={handleUpdate}
        className="bg-pink-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
      <button
        onClick={() => window.location.reload()}
        className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
      >
        Cancel
      </button>
    </div>
  );
};

export default PersonalInformation;
