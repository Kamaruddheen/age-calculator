// Set the current date as the today value
let today = new Date()

// Set input field default to today's date
document.getElementById("dob").valueAsDate = today

// Disabling future dates by setting max date to today
document.getElementById("dob").max = today.toISOString().split("T")[0]

function validate(today, dob) {
    if (today.toISOString().split("T")[0] === dob.toISOString().split("T")[0]) {
        // Display the Error Message
        document.getElementById("age").innerHTML = "Calculation for same date is not allowed"
        document.getElementById("age").classList.add("asterisk")

        return true
    }
    
    console.log(today.toISOString().split("T")[0], dob.toISOString().split("T")[0]);

    return false
}

// To calculate and display the age
function calculate() {
    // Get birth date from input
    let dob = document.getElementById("dob").valueAsDate

    // Validate input
    if(validate(today, dob)) return false

    // Get year, month and date value from date of birth
    let dob_year = dob.getFullYear()
    let dob_month = dob.getMonth() + 1 // month starts with 0
    let dob_days = dob.getDate()

    // Get current year, month and date value from today
    let current_year = today.getFullYear()
    let current_month = (today.getMonth() + 1) // month starts with 0
    let current_days = today.getDate()

    // Initializing age variables (year, month and day)
    let age_year = current_year - dob_year // Calculate years
    let age_month = 0
    let age_days = 0

    // Calculate months
    if (dob_month > current_month) {
        // If birth month is greater than current month, it means that birthday has not passed yet this year
        // So we calculate the months by taking current month + (12 - birth month)
        age_month = current_month + (12 - dob_month)
        // Subtracting 1 from the years since the birthday is still upcoming
        age_year--
    } else {
        age_month = current_month - dob_month
    }

    // Calculate days
    if (dob_days > current_days) {
        // If birth date is greater than current date, the birthday has not passed yet
        // So we calculate days by taking current date + (total days in birth month - birthday)
        age_days = current_days + (new Date(dob_year, dob_month, 0).getDate() - dob_days)
        // Subtracting 1 from the month since the birthday is still upcoming
        age_month--
    } else {
        // 
        age_days = current_days - dob_days
    }
    
    // Format age string
    let age = `${age_year}  years, ${age_month} month, and ${age_days} days old`

    // Display the Age
    document.getElementById("age").innerHTML = "Age : " + age
    document.getElementById("age").classList.remove("asterisk")
    
    return age
}

// Reset the birthdate and Age value
function reset() {
    // Set input field default to today's date
    document.getElementById("dob").valueAsDate = today
    // Rest age display value and property
    document.getElementById("age").innerHTML = ""
    document.getElementById("age").classList.remove("asterisk")
}

// document.getElementById("age").innerHTML = "Age : " + calculate()