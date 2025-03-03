let songs = [
    { name: 'Ram Siya Ram', url: "./songs/Ram Siya Ram.mp3", image: "./images/sita-ram.avif", duration: "03:50" },
    { name: 'Muqaddar Ka Shikandar', url: "./songs/muqaddar.mp3", image: "./images/sikandar.jpeg", duration: "05:20" },
    { name: 'Kachha Ghada', url: './songs/ghada.mp3', image: './images/kachhaghada.jpg', duration: "04:03" },
    { name: 'Naah Goriye', url: './songs/naah.mp3', image: './images/naah.jpg', duration: "03:10" },
    { name: 'Prithvi', url: './songs/Prithvi.mp3', image: './images/prithvi.jpg', duration: "03:47" },
    { name: 'Aaj Ki Raat', url: './songs/stree2.mp3', image: './images/aajkiraat.jpg', duration: "03:48" },
    { name: 'Arjan Vailly', url: "./songs/Arjan Vailly Ne.mp3", image: "./images/arjan.jpg", duration: "03:02" },
    { name: 'Jale 2', url: "./songs/Jale 2.mp3", image: "./images/jale.jpg", duration: "02:39" },
    { name: 'Pehle Bhi Main', url: "./songs/Pehle Bhi Main.mp3", image: "./images/animal.jpg", duration: "04:10" },
];

let allSongs = document.querySelector('#all-songs');
let audio = new Audio();
let poster = document.querySelector('#left');
let selectedSong = 0;
let play = document.querySelector('#play');
let backward = document.querySelector('#backward');
let forward = document.querySelector('#forward');
let progressBar = document.querySelector('.progress');
let timeline = document.querySelector('.timeline');
let randomBtn = document.querySelector('#random');
let isShuffleOn = false;
let shuffleQueue = [];
let shuffleIndex = 0;

// Function to shuffle the array (Fisher-Yates Shuffle)
function shuffleSongs() {
    shuffleQueue = [...Array(songs.length).keys()]; // Create an index array [0,1,2,...]
    for (let i = shuffleQueue.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffleQueue[i], shuffleQueue[j]] = [shuffleQueue[j], shuffleQueue[i]]; // Swap elements
    }
    shuffleIndex = 0;
}

// Toggle shuffle mode
randomBtn.addEventListener('click', () => {
    isShuffleOn = !isShuffleOn;
    randomBtn.classList.toggle('active', isShuffleOn);
    if (isShuffleOn) {
        shuffleSongs();
    }
});

// Function to add songs to UI
function addSongs() {
    let songClutter = "";
    songs.forEach((element, idx) => {
        songClutter += `<div class="song-card ${idx === selectedSong ? 'active-song' : ''}" id="${idx}">
                    <div class="part-1">
                        <img src="${element.image}" alt="${element.name}">
                        <h2>${element.name}</h2>
                    </div>
                    <h5>${element.duration}</h5>
                </div>`;
    });
    allSongs.innerHTML = songClutter;
    audio.src = songs[selectedSong].url;
    poster.style.backgroundImage = `url(${songs[selectedSong].image})`;
}

// Function to play the next song
function playNextSong() {
    if (isShuffleOn) {
        if (shuffleIndex >= shuffleQueue.length) shuffleSongs(); // Reshuffle after all songs played
        selectedSong = shuffleQueue[shuffleIndex++];
    } else {
        selectedSong = (selectedSong + 1) % songs.length;
    }
    addSongs();
    audio.play();
}

// Function to play song when clicked from list
function playSong() {
    allSongs.addEventListener('click', (details) => {
        selectedSong = parseInt(details.target.closest('.song-card').id);
        play.innerHTML = `<i class="ri-pause-fill"></i>`;
        playFlag = 1;
        addSongs();
        audio.play();
    });
}

let playFlag = 0;
function playFunc() {
    play.addEventListener('click', () => {
        if (playFlag === 0) {
            play.innerHTML = `<i class="ri-pause-fill"></i>`;
            audio.play();
            playFlag = 1;
        } else {
            play.innerHTML = `<i class="ri-play-fill"></i>`;
            audio.pause();
            playFlag = 0;
        }
    });
}

// Forward button functionality
forward.addEventListener('click', () => {
    if (playFlag === 0) {
        play.innerHTML = `<i class="ri-pause-fill"></i>`;
        playFlag = 1;
    }
    playNextSong();
});

// Backward button functionality
backward.addEventListener('click', () => {
    if (playFlag === 0) {
        play.innerHTML = `<i class="ri-pause-fill"></i>`;
        playFlag = 1;
    }
    if (isShuffleOn) {
        if (shuffleIndex > 1) shuffleIndex -= 2; // Go back in shuffled queue
        else shuffleIndex = 0;
        selectedSong = shuffleQueue[shuffleIndex++];
    } else {
        selectedSong = (selectedSong > 0) ? selectedSong - 1 : songs.length - 1;
    }
    addSongs();
    audio.play();
});

// Update progress bar
audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
});

// Click timeline to change song position
timeline.addEventListener('click', (e) => {
    const rect = timeline.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * audio.duration;
    audio.currentTime = newTime;
});

// Play next song when current ends
audio.addEventListener('ended', playNextSong);

// Initialize player
addSongs();
playSong();
playFunc();
