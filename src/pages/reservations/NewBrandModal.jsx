import { Dialog } from '@mui/material';
import { useState } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';
import {
  useAddReservationMutation,
  useGetAvailableCarsQuery,
} from '../../api/authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const NewReservationModal = ({ token, open2, onClose, userId }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [carId, setCarId] = useState('');
  const navigate = useNavigate();

  const { data: available } = useGetAvailableCarsQuery(token);

  const [addReservation, { isError }] = useAddReservationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rental = {
      car_id: carId,
      user_id: userId,
      rental_date: startDate,
      return_date: endDate,
    };

    const obj = { rental, token };

    try {
      await addReservation(obj).unwrap();

      toast.success('Reservation added successfully');
      onClose();
    } catch (error) {
      const errorMessagesArray = error.data.message?.split(', ');
      const errorAuth = error.data.error;

      if (errorAuth) {
        navigate('/login');
        setTimeout(() => {
toast('Please Login to rent a car', { icon: '⚠️' });
        }, 1000)
        
      }

      errorMessagesArray?.forEach((errorMessage) => {
        toast.error(errorMessage);
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Dialog open={open2} onClose={onClose} fullWidth maxWidth={'sm'}>
        <div className="modal  z-10 p-6 rounded-lg shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 p-2 hover:text-gray-700"
          >
            <FaRegWindowClose className="text-xl" />
          </button>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <h2 className="text-2xl text-center font-bold mb-4">
              Add Reservation
            </h2>
            <div className="mb-4">
              <label
                className="block font-satoshi text-gray-700 text-[1rem] font-medium mb-2"
                htmlFor="model"
              >
                Model
              </label>
              <select
                id="model"
                value={carId}
                onChange={(e) => setCarId(e.target.value)}
                className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none "
              >
                <option value="">Select a model</option>
                {available?.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.model} {car.year}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 flex justify-between">
              <div className="w-[40%]">
                <label
                  className="block font-satoshi text-gray-700 text-[1rem] font-medium mb-2"
                  htmlFor="rental_date"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="rental_date"
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Choose a date"
                  className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none"
                  required
                />
              </div>
              <div className="w-[40%]">
                <label
                  className="block font-satoshi text-gray-700 text-[1rem] font-medium mb-2"
                  htmlFor="rental_date"
                >
                  Return Date
                </label>
                <input
                  type="date"
                  id="rental_date"
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="Choose a date"
                  className="w-full border shadow text-sm rounded-lg py-3 px-3 text-gray-700 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              className="bg-[#d60000] text-white hover:bg-red-700  self-center font-semibold text-lg mt-10 py-2 w-28 rounded"
              type="submit"
            >
              Reserve
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default NewReservationModal;
