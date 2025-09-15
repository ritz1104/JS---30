const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');

const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.srcObject = localMediaStream; // Updated to srcObject
      video.play();
    })
    .catch(err => console.log('Webcam access error: ', err.message));
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height); 
    //take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    //mess with them

    // pixels = redEffect(pixels)
    // pixels = rgbSplit(pixels)
    // ctx.globalAlpha = 0.1;
    pixels = greenScreen(pixels)

    // put them back
    ctx.putImageData(pixels, 0, 0);  
  },16)

}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg', 0.8);
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download','handsome')
    link.innerHTML = `<img src="${data}" alt ="Handsome Man"></img>`;
    strip.insertBefore(link,strip.firstChild)
}

getVideo();
video.addEventListener('canplay', paintToCanvas); 

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100; //red
        pixels.data[i + 1] = pixels.data[i + 1] - 50; //green
        pixels.data[i + 2] = pixels.data[i + 2] *0.5; //blue
    }
    return pixels;  
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        // Shift red to the left and increase green and blue offsets
        pixels.data[i -150] = pixels.data[i + 0] // red
        pixels.data[i + 500] = pixels.data[i + 1]  // green
        pixels.data[i -550] = pixels.data[i + 2]      // blue
    }
    return pixels;
}
function greenScreen(pixels) {
    const levels = {
        rmin: document.querySelector('[name="rmin"]').value,
        gmin: document.querySelector('[name="gmin"]').value,
        bmin: document.querySelector('[name="bmin"]').value,
        rmax: document.querySelector('[name="rmax"]').value,
        gmax: document.querySelector('[name="gmax"]').value,
        bmax: document.querySelector('[name="bmax"]').value
    };
    
    // Convert string inputs to numbers
    for (let key in levels) {
        levels[key] = parseInt(levels[key]);
    }

    for (let i = 0; i < pixels.data.length; i += 4) {
        const red = pixels.data[i + 0];
        const green = pixels.data[i + 1];
        const blue = pixels.data[i + 2];
        const alpha = pixels.data[i + 3];
        
        // Check if the pixel is within the green screen range
        if (
            red >= levels.rmin && red <= levels.rmax &&
            green >= levels.gmin && green <= levels.gmax &&
            blue >= levels.bmin && blue <= levels.bmax
        ) {
            pixels.data[i + 3] = 0; // Set alpha to 0 (transparent)
        }
    }

    return pixels;
}


