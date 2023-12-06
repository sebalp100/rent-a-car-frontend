import { Link, useNavigate } from 'react-router-dom';
import { MdEmail, MdLock } from 'react-icons/md';
import { FaAddressCard } from 'react-icons/fa';
import { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignUp = () => {
  const [email, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user[email]', email);
    formData.append('user[name]', name);
    formData.append('user[role]', 'admin');
    formData.append('user[password]', password);
    formData.append('user[avatar]', avatar);

    axios
      .post(
        `https://rent-a-car-backend-production-d292.up.railway.app/signup`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          mode: 'cors',
        }
      )
      .then(() => {
        toast.success('Registration succesfull');
        setError(null);
        navigate('/login');
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  return (
    <div className="flex bg-[#fdf9f9] min-h-[100vh]">
      <div className="image-background2 hidden lg:block"></div>
      <div className="lg:w-[50%] flex flex-col items-center justify-center">
        <img
          src="images/Logorent.png"
          alt="Logo"
          className="w-[15%] mb-[8%] mt-28 lg:mt-0"
        />
        <div className="flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className=" lg:w-[32vw] px-8 rounded-lg w-[80vw] sm:w-[60vw]"
          >
            <div className="mb-2 relative">
              <label
                className="block text-gray-700 text-[1rem] font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
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
            <div className="mb-2 relative">
              <label
                className="block text-gray-700 text-[1rem] font-medium mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full shadow text-sm border rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-red-700"
                placeholder="Enter your name"
                autoComplete="off"
                required
              />
              <FaAddressCard className="h-5 w-5 absolute right-4 top-[73%] transform -translate-y-1/2"></FaAddressCard>
            </div>
            <div className="mb-2 relative">
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
            <div className="mb-2 relative">
              <label
                className="block font-satoshi text-gray-700 text-[1rem] font-medium mb-2"
                htmlFor="confirmpassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-red-700"
                placeholder="6+ Characters, 1 Capital letter"
                required
              />
              <MdLock className="h-5 w-5 absolute right-4 top-[73%] transform -translate-y-1/2"></MdLock>
            </div>
            <div className="mb-2 relative">
              <label
                className="block font-satoshi text-gray-700 text-[1rem] font-medium mb-2"
                htmlFor="awatar"
              >
                Profile picture
              </label>
              <input
                type="file"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-red-700"
                placeholder="Choose a picture"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className=" text-white bg-[#d60000] mt-4 w-full py-[0.7rem] shadow font-medium px-4 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
              >
                Sign Up
              </button>
            </div>
          </form>
          <span className="text-sm font-satoshi flex gap-2 justify-center font-bold mt-6">
            Already have an account?{' '}
            <Link to="/login">
              <p className="text-sm font-medium flex text-[#d60000]">Sign In</p>
            </Link>
          </span>

          {error && <p className=" text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
