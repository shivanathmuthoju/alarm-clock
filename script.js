let dayText = document.getElementById("day-text");
let hours = document.querySelector(".time-hour");
let minutes = document.querySelector(".time-min");
let seconds = document.querySelector(".time-sec");
let meridiem = document.querySelector(".time-text");
let addAlarmBtn = document.getElementById("add-alarm-btn");
let closeAlarmBtn = document.getElementById("close-alarm-panel");
let addAlarmPanel = document.getElementById("add-alarm-panel");
let rightPanel = document.querySelector(".right-side");


const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const day = new Date().getDay();

dayText.innerHTML = days[day];

// updates time every second
setInterval(() => {
    
    let text = "AM";
    const t = new Date();
    let presentHour = t.getHours();
    let presentMin = t.getMinutes();
    let presentSecond = t.getSeconds();
   
    // checking the meridiem
    if (presentHour == 0 || presentHour < 12) {
        text  = "AM"
    }
    else {
        text = "PM"
    }
    // converts 24 hrs time to display in 12hrs format
    if (presentHour == 0) {
        presentHour = 12
    }
    else if (presentHour > 12) {
        presentHour -= 12
    }

    // adds zero before digits
    if (presentHour < 10)
    {
        presentHour = addZero(presentHour);    
    }

    if (presentMin < 10) {

        presentMin = addZero(presentMin);
    }

    if (presentSecond < 10) {
        presentSecond = addZero(presentSecond);
    }
    
    hours.innerHTML = presentHour;
    minutes.innerHTML = presentMin
    seconds.innerHTML = presentSecond;
    meridiem.innerHTML = text;
    // checks if any alarms are added
    if (alarms.length > 0) {
        emptyAlarm.style.display = "none";
    }
    else {
        emptyAlarm.style.display = "block"; // if no alarms are added then display no alarms added text
    }

}, 1000);
// adds zero to the value passed
function addZero(text) {

    text = "0" + text;
    return text;
}

// opens add alarm panel on mouse click
addAlarmBtn.addEventListener('click', () => {
    
    rightPanel.style.opacity = "0";
    addAlarmPanel.style.width = "50%";
    addAlarmBtn.disabled = true;
    closeAlarmBtn.disabled = false;
    

})

var closePanel = () => {
    rightPanel.style.opacity = "1";
    addAlarmPanel.style.width = "0px";
    addAlarmBtn.disabled = false;
    closeAlarmBtn.disabled = true;

}

// closes alarm panel
closeAlarmBtn.addEventListener('click', () => {
   
    closePanel();

})



