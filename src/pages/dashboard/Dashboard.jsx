import { useState } from 'react';
import SideNav from './SideNav';
import TopBar from '../../components/TopBar';
import { BsSpeedometer2 } from 'react-icons/bs';
import { GiPathDistance } from 'react-icons/gi';
import { IoMdSettings } from 'react-icons/io';
import { FaCubes } from 'react-icons/fa';

const Dashboard = () => {
  const [sidebar, setSidebar] = useState(false);

  const showMenu = () => setSidebar(true);
  const closeMenu = () => setSidebar(false);
  return (
    <div className="flex">
      <SideNav sidebar={sidebar} closeMenu={closeMenu}></SideNav>
      <div className="md:ml-[16.68vw] flex flex-col flex-grow md:w-10/12 bg-agent">
        <TopBar></TopBar>
        <div className="flex h-[80vh] justify-between pt-10 flex-col items-center">
          <h1 className="pb-7 text-3xl font-medium">
            FEATURED <span className="text-orange-500">CARS</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="card shadow-md">
              <div className="image-container">
                <img
                  src="images/pexels-mike-bird-170811.jpg"
                  alt="Card Image"
                  className="card-image"
                />
              </div>
              <div className="card-content">
                <h3>New car</h3>
                <h3 className="text-orange-500 font-medium text-lg">$300</h3>
                <p className="text-sm pb-4">
                  Experience luxury and performance with the BMW Sedan.
                  Impeccable craftsmanship meets cutting-edge technology,
                  delivering a smooth and powerful driving experience.
                </p>
                <div className="grid grid-cols-2">
                  <div className="flex gap-2 items-center">
                    <BsSpeedometer2 className="text-lg" />
                    <p>240 Km/h</p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <GiPathDistance className="text-xl" />
                    <p>2000 Km</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <IoMdSettings className="text-xl" />
                    <p>Manual</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <FaCubes className="text-lg" />
                    <p>8cyl 4.4L</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card shadow-md">
              <div className="image-container">
                <img
                  src="images/pexels-mike-bird-116675.jpg"
                  alt="Card Image"
                  className="card-image"
                />
              </div>
              <div className="card-content">
                <h3>New car</h3>
                <h3 className="text-orange-500 font-medium text-lg">$300</h3>
                <p className="text-sm pb-4">
                  Experience luxury and performance with the BMW Sedan.
                  Impeccable craftsmanship meets cutting-edge technology,
                  delivering a smooth and powerful driving experience.
                </p>
                <div className="grid grid-cols-2">
                  <div className="flex gap-2 items-center">
                    <BsSpeedometer2 className="text-lg" />
                    <p>240 Km/h</p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <GiPathDistance className="text-xl" />
                    <p>2000 Km</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <IoMdSettings className="text-xl" />
                    <p>Manual</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <FaCubes className="text-lg" />
                    <p>8cyl 4.4L</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card shadow-md">
              <div className="image-container">
                <img
                  src="images/pexels-johnmark-smith-253096.jpg"
                  alt="Card Image"
                  className="card-image"
                />
              </div>
              <div className="card-content">
                <h3>New car</h3>
                <h3 className="text-orange-500 font-medium text-lg">$300</h3>
                <p className="text-sm pb-4">
                  Experience luxury and performance with the BMW Sedan.
                  Impeccable craftsmanship meets cutting-edge technology,
                  delivering a smooth and powerful driving experience.
                </p>
                <div className="grid grid-cols-2">
                  <div className="flex gap-2 items-center">
                    <BsSpeedometer2 className="text-lg" />
                    <p>240 Km/h</p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <GiPathDistance className="text-xl" />
                    <p>2000 Km</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <IoMdSettings className="text-xl" />
                    <p>Manual</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <FaCubes className="text-lg" />
                    <p>8cyl 4.4L</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="rounded py-2 px-4 font-medium mt-4 bg-orange-500 text-white hover:bg-orange-400">
            SHOW ALL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
