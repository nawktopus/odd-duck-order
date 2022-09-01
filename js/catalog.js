/* global Product, Cart */

'use strict';

function $(x) {
  return document.querySelector(x);
}

function _(type) {
  return document.createElement(type);
}

// Set up an empty cart for use on this page.
const cart = new Cart([]);

// On screen load, we call this method to put all of the product options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = '-- Please Select a Product --'
  selectElement.append(defaultOption);

  for (let i in Product.allProducts) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = Product.allProducts[i].name;
    selectElement.append(option);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  const select = $('#items');

  const product = Product.allProducts[select.value];

  // TODO: get the quantity
  const qty = $('#quantity').value;

  // TODO: using those, add one item to the Cart
  cart.addItem(product, qty);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  const span = $('#itemCount');
  span.innerHTML = '';
  let count = 0;

  for (let item of cart.items) {
    console.log(item);
    count += parseInt(item.quantity);
    console.log(count);
  }

  span.textContent = count;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  const select = $('#items');
  const name = Product.allProducts[select.value].name;
  const qty = $('#quantity').value;

  // TODO: Add a new element to the cartContents div with that information
  const div = document.createElement('div');
  const nameDiv = document.createElement('div');
  nameDiv.textContent = name;
  const qtyDiv = document.createElement('div');
  qtyDiv.textContent = qty;
  // div.textContent = `${name}: ${qty}`;
  div.append(nameDiv, qtyDiv);

  $('#cartContents').append(div);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
