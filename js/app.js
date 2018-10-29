'use strict';

var allItems = [];
var duplicateItems = [];
//var itemVotes = [];
//var numVotes = 0;

if (localStorage.getItem('localData') === null) {
  var itemVotes = [];
  var numVotes = 0;
  itemChoicesInitialize();

} else {
  itemVotes = JSON.parse(localStorage.getItem('localData'));
  numVotes = sumVotes();
  if (numVotes > 24) {
    //document.getElementById('itemImgs').hidden = true;
    drawChart();
  }
}


function sumVotes() {
  var sum = 0;
  for (var i = 0; i < itemVotes.length; i++) {
    sum += itemVotes[i];
  }
  return sum;
}

function Item(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.votes = 0;
  allItems.push(this);
}

//when change to instantiate w/ loop, put i as last argument
new Item('Bag', 'assets/bag.jpg');
new Item('Banana', 'assets/banana.jpg');
new Item('Bathroom', 'assets/bathroom.jpg');
new Item('Boots', 'assets/boots.jpg', 3);
new Item('Breakfast', 'assets/breakfast.jpg');
new Item('Bubblegum', 'assets/bubblegum.jpg');
new Item('Chair', 'assets/chair.jpg');
new Item('Cthulu', 'assets/cthulhu.jpg');
new Item('Dog Duck', 'assets/dog-duck.jpg');
new Item('Dragon', 'assets/dragon.jpg');
new Item('Pen', 'assets/pen.jpg');
new Item('Pet Sweep', 'assets/pet-sweep.jpg');
new Item('Scissors', 'assets/scissors.jpg');
new Item('Shark', 'assets/shark.jpg');
new Item('Sweep', 'assets/sweep.png');
new Item('Tauntaun', 'assets/tauntaun.jpg');
new Item('Unicorn', 'assets/unicorn.jpg');
new Item('Usb', 'assets/usb.gif');
new Item('Water Can', 'assets/water-can.jpg');
new Item('Wine Glass', 'assets/wine-glass.jpg');



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
//adds allItems votes to array
Array.prototype.votes = function() {
  for (var i = 0; i < allItems.length; i++) {
    itemVotes[i] = allItems[i].votes;
  }
  return itemVotes;
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
  saveToLocalStorage();
  
  numVotes++;

  if (numVotes > 24) { //set to 24
    document.getElementById('itemImgs').hidden = true;
    updateChartArray();
    drawChart();
  }
}

function saveToLocalStorage() {
  var votesToString = JSON.stringify(itemVotes);

  localStorage.setItem('localData', votesToString);
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

function updateChartArray() {
  for (var i = 0; i < allItems.length; i++) {
    itemVotes[i] = allItems[i].votes;
  }
}

var data = {
  labels : ['Bag', 'Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum', 'Chair', 'Cthulu', 'Dog Duck', 'Dragon', 'Pen', 'Pet Sweep', 'Scissors', 'Shark', 'Sweep', 'Tauntaun', 'Unicorn', 'Usb', 'Water Can', 'Wine Glass'],
  datasets : [
    {
      label: 'Item Votes',
      fillColor : '#48A497',
      strokeColor : '#48A4D1',
      data : itemVotes
    },
  ]
}

var itemChart;

function drawChart() {
  var ctx = document.getElementById('barchart').getContext('2d');
  itemChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            max: 10,
            min: 0,
            stepSize: 1.0
          }
        }]
      }
    }
  })

}

itemImgsUl.addEventListener('click', itemChoicesClick);


