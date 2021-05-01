$(document).ready(function () {
let saveButton = $(".save-btn");
let currentDay = $("#currentDay");
// using moment to determine what hour we are currently in - will use this to change the color of blocks that are past/present/future
let currentTime = moment().format("H");
// all elements with the class time-block, which will be used to compare current time vs. the time blocks
let allHours = $(".time-block");

// shows date in jumbotron
function displayDate () {
    let todaysDate = moment().format("MMMM DD, YYYY");
    currentDay.text(todaysDate);
}
displayDate();

// loops through time blocks (aka the spans with the class "time-block" defined above) and compares the id value with the current time, defined by the hour
function timeComparison () {
    $.each(allHours, function (i) {
        var hourId = parseInt($(this).attr("id"));
        if (hourId === currentTime) {
          $(this).next().addClass("present");
        } else if (hourId < currentTime) {
          $(this).next().addClass("past");
        } else if (hourId > currentTime) {
          $(this).next().addClass("future");
        }
      });
}
timeComparison();

// saves user inputs to local storage 
function saveToStorage (event) {
    // sets the user input to the value of the text field closest to the button that was clicked by navigating to the button's parent element and finding the element with class form-control (aka the text field)
    let userInput = $(event.target).parent().find(".form-control").val();
    // sets the time slot in a similar manner but sources the value of the id for each text area (which is set to 9AM, 10AM, etc.)
    let timeSlot = $(event.target).parent().find(".form-control").attr("id");
    // commits both values to local storage
    localStorage.setItem(timeSlot, userInput);
}

function getLocalStorage () {
    // creates an array of all the text field ID's (9AM, 10AM, etc.)
    var hoursId = [];
    $('.form-control').each(function () {
        var id = $(this).attr('id');
        hoursId.push(id);
    });

    // loops through both local storage and the array of text field ID's defined above
    for (let i = 0; i < localStorage.length; i++){
        for (j = 0; j < hoursId.length; j++) {
            // if local storage is not empty
            if (localStorage.key(i) !== null && localStorage.key(i) !== undefined) {
                // for any local storage key present that matches any of the ID values defined in the array...
                if (localStorage.key(i) === hoursId[j]) {
                    // get the text associated with that key in local storage
                    let storedText = localStorage.getItem(localStorage.key(i));
                    // assign it to the text area with the class name defined by the local storage key
                    $('#'+localStorage.key(i)).html(storedText);
                    }
                }
            }
        }
    }

getLocalStorage();

// event listener to commit text to localstorage
saveButton.on("click", saveToStorage);
});
