var alarms = [];
let alarmList = document.getElementById("alarm-list");
let emptyAlarm = document.querySelector(".empty-list-indicator");
let inputHours = document.getElementById("hours");
let inputMinutes = document.getElementById("minutes");
let inputSeconds = document.getElementById("seconds");
let submitAlarmBtn = document.querySelector(".submit-alarm-btn");
let buzzerPanel = document.querySelector(".alarm-buzzer")
let numbersInput = document.querySelectorAll(".numbers-input")
let alarmSound =  new Audio("./assets/sound/alarm-sound.wav")
let startBtn = document.getElementById("start-alarm");
let stopBtn = document.getElementById("stop-alarm");
let alarmForm = document.getElementById("alarmForm");
let inputMeridiem = document.querySelectorAll(".meridiem-btns");
let stopAlarmBtn = document.querySelector(".stop-alarm-btn")


// displays alarm list
function addAlarmToDom(alarm) {

    const list = document.createElement('li')
    
    let hour = alarm.hours
    // converting time to 12 hrs for list
    if (hour > 12) {
        hour -= 12;
    }
    if (alarm.hours == 00 && alarm.meridiem == "AM") {
        hour = 12
    }
    
    list.innerHTML = `

        <div class="alarm-list-content">
            <div class="alarm-list-text">
                <span>${hour}:${alarm.minutes}:${alarm.seconds}</span>
                <span>${alarm.meridiem}</span>
            </div>
            <div>
                <i class='alarm-del-btns bx bxs-trash bx-tada-hover' data-class = "alarm-del" id="${alarm.id}" data-id="${alarm.id}"></i>
            </div>
        </div>
            
    `;

    alarmList.append(list) 
    // adding list to the list container

}

// renders the list on screen
function renderList() {

    alarmList.innerHTML = "";

    for (let i = 0; i < alarms.length; i++) {
        addAlarmToDom(alarms[i]);
    }
    
}

// deletes alarm from the list
function deleteAlarm(alarmId) {

    // checks the list for the passed alarm id
    const newAlarmsList = alarms.filter((alarm) => {
        return alarm.id != alarmId;
    })

    alarms = newAlarmsList;
    console.log(alarms)
    console.log("deleted")
    renderList();
     
}

// takes alarm object as a parameter and adds that alarm to the alarms list
function addAlarm(alarm) {

    if (alarm) {
        alarms.push(alarm);
        console.log("alarm added");
        renderList();
        closePanel();
    }
    
}


submitAlarmBtn.addEventListener('click', function(e) {
    

    e.preventDefault();
    
    let hours = parseInt(inputHours.value);
    let minutes = inputMinutes.value;
    let seconds = inputSeconds.value;
    let meridiem = document.querySelector('input[name="meridiem"]:checked').value;
    // converts 12 hrs to 24 hrs
    if (meridiem == "PM") {
        if (hours != 12) {
            hours += 12;
        }
            
    }

    //if time isn't set shows alert
    if (hours == 0) {
        alert("Please enter the time")
    }
    else {

        if (hours == 12 && meridiem == "AM") {
            hours = 00
        }
        // adds input to the alarms list
        const alarm = {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            meridiem: meridiem,
            id: Date.now().toString()
        }
        // resets form to original state
        alarmForm.reset();
        addAlarm(alarm);

     
    }
})

// checks for any alarms at the given time
setInterval(ringAlarm, 1000);

function ringAlarm() {

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();


    for (let i = 0; i < alarms.length; i++){
        
        if (alarms[i].hours == hours && alarms[i].minutes == minutes) {
            
            if (alarms[i].seconds == seconds) {
                buzzerPanel.style.display = "flex";
                alarmSound.play();
                alarmSound.loop = true;
                console.log("Playing alarm sound");
               
            }

        }
       
        
    }

}

// prevents keyboard input to set alarm
window.addEventListener('load', () => {
    for (let i = 0; i < numbersInput.length; i++) {
        numbersInput[i].addEventListener('keydown', (e) => {
            e.preventDefault();
        })
    }
})

// adds click event to all the elements
document.addEventListener('click', (e) => {
    let targetClicked = e.target;
    // checks if the clicked element is alarm delete button
    if (targetClicked.dataset.class == "alarm-del") {
        const targetId = targetClicked.id;
        deleteAlarm(targetId);
    }
})

// stops alarm when button is clicked
stopAlarmBtn.addEventListener('click', () => {
    buzzerPanel.style.display = "none";
    alarmSound.pause();
    alarmSound.loop = false;
    console.log("Alarm Stopped");
})