import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { MdEmail, MdLock } from 'react-icons/md';
import { useState } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';

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
        const name = 'test3';
        const { id, email } = response.data.data;
        const user = { id, email, token, name };
        console.log(user);

        const encryptedUserData = encryptData(user, key);
        console.log('Encrypted Data:', encryptedUserData);
        localStorage.setItem('Rentacar', encryptedUserData);

        navigate('/dashboard');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex">
      <div className="image-background hidden lg:block"></div>
      <div className="lg:w-[50%] flex flex-col items-center justify-center">
        <img
          src="images/logo2.png"
          alt="Logo"
          className="w-[50%] mb-[10rem] mt-28 lg:mt-0"
        />
        <div className="flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white lg:w-[32vw] px-8 rounded-lg w-[80vw] sm:w-[60vw]"
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
                className="w-full shadow text-sm border rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
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
                className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
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
                className=" text-white bg-orange-500 mt-4 w-full py-[0.7rem] shadow font-medium px-4 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-400"
              >
                Sign In
              </button>
            </div>
          </form>
          <span className="text-sm font-satoshi flex gap-2 justify-center font-bold mt-6">
            Don´t have an account?{' '}
            <Link to="/signup">
              <p className="text-sm font-medium flex text-orange-500">
                Sign Up
              </p>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
