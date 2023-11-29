import { useMemo, useState } from 'react';
import SideNav from '../dashboard/SideNav';
import TopBar from '../../components/TopBar';
import { useGetReservationsQuery } from '../../api/authApi';
import { FaTrashAlt, FaEdit, FaRegWindowClose } from 'react-icons/fa';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import { Dialog } from '@mui/material';
import NewReservationModal from './NewBrandModal';

const Reservations = ({ user }) => {
  const [sidebar, setSidebar] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [photo, setPhoto] = useState(null);
  const token = user?.token;
  const email = user?.email;
  const userId = user?.id;

  const [editedName, setEditedName] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const showMenu = () => setSidebar(true);
  const closeMenu = () => setSidebar(false);
  const {
    data: reservations,
    isLoading,
    refetch,
  } = useGetReservationsQuery(token);

  const handleAddModal = () => {
    setOpen2(true);
  };

  const handleModalClose = () => {
    setSelectedBrand(null);
    setEditedName('');
    setOpen(false);
  };

  const handleCloseModal = () => {
    setOpen2(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/brands/${selectedBrand}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        mode: 'cors',
      })
      .then(() => {
        console.log('Edited succesfully');
        refetch();
      })
      .catch((error) => {
        console.error(error);
      });

    setOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        minSize: 100,
      },
      {
        accessorKey: 'car.model',
        header: 'Model',
        size: 200,
      },
      {
        accessorKey: 'car.year',
        header: 'Year',
        minSize: 150,
      },
      {
        accessorKey: 'car.price',
        header: 'Total Price',
        minSize: 150,
        Cell: ({ cell, row }) => {
          const price = cell.getValue();
          const initial = new Date(row.getValue('rental_date'));
          const returning = new Date(row.getValue('return_date'));

          const differenceInMilliseconds = returning - initial;
          const differenceInDays = Math.abs(
            Math.floor(differenceInMilliseconds / (24 * 60 * 60 * 1000))
          );

          const total = price * differenceInDays;

          return <div className="flex justify-center">${total}</div>;
        },
      },
      {
        accessorKey: 'rental_date',
        header: 'Rental date',
        minSize: 150,
      },
      {
        accessorKey: 'return_date',
        header: 'Return Date',
        minSize: 150,
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
              <button onClick={() => console.log(row.original)}>
                <FaEdit className="text-2xl  mr-4 cursor-pointer"></FaEdit>
              </button>
              <button onClick={() => console.log(carID)}>
                <FaTrashAlt className="text-2xl text-red-600 cursor-pointer"></FaTrashAlt>
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="flex">
      <SideNav sidebar={sidebar} closeMenu={closeMenu}></SideNav>
      <div className="md:ml-[16.68vw] flex flex-col flex-grow md:w-10/12 bg-agent">
        <TopBar email={email}></TopBar>
        <div className="pt-14 px-10 w-[100vw] md:w-full">
          <MaterialReactTable
            columns={columns}
            data={reservations ?? []}
            state={{ isLoading }}
            muiTableContainerProps={{ sx: { maxHeight: '70vh' } }}
            initialState={{
              density: 'compact',
              columnVisibility: { id: false },
            }}
            renderTopToolbarCustomActions={() => {
              return (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleAddModal()}
                    className="bg-orange-500 hover:bg-orange-400 py-2 px-2 text-white font-medium rounded-md shadow-sm"
                  >
                    Add Reservation +
                  </button>
                </div>
              );
            }}
          />
        </div>
        {selectedBrand && (
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog
              open={open}
              onClose={handleModalClose}
              fullWidth
              maxWidth={'sm'}
            >
              <div className="modal  z-10 bg-white p-6 rounded-lg shadow-lg relative">
                <button
                  onClick={handleModalClose}
                  className="absolute top-0 right-0 p-2 hover:text-gray-700"
                >
                  <FaRegWindowClose className="text-xl" />
                </button>
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <h2 className="text-2xl text-center font-bold mb-4">
                    Edit Brand
                  </h2>
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
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
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
                      onChange={(e) => setPhoto(e.target.files[0])}
                      className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                      placeholder="Choose a picture"
                      required
                    />
                  </div>

                  <button
                    className="bg-orange-500 text-white self-center font-medium px-4 mt-10 py-2 w-20 rounded"
                    type="submit"
                  >
                    Edit
                  </button>
                </form>
              </div>
            </Dialog>
          </div>
        )}
      </div>
      {open2 && (
        <NewReservationModal
          token={token}
          open2={open2}
          onClose={handleCloseModal}
          userId={userId}
        ></NewReservationModal>
      )}
    </div>
  );
};

export default Reservations;
