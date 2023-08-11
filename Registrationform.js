var users = JSON.parse(localStorage.getItem('userData')) || [];

$(function () {

    });

    // Registration - Collect it in an array 
    // Store the array in local storage as json object 
function formValidation() {
    // Get the HTML elements
    var userId = GetUserID();
    var txtname = document.getElementById("username").value;


    if (!txtname) {
        alert('Please enter name!')
        return false;
    }
  var email = document.getElementById("emailid").value;
    if (!email) {
        alert('Please enter email!')
        return false;
    }
    var emailfilter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailfilter.test(email)) {
        alert('Please enter a valid email address!');
        return false;
    }
    const membershipType = $('#membershipType').val();

    var userObj = {
        "id": userId,
        "name": txtname,
        "email": email,
        "membershipType": membershipType,
    };

    addUserDataToLocalStorage(userObj);
    document.getElementById('user_name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('membershipType').value = "";
  // Optionally, you can redirect the user to the admin page after successful registration
    window.location.href = "admin.html";

    return false; // Prevent default form submission behavior
}

function GetUserID() {
    const ID = Date.now();
    return ID;
}

// Function to store user data in local storage
function addUserDataToLocalStorage(userObj) {
    // Retrieve existing data from local storage (if any)
    var existingData = localStorage.getItem("userData");
    var userData = existingData ? JSON.parse(existingData) : [];

    // Add the new user data to the array
    userData.push(userObj);

    // Save the updated data back to local storage
    localStorage.setItem("userData", JSON.stringify(userData));
}

// Function to display user data from local storage on the admin page
function displayUserDataFromLocalStorage() {
    // Retrieve user data from local storage
    var userData = localStorage.getItem("userData");
    if (userData) {
        userData = JSON.parse(userData);

        // Display the data on the admin page
        var userDataDiv = document.getElementById("user-data");
        var html = "<ul>";
        userData.forEach(function (user) {
            html += "<li>Username: " + user.username + ", Email: " + user.email + "</li>";
            // Add more fields as needed
        });
        html += "</ul>";
        userDataDiv.innerHTML = html;
    }
}