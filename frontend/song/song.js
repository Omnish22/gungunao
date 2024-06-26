import loadHTML from "../base/loadhtml.js";

let thumbnail = document.querySelector('.thumbnail') 
let songID; 
let slider = document.querySelector('.slider') 
let songName = document.querySelector('.songName') 
let artistName = document.querySelector('.artistName') 
let playpause = document.querySelector('.playpause') 
let playpauseImg = document.querySelector('.playpause img') 
let play = false; // 1 MEANS SONG IS PLAYING AND 0 MEANS SONG IS PAUSED 
let intervelID; 
let currentTimeElem = document.querySelector('.currentTime') 
let durationTime = document.querySelector('.durationTime')
// ============ EVENT LISTENERS ================

document.addEventListener('DOMContentLoaded', () => {
    loadHTML('#navbar', '../base/navbar.html');
    });

playpause.addEventListener('click',()=>{ 
    console.log(play)
    updatePlayPauseIcon(play); 
    if(!play){ 
        playSong(); 
    } 
    else{ 
        pauseSong() 
    } 
    intervelID = connectSliderAudio();

})


slider.addEventListener('mousedown',()=>{ 
    disconnectSliderAudio(intervelID);

})

slider.addEventListener('mouseup',()=>{ 
    let audio = document.querySelector('audio'); 
    audio.currentTime = slider.value 
    intervelID = connectSliderAudio(); 
    playSong(); 
})


// =========== FETCH SONG DATA ==========
document.addEventListener('DOMContentLoaded', () => {

    let song = JSON.parse(localStorage.getItem('song'))
    let name = song.name;
    let singers = song.metadata.artist_name
    let thumbnail = song.thumbnail_base64
    let duration = song.duration
    songName.innerHTML = name;
    createThumbnail(thumbnail)
    artistName.innerHTML = singers
    updateSliderLength(duration)
    fetchAndPlaySong(song.id)
    updateTime(durationTime, formatTime(duration))
});



// ======== FUNCTIONS ============
function createThumbnail(imgSrc){
    
    let imgThumbnail = document.createElement('img')
    imgThumbnail.setAttribute('src', `data:image/jpeg;base64,${imgSrc}`)
    thumbnail.appendChild(imgThumbnail)

}

function fetchAndPlaySong(songID) {
    fetch(`http://127.0.0.1:8000/songs/play/${songID}/`) 
    .then(response => response.blob()) 
    .then(blob => { 
        let audioDiv = document.querySelector('#audio-div') 
        const url = URL.createObjectURL(blob); // Create an audio element 
        const audioElement = document.createElement('audio'); 
        audioElement.src = url; audioElement.controls = true; 
        // Adds playback controls (optional) 
        // Append the audio element to the body (or any other container element) 
        audioDiv.appendChild(audioElement);
            
    })
    .catch(error => console.error('Error fetching song file:', error));
}


function updatePlayPauseIcon(isSongPlay){ 
    if(!isSongPlay){ 
        playpauseImg.src="images/pause-solid.svg" 
    }
    else{ 
        playpauseImg.src="images/play-solid.svg" 
    } 
}

function updateSliderLength(max){ 
    slider.max = max 
}

function updateSliderValue(value){ 
    slider.value = value; 
}



function connectSliderAudio(currentTime){ 
    let audio = document.querySelector('audio'); 
    let intervelID = setInterval(()=>{ 
        updateSliderValue(audio.currentTime) 
        updateTime(currentTimeElem, formatTime(audio.currentTime)) 
    },100) 
    return intervelID 
}

function disconnectSliderAudio(intervelID){

    clearInterval(intervelID);
}

function playSong(){ 
    let audio = document.querySelector('audio'); 
    console.log(audio)
    audio.play(); 
    play=true; 
}



function pauseSong(){ 
    let audio = document.querySelector('audio'); 
    audio.pause(); 
    play=false; 
}

function backToHome(home){ 
    
    if (home) {
        console.log('inside if')
        console.log(home)
        home.addEventListener('click', () => {
            console.log('inside event listener')
            window.location.href = '../home/home.html';
        });
    } else {
        console.error('Home element not found');
    }
}

function updateTime(element, time){ 
    if(element){ 
        element.innerHTML = time 
    } 
    else{ 
        console.log("Missing Element") 
    } 
}

function formatTime(seconds) { 
    const minutes = Math.floor(seconds / 60); 
    const remainingSeconds = Math.floor(seconds % 60); 
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
 }

