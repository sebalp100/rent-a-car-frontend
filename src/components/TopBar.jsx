import { BsBell } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import CryptoJS from 'crypto-js';

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
        <p className="text-sm">{email || email2}</p>
        <FaUserCircle className="text-3xl"></FaUserCircle>
        <BsBell className="text-lg"></BsBell>
      </div>
    </div>
  );
};

export default TopBar;
