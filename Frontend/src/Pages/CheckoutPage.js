import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import {
  MapPinIcon,
  ClockIcon,
  UserIcon,
  TableCellsIcon,
  EnvelopeIcon,
  PhoneIcon,
  TruckIcon,
} from '@heroicons/react/16/solid';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { Bill, CartId, cartItem } from '../features/cart/cartSlice';
import { selectloggedInUser } from '../features/auth/authSlice';
import {
  checkOutAsync,
  selectCurrentOrder,
} from '../features/order/orderSlice';

function CheckoutPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItem);
  const user = useSelector(selectloggedInUser);

  const order = useSelector(selectCurrentOrder);

  const totalItems = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );

  const CheckoutHandler = async (Orderid) => {
    console.log(Orderid);

    const result = await dispatch(checkOutAsync(Orderid));
    if (result.meta.requestStatus === 'fulfilled') {
      console.log('Checkout successful..........');
      const data = result.payload;
      console.log(data);

      const options = {
        key: 'rzp_test_1Jt8ENXrK90iMe', // Enter the Key ID generated from the Dashboard
        // key: 'dbscpFrBGa17cLi7AkvYM9hb', // Enter the Key ID generated from the Dashboard
        amount: data?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Acme Corp',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        order_id: data?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response){
          // Show SweetAlert on successful payment
          Swal.fire({
              title: 'Payment Successful!',
              text: 'Your payment was successful. Thank you for your purchase!',
              icon: 'success',
              confirmButtonText: 'Go to Homepage'
          }).then((result) => {
              if (result.isConfirmed) {
                  // Navigate to the homepage
                  window.location.href = '/';
              }
          });
  
          // Optionally, you can still log the payment details if needed
          console.log(response.razorpay_payment_id);
          console.log(response.razorpay_order_id);
          console.log(response.razorpay_signature);
      },
        prefill: {
          name: 'Ankit mishra',
          email: 'ankitkumarmishra@example.com',
          contact: '9000090000',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#12121',
        },
      };
      console.log('Razorpay Options:', options);
      const rzp1 = new window.Razorpay(options);

      rzp1.on('payment.failed', function (response) {
        console.error('Payment Failed:', response.error);
        alert(
          'Payment Failed: ' +
            response.error.code +
            '\n' +
            'Description: ' +
            response.error.description +
            '\n' +
            'Source: ' +
            response.error.source +
            '\n' +
            'Step: ' +
            response.error.step +
            '\n' +
            'Reason: ' +
            response.error.reason +
            '\n' +
            'Order ID: ' +
            response.error.metadata.order_id +
            '\n' +
            'Payment ID: ' +
            response.error.metadata.payment_id
        );
      });

      rzp1.open();
    } else {
      console.error('Checkout failed', result.error);
    }
  };

  return (
    <div className='bg-white'>
      <Navbar>
        <div className='bg-white p-4'>
          <div className='flex justify-between items-center border-b pb-2 w-1/2'>
            <h1 className='text-2xl font-bold'>CHECKOUT</h1>
          </div>

          <div className='flex flex-col xl:flex-row xl:justify-between'>
            <div className='p-4 xl:w-2/3 xl:h-screen'>
              {/* Dine In Info */}
              <div className='flex p-5 rounded-xl bg-white text-black shadow-lg justify-between xl:h-2/4'>
                <div className='mb-4 ml-9 flex items-center justify-center'>
                  <h2 className='text-lg font-bold'>DINE IN INFO</h2>
                </div>
                <div className='flex flex-col'>
                  <div className='mt-9 mr-20'>
                    <MapPinIcon className='w-5 inline-block' />
                    <p className='font-md mx-2 text-semibold inline'>
                      Delhi Chai Cafe - Rajouri Garden Market
                    </p>
                  </div>
                  <div className='mt-9 mr-20'>
                    <ClockIcon className='w-5 inline-block' />
                    <p className='font-md mx-2 text-semibold inline'>ASAP</p>
                  </div>
                  <div className='mt-9 mr-20'>
                    <TableCellsIcon className='w-5 inline-block' />
                    <p className='font-md mx-2 text-semibold inline'>
                      {order.Table_no}
                    </p>
                  </div>
                  <div className='mt-9 mr-20'>
                    <TruckIcon className='w-5 inline-block' />
                    <p className='font-md mx-2 text-semibold inline'>
                      Dine In Info:{' '}
                      {order.TakeAway == true ? 'TakeAway' : 'Dine In'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className='flex mt-6 p-5 rounded-xl items-center bg-white text-black shadow-lg justify-between xl:h-1/3'>
                <div>
                  <h2 className='text-lg font-bold'>CONTACT INFO</h2>
                </div>
                <div className='flex flex-col'>
                  <div className='mt-9 mr-20'>
                    <UserIcon className='w-5 inline-block' />
                    <p className='font-md mx-2 text-semibold inline'>
                      {user.FName}
                    </p>
                  </div>
                  <div className='mt-9 mr-20'>
                    <EnvelopeIcon className='w-5 inline-block' />
                    <p className='font-md mx-2 text-semibold inline'>
                      {user.email}
                    </p>
                  </div>
                  <div className='mt-9 mr-20'>
                    <PhoneIcon className='w-5 inline-block' />
                    <p className='font-md mx-2 text-semibold inline'>
                      {user.phone_no}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Section */}
            <div className='flex flex-col p-4 bg-white shadow-md w-[50%] h-[50%]'>
              <div className='flex justify-center items-center mb-4'>
                <h2 className='text-lg font-bold'>{totalItems} ITEM</h2>
              </div>
              <div className='mb-4'>
                <p className='flex justify-between'>
                  Subtotal <span className='font-bold'>₹{order.Bill}</span>
                </p>
                <p className='flex justify-between'>
                  GST{' '}
                  <span className='font-bold'>₹{order.Gst.toFixed(2)}(5%)</span>
                </p>
                <p
                  className={`${
                    order.Bag ? 'block' : 'hidden'
                  } flex justify-between`}
                >
                  Bag <span className='font-bold'>₹6</span>
                </p>
                <p
                  className={`${
                    order.Donate ? 'block' : 'hidden'
                  } flex justify-between`}
                >
                  Donate <span className='font-bold'>₹5</span>
                </p>
              </div>
              <div></div>
              <div className='h-[2px] bg-gray-400 m-8'></div>
              <div className='mx-8 mb-5 flex justify-between'>
                <span>Total Amount:</span>
                <span>₹{order.Total_Bill}</span>
              </div>

              <button
                onClick={() => CheckoutHandler(order._id)}
                className='bg-nav-blue text-white py-2 px-4 rounded-full hover:font-bold'
              >
                Checkout ₹{order.Total_Bill}
              </button>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default CheckoutPage;
