'use strict';

let totalClicks = 0;
let clicksAllowed = 5;
let allGoats = [];
// let indexArray = [];
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');

// what listener is listening to
let myContainer = document.querySelector('section');

// button
let myButton = document.querySelector('div');

function Goat(name, fileExtension = '.jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allGoats.push(this);
}

new Goat('bunny-goat', 'png');
new Goat('cool-goat');
new Goat('cruisin-goat');
new Goat('float-your-goat');
new Goat('goat-out-of-hand');
new Goat('kissing-goat');
new Goat('lucky-goat');
new Goat('sassy-goat');
new Goat('smiling-goat');
new Goat('sweater-goat');

function getRandomIndex() {
  return Math.floor(Math.random() * allGoats.length);
}

function renderGoats() {
  let firstGoatIndex = getRandomIndex();
  let secondGoatIndex = getRandomIndex();
  // in lab today ryan recommends using an Index Array, name it indexArray
  // check to see if the index is INCLUDED in the aray *hint hint*
  // pop those results from the array or shift? maybe?

  while (firstGoatIndex === secondGoatIndex) {
    secondGoatIndex = getRandomIndex;
  }
  imageOne.src = allGoats[firstGoatIndex].src;
  imageOne.title = allGoats[firstGoatIndex].name;
  allGoats[firstGoatIndex].views++;

  imageTwo.src = allGoats[secondGoatIndex].src;
  imageTwo.title = allGoats[secondGoatIndex].name;
  allGoats[secondGoatIndex].views++;
}

function renderResults() {
  let myList = document.querySelector('ul');
  for (let i = 0; i < allGoats.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allGoats[i].name} had ${allGoats[i].clicks} votes and was seen ${allGoats[i].views} times`;
    myList.appendChild('li');
  }
}

function handleClick(event) {
  if (event.target === myContainer) {
    alert('please click on img');
  }
  totalClicks++;
  let goatClicked = event.target.title;

  for (let i = 0; i < allGoats.length; i++) {
    if (goatClicked === allGoats[i].name) {
      allGoats[i].clicks++;
      // console.log(allGoats[i]);
    }
  }
  renderGoats();
  if (totalClicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
    renderResults();
  }
}
renderGoats();

function handleButtonClick(event) {
  if (totalClicks === clicksAllowed) {
    if (event.target === myButton) {
      renderResults();
    }
  }
}

myContainer.addEventListener('click', handleClick);
myButton.addEventListener('click', handleButtonClick);

// side note: we need to show the % of times an item is clicked when shown (???)
// custom font, color palette, layout with semantic HTML, and so on.
