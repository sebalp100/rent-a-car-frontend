import { useState } from 'react';
import SideNav from './SideNav';

const Dashboard = () => {
  const [sidebar, setSidebar] = useState(false);

  const showMenu = () => setSidebar(true);
  const closeMenu = () => setSidebar(false);
  return (
    <div className="flex">
      <SideNav sidebar={sidebar} closeMenu={closeMenu}></SideNav>
      <div className="md:ml-[16.68vw] flex flex-col flex-grow md:w-10/12 bg-agent">
        <p>Welcome User</p>
      </div>
    </div>
  );
};

export default Dashboard;
