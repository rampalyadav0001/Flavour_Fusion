import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createUserAsync, selectloggedInUser, usererror } from './authSlice';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../../assets/ff.gif';
import FormData from 'form-data';
import Login from './Login';

function SignUp() {
  const dispatch = useDispatch();
  const user = useSelector(selectloggedInUser);
  // const error=useSelector(usererror);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const HandleLogin = () => {
    setShowLogin(!showLogin);
  };
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setImageFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('FName', data.firstName);
    formData.append('LName', data.lastName);
    formData.append('email', data.email);
    formData.append('phone_no', data.phone);
    formData.append('password', data.password);
    formData.append('username', data.username);
    if (imageFile) {
      formData.append('avatar', imageFile, imageFile.name);
    }
    try {
      await dispatch(createUserAsync(formData));
    } catch (error) {
      console.log('Error on registering user:', error);
    }
  };

  return (
    <>
      <section className='h-screen bg-white-txt bg-fixed flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0'>
        {user && <Navigate to='/' replace={true} />}
        <div className='md:w-1/3 max-w-sm'>
          <img src={Logo} alt='Sample image' />
        </div>
        <div className='md:w-1/3 max-w-sm'>
          <div className='text-center md:text-left'>
            <label className='mr-1'>Sign in with</label>
            <button
              type='button'
              className='mx-1 h-9 w-9 rounded-full bg-nav-blue hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='mx-auto h-3.5 w-3.5'
                x='0px'
                y='0px'
                width='200'
                height='200'
                fill='currentColor'
                viewBox='0 0 50 50'
              >
                <path d='M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z'></path>
              </svg>
            </button>
          </div>
          <div className='my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300'>
            <p className='mx-4 mb-0 text-center font-semibold text-slate-500'>
              Or
            </p>
          </div>
          <form
            noValidate
            className='space-y-6'
            // onSubmit={handleSubmit((data) => {
            //   const formData = new FormData();
            //   formData.append('FName', data.firstName);
            //   formData.append('LName', data.lastName);
            //   formData.append('email', data.email);
            //   formData.append('phone_no', data.phone);
            //   formData.append('password', data.password);
            //   formData.append('username', data.username);
            //   if (imageFile) {
            //     formData.append('avatar', imageFile,imageFile.name);
            //   }
            //   try {
            //     dispatch(createUserAsync(formData));
            //   } catch (error) {
            //     console.log("Error on registering user:",error);
            //   }

            // })}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='flex space-x-4'>
              <div className='w-1/2'>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  First Name
                </label>
                <div className='mt-2'>
                  <input
                    id='firstName'
                    {...register('firstName', {
                      required: 'First name is required',
                    })}
                    type='text'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                  {errors.firstName && (
                    <p className='text-red-500'>{errors.firstName.message}</p>
                  )}
                </div>
              </div>
              <div className='w-1/2'>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  Last Name
                </label>
                <div className='mt-2'>
                  <input
                    id='lastName'
                    {...register('lastName', {
                      required: 'Last name is required',
                    })}
                    type='text'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                  {errors.lastName && (
                    <p className='text-red-500'>{errors.lastName.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className='flex space-x-4'>
              <div className='w-1/2'>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  Username
                </label>
                <div className='mt-2'>
                  <input
                    id='username'
                    {...register('username', {
                      required: 'Username is required',
                    })}
                    type='text'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                  {errors.username && (
                    <p className='text-red-500'>{errors.username.message}</p>
                  )}
                </div>
              </div>
              <div className='w-1/2'>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  Phone Number
                </label>
                <div className='mt-2'>
                  <input
                    id='phone'
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Phone number not valid',
                      },
                    })}
                    type='text'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                  {errors.phone && (
                    <p className='text-red-500'>{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: 'Email not valid',
                    },
                  })}
                  type='email'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
                {errors.email && (
                  <p className='text-red-500'>{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className='flex space-x-4'>
              <div className='w-1/2'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='mt-2'>
                  <input
                    id='password'
                    {...register('password', {
                      required: 'Password is required',
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number`,
                      },
                    })}
                    type='password'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                  {errors.password && (
                    <p className='text-red-500'>{errors.password.message}</p>
                  )}
                </div>
              </div>
              <div className='w-1/2'>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Confirm Password
                </label>
                <div className='mt-2'>
                  <input
                    id='confirmPassword'
                    {...register('confirmPassword', {
                      required: 'Confirm password is required',
                      validate: (value) =>
                        value === watch('password') || 'Passwords do not match',
                    })}
                    type='password'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                  {errors.confirmPassword && (
                    <p className='text-red-500'>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium leading-6 text-gray-900'>
                Profile Picture
              </label>
              <div className='mt-2'>
                <input
                  id='image'
                  {...register('image')}
                  type='file'
                  accept='image/*'
                  onChange={onImageChange}
                  className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
                />
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt='Selected'
                    className='mt-2 h-20 w-20 rounded-full object-cover'
                  />
                )}
              </div>
              {/* {error && <p className='text-red-500'>{error.message}</p>} */}
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-nav-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className='mt-4 flex justify-end font-semibold text-sm'>
            <a
              className='text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4'
              href='#'
            >
              Forgot Password?
            </a>
          </div>

          <div className='mt-4 font-semibold text-sm text-slate-500 text-center md:text-left'>
            Already have an account?{' '}
            {showLogin && <Login showLogin={showLogin} />}
            <button
              className='text-red-600 hover:underline hover:underline-offset-4'
              onClick={HandleLogin}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
