'use strict';

let totalClicks = 0;
let clicksAllowed = 5;
let allProducts = [];
// let indexArray = [];
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:last-child');

// what listener is listening to
let myContainer = document.querySelector('section');

// button
let myButton = document.querySelector('div');

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('usb', 'gif');
new Product('water-can');
new Product('wine-glass');

function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  let firstProductIndex = getRandomIndex();
  let secondProductIndex = getRandomIndex();
  let thirdProductIndex = getRandomIndex();

  // in lab today ryan recommends using an Index Array, name it indexArray
  // check to see if the index is INCLUDED in the aray *hint hint*
  // pop those results from the array or shift? maybe?
  imageOne.src = allProducts[firstProductIndex].src;
  imageOne.title = allProducts[firstProductIndex].name;
  allProducts[firstProductIndex].views++;

  imageTwo.src = allProducts[secondProductIndex].src;
  imageTwo.title = allProducts[secondProductIndex].name;
  allProducts[secondProductIndex].views++;

  imageThree.src = allProducts[thirdProductIndex].src;
  imageThree.title = allProducts[thirdProductIndex].name;
  allProducts[thirdProductIndex].views++;

  let indexArray = [imageOne, imageTwo, imageThree];

  for (let i = 0; i < indexArray.length; i++)
    while (indexArray[0] === indexArray[1]) {
      indexArray[0] = getRandomIndex();
    }
  while (indexArray[0] === indexArray[2]) {
    indexArray[0] = getRandomIndex();
  }
  while (indexArray[1] === indexArray[2]) {
    indexArray[1] = getRandomIndex();
  }
}

function renderResults() {
  let myList = document.querySelector('ul');
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].clicks} votes and was seen ${allProducts[i].views} times`;
    myList.appendChild(li);
  }
}

function handleClick(event) {
  if (event.target === myContainer) {
    alert('please click on img');
  }
  totalClicks++;
  let productClicked = event.target.title;

  for (let i = 0; i < allProducts.length; i++) {
    if (productClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }
  renderProducts();
  if (totalClicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
  }
}
renderProducts();

function handleButtonClick(event) { //disable-eslint-line
  if (totalClicks === clicksAllowed) {
    renderResults();
  }
}


myContainer.addEventListener('click', handleClick);
myButton.addEventListener('click', handleButtonClick);

// side note: we need to show the % of times an item is clicked when shown (???)
// custom font, color palette, layout with semantic HTML, and so on.
