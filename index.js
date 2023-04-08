"use strict";

const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const button = document.querySelector("#button");
const operands = [day, month, year];

const dayError = document.querySelector("#day-err");
const monthError = document.querySelector("#month-err");
const yearError = document.querySelector("#year-err");

const date = new Date();
const currentMonth = date.getMonth() + 1;
const currentDay = date.getDate();
const currentYear = date.getFullYear();
const dateArray = [currentMonth, currentDay, currentYear];

function numInput(event) {
  const validKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight"];
  if (!validKeys.includes(event.key) && isNaN(parseInt(event.key))) {
    event.preventDefault();
  }
}

function clearErrors() {
  dayError.innerHTML = "";
  monthError.innerHTML = "";
  yearError.innerHTML = "";
  operands.forEach((operand) => {
    operand.style.borderColor = "rgb(107, 114, 128)";
  });
}

function validateInput() {
  let isValid = true;
  const inputDate = new Date(year.value, month.value - 1, day.value);

  if (!year.value || !month.value || !day.value) {
    dayError.innerHTML = "Please enter a valid date";
    year.style.borderColor = "red";
    isValid = false;
  } else if (inputDate > date) {
    dayError.innerHTML = "Date must not be in the future";
    day.style.borderColor = "red";
    isValid = false;
  }

  if (year.value > currentYear || year.value < 1900) {
    yearError.innerHTML = "Must be a valid year";
    day.style.borderColor = "red";
    isValid = false;
  }

  if (month.value > 12 || month.value < 1) {
    monthError.innerHTML = "Must be a valid month";
    month.style.borderColor = "red";
    isValid = false;
  }

  if (day.value > 31 || day.value < 1) {
    dayError.innerHTML = "Must be a valid day";
    day.style.borderColor = "red";
    isValid = false;
  }

  return isValid;
}

button.addEventListener("click", function () {
  clearErrors();
  if (validateInput()) {
    const birthDate = new Date(year.value, month.value - 1, day.value);
    const age = calculateAge(birthDate);
    animateNumber(0, age.years, document.getElementById("result-year"));
    animateNumber(0, age.months, document.getElementById("result-month"));
    animateNumber(0, age.days, document.getElementById("result-day"));
    document.getElementById("result-year").innerHTML = age.years;
    document.getElementById("result-month").innerHTML = age.months;
    document.getElementById("result-day").innerHTML = age.days;
  }
});

function calculateAge(birthDate) {
  const today = new Date();
  const diff = today - birthDate;
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months = 12 - Math.abs(months);
    days = 31 - Math.abs(days);
  } else if (months > 0 && days < 0) {
    months--;
    const monthDate = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    days = monthDate.getDate() - Math.abs(days);
  }

  return { years: years, months: months, days: days };
}

// Event listeners
operands.forEach((operand) => {
  operand.addEventListener("keydown", numInput);
});

///ANIMATION

function animateNumber(startNum, targetNum, element) {
  let currentNum = startNum;
  const step = Math.ceil((targetNum - startNum) / 20); // divide the difference by 10 to get 10 steps
  const interval = setInterval(() => {
    currentNum += step;
    if (currentNum >= targetNum) {
      clearInterval(interval);
      currentNum = targetNum;
    }
    element.textContent = currentNum;
  }, 50); // update every 50ms
}
