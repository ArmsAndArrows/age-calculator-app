"use strict";

///CONTROLLERS
const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const button = document.querySelector("#button");

const operands = [day, month, year];

///ERRORMSG

const dayError = document.getElementById("day-err");
const monthError = document.getElementById("month-err");
const yearError = document.getElementById("year-err");

///DATE

const date = new Date();
const [currentMonth, currentDay, currentYear] = [
  date.getMonth() + 1,
  date.getDate(),
  date.getFullYear(),
];
const dateArray = [currentMonth, currentDay, currentYear];

///INPUT FOR DIGITS ONLY

function numInput(event) {
  if (
    event.key === "Backspace" ||
    event.key === "Tab" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight"
  ) {
    return;
  }

  if (isNaN(parseInt(event.key))) {
    event.preventDefault(); // prevent the key from being typed
  }
}

operands.forEach((element) => {
  element.addEventListener("keydown", numInput);
  if (element.value == undefined) {
    console.log("dssd");
  }
});

////BUTTON LOGIC

button.addEventListener("click", function () {
  operands.forEach((element) => {
    if (element.value == "") {
      document.getElementById(`${element.id}-err`).innerHTML =
        "This field is required";
      element.style.borderColor = "red";
      document.getElementById("result-year").innerHTML = "--";
      document.getElementById("result-month").innerHTML = "--";
      document.getElementById("result-day").innerHTML = "--";
    } else {
      document.getElementById(`${element.id}-err`).innerHTML = "";
      element.style.borderColor = "rgb(107 114 128)";
    }
  });
  if (year.value > currentYear) {
    yearError.innerHTML = "Must be in past";
    year.style.borderColor = "red";
  }
  if (month.value > 12 || month.value === "0" || month.value === "00") {
    monthError.innerHTML = "Must be a valid month";
    month.style.borderColor = "red";
  }
  if (day.value > 31 || day.value === "0" || day.value === "00") {
    dayError.innerHTML = "Must be a valid day";
    day.style.borderColor = "red";
  }
  if (year.value < 1900) {
    yearError.innerHTML = "Must be a valid year";
    year.style.borderColor = "red";
  }

  if (
    year.value &&
    month.value &&
    day.value &&
    parseInt(year.value) < currentYear &&
    parseInt(month.value) <= 12 &&
    parseInt(day.value) <= 31 &&
    parseInt(year.value) > 1900
  ) {
    let countedYear = currentYear - parseInt(year.value);
    let countedMonth = "";
    let countedDay = "";

    if (parseInt(month.value) > currentMonth) {
      countedYear -= 1;
      countedMonth = 12 + currentMonth - parseInt(month.value);
    } else {
      countedMonth = currentMonth - parseInt(month.value);
    }

    if (parseInt(day.value) >= currentDay) {
      if (countedMonth > parseInt(month.value)) {
        countedMonth -= 1;
        countedDay = parseInt(day.value) - currentDay;
      } else {
        countedDay = parseInt(day.value) - currentDay;
      }
    } else {
      countedDay = 31 - parseInt(day.value);
    }

    document.getElementById("result-year").innerHTML = String(countedYear);
    document.getElementById("result-month").innerHTML = String(countedMonth);
    document.getElementById("result-day").innerHTML = String(countedDay);
  }
});
