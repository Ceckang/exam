"use strict";
document.addEventListener("DOMContentLoaded",loadScript);

function loadScript(){

    let data = FooBar.getData();
    //console.log(data);
let dataJson =  JSON.parse(data);
console.log(dataJson);
console.log("storage: ", dataJson.storage);
console.log("Q-length: ", dataJson.queue.length);
/* document.getElementById("storage").innerHTML =
dataJson.storage.name */

/*  dataJson.storage.forEach(function(e){
    let clone = document.querySelector("#dashboardTemp").content.cloneNode(true);
    clone.querySelector("#storageTemp").textContent = e.name;
    document.querySelector("#storage").appendChild(clone);
   
}); */

//Bartenders
//statusDetail: "waiting", usingTap: null, servingCustomer: null
document.querySelector("#recieveBartenders").innerHTML ="";

dataJson.bartenders.forEach(function(e){
    let clone = document.querySelector("#bartenderTemp").content.cloneNode(true);
    clone.querySelector("h1").textContent = e.name;
    if (e.name == "Jonas"){
        clone.querySelector("img").src = "img/bartender/jonas.jpg";
    } else if (e.name == "Peter"){
        clone.querySelector("img").src = "img/bartender/peter2.jpg";}
        else {
            clone.querySelector("img").src = "img/bartender/martin.jpg";
        }
    if(e.usingTap != null){ 
        clone.querySelector(".tap").textContent = "Using tap #"+e.usingTap;
        } else {
        clone.querySelector(".tap").textContent = "No tap in use";
        }
     if(e.servingCustomer != null){ 
            clone.querySelector(".serving").textContent = "Serving customer #"+e.servingCustomer;
            } else {
            clone.querySelector(".serving").textContent = "Not seving any customers at the moment";
            }
    clone.querySelector(".status").textContent = e.status;
    clone.querySelector(".statusDetail").textContent = e.statusDetail;
    
    document.querySelector("#recieveBartenders").appendChild(clone);
    });

//Storage
//resetter, så det ikke bliver apennded flere gange efter hinanden 
document.querySelector("#recieveStorage").innerHTML ="";

dataJson.storage.forEach(function(e){
    // laver klon
    let clone = document.querySelector("#storageTemp").content.cloneNode(true);
    // indsætter navn på element (i dette tilfælde storage navn)
    clone.querySelector("p").textContent = e.name;
    // indsætter mængden på storage element 
    clone.querySelector(".bar-wrap").innerHTML= '<span class="bar-fill" style="width:'+ e.amount * 10 +'%;">'+e.amount+'/10</span>';
   //clone.querySelector(".amount").textContent =  e.amount;
    
    
    // appender storage klonen til storage-div'en i html'en. 
    document.querySelector("#recieveStorage").appendChild(clone);
    });   
       
//TAPS
    document.querySelector("#recieveTaps").innerHTML ="";

    dataJson.taps.forEach(function(e){
        // laver klon
        let clone = document.querySelector("#tapsTemp").content.cloneNode(true);
        // indsætter navn på element (i dette tilfælde storage navn)
        console.log("level",e.level);
        console.log("percent:",100%-((e.level*100)/e.capacity)+"%")
        let fillPercent = 100%-((e.level*100)/e.capacity);
        let capacityPercent = (e.level*100)/e.capacity;
        console.log(fillPercent);
        //clone.querySelector(".liquid").style.transform = "translateY(40%)";
        clone.querySelector(".amount").textContent = capacityPercent+"%";
        clone.querySelector("h3").textContent = e.beer;
        
        clone.querySelector(".liquid").style.transform = "translateY("+fillPercent/2+ "%)";
    
// appender storage klonen til storage-div'en i html'en. 
document.querySelector("#recieveTaps").appendChild(clone);
}); 


    /* function dataFunc(){ }
dataFunc(); */








//Q-meter kode:
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
    document.querySelector("#bar").setAttribute("stroke-dasharray", semi_cf + "," + cf);
    /* document.querySelector("#avg").setAttribute("stroke-dasharray", semi_cf_2by3 + "," + cf);
    document.querySelector("#high").setAttribute("stroke-dasharray", semi_cf_1by3 + "," + cf); */
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
/* setInterval(function(){ 
    funktionNavn();    
}, 2500); */
}
Qmeter();
//LAv en funktion for alle elementer og kald dem i 
/* setInterval(function(){ 
    funktionNavn();    
}, 2500); */
//loadscript slutter
}
setInterval(function(){ 
    loadScript();    
}, 10000);
//Countdown kode:
/* function showTime() {
    let closingTime = new Date;
    let h = closingTime.getHours;
    let m = closingTime.getMinutes;
    console.log("h", h)

   return closingTime.getTime();
} */



let display = document.querySelector("#clockDisplay"); 
setInterval(function(){ 
    let date = new Date();
    let currenthours = date.getHours();
    let hours;
    let minutes;
    let secondes;
    if (currenthours != 22){
        if (currenthours < 22)
            hours = 21 - currenthours;
        else hours = 22 + (24 - currenthours);
        minutes = 60 - date.getMinutes();
        secondes = 60 - date.getSeconds();
    display.innerHTML = "Bar closes in " +hours + ":" + minutes + ":" +secondes;
    }
    else {display.innerHTML = "Bar closed";}
},1000);