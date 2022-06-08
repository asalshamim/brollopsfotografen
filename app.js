
const cameraButton = document.querySelector('#start-camera');
const videoElem = document.querySelector('#camera');
const takePicButton = document.querySelector('#take-image');
const canvas = document.querySelector('#img-canvas');
const notis = document.querySelector('#notify');

const ctx = canvas.getContext('2d');
let Stream;
let GalleryImgage = [];

//Service-Worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
        .then(() => { console.log('Service worker registered') })
        .catch(() => { console.log('Service worker not registered') });
    }
}
registerServiceWorker();

//Takes picture
window.addEventListener('load', async () => {
    if ('mediaDevices' in navigator) {
        Stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        console.log(Stream);
        videoElem.style.display = 'flex';
        videoElem.srcObject = Stream;

    }

    const oldImg = JSON.parse(localStorage.getItem('weddingApp'));
    oldImg.push(GalleryImgage)
    console.log(GalleryImgage)

});

takePicButton.addEventListener('click', () => {
    ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png'); 

    GalleryImgage.push({
        id: GalleryImgage.length,
        image: imageData        
    });

    localStorage.setItem('weddingApp', JSON.stringify(GalleryImgage));
    canvas.style.display = 'flex'

    //Notis
    notify.style.display = 'flex'

    setTimeout(function(){
        document.getElementById("notify").style.display = "none"; 
       }, 3000);

    setTimeout(function(){
        document.getElementById("img-canvas").style.display = "none"; 
       }, 3000);

});


const galleryPage = document.querySelector('to-gallery');

function toGallery() {
    window.location.href="gallery.html";
}
const cameraPage = document.querySelector('to-camera');

function toCamera() {
    window.location.href="camera.html";
}

 const ACCES_URL = "https://api.jsonbin.io/b/62a0acbf402a5b38022029ec"
    const X_MASTER_KEY = "$2b$10$HTKyqtPXslzd64Y7o6o/jeH5/glt6vMoUV/bxBVSglLHF3cgMaVmm"

    async function getFromJsonBIN () {
      const responce = await fetch(`${ACCES_URL}/latest`, {
        headers: {
          'X-Master-Key': X_MASTER_KEY,
        }
      });
      const data = await responce.json()

      let newArray = { pictures: [] }

      console.log(data);
      data.pictures.map((object) => {
        newArray.pictures.push(object)
      })

      localStorage.setItem('cameraApp', JSON.stringify(newArray));

      return newArray
    }

    async function updatePhotosJSONbin () {

      const fromStorage = window.localStorage.getItem('cameraApp')

      const responce = await fetch(ACCES_URL, {
        method: 'PUT',
        body: fromStorage,
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': X_MASTER_KEY
        }
    });

    const data = await responce.json();

    console.log(data);
  }

    




