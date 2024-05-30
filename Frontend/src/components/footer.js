import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className='bg-gray-800 text-white py-8'>
        <div className='max-w-screen-xl mx-auto px-4'>
          <div className='flex flex-wrap justify-between'>
            <div className='w-full sm:w-1/2 lg:w-1/4 mb-6'>
              <h3 className='font-bold text-lg mb-2'>About Us</h3>
              <p className='text-sm'>
                We are a leading food ordering platform providing a variety of
                cuisines from the best restaurants in your city.
              </p>
            </div>
            <div className='w-full sm:w-1/2 lg:w-1/4 mb-6'>
              <h3 className='font-bold text-lg mb-2'>Quick Links</h3>
              <ul>
               <Link to='/'>
               <li>
                  <li className='text-sm mb-1 hover:underline'>Home</li>
                </li></Link>
                <Link to='/menu'>
                
                <li>
                  <li className='text-sm mb-1 hover:underline'>Menu</li>
                </li></Link>
                <Link to='/contact-us'>
                <li>
                  <li  className='text-sm mb-1 hover:underline'>
                    Contact Us
                  </li>
                </li> </Link>
                <Link to='/about-us'>
                <li>
                  <li  className='text-sm mb-1 hover:underline'>
                    About Us
                  </li>
                </li></Link>
              </ul>
            </div>
            <div className='w-full sm:w-1/2 lg:w-1/4 mb-6'>
              <h3 className='font-bold text-lg mb-2'>Customer Service</h3>
              <ul>
                <li>
                  <a href='#' className='text-sm hover:underline'>
                    FAQ
                  </a>
                </li>
                <li>
                  <a href='#' className='text-sm hover:underline'>
                    Support
                  </a>
                </li>
                <li>
                  <a href='#' className='text-sm hover:underline'>
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href='#' className='text-sm hover:underline'>
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className='w-full sm:w-1/2 lg:w-1/4 mb-6'>
              <h3 className='font-bold text-lg mb-2'>Contact Us</h3>
              <p className='text-sm'>123 Food Street, Cityname, Country</p>
              <p className='text-sm'>Email: support@foodorder.com</p>
              <p className='text-sm'>Phone: +123 456 7890</p>
            </div>
          </div>
          <div className='flex flex-wrap justify-between items-center mt-8'>
            <p className='text-sm'>
              &copy; 2024 FoodOrder. All rights reserved.
            </p>
            <div className='flex space-x-4'>
              <a href='https://facebook.com' className='hover:text-gray-400'>
                Facebook
              </a>
              <a href='https://twitter.com' className='hover:text-gray-400'>
                Twitter
              </a>
              <a href='https://instagram.com' className='hover:text-gray-400'>
                Instagram
              </a>
              <a href='https://linkedin.com' className='hover:text-gray-400'>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
