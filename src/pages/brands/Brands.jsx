import { useState } from 'react';
import SideNav from '../dashboard/SideNav';
import TopBar from '../../components/TopBar';
import { useDeleteBrandMutation, useGetBrandsQuery } from '../../api/authApi';
import { FaTrashAlt, FaEdit, FaRegWindowClose } from 'react-icons/fa';

const Brands = ({ user }) => {
  const [sidebar, setSidebar] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedBrandName, setSelectedBrandName] = useState(null);
  const token = user?.token;
  const email = user?.email;

  const [editedName, setEditedName] = useState('');

  const showMenu = () => setSidebar(true);
  const closeMenu = () => setSidebar(false);

  const [deleteBrand] = useDeleteBrandMutation();
  const { data: brands, isLoading } = useGetBrandsQuery(token);

  const handleEdit = (brand) => {
    setSelectedBrand(brand.id);
    setEditedName(brand.name);
    console.log(brand);
  };

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this brand?'
    );

    if (shouldDelete) {
      deleteBrand({ id, token });
    }
  };

  const handleModalClose = () => {
    setSelectedBrand(null);
    setEditedName('');
  };

  return (
    <div className="flex">
      <SideNav sidebar={sidebar} closeMenu={closeMenu}></SideNav>
      <div className="md:ml-[16.68vw] flex flex-col flex-grow md:w-10/12 bg-agent">
        <TopBar email={email}></TopBar>
        <div className="flex justify-center pt-7 pb-7">
          {isLoading ? (
            <p>Loading list...</p>
          ) : (
            <table className="w-[80%] border shadow-md border-slate-300 divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Image</th>
                  <th className="py-3 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {brands.map((car) => (
                  <tr key={car.id}>
                    <td className="py-4 px-6 text-sm font-medium">
                      <h3>{car.name}</h3>
                    </td>
                    <td className="py-4 px-6">
                      <img
                        src={`http://localhost:3001/${car.photo_url}`}
                        alt={`${car.name} Logo`}
                        className="w-16 object-cover h-16"
                      />
                    </td>
                    <td className="px-6">
                      <button onClick={() => handleEdit(car)}>
                        <FaEdit className="text-2xl text-blue-600 mr-4 cursor-pointer"></FaEdit>
                      </button>
                      <button onClick={() => handleDelete(car.id)}>
                        <FaTrashAlt className="text-2xl text-red-600 cursor-pointer"></FaTrashAlt>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {selectedBrand && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="modal-overlay fixed inset-0 bg-gray-500 opacity-50"></div>
            <div className="modal lg:ml-[17%] w-[80%] h-[60%] lg:w-[30%] lg:h-[40%] z-10 bg-white p-6 rounded-lg shadow-lg relative">
              <button
                onClick={handleModalClose}
                className="absolute top-0 right-0 p-2 hover:text-gray-700"
              >
                <FaRegWindowClose className="text-xl" />
              </button>
              <h2 className="text-2xl font-bold mb-4">Edit Brand</h2>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
              />

              <button
                className="bg-orange-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  console.log(editedName);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brands;
