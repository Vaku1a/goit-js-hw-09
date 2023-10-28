// Описаний в документації
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const selectors = {
    input: document.getElementById("datetime-picker"),
    btn: document.querySelector('button'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    label: document.querySelectorAll('.label'),
    value: document.querySelectorAll('.value'),
    timerBox: document.querySelector('.timer')

};

// let counter;
// let markup = {};

// selectors.timerBox.style.display = 'flex';
// selectors.timerBox.style.gap = '20px';
// selectors.label.forEach(element => {
//     element.style.display = 'flex'
// });
// selectors.value.forEach(element => {
//     console.log(element)
//     element.style.flexDirection = 'column'
// });






selectors.btn.disabled = true;
selectors.btn.addEventListener('click', handlerStart);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = options.defaultDate;
        const selectedDate = selectedDates[0];
        if (currentDate >= selectedDate) {
            Notiflix.Report.warning(
                'Warning',
                'Please choose a date in the future',
                'Ok',
            );
        } else {
            selectors.btn.removeAttribute("disabled");
            counter = selectedDate - currentDate;
            markup = convertMs(counter);
            console.log(markup)
            addLeadingZero(markup);
        }
    },
};

const fp = flatpickr(selectors.input, options);

// ----

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// ----

function addLeadingZero({days, hours, minutes, seconds}) {
    selectors.days.textContent = `${days}`.padStart(2, '0');
    selectors.hours.textContent = `${hours}`.padStart(2, '0');
    selectors.minutes.textContent = `${minutes}`.padStart(2, '0');
    selectors.seconds.textContent = `${seconds}`.padStart(2, '0');

}


function handlerStart() {
    const timerIdInterval = setInterval(() => {
    if (counter <= 1000) {
      clearInterval(timerIdInterval);
      Notiflix.Report.success('Timer is finished', 'Nice job!', 'Done!');
      return;
    } 
        
    counter -= 1000;
    markup = convertMs(counter);
    addLeadingZero(markup);
    
    }, 1000);

    selectors.btn.disabled = true;
}
