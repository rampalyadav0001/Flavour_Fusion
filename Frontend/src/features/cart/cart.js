import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCartItemAsync,
  cartItem,
  resetCartAsync,
  CartId,
  updateItemAsync
} from './cartSlice';
import { Bill } from './cartSlice';
import { deleteItemAsync } from './cartSlice';
import { Typography, Input, Checkbox } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { createOrderAsync } from '../order/orderSlice';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItem);
  

  const removeAllItems = () => {
    dispatch(resetCartAsync());
  };

  const totalItems = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );
  const handleQuantity = (e, item) => {
    dispatch(updateItemAsync({ ...item, quantity: +e.target.value }));
  };
  useEffect(() => {
    dispatch(fetchCartItemAsync());
  }, [dispatch]);

  return (
    <div className='p-1'>
      <h1 className='my-3 text-4xl font-bold tracking-widest uppercase text-black'>
        MY CART
      </h1>

      <div className='flex flex-col xl:flex-row xl:justify-between'>
        <div className='flex flex-col gap-3 xl:flex-grow '>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className='flex flex-col p-4 bg-neutral-100 shadow-md'
            >
              <div className='flex flex-col gap-6 items-center mb-4 xl:flex-row xl:justify-between md:flex-row md:justify-between'>
                <div className='flex items-center'>
                  <img
                    src={item.thumbnail}
                    alt='Spicy Zinger Burger'
                    className='h-16 w-16 mr-4'
                  />
                  <div>
                    <h2 className='text-lg font-bold'>{item.name}</h2>
                    <button
                      onClick={() => dispatch(deleteItemAsync(item))}
                      className='text-red-500 text-sm'
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className='flex items-center'>
                  <label
                    htmlFor='quantity'
                    className='inline mr-5 text-sm font-medium leading-6 text-gray-900'
                  >
                    Qty
                  </label>
                  <div className='flex items-center space-x-2'>
                    <select
                      onChange={(e) => handleQuantity(e, item)}
                      value={item.quantity}
                    >
                      {[1, 2, 3, 4, 5].map((qty) => (
                        <option key={qty} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                    
                  </div>
                  <span className='font-bold ml-4'>₹{item.totalAmmount}</span>
                </div>
              </div>
            </div>
          ))}
          <div className='flex justify-between'>
            <button
              onClick={removeAllItems}
              className='bg-red-500 text-white py-2 px-4 rounded'
            >
              Remove All
            </button>
            <Link to='/menu'>
              <button className='bg-green-500 text-white py-2 px-4 rounded'>
                Add More Menu
              </button>
            </Link>
          </div>
        </div>
        <div className='p-4 '>
          <ShoppingCartSummary totalItems={totalItems} />
        </div>
      </div>
    </div>
  );
}

function ShoppingCartSummary({ totalItems }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addCarryBag, setAddCarryBag] = useState(false);
  const [addHope, setAddHope] = useState(false);
  const totalAmount = useSelector(Bill);
  const cart_id = useSelector(CartId);
  const gst = totalAmount * 0.05;
  let totalPrice = totalAmount + gst;

  if (addCarryBag) {
    totalPrice += 6;
  }

  if (addHope) {
    totalPrice += 5;
  }

  const [formData, setFormData] = useState({
    tableNo: '',
    takeAway: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDineOptionChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      takeAway: value === 'TakeAway',
    }));
  };

  const handleOrder = async () => {
    if (formData.tableNo !== '') {
      const order = {
        Cart_ID: cart_id,
        Table_no: formData.tableNo,
        TakeAway: formData.takeAway,
        Bill: totalAmount,
        Gst: gst,
        Bag: addCarryBag,
        Donate: addHope,
      };

      const result = await dispatch(createOrderAsync(order));
      if (result.meta.requestStatus === 'fulfilled') {
        // alert('Order Placed Successfully....');
        navigate('/checkout');
      } else {
        alert('Failed to place order. Please try again.');
      }
    } else {
      alert('Enter the table number...');
    }
  };

  return (
    <div className='flex flex-col p-4 bg-white shadow-md max-w-lg mx-auto'>
      <div className='flex justify-center items-center mb-4'>
        <h2 className='text-lg font-bold'>{totalItems} ITEM</h2>
      </div>
      <div className='mb-4'>
        <p className='flex justify-between'>
          Subtotal <span className='font-bold'>₹{totalAmount.toFixed(2)}</span>
        </p>
        <p className='flex justify-between'>
          GST <span className='font-bold'>₹{gst.toFixed(2)}</span>
        </p>
      </div>
      <div className='flex items-center mb-4'>
        <Checkbox
          id='carryBag'
          checked={addCarryBag}
          onChange={() => setAddCarryBag(!addCarryBag)}
          color='primary'
        />
        <label htmlFor='carryBag' className='ml-2'>
          ₹6.00 Tick to add a large carry bag.
        </label>
      </div>
      <div className='flex items-center mb-4'>
        <Checkbox
          id='addHope'
          checked={addHope}
          onChange={() => setAddHope(!addHope)}
          color='primary'
        />
        <label htmlFor='addHope' className='ml-2'>
          Donate ₹5.00 Tick to Add Hope. Our goal is to feed 20 million people
          by 2024.
        </label>
      </div>
      <div className='flex items-center mb-4 mx-8'>
        <Typography className='w-1/2' variant='h6'>
          Table No
        </Typography>
        <Input
          className='w-1/2'
          type='number'
          name='tableNo'
          placeholder='Table No'
          size='lg'
          value={formData.tableNo}
          onChange={handleChange}
        />
      </div>
      <Typography className='-mb-2 m-5' variant='h6'>
        Dine Option
      </Typography>
      <div className='flex mb-8 justify-around'>
        <div className='flex items-center gap-x-3'>
          <input
            type='radio'
            name='dineOption'
            value='DineIn'
            checked={!formData.takeAway}
            onChange={handleDineOptionChange}
          />
          <label
            htmlFor='dineIn'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Dine In
          </label>
        </div>
        <div className='flex items-center gap-x-3'>
          <input
            type='radio'
            name='dineOption'
            value='TakeAway'
            checked={formData.takeAway}
            onChange={handleDineOptionChange}
          />
          <label
            htmlFor='takeAway'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Take Away
          </label>
        </div>
      </div>
      <div className='h-[2px] bg-gray-400 m-8'></div>
      <div className='mx-8 mb-5 flex justify-between'>
        <span>Total Amount:</span>
        <span>₹{totalPrice.toFixed(2)}</span>
      </div>
      <button
        onClick={handleOrder}
        className='bg-red-500 text-white py-2 px-4 rounded-full hover:font-bold'
      >
        Confirm Order
      </button>
    </div>
  );
}

export default Cart;
