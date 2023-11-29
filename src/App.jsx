import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Homepage from './pages/homepage/Homepage';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Dashboard from './pages/dashboard/Dashboard';
import CryptoJS from 'crypto-js';
import CarList from './pages/list/List';
import AddCar from './pages/add_car/AddCar';
import DeleteCar from './pages/delete_car/DeleteCar';
import Brands from './pages/brands/Brands';
import CarListByBrand from './pages/list/ListByBrand';
import CarDetails from './pages/details/CarDetails';
import Reservations from './pages/reservations/Reservations';

function App() {
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

  const storedEncryptedData = localStorage.getItem('Rentacar') || {};
  const decryptedUserData = decryptData(storedEncryptedData, key);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={<Dashboard user={decryptedUserData} />}
          />
          <Route path="/list" element={<CarList user={decryptedUserData} />} />
          <Route
            path="/reservations"
            element={<Reservations user={decryptedUserData} />}
          />
          <Route
            path="/list/:brandId"
            element={<CarListByBrand user={decryptedUserData} />}
          />
          <Route
            path="/list/car/:carId"
            element={<CarDetails user={decryptedUserData} />}
          />
          <Route path="/add" element={<AddCar user={decryptedUserData} />} />
          <Route
            path="/remove"
            element={<DeleteCar user={decryptedUserData} />}
          />
          <Route path="/brands" element={<Brands user={decryptedUserData} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
