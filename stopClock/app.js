/* 
An algorithm that starts a timer (that counts up in seconds, minutes and hours). 

//////// REQUREMENTS /////////

1. Timer can be started.
2. Timer can be paused/continued.
3. Timer can be stopped.

When the timer is paused and then continued, it should resume from where it has stopped previously

When a timer is stopped, it should still display the time at which it was stopped at until it is started again.

*/

// Declaring variables
let startBtn = document.querySelector("#start");
let stopBtn = document.querySelector("#stop");
let resetBtn = document.querySelector("#reset");
let seconds = document.querySelector("#seconds");
let minutes = document.querySelector("#minutes");
let hours = document.querySelector("#hours");

// Initiating time components
let counter = 0;
let start;
let started = false;

// Listening to events
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

// Start time
function startTimer() {
  if (started) {
    return;
  } else {
    started = true;
    start = setInterval(incrementTime, 1000);
  }
}

// Stop time
function stopTimer() {
  if (!started) {
    return;
  }
  started = false;
  startBtn.innerHTML = "Continue";
  clearInterval(start);
}

// Reset time
function resetTimer() {
  stopTimer();
  counter = 0;
  startBtn.innerHTML = "Start";
  seconds.innerHTML = "00";
  minutes.innerHTML = "00";
  hours.innerHTML = "00";
}

// Counting in seconds, minutes and hours
function incrementTime() {
  counter += 1;
  let numOfSeconds = counter % 60;
  let numOfMinutes = Math.floor(counter / 60);
  let numOfHours = Math.floor(numOfMinutes / 60);
  
  seconds.innerHTML = formatCounter(numOfSeconds);
  hours.innerHTML = formatCounter(numOfHours);

  // Re-iterate minutes
  if (numOfMinutes > 59) {
    minutes.innerHTML = formatCounter(numOfMinutes % 60);
  } else {
    minutes.innerHTML = formatCounter(numOfMinutes);
  }
}

// Formatting
function formatCounter(value) {
  return value < 10 ? `0${value}` : value;
}
