import { BsBell } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';

const TopBar = ({ email }) => {
  const decryptData = (encryptedData, key) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, key);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData || {};
    } catch (error) {
      return {};
    }
  };

  const key = import.meta.env.VITE_MY_SECRET_KEY;

  const storedEncryptedData = localStorage.getItem('Rentacar');
  const decryptedUserData = decryptData(storedEncryptedData, key);
  const email2 = decryptedUserData?.email;
  const profilePic = decryptedUserData?.avatar_url;

  return (
    <div className="flex bg-white justify-end items-center h-14 w-full shadow">
      <div className="flex font-medium gap-3 mr-5 items-center">
        {email2 ? (
          <p className="text-sm">{email2}</p>
        ) : (
          <Link to="/login">
            <button className="bg-[#d60000] hover:bg-red-700 rounded px-6 py-1 text-white font-medium">
              Login
            </button>
          </Link>
        )}
        {profilePic ? (
          <img
            src={`http://rent-a-car-backend-production-d292.up.railway.app${profilePic}`}
            alt="Profile picture"
            className="h-8 w-8 rounded-[50%] object-cover"
          />
        ) : (
          <FaUserCircle className="text-3xl"></FaUserCircle>
        )}

        <BsBell className="text-lg"></BsBell>
      </div>
    </div>
  );
};

export default TopBar;
