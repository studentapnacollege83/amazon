import { cart, removeFromCart } from './data.js';
import { products } from './product.js';
import { formatCurrency } from './money.js';
const logo3=document.querySelector(".logo2")
const para1=document.querySelector(".para")

let cartHTML = '';

function renderCart() {
  cartHTML = '';

  cart.forEach((cartItem) => {

    const matchingProduct = products.find((product) => {
      return product.id === cartItem.productid;
    });

    if (!matchingProduct) {
      console.log('Product not found:', cartItem.productid);
      return;
    }
   cartHTML += `
<div class="cart-item js-cart-container-${matchingProduct.id}">

  <div class="delivery-date">
    Delivery date: Monday, June 15
  </div>

  <div class="product-container">

    <div class="product-image">
      <img src="${matchingProduct.image}">
    </div>

    <div class="product-details">

      <h3>${matchingProduct.name}</h3>

      <p class="price">
        $${formatCurrency(matchingProduct.priceCents)}
      </p>

      <p class="quantity-container">
        Quantity: ${cartItem.quantity}

        <button class="delete-quantity-link"
          data-productid="${matchingProduct.id}">
          Delete
        </button>

        <button class="update-quantity-link"
          data-productid="${matchingProduct.id}">
          Update
        </button>
      </p>

    </div>

    <div class="delivery-options">

      <h3>Choose a delivery option:</h3>

      <label>
        <input
          type="radio"
          name="delivery-${cartItem.productid}"
          checked
        >
        <div>
          <span class="date">Monday, June 15</span>
          <p>FREE Shipping</p>
        </div>
      </label>

      <label>
        <input
          type="radio"
          name="delivery-${cartItem.productid}"
        >
        <div>
          <span class="date">Thursday, June 11</span>
          <p>$4.99 Shipping</p>
        </div>
      </label>

    </div>

  </div>

</div>
`;
  });
  
let cartquantity = 0;

cart.forEach((item) => {
  cartquantity += item.quantity;
});

para1.innerHTML = `Checkout (${cartquantity} items)`;

  document.querySelector('.container').innerHTML = cartHTML;

  document.querySelectorAll('.delete-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productid;

        removeFromCart(productId);
        renderCart();
        document.querySelector(`.js-cart-container-${productId}`)
      });
    });
}

renderCart();


  logo3.onclick = () => {
  window.location.href = "index.html";
};
