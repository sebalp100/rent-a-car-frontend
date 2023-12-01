import { useState } from 'react';
import SideNav from './SideNav';
import TopBar from '../../components/TopBar';
import { BsSpeedometer2 } from 'react-icons/bs';
import { GiPathDistance } from 'react-icons/gi';
import { IoMdSettings } from 'react-icons/io';
import { FaCubes } from 'react-icons/fa';
import { useGetFeaturedQuery } from '../../api/authApi';
import { Link } from 'react-router-dom';

const Dashboard = ({ user }) => {
  const [sidebar, setSidebar] = useState(false);
  const token = user?.token;
  const email = user?.email;

  const { data: featuredCars, isLoading } = useGetFeaturedQuery(token);

  const showMenu = () => setSidebar(true);
  const closeMenu = () => setSidebar(false);
  return (
    <div className="flex">
      <SideNav sidebar={sidebar} closeMenu={closeMenu}></SideNav>
      <div className="md:ml-[16.68vw] flex flex-col flex-grow md:w-10/12 bg-agent">
        <TopBar email={email}></TopBar>
        <div className="flex h-[80vh] justify-between pt-10 flex-col items-center">
          <h1 className="pb-7 text-3xl font-medium">
            FEATURED <span className="text-orange-500">CARS</span>
          </h1>
          <div>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {featuredCars.map((car) => (
                  <Link key={car.id} to={`/list/car/${car.id}`}>
                    <div key={car.id} className="card shadow-md">
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
                        <h3 className="text-orange-500 font-medium text-lg">
                          ${car.price}
                        </h3>{' '}
                        <p className="text-sm h-20 pb-4">{car.description}</p>{' '}
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
                ))}
              </div>
            )}
          </div>
          <Link to="/list">
            <button className="rounded py-2 px-4 font-medium mt-4 bg-orange-500 text-white hover:bg-orange-400">
              SEE ALL
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
