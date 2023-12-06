import { useState, useMemo } from 'react';
import SideNav from '../dashboard/SideNav';
import TopBar from '../../components/TopBar';
import { useDeleteCarMutation, useGetCarsQuery } from '../../api/authApi';
import { FaTrashAlt } from 'react-icons/fa';
import { MaterialReactTable } from 'material-react-table';

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

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        minSize: 100,
      },
      {
        accessorKey: 'model',
        header: 'Model',
        minSize: 150,
      },
      {
        accessorKey: 'year',
        header: 'Year',
        minSize: 150,
      },
      {
        accessorKey: 'photo_url',
        header: 'Picture',
        minSize: 200,
        Cell: ({ cell, row }) => {
          const carPic = cell.getValue();
          const carName = row.getValue('model');

          return (
            <div className="flex gap-1">
              <img
                src={`https://rent-a-car-backend-production-d292.up.railway.app/${carPic}`}
                alt={`${carName} Logo`}
                className="w-24 object-cover h-16"
              />
            </div>
          );
        },
      },
      {
        accessorKey: 'action',
        header: 'Action',
        muiTableHeadCellProps: {
          align: 'center',
        },
        minSize: 150,
        Cell: ({ row }) => {
          const carID = row.getValue('id');

          return (
            <div className="flex justify-center">
              <button
                onClick={() => {
                  handleDelete(carID);
                }}
              >
                <FaTrashAlt className="text-2xl text-red-600"></FaTrashAlt>
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="flex bg-[#fdf9f9] min-h-[100vh]">
      <SideNav sidebar={sidebar} closeMenu={closeMenu} user={user}></SideNav>
      <div className="lg:ml-[16.68vw] flex flex-col lg:w-10/12 bg-agent">
        <TopBar email={email}></TopBar>
        <div className="pt-14 px-10 w-[100vw] lg:w-full">
          <MaterialReactTable
            columns={columns}
            data={cars ?? []}
            state={{ isLoading }}
            muiTableContainerProps={{ sx: { maxHeight: '60vh' } }}
            initialState={{
              density: 'compact',
              columnVisibility: { id: false },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteCar;
