
Picture.allPictures = [];

//Picture names for chart labels

var pictureNames = [];

//totalclicks for barchart

var allPicClicks = [];

var storedPicClicks = [];

//total displayed to hold total displayed

//var totalDisplayed = [];

//last displayed picures

var picsLastDisplayed = [];

//click tracker

var allClicks = 5;

function Picture(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.totalDisplayed = 0;
  this.totalClicks = 0;
  Picture.allPictures.push(this);
  pictureNames.push(this.name);
}

//make the objects
function fillPictureNames() {

  for(var k = 0; k < Picture.allPictures.length; k++){

    pictureNames.push(Picture.allPictures[k].name);
    storedPicClicks.push(Picture.allPictures[k].totalClicks);
  }
}

function storedPictures() {

  var picsStored = localStorage.getItem('stored');
  var picsFromStorage = JSON.parse(picsStored);
  if ( picsFromStorage && picsFromStorage.length) {
    Picture.allPictures = picsFromStorage;
    fillPictureNames();
    return
  }


  console.log('Doing it the hard way');

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

}

// console.log(Picture.allPictures);

//access the element

var picElement = document.getElementById('pic1');
var picElement2 = document.getElementById('pic2');
var picElement3 = document.getElementById('pic3');


picElement.addEventListener('click', giveThreePics);
picElement2.addEventListener('click', giveThreePics);
picElement3.addEventListener('click', giveThreePics);

function loadPicsToLS() {

  var savePictures = JSON.stringify(Picture.allPictures);
  localStorage.setItem('stored', savePictures);

}


function clickCounter(event) {

  var splitStuff = event.target.currentSrc.split('/');
  var filename = splitStuff.slice(splitStuff.length-2, splitStuff.length).join('/');

  for(var j=0; j < Picture.allPictures.length; j++) {

    if ( Picture.allPictures[j].filepath === filename) {

      allPicClicks.push(Picture.allPictures[j].totalClicks++);
      allClicks--;
      handleClicks();
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

  console.log(Picture.allPictures[threeNum[0]].filepath);
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
    loadPicsToLS();    
    renderChart();
  }
}

function renderChart() {

  var context = document.getElementById('picture-chart').getContext('2d');

  var arrayOfColors = ['#ffe69', '#ffff99', '#e6ff99', '#ccff99', '#b3ff99', '#99ff99', '#99ffb3', '#99ffcc', '#99ffe6', '#99ffff', '#99e6ff', '#99ccff', '#99b3ff', '#9999ff', '#b399ff', '#cc99ff', '#e699ff', '#ff99ff', '#ff99e6', '#ff99cc'];

  new Chart(context, {
    type: 'bar',
    data: {
      labels: pictureNames,
      datasets: [{
        label: 'Most popular thing',
        data: storedPicClicks,
        backgroundColor: arrayOfColors,
      }]
    },
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
storedPictures();
giveThreePics();
