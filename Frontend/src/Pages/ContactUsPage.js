import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/footer';

function ContactUsPage() {
  const heading = 'Contact Me';
  return (
    <div>
      <Navbar>
        <div className='bg-white'>
          <div
            id='Contact'
            className='mx-auto flex flex-col min-h-screen justify-center items-center'
          >
            <h1 className='text-3xl font-bold leading-tight text-black text-center'>
              {heading}
            </h1>

            <form className='w-2/3 md:w-1/3 space-y-8 flex flex-col'>
              <div>
                <input
                  type='text'
                  name='name'
                  className=' border-b border-yellow-900 placeholder-zinc-500 bg-transparent focus:outline-none w-full mt-12 xl:mt-36 py-3 transition-transform hover:border-b-2'
                  placeholder='Name'
                />
              </div>
              <div>
                <input
                  type='text'
                  name='number'
                  className='border-b border-yellow-900 placeholder-zinc-500 bg-transparent focus:outline-none w-full py-3 transition-transform hover:border-b-2'
                  placeholder='Number'
                />
              </div>
              <div>
                <textarea
                  name='message'
                  className='border-b border-yellow-900 placeholder-zinc-500 bg-transparent focus:outline-none w-full py-3 transition-transform hover:border-b-2'
                  rows='4'
                  placeholder='Message'
                ></textarea>
              </div>
              <button
                type='submit'
                className='bg-nav-blue text-amber-50 mx-auto mt-4 p-2 w-48'
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </Navbar>
      <Footer></Footer>
    </div>
  );
}

export default ContactUsPage;
