const cart3=document.querySelector(".cart2")
const cartquantity1 = document.querySelector(".cartquantity2");
if (!cartquantity1) {
  console.warn("Cart quantity element not found");
}
import { formatCurrency } from './money.js';
import {products} from './product.js';
import {cart, saveToStorage} from './data.js';
let productsHTML = "";

products.forEach((productItem) => {
  productsHTML += `
    <div class="box1">
      <div class="img">
        <img src="${productItem.image}" class="image" alt="${productItem.name}">
      </div>

      <div class="para">${productItem.name}</div>

      <div class="rate">
        <img src="rate.png" class="image2" alt="Rating">
        <span>${productItem.rating.count}</span>
      </div>

      <div class="price">$${formatCurrency(productItem.priceCents)}</div>

      <div class="option">
        <select name="number" class="number1">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <div class="added-message">✅ Added to cart</div>

      <div class="btn">
        <button class="btn1">Add to cart</button>
      </div>
    </div>
  `;
});

document.querySelector(".container").innerHTML = productsHTML;

const addButton = document.querySelectorAll(".btn1");
const quantitySelectors = document.querySelectorAll(".number1");
const addedMessages = document.querySelectorAll(".added-message");

function updateCartQuantity() {
  let cartquantity = 0;

  cart.forEach((item) => {
    cartquantity += item.quantity;
  });

  cartquantity1.innerHTML = cartquantity;
}

addButton.forEach((button, index) => {
  button.addEventListener("click", () => {
    const productid = products[index].id;
    const selectedQuantity = Number(quantitySelectors[index].value);
    let matchingItem;

    cart.forEach((item) => {
      if (productid === item.productid) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += selectedQuantity;
    } else {
      cart.push({
        productid: productid,
        quantity: selectedQuantity,
      });
    }

    saveToStorage()

    updateCartQuantity();

    addedMessages[index].classList.add("added-message-show");

    setTimeout(() => {
      addedMessages[index].classList.remove("added-message-show");
    }, 2000);
  });
});

cart3.onclick = () => {
  window.location.href = "cart.html";
};