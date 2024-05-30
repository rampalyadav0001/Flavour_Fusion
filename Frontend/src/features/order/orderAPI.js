import axios from 'axios';

function getToken() {
  return sessionStorage.getItem('accessToken');
}

export function createOrder(order) {
  const token = getToken();
  return new Promise(async (resolve) => {
    try {
      const response = await axios.post(
        'https://flavour-fusion-backend.onrender.com/api/v1/order/create-order',
        order,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      resolve({ data: response.data });
    } catch (error) {
      console.error('Error creating order:', error);
      resolve({ error: error.message });
    }
  });
}

export function checkout(orderid) {
  return new Promise(async (resolve) => {
    try {
     
      const token = getToken();
      const response = await axios.post(
        'https://flavour-fusion-backend.onrender.com/api/v1/payment/create-order',
        orderid,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      resolve(response.data );
    } catch (error) {
      console.error('Error creating order:', error);
      resolve({ error: error.message });
    }
  });
}
