console.log(
"HIM Cyber Dashboard loaded 🔥"
);

/* RANDOM CPU */

const cpu =
document.getElementById(
"cpu"
);

const connections =
document.getElementById(
"connections"
);

setInterval(() => {

cpu.innerText =

Math.floor(
Math.random() * 50
) + "%";

connections.innerText =

Math.floor(
Math.random() * 200
);

}, 2500);

/* SCROLL ANIMATION */

const cards =

document.querySelectorAll(
".dashboard-card"
);

cards.forEach(card => {

card.style.opacity = "0";

card.style.transform =
"translateY(40px)";

card.style.transition =
"0.6s ease";

});

window.addEventListener(
"scroll",
() => {

cards.forEach(card => {

const top =
card.getBoundingClientRect().top;

if(top < window.innerHeight - 50){

card.style.opacity = "1";

card.style.transform =
"translateY(0)";

}

});

});

window.dispatchEvent(
new Event("scroll")
);

/* TERMINAL EFFECT */

const logs = [

"[22:43:02] Encrypting network...",
"[22:43:05] Firewall secured",
"[22:43:08] Monitoring active",
"[22:43:11] Access verified"

];

let index = 0;

setInterval(() => {

const logBox =
document.querySelector(
".logs-box"
);

const newLog =
document.createElement(
"p"
);

newLog.innerText =
logs[index];

logBox.prepend(newLog);

index++;

if(index >= logs.length){

index = 0;
}

}, 4000);
