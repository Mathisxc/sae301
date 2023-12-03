const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events"),
    addEventBtn = document.querySelector(".add-event"),
    addEventWrapper = document.querySelector(".add-event-wrapper "),
    addEventCloseBtn = document.querySelector(".close "),
    addEventTitle = document.querySelector(".event-name "),
    addEventFrom = document.querySelector(".event-time-from "),
    addEventSubject = document.querySelector(".event-subject"),
    addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
today.setHours(0, 0, 0, 0); // Définir l'heure à 00:00:00:00

let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mars",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];


const eventsArr = [];
getEvents();
console.log(eventsArr);


function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //check if event is present on that day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
          eventObj.day === i &&
          eventObj.month === month + 1 &&
          eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
        i === new Date().getDate() &&
        year === new Date().getFullYear() &&
        month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}


function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //add active to clicked day afte month is change
        setTimeout(() => {
          //add active where no prev-date or next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
                !day.classList.contains("prev-date") &&
                day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
                !day.classList.contains("next-date") &&
                day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//function update events when a day is active
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
        date === event.day &&
        month + 1 === event.month &&
        year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>Pas d'événements</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}

//function to add event
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

//allow 50 chars in eventtitle
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

function defineProperty() {
  var osccred = document.createElement("div");
  osccred.innerHTML =
      osccred.style.bottom = "0";
  osccred.style.right = "0";
  osccred.style.fontSize = "10px";
  osccred.style.color = "#e2e2e2";
  osccred.style.fontFamily = "sans-serif";
  osccred.style.padding = "5px";
  osccred.style.background = "#e2e2e2";
  osccred.style.borderTopLeftRadius = "5px";
  osccred.style.borderBottomRightRadius = "5px";
  osccred.style.boxShadow = "0 0 5px #e2e2e2";
  document.body.appendChild(osccred);
}

defineProperty();

//allow only time in eventtime from and to
addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});


//function to add event to eventsArr
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventSubject = addEventSubject.value;

  if (eventTitle === "" || eventTimeFrom === "" || eventSubject === "") {
    alert("Veuillez remplir tous les champs");
    return;
  }

  const timeFromArr = eventTimeFrom.split(":");
  if (timeFromArr.length !== 2 || timeFromArr[0] > 23 || timeFromArr[1] > 59) {
    alert("Format d'heure invalide");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);

  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });

  if (eventExist) {
    alert("L'événement existe déjà");
    return;
  }

  const newEvent = {
    title: eventTitle,
    time: timeFrom,
    subject: eventSubject,
  };

  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
          item.day === activeDay &&
          item.month === month + 1 &&
          item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  addEventWrapper.classList.remove("active");
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventSubject.value = "";
  updateEvents(activeDay);

  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});

//function to delete event when clicked on event
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    if (confirm("Are you sure you want to delete this event?")) {
      const eventTitle = e.target.children[0].children[1].innerHTML;
      eventsArr.forEach((event) => {
        if (
            event.day === activeDay &&
            event.month === month + 1 &&
            event.year === year
        ) {
          event.events.forEach((item, index) => {
            if (item.title === eventTitle) {
              event.events.splice(index, 1);
            }
          });
          //if no events left in a day then remove that day from eventsArr
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            //remove event class from day
            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl.classList.contains("event")) {
              activeDayEl.classList.remove("event");
            }
          }
        }
      });
      updateEvents(activeDay);
    }
  }
});

//function to save events in local storage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

//function to get events from local storage
function getEvents() {
  //check if events are already saved in local storage then return event else nothing
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

function convertTime(time) {
  //convert time to 24 hour format
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}
function searchEvents() {
  const searchText = searchEventInput.value.toLowerCase();
  let events = "";
  eventsArr.forEach(event => {
    event.events.forEach(ev => {
      if (ev.title.toLowerCase().includes(searchText)) {
        events += `<div class="event">
          <div class="title">
            <i class="fas fa-circle"></i>
            <h3 class="event-title">${ev.title}</h3>
          </div>
          <div class="event-time">
            <span class="event-time">${ev.time}</span>
          </div>
          <div class="event-date">${event.day}/${event.month}/${event.year}</div>
        </div>`;
      }
    });
  });
  eventsContainer.innerHTML = events || `<div class="no-event"><h3>Pas d'événements</h3></div>`;
}

function searchEvents() {
  const filterType = document.getElementById("filterType").value;
  const searchText = document.getElementById("searchInput").value.toLowerCase();

  let events = "";
  eventsArr.forEach(event => {
    const eventDateString = `${event.day}/${event.month}/${event.year}`;
    event.events.forEach(ev => {
      const eventTitleLower = ev.title.toLowerCase();
      const eventSubjectLower = ev.subject.toLowerCase();

      switch (filterType) {
        case "title":
          if (eventTitleLower.includes(searchText)) {
            events += createEventHTML(ev, eventDateString);
          }
          break;
        case "subject":
          if (eventSubjectLower.includes(searchText)) {
            events += createEventHTML(ev, eventDateString);
          }
          break;
        case "date":
          if (eventDateString.includes(searchText)) {
            events += createEventHTML(ev, eventDateString);
          }
          break;
        default:
          if (
              eventTitleLower.includes(searchText) ||
              eventDateString.includes(searchText) ||
              eventSubjectLower.includes(searchText)
          ) {
            events += createEventHTML(ev, eventDateString);
          }
      }
    });
  });

  eventsContainer.innerHTML = events || `<div class="no-event"><h3>Pas d'événements</h3></div>`;
}

function createEventHTML(ev, eventDateString) {
  return `<div class="event">
    <div class="title">
      <i class="fas fa-circle"></i>
      <h3 class="event-title">${ev.title}</h3>
    </div>
    <div class="event-time">
      <span class="event-time">${ev.time}</span>
    </div>
    <div class="event-subject">Matière: ${ev.subject}</div>
    <div class="event-date">${eventDateString}</div>
  </div>`;
}

const filterTypeInput = document.getElementById("filterType");
const searchInput = document.getElementById("searchInput");

filterTypeInput.addEventListener("change", searchEvents);
searchInput.addEventListener("input", searchEvents);

