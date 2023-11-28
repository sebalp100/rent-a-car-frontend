import { useState } from 'react';
import TopBar from '../../components/TopBar';
import SideNav from '../dashboard/SideNav';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetCarsDetailsQuery } from '../../api/authApi';

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
    <div className="flex">
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
                  className="flex gap-10 mt-10 justify-center items-center"
                  key={details.id}
                >
                  <div className="w-[50%]">
                    <img
                      src={`http://localhost:3001${details.photo_url}`}
                      alt={`${details.model} Picture`}
                      className="shadow"
                    />
                  </div>
                  <div className="w-[50%] flex flex-col items-end">
                    <div className="text-sm font-medium pb-4">
                      <h3>{details.model}</h3>
                    </div>
                    <div className="text-sm font-medium pb-4">
                      <h3>{details.year}</h3>
                    </div>
                    <div className="text-sm font-medium pb-4">
                      <h3>{details.price}</h3>
                    </div>
                    <div className="text-sm font-medium pb-4">
                      <h3>{details.gear}</h3>
                    </div>
                    <div className="text-sm font-medium pb-4">
                      <h3>{details.cc}</h3>
                    </div>
                    <div className="text-sm font-medium pb-4">
                      <h3>{details.top_speed}</h3>
                    </div>
                    <div className="text-sm font-medium pb-4">
                      <h3>{details.mileage}</h3>
                    </div>
                  </div>
                </div>
                <div className="pt-10 w-full">
                  <p className="text-lg ">{details.description}</p>
                </div>
                <button
                  onClick={goBack}
                  className="bg-orange-500 text-white font-medium px-2 py-2 w-20 mb-10 mt-4 self-center text-center rounded"
                >
                  Back
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
