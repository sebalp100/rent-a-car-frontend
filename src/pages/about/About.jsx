import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import Card from './Card';
import './about.css';

const About = () => {
  return (
    <div className="min-h-[100vh] flex flex-col justify-between bg-[#fdf9f9] w-full">
      <NavBar></NavBar>
      <div className="flex flex-col items-center flex-grow">
        <h3 className="text-2xl font-medium mb-10 pt-10">Why Us?</h3>
        <p className="px-[10%] pb-10">
          Welcome to Rent a Car, where exceptional journeys begin. Discover a
          world of premium car rentals designed for comfort, style, and
          unforgettable experiences. Our diverse fleet awaits to elevate every
          drive, whether it´s a business trip or a weekend getaway.
        </p>
        <div className="flex card-contain flex-col md:flex-row flex-wrap items-center justify-center">
          <Card
            h2={'Memorable Journeys'}
            h3={'Road to adventure'}
            p={
              'Every drive becomes a story and every destination is a new experience.'
            }
            src={
              'https://static.vecteezy.com/system/resources/previews/003/582/352/mp4/aerial-view-white-car-travels-in-beautiful-free-video.mp4'
            }
          />
          <Card
            h2={'Diverse Fleet'}
            h3={'Curated selection'}
            p={'Sleek sedans, powerful SUVs, and luxurious sports cars.'}
            src={
              'https://static.vecteezy.com/system/resources/previews/006/619/182/mp4/aerial-new-car-storage-parking-lot-showing-imported-new-vehicles-or-ready-to-export-new-automobiles-storage-facility-car-industry-for-export-all-over-the-world-market-for-car-sales-free-video.mp4'
            }
          />
          <Card
            h2={'Effortless Booking'}
            h3={'Great experience'}
            p={
              'Seamless and user-friendly online booking for a stress-free rental process.'
            }
            src={
              'https://static.vecteezy.com/system/resources/previews/023/205/073/mp4/lease-rental-car-sell-buy-dealership-manager-send-car-keys-to-the-new-owner-sales-loan-credit-financial-rent-vehicle-insurance-renting-seller-dealer-installment-car-care-business-free-video.mp4'
            }
          />
          <Card
            h2={'Reliability'}
            h3={'Count on us '}
            p={
              'Reliable service and punctual deliveries, so you are always on time.'
            }
            src={
              'https://static.vecteezy.com/system/resources/previews/033/533/480/mp4/woman-shows-the-car-key-at-the-dealership-free-video.mp4'
            }
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
