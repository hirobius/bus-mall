'use strict';

let totalClicks = 0;
let clicksAllowed = 25;
let allProducts = [];
let indexArray = [];
let uniqueImageCount = 6;
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:last-child');
let myContainer = document.querySelector('section');

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

// Step 1 of retrieving local storage: Get the data from local storage using its key
var retrievedProducts = localStorage.getItem('products');
// Step 3 of retrieving local storage: Use local storage in a way that doesn't break your existing code
if (retrievedProducts) {
// Step 2 of retrieving local storage: Make data usable again by parsing it
  let parsedProducts = JSON.parse(retrievedProducts);
  allProducts = parsedProducts;
} else {
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
}

function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  while (indexArray.length < uniqueImageCount) {
    let randomIndex = getRandomIndex();
    while (!indexArray.includes(randomIndex)) {
      indexArray.push(randomIndex);
    }
  }
  let firstProductIndex = indexArray.shift();
  let secondProductIndex = indexArray.shift();
  let thirdProductIndex = indexArray.shift();

  imageOne.src = allProducts[firstProductIndex].src;
  imageOne.title = allProducts[firstProductIndex].name;
  allProducts[firstProductIndex].views++;

  imageTwo.src = allProducts[secondProductIndex].src;
  imageTwo.title = allProducts[secondProductIndex].name;
  allProducts[secondProductIndex].views++;

  imageThree.src = allProducts[thirdProductIndex].src;
  imageThree.title = allProducts[thirdProductIndex].name;
  allProducts[thirdProductIndex].views++;
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
    renderChart();
    // Local Storage Steps 1 & 2: stringify the data & Save to Local Storage
    localStorage.setItem('products', JSON.stringify(allProducts));
  }
}
renderProducts();

function renderChart() {
  let productNames = [];
  let productViews = [];
  let productClicks = [];

  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
  }

  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Views',
        backgroundColor: 'rgb(207, 204, 214)',
        data: productViews
      },
      {
        label: 'Clicks',
        backgroundColor: 'rgb(183, 181, 228)',
        data: productClicks
      }]
    },
    responsive: false,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

myContainer.addEventListener('click', handleClick);
