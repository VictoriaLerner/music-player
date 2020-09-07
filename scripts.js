const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');


//Music


const songs = [
    {
        name: 'antonio_banderas_cancion_del_mariachi',
        title: 'Cancion del mariachi',
        artist: 'Antonio Banderas',
        img: 'music-1',
    },

    {
        name: 'chingishan_loreleja',
        title: 'Chingishan loreleja',
        artist: 'Chingishan',
        img: 'music-2',
    },

    {
        name: 'music-2',
        title: 'Italian song',
        artist: '',
        img: 'music-3',
    },


];


//Chek if Playing
let isPlaying = false;


function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    music.play();
}


function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    music.pause();
}


//Play or pause eventlistner

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//Update DOM

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.img}.jpg`;
}

// Current Song
let songIndex = 0;


function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}


loadSong(songs[songIndex]);


function updataProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        //Calculate display fot duratioin
        const durationMinutes = Math.floor(duration / 60);

        let durationSeconds = Math.floor(duration % 60);

        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}: ${durationSeconds}`;
        }
        //Calculate display fot currentTime

        const currentMinutes = Math.floor(currentTime / 60);

        let currentSeconds = Math.floor(currentTime % 60);

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }

        currentTimeEl.textContent = `${currentMinutes}: ${currentSeconds}`;


    }

}

//setProgressBar

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;

}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updataProgressBar);
progressContainer.addEventListener('click', setProgressBar);


