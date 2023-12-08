import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-[100vh] flex bg-[#fdf9f9] flex-col justify-between w-full">
      <NavBar></NavBar>
      <section
        id="contact"
        className="flex pt-10 px-10 w-full flex-col justify-center items-center"
      >
        <div className="w-full ">
          <div className="flex flex-wrap ">
            <div className="grow-0 shrink-0 basis-auto mb-6 md:mb-0 w-full md:w-6/12 px-3 lg:px-6">
              <h2 className="text-3xl font-bold mb-6">Contact us</h2>
              <p className="mb-6">
                At Rent a Car, we invite you to experience a world of
                unparalleled service and convenience, where every journey is
                crafted to perfection. Your satisfaction is our top priority,
                and we are committed to providing you with seamless and
                personalized assistance throughout your rental experience.
              </p>
              <div className="mt-8 justify-start mb-6 flex gap-4">
                <Link to="https://www.twitter.com">
                  <FaTwitter className="text-2xl transition-transform transform hover:text-red-600 hover:scale-150 duration-300 ease-in-out" />
                </Link>
                <Link to="https://www.facebook.com">
                  <FaFacebook className="text-2xl transition-transform transform hover:text-red-600 hover:scale-150 duration-300 ease-in-out" />
                </Link>
                <Link to="https://www.instagram.com">
                  <FaInstagram className="text-2xl transition-transform transform hover:text-red-600 hover:scale-150 duration-300 ease-in-out" />
                </Link>
              </div>
            </div>
            <div className="grow-0 shrink-0 basis-auto mb-12 md:mb-0 w-full md:w-6/12 px-3 lg:px-6">
              <form action="https://formspree.io/f/mgeqkbez" method="post">
                <div className="form-group mb-6">
                  <input
                    type="text"
                    name="Name"
                    className="form-control block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
                    id="exampleInput7"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="form-group mb-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
                    id="exampleInput8"
                    placeholder="Email address"
                    required
                  />
                </div>
                <div className="form-group mb-6">
                  <textarea
                    className="
              form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none
            "
                    id="exampleFormControlTextarea13"
                    rows="6"
                    placeholder="Message"
                    required
                    name="message"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#d60000] hover:bg-red-700 rounded px-6 py-2 text-white font-medium"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default Contact;
