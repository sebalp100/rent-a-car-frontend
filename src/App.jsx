import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Homepage from './pages/homepage/Homepage';
import Collection from './pages/collection/Collection';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Login from './pages/login/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
