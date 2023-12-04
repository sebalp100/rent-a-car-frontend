import { useState } from 'react';
import TopBar from '../../components/TopBar';
import SideNav from '../dashboard/SideNav';
import './CarList.css';

import { Link, useParams } from 'react-router-dom';
import { useGetCarsByBrandQuery } from '../../api/authApi';
import { BsSpeedometer2 } from 'react-icons/bs';
import { GiPathDistance } from 'react-icons/gi';
import { IoMdSettings } from 'react-icons/io';
import { FaCubes } from 'react-icons/fa';

const CarListByBrand = ({ user }) => {
  const [sidebar, setSidebar] = useState(false);
  const { brandId } = useParams();
  const token = user?.token;
  const email = user?.email;
  const obj = { brandId, token };

  const { data: brandsById, isLoading } = useGetCarsByBrandQuery(obj);

  const showMenu = () => setSidebar(true);
  const closeMenu = () => setSidebar(false);

  return (
    <div className="flex bg-[#fdf9f9] min-h-[100vh]">
      <SideNav sidebar={sidebar} closeMenu={closeMenu} user={user}></SideNav>
      <div className="md:ml-[16.68vw] flex flex-col flex-grow md:w-10/12 bg-agent">
        <TopBar email={email}></TopBar>
        <div className="flex justify-center pt-7 pb-7">
          <div className="flex flex-wrap justify-center gap-10">
            {isLoading ? (
              <p>Loading data...</p>
            ) : (
              brandsById?.map((car) => (
                <Link key={car.id} to={`/list/car/${car.id}`}>
                  <div key={car.id} className="card bg-white shadow-md">
                    <div className="image-container">
                      {car.photo_url ? (
                        <img
                          src={`http://localhost:3001/${car.photo_url}`}
                          alt="Card Image"
                          className="card-image"
                        />
                      ) : (
                        <div className="no-image-placeholder">
                          No Image Available
                        </div>
                      )}
                    </div>
                    <div className="card-content">
                      <h3>{car.name}</h3>{' '}
                      <h3 className="text-[#d60000] font-medium text-lg">
                        ${car.price}
                      </h3>{' '}
                      <p className="text-sm mb-5 h-14 line-clamp-3">
                        {car.description}
                      </p>{' '}
                      <div className="grid grid-cols-2">
                        <div className="flex gap-2 items-center">
                          <BsSpeedometer2 className="text-lg" />
                          <p>{car.top_speed} Km/h</p>{' '}
                        </div>

                        <div className="flex gap-2 items-center">
                          <GiPathDistance className="text-xl" />
                          <p>{car.mileage} Km</p>{' '}
                        </div>
                        <div className="flex gap-2 items-center">
                          <IoMdSettings className="text-xl" />
                          <p>{car.engine}</p>{' '}
                        </div>
                        <div className="flex gap-2 items-center">
                          <FaCubes className="text-lg" />
                          <p>{car.cc}</p>{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
        {brandsById?.length === 0 && (
          <h2 className="text-xl font-medium text-center mb-10">
            There is no car for this brand
          </h2>
        )}
        {!isLoading && (
          <Link
            to="/list"
            className="bg-[#d60000] hover:bg-red-700 text-white font-medium px-2 py-2 w-20 mb-10 mt-4 self-center text-center rounded"
          >
            Back
          </Link>
        )}
      </div>
    </div>
  );
};

export default CarListByBrand;
