const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();
let ticketPrice = +movieSelect.value;

let firebaseConfig = {
  apiKey: "AIzaSyCXASI6b49kj_UJadQrYwX5OfBJQc5noME",
  authDomain: "nithinloverboy-4ac96.firebaseapp.com",
  databaseURL: "https://nithinloverboy-4ac96-default-rtdb.firebaseio.com",
  projectId: "nithinloverboy-4ac96",
  storageBucket: "nithinloverboy-4ac96.appspot.com",
  messagingSenderId: "237388255563",
  appId: "1:237388255563:web:c2ded38588f7d13092d8ce",
  measurementId: "G-M8PF7591RE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  //copy selected seats into arr
  // map through array
  //return new array of indexes

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localstorage and populate ui
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// intial count and total
updateSelectedCount();

async function bookticket(){
  try{
    alert(parseInt(count.innerText,10))
  var user_data = {
    ticketCount: parseInt(count.innerText,10),
  };
  const email=localStorage.getItem("user");
  const usersRef = database.ref("users/" + email.split("@")[0]);
  await usersRef.update(user_data);
  alert("ticket booked")
  localStorage.removeItem("selectedSeats")
  window.close();
}catch(err){
  console.log("error");
}
}
