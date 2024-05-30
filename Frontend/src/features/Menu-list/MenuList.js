import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
  ShoppingBagIcon,
} from '@heroicons/react/20/solid';

import {
  selectAllProducts,
  selectAllProductsByCategories,
  fetchProductByCategoriesAsync,
} from './MenuSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addItemAsync, fetchCartItemAsync } from '../cart/cartSlice';
import { useLocation } from 'react-router-dom';
import { verifyTokenAsync } from '../auth/authSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function MenuList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [isVeg, setIsVeg] = useState(false);
  const location=useLocation();
  
  const [categoryName, setcategoryName] = useState(location.state?.categoryName||' ');
  const products = useSelector(selectAllProducts);
  const subCategories = useSelector(selectAllProductsByCategories);
  const dispatch = useDispatch();
  const toogleveg = () => {
    setIsVeg((prev) => !prev);
  };
  const HandleFilter = (name) => {
    setcategoryName(name);
  };
  
  useEffect(() => {
    // console.log(categoryName,isVeg);
    dispatch(fetchProductByCategoriesAsync([categoryName, isVeg]));
  }, [categoryName, isVeg]);

  useEffect(() => {
    dispatch(verifyTokenAsync());
    dispatch(fetchCartItemAsync());
    
  }, []);

  return (
    <div className='bg-white'>
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative  z-40 lg:hidden'
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='relative top-14 ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl'>
                  <div className='flex items-center justify-between px-4'>
                    <h2 className='text-lg font-medium text-gray-900'>
                      Filters
                    </h2>
                    <button
                      type='button'
                      className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className='sr-only'>Close menu</span>
                      <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>

                  <form className='mt-4 border-t border-gray-200'>
                    <h3 className='sr-only'>Categories</h3>
                    <ul
                      role='list'
                      className='px-2 py-3 font-medium text-gray-900'
                    >
                      {subCategories.map((category) => (
                        <li key={category.Name}>
                          <a
                            className=' cursor-pointer'
                            onClick={(e) => {
                              HandleFilter(category.Name);
                            }}
                          >
                            {category.Name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8    '>
          <div className='flex  items-baseline justify-between border-b border-gray-200 pb-6 pt-24  top-0   xl:fixed '>
            <h1 className='text-4xl ml-7 font-bold tracking-tight text-gray-900'>
              Menu
            </h1>

            <div className='flex items-center '>
              <Menu as='div' className='relative inline-block text-left'>
                <div>
                  {/* <Menu.Button className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
                    Sort
                    <ChevronDownIcon
                      className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                  </Menu.Button> */}
                </div>
                {/* 
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? 'font-medium text-gray-900'
                                  : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition> */}
              </Menu>

              {/* <button
                type='button'
                className='-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7'
              >
                <span className='sr-only'>View grid</span>
                <Squares2X2Icon className='h-5 w-5' aria-hidden='true' />
              </button> */}
              <button
                type='button'
                className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className='sr-only'>Our Menu</span>
                <FunnelIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>
          </div>

          <section aria-labelledby='products-heading' className='pb-24 pt-6  '>
            <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 sticky top-0'>
              {/* Filters */}
              <form className='hidden lg:block '>
                <ul
                  role='list'
                  className='space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 sticky top-[200px] '
                >
                  {subCategories.map((category) => (
                    <li
                      className='text-xl text-center rounded-md hover:font-bold'
                      key={category.Name}
                    >
                      <a
                        className=' cursor-pointer'
                        onClick={(e) => {
                          HandleFilter(category.Name);
                        }}
                      >
                        {category.Name}
                      </a>
                    </li>
                  ))}
                </ul>
              </form>

              {/* Product grid */}
              <div className='lg:col-span-3'>
                {/* Menu Grid Start from here */}
                <MenuGrid
                  products={products}
                  toogleveg={toogleveg}
                  isVeg={isVeg}
                  categoryName={categoryName}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// menu grid
function MenuGrid({ products, toogleveg, isVeg, categoryName }) {
  const dispatch = useDispatch();

  // console.log(products);

  let Name = categoryName == null ? 'Our Menu' : categoryName;
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className=' flex justify-between'>
          <h1 className='text-2xl font-bold'>{Name}</h1>
          <div className='flex items-center space-x-4 p-4 bg-white rounded-md'>
            <span className={`text-gray-700 ${isVeg ? 'font-semibold' : ''}`}>
              Pure-Veg
            </span>
            <div
              onClick={toogleveg}
              className={`relative w-16 h-8 ${
                isVeg ? 'bg-green-600' : 'bg-red-600'
              } rounded-full cursor-pointer transition-colors duration-300`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  isVeg ? 'translate-x-0' : 'translate-x-9'
                }`}
              />
            </div>
            <span
              className={`text-gray-700 ${!isVeg ? 'font-semibold' : ''}`}
            ></span>
          </div>
        </div>
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2  '>
          {products?.map((product) => (
            <div
              key={product._id}
              className='w-90 max-w-400 h-auto m-4 p-4 flex flex-col items-center rounded-md shadow-md'
            >
              <div className='w-full aspect-w-1 aspect-h-1 overflow-hidden'>
                <img
                  src={product.image}
                  alt=''
                  className='object-cover w-full h-full'
                />
              </div>
              <div className='mt-5'>
                <div className='flex justify-between'>
                  <div className='text-green-600 text-lg'>
                    ₹{product.Unit_Price}
                  </div>
                  <div className='text-xl'>{product.Name}</div>
                </div>
                <div className='mt-2'>{product.Description}</div>
                <div className='flex justify-center items-center'>
                  {' '}
                  <button
                    onClick={() => dispatch(addItemAsync(product))}
                    className='flex p-6 items-center mt-4 w-85 h-10 border-2 border-red-600 cursor-pointer rounded-md text-xl font-bold bg-btn-orange bg-opacity-25 hover:bg-btn-red hover:text-white transition duration-200'
                  >
                    Add to Bag{' '}
                    <ShoppingBagIcon
                      style={{
                        width: '23px',
                        marginLeft: '12px',
                        marginTop: '2px',
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
