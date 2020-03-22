const animateFirstRunner = () => {
  document.getElementById('running').classList.add('animate-boy');
};

const animateSecondRunner = () => {
  document.getElementById('running-girl').classList.add('animate-girl');
};

// a
observer.subscribe('first', animateFirstRunner);

// b
const firstButton = document.getElementById('first');
firstButton.addEventListener('click', function() {
  observer.emit('first', Node);
})

// c
observer.subscribe('second', animateSecondRunner);

// d
const secondButton = document.getElementById('second');
secondButton.addEventListener('click', function() {
  observer.emit('second', Node);
})

// e
const thirdButton = document.getElementById('all');
thirdButton.addEventListener('click', function() {
  observer.broadcast();
})