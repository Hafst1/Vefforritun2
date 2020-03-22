/*
  Here should your implementation reside
*/

// 1.
var idOne = document.getElementById('one');
console.log(idOne.parentNode.parentNode);

// 2.
var listOfItems = document.getElementsByClassName('item');
for (let i = 0; i < listOfItems.length; i++) {
  console.log(listOfItems[i].nextSibling);
}

// 3.
var inputChange = document.querySelectorAll('input');
for (let i = 0; i < inputChange.length; i++) {
  inputChange[i].setAttribute('type', 'password');
  inputChange[i].setAttribute('value', 'Abc');
}

// 4.
var oldParagraph = document.querySelectorAll('p[data-value="paragraph"]');
for (let i = 0; i < oldParagraph.length; i++) {
  oldParagraph[i].append(" paragraph");
}

// 5.
var changeMoon = document.getElementsByClassName('moon');
for (let i = 0; i < changeMoon.length; i++) {
  changeMoon[i].classList.add('sun');
}

var changeSun = document.getElementsByClassName('sun');
for (let i = 0; i < changeSun.length; i++) {
  changeSun[i].classList.remove('moon');
}

// 6.
var boxClick = document.getElementById('box');
boxClick.addEventListener('click', function (evt) {
  var r = evt.target.getBoundingClientRect();
  var x = evt.clientX -r.left;
  var y = evt.clientY - r.top;  
  var div = document.createElement('div');
  div.style.left = String(x) + 'px';
  div.style.top = String(y) + 'px';
  div.className = 'box-point';
  document.getElementById('box').appendChild(div);
});

// 7.
var rotateSquare = document.getElementById('square');
rotateSquare.addEventListener('mouseover', function (evt) {
  this.style.transformOrigin = `${evt.offsetX}px ${evt.offsetY}px`;
  this.classList.add('rotation');
})

// 8.
function makeCompanyRequest(companyName) {
  var apisUrl = `https://apis.is/company?name=${companyName}`;
  var request = new XMLHttpRequest();
  request.open('GET', apisUrl);
  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      var json = JSON.parse(request.responseText);
      console.log(json);
    }
  }
  request.send();
}

