import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="flex bg-gray-800 font-medium justify-between px-[6%] py-[3.4vh] text-white">
      <div className="w-60">
        <img src="images/rentacaricon.png" alt="car icon" />
      </div>
      <div>
        <ul className="flex gap-6">
          <Link to="/" className="hover:text-orange-500">
            Home
          </Link>
          <Link to="/collection" className="hover:text-orange-500">
            Collection
          </Link>
          <Link to="/about" className="hover:text-orange-500">
            About
          </Link>
          <Link to="/contact" className="hover:text-orange-500">
            Contact
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
