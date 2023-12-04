import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { MdEmail, MdLock } from 'react-icons/md';
import { useState } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

const Login = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const encryptData = (data, key) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key);
    return encrypted.toString();
  };

  const key = import.meta.env.VITE_MY_SECRET_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        `http://localhost:3001/login`,
        {
          user: {
            email: email,
            password: password,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        }
      )
      .then((response) => {
        const token = response.headers['authorization']?.split(' ')[1];
        const { id, email, name, role, avatar_url } = response.data.data;
        const user = { id, email, token, name, role, avatar_url };

        const encryptedUserData = encryptData(user, key);
        localStorage.setItem('Rentacar', encryptedUserData);

        navigate('/dashboard', { state: { reload: true } });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex bg-[#fdf9f9]">
      <Toaster />
      <div className="image-background hidden lg:block"></div>
      <div className="lg:w-[50%] flex flex-col items-center justify-center">
        <img
          src="images/Logorent.png"
          alt="Logo"
          className="w-[30%] mb-[6rem] mt-28 lg:mt-0"
        />
        <div className="flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-[#fdf9f9] lg:w-[32vw] px-8 rounded-lg w-[80vw] sm:w-[60vw]"
          >
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 text-[1rem] font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full shadow text-sm border rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-red-700"
                placeholder="Enter your email"
                autoComplete="off"
                required
              />
              <MdEmail className="h-5 w-5 absolute right-4 top-[73%] transform -translate-y-1/2"></MdEmail>
            </div>
            <div className="mb-4 relative">
              <label
                className="block font-satoshi text-gray-700 text-[1rem] font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-red-700"
                placeholder="6+ Characters, 1 Capital letter"
                required
              />
              <MdLock className="h-5 w-5 absolute right-4 top-[73%] transform -translate-y-1/2"></MdLock>
            </div>

            <span className="text-sm font-satoshi flex font-normal blue-text justify-end mb-2">
              Forgot Password?
            </span>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className=" text-white bg-[#be0000] mt-4 w-full py-[0.7rem] shadow font-medium px-4 rounded-md hover:bg-red-800 focus:outline-none focus:bg-red-800"
              >
                Sign In
              </button>
            </div>
          </form>
          <span className="text-sm font-satoshi flex gap-2 justify-center font-bold mt-6">
            Don´t have an account?{' '}
            <Link to="/signup">
              <p className="text-sm font-medium flex text-[#be0000]">Sign Up</p>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
