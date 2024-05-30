import axios from 'axios';
function getToken() {
  return sessionStorage.getItem('accessToken');
}

export function fetchCartItem() {
  const token = getToken();
  return axios.get('https://flavour-fusion-backend.onrender.com/api/v1/cart/get-cart',{
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }
  );

}
export function addItem(item) {
  const token = getToken();
console.log(item);
console.log (token);
  return axios.post('https://flavour-fusion-backend.onrender.com/api/v1/cart/add-to-cart', item, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
}

export function deleteItem(item) {
  const token = getToken();

  return axios.delete(`https://flavour-fusion-backend.onrender.com/api/v1/cart/remove-item`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: item
  });
}
export function resetCart() {
  const token = getToken();

  return axios.delete('https://flavour-fusion-backend.onrender.com/api/v1/cart/delete-cart', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    
  });
}


