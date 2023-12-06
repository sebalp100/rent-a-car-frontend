import { useEffect, useState } from 'react';
import SideNav from './SideNav';
import TopBar from '../../components/TopBar';
import { BsSpeedometer2 } from 'react-icons/bs';
import { GiPathDistance } from 'react-icons/gi';
import { IoMdSettings } from 'react-icons/io';
import { FaCubes } from 'react-icons/fa';
import { useGetFeaturedQuery } from '../../api/authApi';
import { Link } from 'react-router-dom';
import Carousel from 'nuka-carousel';
import { CircularProgress } from '@mui/material';

const Dashboard = ({ user }) => {
  const [sidebar, setSidebar] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const token = user?.token;
  const email = user?.email;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const settings = {
    slidesToShow,
    autoplay: true,
    wrapAround: true,
    autoplayInterval: 5000,
  };

  const { data: featuredCars, isLoading } = useGetFeaturedQuery(token);

  const showMenu = () => setSidebar(true);
  const closeMenu = () => setSidebar(false);
  return (
    <div className="bg-[#fdf9f9] min-h-[100vh]">
      <SideNav sidebar={sidebar} closeMenu={closeMenu} user={user}></SideNav>
      <div className="md:ml-[16.68vw]  md:w-10/12 bg-agent">
        <TopBar email={email}></TopBar>
        <div className="ml-[8vw]">
          <h1 className="ml-[-8vw] pb-10 text-3xl pt-10 text-center  font-medium">
            FEATURED <span className="text-[#d60000]">CARS</span>
          </h1>
          <div className=" flex">
            {isLoading ? (
              <div className="absolute right-[40%] top-[45%] justify-center">
                <CircularProgress color="inherit" />
              </div>
            ) : (
              <Carousel {...settings}>
                {featuredCars.map((car) => (
                  <Link key={car.id} to={`/list/car/${car.id}`}>
                    <div key={car.id} className="bg-white shadow-md">
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
                        <h3 className="text-[#d60000] font-medium text-xl">
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
                ))}
              </Carousel>
            )}
          </div>
          {!isLoading && (
            <Link to="/list">
              <button className="rounded py-2  mb-4 ml-[30vw] px-4 font-medium mt-14 bg-[#d60000] text-white hover:bg-red-700">
                SEE ALL
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
