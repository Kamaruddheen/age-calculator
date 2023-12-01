// Set the current date as the today value
let today = new Date();

// Set preset value on webpage load
window.onload = function () {
  // Disabling future dates by setting max date to today
  // document.getElementById("dob").max = today.toISOString().split("T")[0];
};

// To Validate the birth date
function validate(today, dob) {
  // Log inputs for debugging
  console.log(today, dob);

  // Check for empty input
  if (dob === null || dob === undefined) {
    // Logs for debugging
    console.log("Empty date : ", dob);

    // Display the Error Message - Empty Date
    document.getElementById("age").innerHTML =
      "Date of Birth can not be empty !";
    document.getElementById("age").classList.add("asterisk");

    // Return false for invalid input
    return false;
  }
  // Check for input date is today or not
  if (today.toISOString().split("T")[0] === dob.toISOString().split("T")[0]) {
    // Display the Message - Age as 0
    document.getElementById("age").innerHTML =
      'Age: 0 <span class="text-muted">(DOB same date as today)</span>';

    // Return false to skip calculation
    return false;
  }
  // Check for future date (input shouldn't be future date)
  if (dob > today) {
    // Logs for debugging
    console.log("Inside Future validation...");

    // Display the Error Message - Future Date
    document.getElementById("age").innerHTML = "Future date is not allowed";
    document.getElementById("age").classList.add("asterisk");

    // Return false for invalid input
    return false;
  }
  // This validates that the birth day entered does not exceed the maximum possible days for the given month and year combination
  if (
    new Date(dob.getFullYear(), dob.getMonth() + 1, 0).getDate() < dob.getDate()
  ) {
    // Logs Invalid Date for debugging
    console.log(
      "Invalid Date : ",
      new Date(dob.getFullYear(), dob.getMonth() + 1, 0),
      dob.getDate()
    );

    // Display the Error Message - Date extends actual month max date
    document.getElementById("age").innerHTML =
      "Birth day entered can't exceed the maximum possible days in a month";
    document.getElementById("age").classList.add("asterisk");

    // Return false for invalid input
    return false;
  }
  // Log today, date for debugging
  console.log(
    today.toISOString().split("T")[0],
    dob.toISOString().split("T")[0]
  );

  // Return true for Valid input and continue calculation
  return true;
}

// To calculate and display the age
function calculate(dob) {
  // Validate input
  if (!validate(today, dob)) return false;

  // Get year, month and date value from date of birth
  let dob_year = dob.getFullYear();
  let dob_month = dob.getMonth() + 1; // month starts with 0
  let dob_days = dob.getDate();

  // Get current year, month and date value from today
  let current_year = today.getFullYear();
  let current_month = today.getMonth() + 1; // month starts with 0
  let current_days = today.getDate();

  // Initializing age variables (year, month and day)
  let age_year = current_year - dob_year; // Calculate years
  let age_month = 0;
  let age_days = 0;

  // Calculate months
  if (dob_month > current_month) {
    // Logs for debugging
    console.log("Inside Month: DOB Month > Today.....");
    // If birth month is greater than current month, it means that birthday has not passed yet this year
    // So we calculate the months by taking current month + (12 - birth month)
    age_month = current_month + (12 - dob_month);
    // Subtracting 1 from the years since the birthday is still upcoming
    age_year--;
  } else {
    // Logs for debugging
    console.log("Inside Month: Current Month.....");
    age_month = current_month - dob_month;
  }

  // Calculate days
  if (dob_days > current_days) {
    // Logs for debugging
    console.log(
      "Inside Day: DOB Date > Today.....",
      new Date(dob_year, dob_month, 0).getDate(),
      dob_days
    );
    // If birth date is greater than current date, the birthday has not passed yet
    // So we calculate days by taking current date + (total days in birth month - birthday)
    // Adding 1 to include the birth day in the count
    age_days =
      current_days +
      (new Date(dob_year, dob_month, 0).getDate() - dob_days + 1); // new Date(year, month, 0) returns last day of month
    age_month--; // Subtracting 1 from the month since the birthday is still upcoming
  } else {
    // Logs for debugging
    console.log("Inside Day: Current Day.....");
    age_days = current_days - dob_days;
  }

  // Set month as 11 if month goes to negative value
  if (age_month < 0) {
    // Logs for debugging
    console.log("Inside Month is negative.....");
    age_month = 11;
    age_year--;
  }

  // Format age string
  let age = `${age_year}  years, ${age_month} month, and ${age_days} days old`;

  // Display the Age
  document.getElementById("age").innerHTML = "Age : " + age;
  document.getElementById("age").classList.remove("asterisk");

  return age;
}

// Reset the birthdate and Age value
function reset() {
  // Set input field default to today's date
  document.getElementById("dob").value = "";
  // Rest age display value and property
  document.getElementById("age").innerHTML = "";
  document.getElementById("age").classList.remove("asterisk");
}

// document.getElementById("age").innerHTML = "Age : " + calculate()

// * DatePicker

let calendar = document.querySelector(".calendar");

const month_names = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

generateCalendar = (month, year) => {
  let calendar_days = calendar.querySelector(".calendar-days");
  let calendar_header_year = calendar.querySelector("#year");

  let days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  calendar_days.innerHTML = "";

  let currDate = new Date();
  if (!month) month = currDate.getMonth();
  if (!year) year = currDate.getFullYear();

  let curr_month = `${month_names[month]}`;
  month_picker.innerHTML = curr_month;
  calendar_header_year.innerHTML = year;

  // get first day of month

  let first_day = new Date(year, month, 1);

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement("div");
    if (i >= first_day.getDay()) {
      day.classList.add("calendar-day-hover");
      day.innerHTML = i - first_day.getDay() + 1;
      day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`;
      if (
        i - first_day.getDay() + 1 === currDate.getDate() &&
        year === currDate.getFullYear() &&
        month === currDate.getMonth()
      ) {
        day.classList.add("curr-date");
      }
    }
    day.onclick = () => {
      // removing active date and id
      calendar_days.childNodes.forEach((e) => {
        e.classList.remove("bg-green");
        e.removeAttribute("id", "select-day");
      });

      // applying active date and id
      day.classList.add("bg-green");
      day.setAttribute("id", "select-day");

      // Get birth date from input
      console.log("Starting Age Calculation...");
      let dob = new Date(year, month, day.innerText);
      // Calculate Age
      calculate(dob);
    };
    calendar_days.appendChild(day);
  }
};

let month_list = calendar.querySelector(".month-list");

month_names.forEach((e, index) => {
  let month = document.createElement("div");
  month.innerHTML = `<div data-month="${index}">${e}</div>`;
  month.onclick = () => {
    month_list.classList.remove("show");
    curr_month.value = index;
    generateCalendar(index, curr_year.value);
  };
  month_list.appendChild(month);
});

let month_picker = calendar.querySelector("#month-picker");

month_picker.onclick = () => {
  month_list.classList.add("show");
};

let currDate = new Date();

let curr_month = { value: currDate.getMonth() };
let curr_year = { value: currDate.getFullYear() };

generateCalendar(curr_month.value, curr_year.value);

document.querySelector("#prev-year").onclick = () => {
  --curr_year.value;
  generateCalendar(curr_month.value, curr_year.value);
};

document.querySelector("#next-year").onclick = () => {
  ++curr_year.value;
  generateCalendar(curr_month.value, curr_year.value);
};
