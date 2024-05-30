import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from '@material-tailwind/react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { selectloggedInUser, usererror } from './authSlice';
import { loginUserAsync } from './authSlice';
function Login({ showLogin }) {
  const [Open, setOpen] = useState(false);
  const handleopen = () => {
    setOpen(!Open);
  };
  const dispatch = useDispatch();
  const error = useSelector(usererror);
  const user = useSelector(selectloggedInUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  useEffect(() => {
    if (showLogin) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [showLogin]);

  return (
    <>
      {user && <Navigate to='/' replace={true}></Navigate>}
      {Open && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md xl:items-center xl:justify-center'>
          <Dialog
            size='xs'
            open={Open}
            className='bg-transparent shadow-none fixed inset-0 justify-between top-[23%] '
          >
            <Card className='mx-auto w-full max-w-[42rem]'>
              <CardBody className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                  <Typography variant='h4' color='blue-gray'>
                    Sign In
                  </Typography>
                  <Button onClick={handleopen} className='p-3  '>
                    Close
                  </Button>
                </div>

                <Typography
                  className='mb-3 font-normal'
                  variant='paragraph'
                  color='gray'
                >
                  Enter your email and password to Sign In.
                </Typography>
                <form
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    dispatch(
                      loginUserAsync({
                        email: data.email,
                        password: data.password,
                      })
                    );
                  })}
                  className='space-y-6'
                >
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
                          required: 'email is required',
                          pattern: {
                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                            message: 'email not valid',
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

                  <div>
                    <div className='flex items-center justify-between'>
                      <label
                        htmlFor='password'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        Password
                      </label>
                      <div className='text-sm'>
                        <Link
                          to='/forgot-password'
                          className='font-semibold text-indigo-600 hover:text-indigo-500'
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <div className='mt-2'>
                      <input
                        id='password'
                        {...register('password', {
                          required: 'password is required',
                        })}
                        type='password'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                      {errors.password && (
                        <p className='text-red-500'>
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    {error && <p className='text-red-500'>{error.message}</p>}
                  </div>

                  <div>
                    <button
                      type='submit'
                      onClick={()=>{
                        if(user){
                          handleopen();
                        }
                      }}
                      className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </CardBody>
              <CardFooter className='pt-0'>
                <Typography
                  variant='small'
                  className='mt-4 flex justify-center'
                >
                  Don&apos;t have an account?
                  <Link to='/signup'>
                    <Typography
                      as='a'
                      href='#signup'
                      variant='small'
                      color='blue-gray'
                      className='ml-1 font-bold'
                    >
                      Sign up
                    </Typography>
                  </Link>
                </Typography>
              </CardFooter>
            </Card>
          </Dialog>
        </div>
      )}
    </>
  );
}
export default Login;
