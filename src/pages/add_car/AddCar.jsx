import axios from 'axios';
import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { useGetBrandsQuery } from '../../api/authApi';
import SideNav from '../dashboard/SideNav';
import TopBar from '../../components/TopBar';
import toast, { Toaster } from 'react-hot-toast';

const AddCar = ({ user }) => {
  const [sidebar, setSidebar] = useState(false);
  const email = user?.email;

  const showMenu = () => setSidebar(true);
  const closeMenu = () => setSidebar(false);

  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [topSpeed, setTopSpeed] = useState('');
  const [description, setDescription] = useState('');
  const [cc, setCC] = useState('');
  const [engine, setEngine] = useState('');
  const [mileage, setMileage] = useState('');
  const [price, setPrice] = useState('');
  const [featured, setFeatured] = useState(false);
  const [brand_id, setBrand] = useState('');
  const [photo, setPhoto] = useState(null);

  const decryptData = (encryptedData, key) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, key);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData || {};
    } catch (error) {
      return {};
    }
  };

  const key = import.meta.env.VITE_MY_SECRET_KEY;

  const storedEncryptedData = localStorage.getItem('Rentacar');
  const decryptedUserData = decryptData(storedEncryptedData, key);
  const token = decryptedUserData?.token;

  const { data: brands, isLoading } = useGetBrandsQuery(token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('car[model]', model);
    formData.append('car[year]', year);
    formData.append('car[top_speed]', topSpeed);
    formData.append('car[description]', description);
    formData.append('car[cc]', cc);
    formData.append('car[engine]', engine);
    formData.append('car[mileage]', mileage);
    formData.append('car[price]', price);
    formData.append('car[featured]', featured);
    formData.append('car[brand_id]', brand_id);
    formData.append('car[photo]', photo);

    axios
      .post(`http://localhost:3001/cars`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        mode: 'cors',
      })
      .then(() => {
        toast.success('Car added succesfully');
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.data.message);
      });
  };

  return (
    <div className="flex bg-[#fdf9f9] min-h-[100vh]">
      <SideNav sidebar={sidebar} closeMenu={closeMenu}></SideNav>
      <div className="md:ml-[16.68vw] flex flex-col flex-grow md:w-10/12 bg-agent">
        <Toaster />
        <TopBar email={email}></TopBar>
        <div className="w-full flex flex-col items-center h-[92vh] justify-center">
          <h1 className="mb-[1rem] text-3xl font-bold">ADD A NEW CAR</h1>
          <div className="flex flex-col justify-center w-full items-center">
            <form onSubmit={handleSubmit} className="px-8 rounded-lg w-full">
              <div className="flex gap-4 w-full">
                <div className="w-[50%]">
                  <div className="mb-4 relative">
                    <label
                      className="block text-gray-700 text-[1rem] font-medium mb-2"
                      htmlFor="brand"
                    >
                      Select Brand
                    </label>
                    <select
                      id="brand"
                      value={brand_id}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full shadow text-sm border rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-red-700"
                      required
                    >
                      <option value="" disabled>
                        Choose a brand
                      </option>
                      {isLoading ? (
                        <option>Loading...</option>
                      ) : (
                        brands.map((brand) => (
                          <option key={brand.id} value={brand.id}>
                            {brand.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div className="mb-4 relative">
                    <label
                      className="block text-gray-700 text-[1rem] font-medium mb-2"
                      htmlFor="model"
                    >
                      Model
                    </label>
                    <input
                      type="text"
                      id="model"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full shadow text-sm border rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-red-700"
                      placeholder="Enter the model"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="mb-4 relative">
                    <label
                      className="block text-gray-700 text-[1rem] font-medium mb-2"
                      htmlFor="year"
                    >
                      Year
                    </label>
                    <input
                      type="text"
                      id="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full shadow text-sm border rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-red-700"
                      placeholder="Enter the year"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="mb-4 relative">
                    <label
                      className="block font-satoshi text-gray-700 text-[1rem] font-medium mb-2"
                      htmlFor="topSpeed"
                    >
                      Top Speed
                    </label>
                    <input
                      type="text"
                      id="topSpeed"
                      value={topSpeed}
                      onChange={(e) => setTopSpeed(e.target.value)}
                      className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-red-700"
                      placeholder="6+ Characters, 1 Capital letter"
                      required
                    />
                  </div>
                  <div className="mb-4 relative">
                    <label
                      className="block font-satoshi text-gray-700 text-[1rem] font-medium mb-2"
                      htmlFor="description"
                    >
                      Enter description
                    </label>
                    <textarea
                      type="text"
                      id="description"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-red-700"
                      placeholder="Enter a description"
                      required
                    />
                  </div>
                </div>
                <div className="w-[50%]">
                  <div className="mb-4 relative">
                    <label
                      className="block font-satoshi text-gray-700 text-[1rem] font-medium mb-2"
                      htmlFor="cc"
                    >
                      CC
                    </label>
                    <input
                      type="text"
                      id="cc"
                      value={cc}
                      onChange={(e) => setCC(e.target.value)}
                      className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-red-700"
                      placeholder="Enter CC"
                      required
                    />
                  </div>
                  <div className="mb-4 relative">
                    <label
                      className="block font-satoshi text-gray-700 text-[1rem] font-medium mb-2"
                      htmlFor="engine"
                    >
                      Engine
                    </label>
                    <input
                      type="text"
                      id="engine"
                      value={engine}
                      onChange={(e) => setEngine(e.target.value)}
                      className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-red-700"
                      placeholder="Enter engine"
                      required
                    />
                  </div>
                  <div className="mb-4 relative">
                    <label
                      className="block font-satoshi text-gray-700 text-[1rem] font-medium mb-2"
                      htmlFor="mileage"
                    >
                      Mileage
                    </label>
                    <input
                      type="text"
                      id="mileage"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                      className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-red-700"
                      placeholder="Enter mileage"
                      required
                    />
                  </div>
                  <div className="mb-4 relative">
                    <label
                      className="block font-satoshi text-gray-700 text-[1rem] font-medium mb-2"
                      htmlFor="price"
                    >
                      Price (USD)
                    </label>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-red-700"
                      placeholder="Enter price"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="mb-4 relative">
                      <label
                        className="block font-satoshi text-gray-700 text-[1rem] font-medium mb-2"
                        htmlFor="featured"
                      >
                        Featured
                      </label>
                      <input
                        type="checkbox"
                        id="featured"
                        value={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                      />
                    </div>
                    <div className="mb-4 relative">
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
                        className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-red-700"
                        placeholder="Choose a picture"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className=" text-white bg-[#d60000] mt-4 py-[0.5rem] shadow font-medium px-4 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                >
                  Add Car
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
