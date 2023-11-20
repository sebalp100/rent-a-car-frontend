import {
  MdClose,
  MdHome,
  MdLocalCarWash,
  MdCarCrash,
  MdDirectionsCarFilled,
  MdAssignment,
} from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './SideNav.css';

const SideNav = (props) => {
  const navigate = useNavigate();

  async function handleClick() {
    navigate('/login');
  }

  return (
    <div
      className={`h-screen w-2/12 flex flex-col text-white bg-slate-900 justify-start fixed items-center sidebar-dashboard ${
        props.sidebar ? 'show' : ''
      }`}
    >
      <Link to="/">
        <img
          className="pb-4 pt-[3.8vh] w-[13vw] mb-10"
          src="images/rentacaricon.png"
          alt="Logo"
        />
      </Link>
      <button
        onClick={props.closeMenu}
        className="absolute top-3 right-4 md:hidden"
      >
        <MdClose className="close-button" />
      </button>
      <div className="flex flex-col w-10/12">
        <ul className="side-link">
          <NavLink
            to="/dashboard"
            className="flex cursor-pointer items-center py-[0.4rem] pl-2 sidebar-item gap-2 font-medium menu-item-name  rounded-sm"
          >
            <MdHome className="text-2xl"></MdHome>
            <p className="menu-links-text">Home</p>
          </NavLink>
          <NavLink
            to="/list"
            className="flex cursor-pointer items-center py-[0.4rem] pl-2 sidebar-item gap-2 font-medium menu-item-name rounded-sm"
          >
            <MdDirectionsCarFilled className="text-2xl"></MdDirectionsCarFilled>
            <p className="menu-links-text">Car List</p>
          </NavLink>
          <NavLink
            to="/reservations"
            className="flex cursor-pointer items-center py-[0.4rem] pl-2 sidebar-item gap-2 font-medium menu-item-name rounded-sm"
          >
            <MdAssignment className="text-2xl menu-links-text"></MdAssignment>
            <p className="menu-links-text">Reservations</p>
          </NavLink>
          <NavLink
            to="/add"
            className="flex cursor-pointer items-center py-[0.4rem] pl-2 sidebar-item gap-2 font-medium menu-item-name rounded-sm"
          >
            <MdLocalCarWash className="text-2xl menu-links-text"></MdLocalCarWash>
            <p className="menu-links-text">Add Car</p>
          </NavLink>
          <NavLink
            to="/remove"
            className="flex cursor-pointer items-center py-[0.4rem] pl-2 sidebar-item gap-2 font-medium menu-item-name rounded-sm"
          >
            <MdCarCrash className="text-2xl menu-links-text"></MdCarCrash>
            <p className="menu-links-text">Remove Car</p>
          </NavLink>
        </ul>
      </div>
      <div className="flex flex-col logout-sidebar w-10/12 mb-[5vh]">
        <div className="flex pl-2 cursor-pointer mt-[46vh] py-[0.4rem] gap-2 text-red-500 font-medium hover:bg-red-700 menu-item-name hover:text-white rounded-sm">
          <CiLogout className="text-2xl menu-links-text"></CiLogout>
          <button onClick={handleClick}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;