'use strict';

var allItems = [];
var duplicateItems = [];

function Item(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.likes = 0;
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

var leftImg = document.getElementById('leftImg');
var midImg = document.getElementById('midImg');
var rightImg = document.getElementById('rightImg');

function randItem() {
  var unique = false;

  while (unique === false) {
    var idx = Math.floor(Math.random() * allItems.length);
    console.log(`idx = ${idx}`);

    //check duplicateItems[] for allItems[idx]
    if (!duplicateItems.includes(allItems[idx])) {

      unique = true;
      duplicateItems.push(allItems[idx]);
      console.log(`unique is ${unique}`);
      console.log(`${allItems[idx].name} pushed to duplicateItems`);
    }

    console.log(`unique is ${unique}`);
  }
  if (duplicateItems.length > 6) {
    var deleted = duplicateItems.shift();
    console.log(`${deleted.name} is deleted from duplicateItems[]`);
  }

  return allItems[idx];
}

// get 3 random items
// they can't be duplicates of eachother, or duplicates of the last 3
// display them in leftImg midImg and rightImg

// determine and track which one is clicked
// update Item.likes to show how many times its been chosen

