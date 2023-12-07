import { useMemo, useState } from 'react';
import SideNav from '../dashboard/SideNav';
import TopBar from '../../components/TopBar';
import { useGetReservationsQuery } from '../../api/authApi';
import { FaRegWindowClose } from 'react-icons/fa';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import { Dialog } from '@mui/material';
import NewReservationModal from './NewBrandModal';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

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

  const handleSubmit = async (id) => {
    const payload = {
      status: 'canceled',
    };

    const handleCancel = () => {
      axios
        .put(
          `https://rent-a-car-backend-production-d292.up.railway.app/rentals/${id}`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            mode: 'cors',
          }
        )
        .then(() => {
          toast.success('Reservation canceled succesfully');
          refetch();
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    };

    toast(
      (t) => (
        <div className="flex flex-col items-center px-1 py-1 gap-4">
          <p>Are you sure you want to cancel?</p>
          <div className="flex gap-10">
            <button
              className="bg-green-500 shadow-[0_4px_9px_-4px_#14a44d] hover:bg-green-600 rounded text-white py-2 px-4"
              onClick={() => {
                handleCancel();
                toast.dismiss(t.id);
              }}
            >
              Confirm
            </button>
            <button
              className="bg-red-600 shadow-[0_4px_9px_-4px_#dc4c64] hover:bg-red-700 rounded text-white py-2 px-4"
              onClick={() => toast.dismiss(t.id)}
            >
              Dismiss
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
      }
    );
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
        size: 70,
      },
      {
        accessorKey: 'car.price',
        header: 'Total Price',
        size: 80,
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
        size: 80,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        Cell: ({ cell }) => {
          const statusRow = cell.getValue();

          return (
            <div className="flex items-center justify-center text-white">
              {statusRow == 'completed' && (
                <div className="bg-green-400 shadow  font-medium rounded-sm py-[0.12rem] px-2 ">
                  Completed
                </div>
              )}
              {statusRow == 'pending' && (
                <div className="bg-slate-200  font-medium  text-black shadow rounded-sm py-[0.12rem] px-2 ">
                  Pending
                </div>
              )}
              {statusRow == 'in_progress' && (
                <div className="bg-yellow-200 font-medium text-black  shadow rounded-sm py-[0.12rem] px-2 ">
                  In progress
                </div>
              )}
              {statusRow == 'canceled' && (
                <div className="bg-red-500 shadow  font-medium  rounded-sm py-[0.12rem] px-2 ">
                  Canceled
                </div>
              )}
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
        size: 60,
        Cell: ({ row }) => {
          const carID = row.getValue('id');
          const statusRow = row.getValue('status');

          return (
            <div className="flex justify-center h-7">
              {statusRow != 'completed' && statusRow != 'canceled' && (
                <div title="Cancel">
                  <button onClick={() => handleSubmit(carID)}>
                    <IoCloseCircleOutline className="text-3xl  text-red-600 cursor-pointer"></IoCloseCircleOutline>
                  </button>
                </div>
              )}
            </div>
          );
        },
      },
    ],
    []
  );

  const globalTheme = useTheme();

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          primary: globalTheme.palette.secondary,
          info: {
            main: 'rgb(255,122,0)',
          },
        },
      }),
    [globalTheme]
  );

  return (
    <div className="flex bg-[#fdf9f9] min-h-[100vh]">
      <SideNav sidebar={sidebar} closeMenu={closeMenu} user={user}></SideNav>
      <div className="lg:ml-[16.68vw] flex flex-col flex-grow lg:w-10/12 bg-agent">
        <TopBar
          sidebar={sidebar}
          showMenu={showMenu}
          closeMenu={closeMenu}
        ></TopBar>
        <div className="pt-14 px-10 w-[100vw] lg:w-full">
          <Toaster />
          <ThemeProvider theme={tableTheme}>
            <MaterialReactTable
              columns={columns}
              data={reservations ?? []}
              state={{ isLoading }}
              muiTableContainerProps={{ sx: { maxHeight: '65vh' } }}
              muiTableHeadCellProps={{
                sx: (theme) => ({
                  color: theme.palette.secondary,
                }),
              }}
              initialState={{
                density: 'compact',
                columnVisibility: { id: false },
                sorting: [
                  {
                    id: 'id',
                    asc: true,
                  },
                ],
              }}
              renderTopToolbarCustomActions={() => {
                return (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleAddModal()}
                      className="bg-[#d60000] hover:bg-red-700 py-2 px-2 text-white font-medium rounded-md shadow-sm"
                    >
                      Add Reservation +
                    </button>
                  </div>
                );
              }}
            />
          </ThemeProvider>
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
