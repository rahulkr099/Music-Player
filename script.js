const music = document.querySelector('audio');
const playBtn = document.querySelector('.fa-play');
let isPlay = false;

/* playBtn.addEventListener('click',music.play());
To avoid this function from calling itself without click, use arrow func*/
const songDetails = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

function songPlay() {
  music.play();
  playBtn.classList.replace('fa-play', 'fa-pause');
  isPlay = true;
}
function songPause() {
  music.pause();
  playBtn.classList.replace('fa-pause', 'fa-play');
  isPlay = false;
}
const prev = document.querySelector('.fa-backward-step');
const next = document.querySelector('.fa-forward-step');
const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
let songIndex = 0;

function nextSong() {
  songIndex++;
  if (songIndex > songDetails.length) { songIndex = 0; }
  title.textContent = songDetails[songIndex].displayName;
  artist.textContent = songDetails[songIndex].artist;
  img.src = `img/${songDetails[songIndex].name}.jpg`;
  music.src = `music/${songDetails[songIndex].name}.mp3`;
  songPlay();

}
function prevSong() {
  songIndex--;
  if (songIndex < 0) { songIndex = songDetails.length; }
  title.textContent = songDetails[songIndex].displayName;
  artist.textContent = songDetails[songIndex].artist;
  img.src = `img/${songDetails[songIndex].name}.jpg`;
  music.src = `music/${songDetails[songIndex].name}.mp3`;
  songPlay();

}
const progress = document.getElementById('progress');
const songDuration = document.getElementById('duration');
const currentSongTime = document.getElementById('current-time');

function updateProgressBar(e) {
  // console.log(e);
  //const { duration, currentTime } = e.srcElement; //this is same as duration = e.srcElement.duration; currentTime = e.srcElement.currentTime;
  const durationTime = e.srcElement.duration;//actual song duration from browser
  const currentTime = e.srcElement.currentTime;//actual current timing of song from browser

  //set styling to progress bar
  const progressPercent = (currentTime / durationTime) * 100;
  progress.style.width = `${progressPercent}%`;

  //set currentTime using minutes and seconds
  const currentTimeMin = Math.floor(currentTime / 60);//60 ka division minutes dega
  let currentTimeSec = Math.floor(currentTime % 60);//60 ka division ka remainder seconds dega
  if (currentTimeSec < 10) { currentTimeSec = `0${currentTimeSec}`; }
  currentSongTime.textContent = `${currentTimeMin}:${currentTimeSec}`;

  //set durationTime using minutes and seconds
  const durationMin = Math.floor(durationTime / 60);//60 ka division minutes dega
  let durationSec = Math.floor(durationTime % 60);//60 ka division ka remainder seconds dega
  if (durationSec < 10) { durationSec = `0${durationSec}`; }

  //Delay switching duration Element to avoid NaN
  if(durationSec){
  songDuration.textContent = `${durationMin}:${durationSec}`;}
}

const progressContainer = document.querySelector('.progress-container');

function setProgress(e){
  const width = this.clientWidth;
  console.log('Width of Progress Container:',width);

  const clickX = e.offsetX;
  console.log('Position of User Clicked on Progress Container:',clickX);

  const{duration}= music;//duration = music.duration
  console.log('Percentage of position of User Clicked:',(clickX/width));
  console.log('Position of User clicked in Seconds:',(clickX/width)*duration);

  music.currentTime = (clickX/width)*duration;
  //currentTime = Sets or returns the current playback position in the audio/video (in seconds)
}

playBtn.addEventListener('click', () => (!isPlay) ? songPlay() : songPause());
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click',setProgress);
