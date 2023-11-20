import { BsBell } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const TopBar = () => {
  return (
    <div className="flex justify-end items-center h-14 w-full shadow">
      <div className="flex gap-3 mr-5 items-center">
        <div className="flex ml-4 gap-2 items-center">
          <FaMagnifyingGlass></FaMagnifyingGlass>
          <input
            type="text"
            placeholder="Search..."
            className="pl-2 border-2 border-slate-800"
          />
        </div>
        <p className="text-sm">usertest1@gmail.com</p>
        <FaUserCircle className="text-3xl"></FaUserCircle>
        <BsBell className="text-lg"></BsBell>
      </div>
    </div>
  );
};

export default TopBar;
