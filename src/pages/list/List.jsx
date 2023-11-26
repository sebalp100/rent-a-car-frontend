import { useState } from 'react';
import TopBar from '../../components/TopBar';
import SideNav from '../dashboard/SideNav';
import { brands } from './CarList';
import './CarList.css';
import { useGetCarsQuery } from '../../api/authApi';

const CarList = ({ user }) => {
  const [sidebar, setSidebar] = useState(false);
  const token = user?.token;
  const email = user?.email;

  const { data: cars, isLoading } = useGetCarsQuery(token);
  console.log(cars);

  const showMenu = () => setSidebar(true);
  const closeMenu = () => setSidebar(false);
  return (
    <div className="flex">
      <SideNav sidebar={sidebar} closeMenu={closeMenu}></SideNav>
      <div className="md:ml-[16.68vw] flex flex-col flex-grow md:w-10/12 bg-agent">
        <TopBar email={email}></TopBar>
        <div className="flex justify-center pt-7 pb-7">
          <div className="flex flex-wrap justify-center gap-10">
            {brands.map((brand, index) => (
              <div
                className="flex flex-col justify-center h-80 relative polaroid items-center w-[20rem]"
                key={index}
              >
                <div>
                  <img
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    className="p-5"
                  />
                </div>

                <div className="text-sm absolute bottom-0 font-medium pb-4">
                  <h3>{brand.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarList;
