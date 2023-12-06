import { Dialog } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';

const NewBrandModal = ({ token, open2, onClose, refetch }) => {
  const [photo2, setPhoto2] = useState(null);
  const [editedName2, setEditedName2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('brand[name]', editedName2);
    formData.append('brand[photo]', photo2);

    axios
      .post(
        `http://rent-a-car-backend-production-d292.up.railway.app/brands`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          mode: 'cors',
        }
      )
      .then(() => {
        console.log('Brand added succesfully');
        setPhoto2(null);
        onClose();
        refetch();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Dialog open={open2} onClose={onClose} fullWidth maxWidth={'sm'}>
        <div className="modal  z-10 bg-white p-6 rounded-lg shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 p-2 hover:text-gray-700"
          >
            <FaRegWindowClose className="text-xl" />
          </button>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <h2 className="text-2xl text-center font-bold mb-4">Add Brand</h2>
            <div className="mb-4">
              <label
                className="block font-satoshi text-gray-700 text-[1rem] font-medium mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={editedName2}
                onChange={(e) => setEditedName2(e.target.value)}
                className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                className="block font-satoshi text-gray-700 text-[1rem] font-medium mb-2"
                htmlFor="photo"
              >
                Photo
              </label>
              <input
                type="file"
                id="photo"
                onChange={(e) => setPhoto2(e.target.files[0])}
                className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Choose a picture"
                required
              />
            </div>

            <button
              className="bg-[#d60000] hover:bg-red-700 text-white self-center font-medium mt-10 py-2 w-28 rounded"
              type="submit"
            >
              Add Brand
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default NewBrandModal;
