const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.booked)");

const count = document.getElementById("count");
const total = document.getElementById("total");

const movieSelected = document.getElementById("movie");

let price = +movieSelected.value; // plus(+) convert to intiger

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("booked")
  ) {
    e.target.classList.toggle("selected");
    updateSelected();
  }
});

// ราคาเปลี่ยนตามหนังแต่ละเรื่อง
movieSelected.addEventListener("change", (e) => {
  price = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelected();
});

updateSelected = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const countSeats = selectedSeats.length;

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  count.innerText = countSeats;
  total.innerText = countSeats * price;
};

setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("moviePrice", moviePrice);
};

showDataToUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const selectMovieIndex = localStorage.getItem("movieIndex");

  seats.forEach((seat, index) => {
    if (selectedSeats.indexOf(index) > -1) {
      seat.classList.add("selected");
    }
  });
  if (selectMovieIndex != null) {
    movieSelected.selectedIndex = selectMovieIndex;
  }
};

showDataToUI();
updateSelected();
