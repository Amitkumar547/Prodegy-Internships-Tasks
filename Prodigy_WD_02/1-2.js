let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;

const timerDisplay = document.getElementById('timerDisplay');
const lapContainer = document.getElementById('lapContainer');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTimer, 10);
        running = true;
    }
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    timerDisplay.innerHTML = (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds);
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    timerDisplay.innerHTML = "00:00:00.00";
    difference = 0;
    running = false;
    lapCounter = 1;
    lapContainer.innerHTML = "";
}

function recordLap() {
    if (running) {
        const lapTime = document.createElement('div');
        lapTime.classList.add('lap-item'); // Add class for styling
        lapTime.innerHTML = `Lap ${lapCounter}: ${timerDisplay.innerHTML}`;
        lapContainer.appendChild(lapTime);
        lapCounter++;
    }
}

// Event Listeners
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('lapBtn').addEventListener('click', recordLap);