export let cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    productid: 'product-1',
    quantity: 1,
  },
  {
    productid: 'product-2',
    quantity: 1,
  }
];

export function saveToStorage() {
  console.log('Saving cart...', cart);

  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productid) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productid !== productid) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}
