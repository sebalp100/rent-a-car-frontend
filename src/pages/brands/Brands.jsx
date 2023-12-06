import { useMemo, useState } from 'react';
import SideNav from '../dashboard/SideNav';
import TopBar from '../../components/TopBar';
import { useDeleteBrandMutation, useGetBrandsQuery } from '../../api/authApi';
import { FaTrashAlt, FaEdit, FaRegWindowClose } from 'react-icons/fa';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import { Dialog } from '@mui/material';
import NewBrandModal from './NewBrandModal';

const Brands = ({ user }) => {
  const [sidebar, setSidebar] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [photo, setPhoto] = useState(null);
  const token = user?.token;
  const email = user?.email;

  const [editedName, setEditedName] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const showMenu = () => setSidebar(true);
  const closeMenu = () => setSidebar(false);

  const [deleteBrand] = useDeleteBrandMutation();
  const { data: brands, isLoading, refetch } = useGetBrandsQuery(token);

  const handleEdit = (brand) => {
    setOpen(true);
    setSelectedBrand(brand.id);
    setEditedName(brand.name);
  };

  const handleAddModal = () => {
    setOpen2(true);
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
    setOpen(false);
  };

  const handleCloseModal = () => {
    setOpen2(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('brand[name]', editedName);
    formData.append('brand[photo]', photo);

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
        accessorKey: 'name',
        header: 'Name',
        minSize: 150,
      },
      {
        accessorKey: 'photo_url',
        header: 'Picture',
        minSize: 200,
        Cell: ({ cell, row }) => {
          const carPic = cell.getValue();
          const carName = row.getValue('name');

          return (
            <div className="flex gap-1">
              <img
                src={`https://rent-a-car-backend-production-d292.up.railway.app/${carPic}`}
                alt={`${carName} Logo`}
                className="w-16 h-16 object-contain"
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
              <button onClick={() => handleEdit(row.original)}>
                <FaEdit className="text-2xl  mr-4 cursor-pointer"></FaEdit>
              </button>
              <button onClick={() => handleDelete(carID)}>
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
    <div className="flex bg-[#fdf9f9] min-h-[100vh]">
      <SideNav sidebar={sidebar} closeMenu={closeMenu} user={user}></SideNav>
      <div className="lg:ml-[16.68vw] flex flex-col flex-grow lg:w-10/12 bg-agent">
        <TopBar email={email}></TopBar>
        <div className="pt-14 px-10 w-[100vw] md:w-full">
          <MaterialReactTable
            columns={columns}
            data={brands ?? []}
            state={{ isLoading }}
            muiTableContainerProps={{ sx: { maxHeight: '65vh' } }}
            initialState={{
              density: 'compact',
              columnVisibility: { id: false },
            }}
            renderTopToolbarCustomActions={() => {
              return (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleAddModal()}
                    className="bg-[#d60000] hover:bg-red-700 py-2 px-2 text-white font-medium rounded-md shadow-sm"
                  >
                    Add Brand +
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
                    className="bg-[#d60000] hover:bg-red-700 text-white self-center font-medium px-4 mt-10 py-2 w-20 rounded"
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
        <NewBrandModal
          token={token}
          open2={open2}
          onClose={handleCloseModal}
          refetch={refetch}
        ></NewBrandModal>
      )}
    </div>
  );
};

export default Brands;
