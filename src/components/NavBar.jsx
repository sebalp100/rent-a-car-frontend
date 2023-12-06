import { Link } from 'react-router-dom';

const NavBar = ({ profilePic }) => {
  return (
    <nav className="flex bg-[#1e1e1e] font-medium justify-between px-[6%] py-[2.9vh] text-white">
      <div className="h-7 flex items-center">
        <img src="images/Logorentwhite.png" className=" h-14" alt="car icon" />
      </div>
      <div>
        <ul className="flex gap-6 items-center text-sm sm:text-base">
          <Link to="/" className="hover:text-[#d60000]">
            Home
          </Link>
          <Link to="/about" className="hover:text-[#d60000]">
            About
          </Link>
          <Link to="/contact" className="hover:text-[#d60000]">
            Contact
          </Link>
          <Link to="/dashboard" className="hover:text-[#d60000]">
            Dashboard
          </Link>
          {profilePic ? (
            <img
              src={`http://localhost:3001${profilePic}`}
              alt="Profile picture"
              className="h-8 w-8 rounded-[50%] object-cover"
            />
          ) : (
            <Link to="/login">
              <button className="bg-[#d60000] hover:bg-red-700 rounded px-6 py-1 text-white font-medium">
                Login
              </button>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
