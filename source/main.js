"use strict";
let data = FooBar.getData();
    //console.log(data);
let dataJson =  JSON.parse(data)
console.log(dataJson);
console.log("storage: ", dataJson.storage);
console.log("Q-length: ", dataJson.queue.length);


/* document.getElementById("storage").innerHTML =
dataJson.storage.name */

 dataJson.storage.forEach(function(e){
    let clone = document.querySelector("#dashboardTemp").content.cloneNode(true);
    clone.querySelector("h2").textContent = e.name;
    document.querySelector("#storage").appendChild(clone);
});

    /* function dataFunc(){ }
dataFunc(); */
function Qmeter() {
    let r = 100;
let circles = document.querySelectorAll('.circle');
let total_circles = circles.length;
for (let i = 0; i < total_circles; i++) {
circles[i].setAttribute('r', r);
}

/* Set meter's wrapper dimension */
let meter_dimension = (r * 2) + 100;
let wrapper = document.querySelector("#wrapper");
wrapper.style.width = meter_dimension + "px";
wrapper.style.height = meter_dimension + "px";

/* Add strokes to circles  */
let cf = 2 * Math.PI * r;
let semi_cf = cf / 2;
let semi_cf_1by3 = semi_cf / 3;
let semi_cf_2by3 = semi_cf_1by3 * 2;
document.querySelector("#outline_curves").setAttribute("stroke-dasharray", semi_cf + "," + cf);
document.querySelector("#low").setAttribute("stroke-dasharray", semi_cf + "," + cf);
document.querySelector("#avg").setAttribute("stroke-dasharray", semi_cf_2by3 + "," + cf);
document.querySelector("#high").setAttribute("stroke-dasharray", semi_cf_1by3 + "," + cf);
document.querySelector("#outline_ends").setAttribute("stroke-dasharray", 2 + "," + (semi_cf - 2));
document.querySelector("#mask").setAttribute("stroke-dasharray", semi_cf + "," + cf);

/* Bind range slider event*/
//let slider = document.querySelector("#slider");
let lbl = document.querySelector("#lbl");
let mask = document.querySelector("#mask");
let meter_needle =  document.querySelector("#meter_needle");
let queue = dataJson.queue.length;
console.log("Q", queue);


function range_change_event() {
//let percent = slider.value;
let meter_value = semi_cf - ((queue * semi_cf) / 25);
mask.setAttribute("stroke-dasharray", meter_value + "," + cf);
meter_needle.style.transform = "rotate(" + 
    (270 + ((queue * 180) / 25)) + "deg)";
lbl.textContent = "In Q for beer: " + queue;
}
//slider.addEventListener("input", range_change_event);

range_change_event();
}
Qmeter();
//LAv en funktion for alle elementer og kald dem i 
/* setInterval(function(){ 
    funktionNavn();    
}, 2500); */