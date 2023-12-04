import { useState } from 'react';
import TopBar from '../../components/TopBar';
import SideNav from '../dashboard/SideNav';
import './CarList.css';
import { useGetBrandsQuery } from '../../api/authApi';
import { Link } from 'react-router-dom';

const CarList = ({ user }) => {
  const [sidebar, setSidebar] = useState(false);
  const token = user?.token;
  const email = user?.email;
  const { data: brands, isLoading } = useGetBrandsQuery(token);

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
              brands?.map((brand) => (
                <Link key={brand.id} to={`/list/${brand.id}`}>
                  <div
                    className="flex flex-col bg-white justify-center h-80 relative polaroid items-center w-[20rem]"
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
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarList;
