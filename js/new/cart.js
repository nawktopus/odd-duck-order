/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  const tbody = document.querySelector('tbody');
  for (let item of cart) {
  // TODO: Iterate over the items in the cart
   // TODO: Create a TR
  tr = document.createElement('tr');
  // TODO: Create a TD for the delete link, quantity,  and the item
  tdItem = document.createElement('td');
  itemImg = document.createElement('img');
  // itemName = document.createElement('');
  tdQty = document.createElement('td');
  tdDel = document.createElement('td'); 
  tr.append(tdItem, tdQty, tDel);
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
 tbody.appendChild(tr);

}
}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  const parent = event.target.parentNode;
  const name = parent.querySelector('td:nth-of-type(2)').textContent;
  // TODO: Save the cart back to local storage
  for (let item of cart) {
    cart.removeItem(item);
  }
  // TODO: Re-draw the cart table
  clearCart();
  showCart(); 
}

// This will initialize the page and draw the cart on screen
renderCart();
