'use strict';

var allItems = [];
var duplicateItems = [];

function Item(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.votes = 0;
  allItems.push(this);
}

new Item('Bag', 'assets/bag.jpg');
new Item('Banana', 'assets/banana.jpg');
new Item('Bathroom', 'assets/bathroom.jpg');
new Item('Boots', 'assets/boots.jpg');
new Item('Breakfast', 'assets/breakfast.jpg');
new Item('Bubblegum', 'assets/bubblegum.jpg');
new Item('Chair', 'assets/chair.jpg');
new Item('Cthulu', 'assets/cthulhu.jpg');

//Get <img> elements from DOM
var leftImg = document.getElementById('leftImg');
var midImg = document.getElementById('midImg');
var rightImg = document.getElementById('rightImg');

//Get <ul> img element from DOM
var itemImgsUl = document.getElementById('itemImgs');

//find a random unique Item
function randItem() { 
  var unique = false;

  while (unique === false) {
    var idx = Math.floor(Math.random() * allItems.length);

    //check duplicateItems[] for allItems[idx]
    if (!duplicateItems.includes(allItems[idx])) {

      unique = true;
      duplicateItems.push(allItems[idx]);
    }

    //console.log(`unique is ${unique}`);
  }
  if (duplicateItems.length > 6) {

    var deleted = duplicateItems.shift();
    console.log(`${deleted.name} is deleted from duplicateItems[]`);
  }

  return allItems[idx];
}


function itemChoicesClick(event) {
  var leftItem = randItem();
  var midItem = randItem();
  var rightItem = randItem();
  var clickTarget = event.target;

  leftImg.src = leftItem.filepath;
  leftImg.alt = leftItem.name;
  leftImg.title = leftItem.name;

  midImg.src = midItem.filepath;
  midImg.alt = midItem.name;
  midImg.title = midItem.name;

  rightImg.src = rightItem.filepath;
  rightImg.alt = rightItem.name;
  rightImg.title = rightItem.name;

  console.log(leftImg);
  console.log(midImg);
  console.log(rightImg);
  console.log(clickTarget);

  clickTarget.votes++;
}

function itemChoicesInitialize() {
  var leftItem = randItem();
  var midItem = randItem();
  var rightItem = randItem();

  leftImg.src = leftItem.filepath;
  leftImg.alt = leftItem.name;
  leftImg.title = leftItem.name;

  midImg.src = midItem.filepath;
  midImg.alt = midItem.name;
  midImg.title = midItem.name;

  rightImg.src = rightItem.filepath;
  rightImg.alt = rightItem.name;
  rightImg.title = rightItem.name;
}

itemChoicesInitialize();
itemImgsUl.addEventListener('click', itemChoicesClick);
