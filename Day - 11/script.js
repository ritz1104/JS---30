//get our element
const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip')
const ranges = player.querySelectorAll('.player__slider') 
//build out the function

function togglePlay(){
   const method = video.paused ? 'play' : 'pause';
   video[method]();
}
function updateButton(){
   const icon = this.paused ? '<i class="ri-play-large-fill"></i>' : '<i class="ri-pause-line"></i>';
   toggle.innerHTML = icon;
        
}

function skip(){
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip)
    
}


function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgressBar(){
    const percent = (video.currentTime/video.duration) *100
    progressBar.style.width = `${percent}%`
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener('click',togglePlay)
video.addEventListener('play',updateButton)
video.addEventListener('pause',updateButton)
video.addEventListener('timeupdate', handleProgressBar);

toggle.addEventListener('click',togglePlay)

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e)=> mousedown && scrub(e));
progress.addEventListener('mousedown', ()=> mousedown = true);
progress.addEventListener('mouseup', ()=> mousedown = false);