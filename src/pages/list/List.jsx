import { useState } from 'react';
import TopBar from '../../components/TopBar';
import SideNav from '../dashboard/SideNav';
import './CarList.css';
import { useGetBrandsQuery } from '../../api/authApi';

const CarList = ({ user }) => {
  const [sidebar, setSidebar] = useState(false);
  const token = user?.token;
  const email = user?.email;
  const { data: brands } = useGetBrandsQuery(token);

  const showMenu = () => setSidebar(true);
  const closeMenu = () => setSidebar(false);
  return (
    <div className="flex">
      <SideNav sidebar={sidebar} closeMenu={closeMenu}></SideNav>
      <div className="md:ml-[16.68vw] flex flex-col flex-grow md:w-10/12 bg-agent">
        <TopBar email={email}></TopBar>
        <div className="flex justify-center pt-7 pb-7">
          <div className="flex flex-wrap justify-center gap-10">
            {brands.map((brand) => (
              <div
                className="flex flex-col justify-center h-80 relative polaroid items-center w-[20rem]"
                key={brand.id}
              >
                <div>
                  <img
                    src={`http://localhost:3001${brand.photo_url}`}
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
