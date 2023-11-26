import { useState } from 'react';
import SideNav from '../dashboard/SideNav';
import TopBar from '../../components/TopBar';
import { useDeleteCarMutation, useGetCarsQuery } from '../../api/authApi';
import { FaTrashAlt } from 'react-icons/fa';

const DeleteCar = ({ user }) => {
  const [sidebar, setSidebar] = useState(false);
  const token = user?.token;
  const email = user?.email;

  const { data: cars, isLoading } = useGetCarsQuery();
  const [deleteCar] = useDeleteCarMutation();
  const showMenu = () => setSidebar(true);
  const closeMenu = () => setSidebar(false);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this car?'
    );

    user = { id, token };

    if (shouldDelete) {
      deleteCar(user);
    }
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
                  <th className="py-3 px-6 text-left">Model</th>
                  <th className="py-3 px-6 text-left">Year</th>
                  <th className="py-3 px-6 text-left">Image</th>
                  <th className="py-3 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cars.map((car, index) => (
                  <tr key={index}>
                    <td className="py-4 px-6 text-sm font-medium">
                      <h3>{car.model}</h3>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium">
                      <h3>{car.year}</h3>
                    </td>
                    <td className="py-4 px-6">
                      <img
                        src={`http://localhost:3001/${car.photo_url}`}
                        alt={`${car.name} Logo`}
                        className="w-24 object-cover h-16"
                      />
                    </td>
                    <td className="px-6">
                      <button
                        onClick={() => {
                          handleDelete(car.id);
                        }}
                      >
                        <FaTrashAlt className="text-2xl text-red-600"></FaTrashAlt>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteCar;
