const CACHE_NAME = "otp-cctv-v1";

const STATIC_FILES = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];


// Install

self.addEventListener(
"install",
event => {

console.log(
"OTP CCTV Installed"
);


event.waitUntil(

caches.open(CACHE_NAME)
.then(cache => {

return cache.addAll(STATIC_FILES);

})

);


self.skipWaiting();


});




// Activate

self.addEventListener(
"activate",
event => {


console.log(
"OTP CCTV Activated"
);


event.waitUntil(

caches.keys()
.then(keys => {


return Promise.all(

keys
.filter(key => key !== CACHE_NAME)
.map(key => caches.delete(key))

);


})


);


self.clients.claim();


});




// Fetch

self.addEventListener(
"fetch",
event => {


event.respondWith(


fetch(event.request)

.catch(()=>{

return caches.match(event.request);

})


);


});
