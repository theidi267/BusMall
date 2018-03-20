

//array to hold all the pctures as objects

Picture.allPictures = [];

//make a constuctor function for picture objects

function Picture(filepath, name) {
  this.filepath = filepath;
  this.name = name;
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

console.log(Picture.allPictures);

//access the element

var picElement = document.getElementById('pic1');
var picElement2 = document.getElementById('pic2');
var picElement3 = document.getElementById('pic3');


// event listener

picElement.addEventListener('click', giveThreePics);
picElement2.addEventListener('click', giveThreePics);
picElement3.addEventListener('click', giveThreePics);


//function to count

function clickCounter(event)

//function to call

function giveThreePics(event) {

  console.log(event.target.currentSrc);

  var threeNum = [];

  function randNums(min, max) {
    // var threeNum = [];
    for(var i=0; i<3;i++) {
      threeNum.push(Math.floor(Math.random()*max)+min);
    }
  }
  randNums(0, Picture.allPictures.length);

  picElement.src = Picture.allPictures[threeNum[0]].filepath;
  picElement.alt = Picture.allPictures[threeNum[0]].name;

  picElement2.src = Picture.allPictures[threeNum[1]].filepath;
  picElement2.alt = Picture.allPictures[threeNum[1]].name;

  picElement3.src = Picture.allPictures[threeNum[2]].filepath;
  picElement3.alt = Picture.allPictures[threeNum[2]].name;

  console.log(threeNum);

}