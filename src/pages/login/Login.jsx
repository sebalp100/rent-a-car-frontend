import { Link } from 'react-router-dom';
import './Login.css';
import { MdEmail, MdLock } from 'react-icons/md';

const Login = () => {
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
          <form className="bg-white lg:w-[32vw] px-8 rounded-lg w-[80vw] sm:w-[60vw]">
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 text-[1rem] font-medium mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                type="text"
                id="username"
                className="w-full shadow text-sm border rounded-lg py-3 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter your username"
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
                className=" text-white bg-orange-500 mt-4 w-full py-[0.8rem] shadow font-medium px-4 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-400"
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
