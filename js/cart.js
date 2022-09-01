/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  console.log(cartItems);
  cart = new Cart(cartItems);
  console.log(cart);
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
  // console.log(cart);
  // TODO: Iterate over the items in the cart
  for (let item of cart.items) {
    // TODO: Create a TR
    const tr = document.createElement('tr');

    // TODO: Create a TD for the delete link, quantity,  and the item
    const tdItem = document.createElement('td');
    tdItem.textContent = item.product.name;
    const itemImg = document.createElement('img');
    itemImg.src = item.product.filePath;
    itemImg.height = '80';
    // itemName = document.createElement()
    tdItem.prepend(itemImg);

    const tdQty = document.createElement('td');
    tdQty.textContent = item.quantity;
    
    const tdDel = document.createElement('td');
    tdDel.textContent = 'Remove';
    // const span = document.createElement('span');
    // span.textContent = 'X';
    // span.addEventListener('click', removeItemFromCart);
    // tdDel.append(span);
    tdDel.addEventListener('click', removeItemFromCart);

    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    tr.append(tdItem, tdQty, tdDel);
    tbody.append(tr);

  }

}

function removeItemFromCart(event) {
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  const parent = event.target.parentNode;
  const name = parent.querySelector('td:nth-of-type(1)').textContent; // get 2nd td element inside parent
  console.log(name);

  for (let item of cart.items) {
    if (item.product.name === name) {
      cart.removeItem(item);
    }
  }

  // TODO: Save the cart back to local storage
  localStorage['cart'] = JSON.stringify(cart.items);

  // TODO: Re-draw the cart table
  clearCart();
  showCart();

}

// This will initialize the page and draw the cart on screen
renderCart();
