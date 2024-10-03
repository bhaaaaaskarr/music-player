let songs=[
    {name:'Ram Siya Ram', url:"./songs/Ram Siya Ram.mp3",image:"./images/sita-ram.avif",duration:"03:50"},
    {name:'Muqaddar Ka Shikandar', url:"./songs/muqaddar.mp3",image:"./images/sikandar.jpeg",duration:"05:20"},
    {name:'Kachha Ghada',url:'./songs/ghada.mp3',image:'./images/kachhaghada.jpg',duration:"04:03"},
    {name:'Naah Goriye',url:'./songs/naah.mp3',image:'./images/naah.jpg',duration:"03:10"},
    {name:'Prithvi',url:'./songs/Prithvi.mp3',image:'./images/prithvi.jpg',duration:"03:47"},
    {name:'Aaj Ki Raat',url:'./songs/stree2.mp3',image:'./images/aajkiraat.jpg',duration:"03:48"},
    
    {name:'Arjan Vailly', url:"./songs/Arjan Vailly Ne.mp3",image:"./images/arjan.jpg",duration:"03:02"},
    {name:'Jale 2', url:"./songs/Jale 2.mp3",image:"./images/jale.jpg",duration:"02:39"},
    {name:'Pehle Bhi Main', url:"./songs/Pehle Bhi Main.mp3",image:"./images/animal.jpg",duration:"04:10"},

]

let allSongs=document.querySelector('#all-songs');
let audio= new Audio();
let poster=document.querySelector('#left');
let selectedSong=0;
let play=document.querySelector('#play');
let backward=document.querySelector('#backward');
let forward=document.querySelector('#forward');
let progressBar = document.querySelector('.progress');
let timeline=document.querySelector('.timeline');



function addSongs(){
    let songClutter=[];
    songs.forEach((element,idx)=>{
        songClutter+=`<div class="song-card" id="${idx}">
                    <div class="part-1">
                        <img src="${element.image}" alt="${element.name}">
                    <h2>${element.name}</h2>
                    </div>
                    <h5>${element.duration}</h5>

                </div>`;
        
    })
        allSongs.innerHTML=songClutter;
        const songCards = document.querySelectorAll('.song-card');
    songCards[selectedSong].classList.add('active-song'); // Highlight the current song

   
        audio.src=songs[selectedSong].url;
        poster.style.backgroundImage=`url(${songs[selectedSong].image})`

}


function playSong(){
    allSongs.addEventListener('click',(details)=>{ //event bubbling
        selectedSong=details.target.id;
        play.innerHTML=`<i class="ri-pause-fill"></i>`;
        playFlag=1;
        addSongs();
        audio.play();

        
    })
}

let playFlag=0;
function playFunc(){
    play.addEventListener('click',()=>{
        if(playFlag==0){
            play.innerHTML=`<i class="ri-pause-fill"></i>`
            // addSongs();//song will be played from the beginning
            audio.play();
            playFlag=1;
        } else{
            play.innerHTML=`<i class="ri-play-fill"></i>`
            audio.pause();
            playFlag=0;
        }
        console.log(playFlag)
    });
}

function forwardFunc(){
    forward.addEventListener('click',()=>{
        if(playFlag==0){
            play.innerHTML=`<i class="ri-pause-fill"></i>`;
            playFlag=1;
        }
        if(selectedSong<songs.length-1){
        selectedSong++;
        addSongs();
        audio.play();
        console.log(playFlag)
    } else{
        selectedSong=0;
        addSongs();
        audio.play();
        console.log(playFlag)
    }
    })
}
function backwardFunc(){
    backward.addEventListener('click',()=>{
        if(playFlag==0){
            play.innerHTML=`<i class="ri-pause-fill"></i>`;
            playFlag=1;
        }
        if(selectedSong>0){
            selectedSong--;
            addSongs();
            audio.play();
            console.log(playFlag)

    } else{
        selectedSong=songs.length-1;
        addSongs();
        audio.play();
        console.log(playFlag);

    }        
    })
}

function timeUpdate(){
    audio.addEventListener('timeupdate',()=>{
        let progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`; // Update the width based on the current time
    
    });
}

function clickTime(){
        timeline.addEventListener('click', (e) => {
            const timeline = e.currentTarget; // Ensure we're targeting the timeline, not the progress bar
            const rect = timeline.getBoundingClientRect(); // Get the size and position of the timeline
            const clickX = e.clientX - rect.left; // Click position relative to the timeline
            const width = rect.width; // Total width of the timeline
        
            const newTime = (clickX / width) * audio.duration; // Calculate new time based on the click
            console.log(`Clicked at ${clickX}px on timeline of ${width}px width`);
            console.log(`New time set to: ${newTime} seconds`);
        
            // Set the audio's current time to the new calculated time
            audio.currentTime = newTime;
     });
}

function songEnd(){
    
audio.addEventListener('ended',()=>{
    if (selectedSong < songs.length - 1) {
        selectedSong++; // Go to the next song in the list
    } else {
        selectedSong = 0; // Loop back to the first song if it's the last one
    }
    addSongs(); // Load the next song
    audio.play(); // Automatically play the next song
});

}
songEnd();
clickTime();
timeUpdate();
forwardFunc();
backwardFunc();
addSongs();
playSong();
playFunc();
