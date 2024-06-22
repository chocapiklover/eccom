import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface UserData {
  shippingAddress?: ShippingAddress;
}

interface ShippingAddressFormProps {
  shippingAddress: ShippingAddress;
  onUpdate: (updatedData: Partial<UserData>) => Promise<void>;
}

const validationSchema = yup.object().shape({
  line1: yup.string().required('Address Line 1 is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  postal_code: yup.string().required('Postal Code is required'),
  country: yup.string().required('Country is required'),
});

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({ shippingAddress: initialShippingAddress, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      setIsEditing(false);
    }
  };

  return (
    <div className="border-t border-b border-gray-700 py-4 flex justify-between items-center mb-4">
      {!isEditing ? (
        <>
          <div>
            <h3 className="font-bold">Shipping Address</h3>
            {initialShippingAddress.line1 ? (
              <>
                <p>{initialShippingAddress.line1}</p>
                {initialShippingAddress.line2 && <p>{initialShippingAddress.line2}</p>}
                <p>{initialShippingAddress.city}, {initialShippingAddress.state}</p>
                <p>{initialShippingAddress.postal_code}, {initialShippingAddress.country}</p>
              </>
            ) : (
              <p>No shipping address provided.</p>
            )}
          </div>
          <button
            onClick={handleEdit}
            className="border border-gray-700 px-4 py-2 rounded"
          >
            Edit
          </button>
        </>
      ) : (
        <Formik
          initialValues={initialShippingAddress}
          validationSchema={validationSchema}
          onSubmit={async (values: any, { setSubmitting }: any) => {
            setLoading(true);
            await onUpdate({ shippingAddress: values });
            setLoading(false);
            setIsEditing(false);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-full">
              <h3 className="font-bold mb-4">Edit Shipping Address</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                <Field
                  type="text"
                  name="line1"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage name="line1" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                <Field
                  type="text"
                  name="line2"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <Field
                  type="text"
                  name="city"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">State</label>
                <Field
                  type="text"
                  name="state"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage name="state" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                <Field
                  type="text"
                  name="postal_code"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage name="postal_code" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <Field
                  type="text"
                  name="country"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage name="country" component="div" className="text-red-500 text-sm" />
              </div>
              <button
                type="submit"
                className={`bg-pink-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting || loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ShippingAddressForm;
