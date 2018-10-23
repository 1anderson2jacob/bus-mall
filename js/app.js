'use strict';

var allItems = [];
var duplicateItems = [];
var numVotes = 0;

function Item(name, filepath, idx) {
  this.name = name;
  this.filepath = filepath;
  this.votes = 0;
  this.idx = idx;
  allItems.push(this);
}

//when change to instantiate w/ loop, put i as last argument
new Item('Bag', 'assets/bag.jpg', 0);
new Item('Banana', 'assets/banana.jpg', 1);
new Item('Bathroom', 'assets/bathroom.jpg', 2);
new Item('Boots', 'assets/boots.jpg', 3);
new Item('Breakfast', 'assets/breakfast.jpg', 4);
new Item('Bubblegum', 'assets/bubblegum.jpg', 5);
new Item('Chair', 'assets/chair.jpg', 6);
new Item('Cthulu', 'assets/cthulhu.jpg', 7);


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

    duplicateItems.shift();
  }

  return allItems[idx];
}


//on picture click
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

  console.log(`${clickTarget.title} was clicked `);

  if (clickTarget.title === leftItem.name) {
    leftItem.votes++;
  } else if(clickTarget.title === midItem.name) {
    midItem.votes++;
  } else{
    rightItem.votes++;
  }

  numVotes++;

  if (numVotes > 0) { //change to 19
    console.table(allItems);
  }
}

//on load
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
