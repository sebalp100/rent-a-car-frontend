import { useState } from 'react';
import TopBar from '../../components/TopBar';
import SideNav from '../dashboard/SideNav';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetCarsDetailsQuery } from '../../api/authApi';
import { BsSpeedometer2 } from 'react-icons/bs';
import { GiPathDistance } from 'react-icons/gi';
import { IoMdSettings } from 'react-icons/io';
import { FaCubes, FaBackward } from 'react-icons/fa';

const CarDetails = ({ user }) => {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const { carId } = useParams();
  const token = user?.token;
  const email = user?.email;
  const obj = { carId, token };

  const goBack = () => {
    navigate(-1);
  };

  const { data: details, isLoading } = useGetCarsDetailsQuery(obj);

  const showMenu = () => setSidebar(true);
  const closeMenu = () => setSidebar(false);

  return (
    <div className="flex bg-[#fdf9f9] min-h-[100vh]">
      <SideNav sidebar={sidebar} closeMenu={closeMenu}></SideNav>
      <div className="md:ml-[16.68vw] flex flex-col flex-grow md:w-10/12 bg-agent">
        <TopBar email={email}></TopBar>
        <div className="flex justify-center content-center pt-7 pb-7">
          <div className="flex flex-wrap justify-center gap-10">
            {isLoading ? (
              <p>Loading data...</p>
            ) : (
              <div className="flex flex-col px-10">
                <div
                  className="flex gap-10 mt-10 justify-center "
                  key={details.id}
                >
                  <div className="w-[50%]">
                    <img
                      src={`http://localhost:3001${details.photo_url}`}
                      alt={`${details.model} Picture`}
                      className="shadow"
                    />
                    <div className="flex pt-6 text-lg justify-between">
                      <h3
                        className="flex gap-1 items-center"
                        title={`Transmission: ${details.engine}`}
                      >
                        <IoMdSettings className="text-xl" />
                        {details.engine}
                      </h3>
                      <h3 className="flex gap-1 items-center" title="CC">
                        <FaCubes className="text-xl" />
                        {details.cc}
                      </h3>

                      <h3 className="flex gap-1 items-center" title="Top Speed">
                        <BsSpeedometer2 className="text-xl" />
                        {details.top_speed} Km/h
                      </h3>
                      <h3 className="flex gap-1 items-center" title="Mileage">
                        <GiPathDistance className="text-xl" />
                        {details.mileage} Km
                      </h3>
                    </div>
                  </div>

                  <div className="w-[50%] flex flex-col items-start">
                    <div className="pb-4 items-center flex justify-between w-full">
                      <h3 className="text-4xl font-medium">
                        {details.model} ({details.year})
                      </h3>
                      <div className="flex flex-col pb-4">
                        <h2 className="">Price per 24hs:</h2>
                        <h3 className="text-3xl text-[#d60000] font-medium">
                          ${details.price}.00
                        </h3>
                      </div>
                    </div>
                    <span className="w-full h-1 shadow mb-7"></span>
                    <div className="w-full">
                      <p className="">{details.description}</p>
                    </div>
                    <button className="bg-[#d60000] mt-10 py-2 px-2 text-white hover:bg-red-700">
                      Rent Now
                    </button>
                  </div>
                </div>
                <button
                  onClick={goBack}
                  className="bg-white  hover:bg-slate-600 hover:text-white shadow font-medium px-5 py-2 text-2xl mb-10 mt-10 self-start text-center rounded"
                >
                  <FaBackward />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
