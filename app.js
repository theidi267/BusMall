

//array to hold all the pctures as objects

Picture.allPictures = [];

//Picture names for chart labels

var pictureNames = [];

//totalclicks for barchart

var totalClicks = [];

//total displayed to hold total displayed

var totalDisplayed = [];

//last displayed picures

var picsLastDisplayed = [];

//click tracker

var allClicks = 24;

//get the list element to push the results in

var resultListElement = document.getElementById('results');

//make a constuctor function for picture objects

function Picture(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.totalDisplayed = 0;
  this.totalClicks = 0;
  Picture.allPictures.push(this);
}

//make the objects

new Picture('img/bag.jpg', 'Bag');
new Picture('img/banana.jpg', 'Banana cutter');
new Picture('img/bathroom.jpg', 'TP holder with tablet mount');
new Picture('img/boots.jpg', 'Open toe rubber boots');
new Picture('img/breakfast.jpg', 'Breakfast maker');
new Picture('img/bubblegum.jpg', 'Meatball bubble gum');
new Picture('img/chair.jpg', 'Bumpy chair');
new Picture('img/cthulhu.jpg', 'Cthulhu figurine');
new Picture('img/dog-duck.jpg', 'Duck lips for dogs');
new Picture('img/dragon.jpg', 'Canned dragon meat');
new Picture('img/pen.jpg', 'Pen with cuttlery heads');
new Picture('img/pet-sweep.jpg', 'Doog boot-mops');
new Picture('img/scissors.jpg', 'Pizza cutting scissors');
new Picture('img/shark.jpg', 'Shark sleeping bag');
new Picture('img/tauntaun.jpg', 'Tauntaun sleeping bag');
new Picture('img/unicorn.jpg', 'Canned unicorn meat');
new Picture('img/usb.gif', 'Tentacle usb drive');
new Picture('img/water-can.jpg', 'Watering can');
new Picture('img/wine-glass.jpg', 'Wineglass');

// console.log(Picture.allPictures);

//access the element

var picElement = document.getElementById('pic1');
var picElement2 = document.getElementById('pic2');
var picElement3 = document.getElementById('pic3');


// event listener

picElement.addEventListener('click', giveThreePics);
picElement2.addEventListener('click', giveThreePics);
picElement3.addEventListener('click', giveThreePics);

//function to count

function clickCounter(event) {

  var splitStuff = event.target.currentSrc.split('/');
  var filename = splitStuff.slice(splitStuff.length-2, splitStuff.length).join('/');

  for(var j=0; j < Picture.allPictures.length; j++) {

    if ( Picture.allPictures[j].filepath === filename) {

      Picture.allPictures[j].totalClicks++;
      allClicks--;
      handleClicks();
      console.log(allClicks);
    }
  }
}

function giveThreePics(event) {

  var threeNum = [];

  function randNums(min, max) {
    for(var i=0 ; i < 3 ; i++) {
      threeNum.push(Math.floor(Math.random()*max)+min);
    }
  }

  randNums(0, Picture.allPictures.length);

  while ((threeNum[0] === threeNum[1] || threeNum[0] === threeNum[2] || threeNum[1] === threeNum[2]) || (picsLastDisplayed.includes(threeNum[0]) || picsLastDisplayed.includes(threeNum[1]) || picsLastDisplayed.includes(threeNum[2]))) {

    threeNum = [];
    
    randNums(0, Picture.allPictures.length);  

    console.log(picsLastDisplayed);
  }

  picsLastDisplayed = [];

  picsLastDisplayed.push(threeNum[0]);
  picsLastDisplayed.push(threeNum[1]);
  picsLastDisplayed.push(threeNum[2]);

  picElement.src = Picture.allPictures[threeNum[0]].filepath;
  picElement.alt = Picture.allPictures[threeNum[0]].name;
  Picture.allPictures[threeNum[0]].totalDisplayed++;

  picElement2.src = Picture.allPictures[threeNum[1]].filepath;
  picElement2.alt = Picture.allPictures[threeNum[1]].name;
  Picture.allPictures[threeNum[1]].totalDisplayed++;

  picElement3.src = Picture.allPictures[threeNum[2]].filepath;
  picElement3.alt = Picture.allPictures[threeNum[2]].name;
  Picture.allPictures[threeNum[2]].totalDisplayed++;

  clickCounter(event);

  console.log(threeNum);
}

function handleClicks() {

  if (allClicks === 0) {

    picElement.removeEventListener('click', giveThreePics);
    picElement2.removeEventListener('click', giveThreePics);
    picElement3.removeEventListener('click', giveThreePics);
    showResults();
  }
}

function showResults() {

  console.log(Picture.allPictures);


  for(var i = 0; i < Picture.allPictures.length; i++){
    
    console.log('b');

    var resultItemElement = document.createElement('li');
    resultItemElement.textContent = Picture.allPictures[i].name + ' has ' + Picture.allPictures[i].totalClicks + ' votes and was displayed ' + Picture.allPictures[i].totalDisplayed + ' times.';

    console.log(resultItemElement);

    resultListElement.appendChild(resultItemElement);
  }
}
giveThreePics();







