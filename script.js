const currTime = document.querySelector("h1"),
  select = document.querySelectorAll("select"),
  content = document.querySelector(".content"),
  setAlarmBtn = document.querySelector("button");

let alarmTime,
  isAlarm = false,
  ringtone = new Audio("./alarm.mp3");

// select option section
for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  select[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  select[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  select[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// set the current time
setInterval(() => {
  let date = new Date();
  h = date.getHours();
  m = date.getMinutes();
  s = date.getSeconds();
  ampm = "AM";
  if (h >= 12) {
    h -= 12;
    ampm = "PM";
  }
  // if hour value is 0, set this to 12
  h = h == 0 ? (h = 12) : h;
  // adding 0 before h, m, s if ths value is less than 10
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  currTime.innerText = `${h}:${m}:${s} ${ampm}`;

  if (alarmTime == `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

// set alarm button
function setAlarm() {
  if (isAlarm) {
    alarmTime = "";
    ringtone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    return (isAlarm = false);
  }

  // getting h, m ampm from select tag value
  let time = `${select[0].value}:${select[1].value} ${select[2].value}`;

  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return window.alert("Please select a valid time to set Alarm!");
  }
  isAlarm = true;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Clear Alarm";

  alarmTime = time;
}

setAlarmBtn.addEventListener("click", setAlarm);
