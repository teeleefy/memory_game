document.addEventListener("DOMContentLoaded", function () {
  const gameContainer = document.getElementById("game");

  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple",
  ];

  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want to research more
  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let shuffledColors = shuffle(COLORS);

  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card
  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");

      //Give the card a pretty decoration
      // newDiv.setAttribute("class", "cardDecor");

      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color, "cardDecor");

      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  }

  let allowClicks = true;
  let gameStarted = false;
  let matchedPairs = 0;
  let card1 = null;
  let card2 = null;
  let stopWatch = 0;
  let score = 0;
  let yourScore = document.querySelector("#score");
  let heading = document.querySelector("#heading");

  function timer() {
    setInterval(function () {
      if (!score) {
        stopWatch += 1;
        yourScore.innerText = `Your time is: ${stopWatch} seconds.`;
        console.log(stopWatch);
      } else {
        return;
      }
    }, 1000);
  }

  document.addEventListener("click", timer, { once: true });

  // TODO: Implement this function!
  function handleCardClick(event) {
    // gameStarted = true;
    console.log(matchedPairs);
    // PREVENT ILLEGAL CLICKS
    if (!allowClicks) return;
    // if (numFlipped === 2) return;
    if (!event.currentTarget.classList.contains("cardDecor")) return;

    //END PREVENT ILLEGAL CLICKS

    //This TURNS OFF cardDecor and TURNS ON card color-like it was being flipped
    event.target.classList.toggle("cardDecor");
    event.target.style.backgroundColor = event.target.classList.value;
    //END

    //ASSIGN FIRST CARD NAME
    let clickedCard = event.currentTarget;

    if (!card1 || !card2) {
      card1 = card1 || clickedCard;
      if (clickedCard !== card1) {
        card2 = clickedCard;
      }
    }

    if (card1 || card2) {
      gameStarted = true;
    }

    //TWO CARDS FLIPPED
    if (card1 && card2) {
      allowClicks = false;
      setTimeout(function () {
        allowClicks = true;
        card1 = null;
        card2 = null;
      }, 1250);
      console.log("card 1 class name:", card1.className);
      console.log("card 2 class name:", card2.className);
    }

    // you can use event.target to see which element was clicked
    console.log("you just clicked", event.target);

    if (card1.className === card2.className) {
      console.log("You've got a match!!");
      matchedPairs += 1;
      console.log(matchedPairs);

      if (matchedPairs === COLORS.length / 2) {
        score = stopWatch;
        console.log(`You completed the game in ${score} seconds.`);
      }

      setTimeout(function () {
        if (matchedPairs === COLORS.length / 2) {
          heading.innerText = "YOU WIN!!!!!";
          yourScore.innerText = `Your score is: ${score} seconds.`;
          // yourScore.textContent = `Fastest time is: ${score}`;
          return;
        }
      }, 350);
    }

    setTimeout(function () {
      if (card1.className === card2.className) {
        console.log("You've got a match!!");
      } else {
        card1.classList.add("cardDecor");
        card2.classList.add("cardDecor");
      }
    }, 1000);
  }

  // when the DOM loads
  createDivsForColors(shuffledColors);
  // let restartButton = document.querySelector("#restart");
  // if(restartButton.style.display !== none){
  // restartButton.addEventListener("click", window.location.reload());
});
