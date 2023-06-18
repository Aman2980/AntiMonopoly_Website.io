import {gamesJson} from "../db/db.js";
import {userJson} from "../db/userpass.js";

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
    const username = sessionStorage.getItem('username');
    const loginButton = document.querySelector('button[type="submit"]');
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', handleLogout);

    if (username) {
        const legend = document.querySelector('legend h2');
        if (legend) {
            legend.textContent = `HELLO ${username}`.toUpperCase();
            showMonoMan();
        }
        loginButton.replaceWith(logoutButton);
    }
});


function handleSubmit(event) {
    event.preventDefault(); // prevent form submission
    const usernameInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');
    const username = usernameInput.value;
    const password = passwordInput.value;
    const matchedUser = gamesJson.find(user => user.player_name === username) && userJson.find(pass => pass.userpasswd === password);

    // Check if the username and password are not empty
    if (!username || !password) {
        alertUser('Please enter both username and password.');
        return;
    }

    if (!matchedUser) {
        displayPasswordError();
    } else {
        handleSuccessfulLogin(username, passwordInput);
    }
}

function alertUser(message) {
    alert(message);
}

function reverseString(str) {
    return str.split('').reverse().join('');
}

function displayPasswordError() {
    const passwordInput = document.querySelector('#password');
    passwordInput.classList.remove('correct');
    passwordInput.classList.add('incorrect');
    const errorMessage = document.querySelector('.errorMessage');
    errorMessage.innerHTML = 'Incorrect password';
    errorMessage.style.color = 'red';
    errorMessage.style.marginTop = '5px';
    console.log('Unsuccessful Authentication Attempt');
}

function showMonoMan() {
    const monoMan = document.querySelector('.monoMan');
    monoMan.style.visibility = 'visible';
}


function handleSuccessfulLogin(username, passwordInput) {
    const legend = document.querySelector('legend h2');
    if (legend) {
        legend.textContent = `WELCOME ${username}`.toUpperCase();
    }
    passwordInput.classList.remove('incorrect');
    passwordInput.classList.add('correct');
    sessionStorage.setItem('username', username);
    removeErrorMessage();
    showLoadingIndicator();
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', handleLogout);
    const loginButton = document.querySelector('button[type="submit"]');
    loginButton.replaceWith(logoutButton);
    setTimeout(() => {
        window.location.href = '../html/Stats.html';
        hideLoadingIndicator();
    }, 2000);
}


function handleLogout() {
    sessionStorage.removeItem('username');
    setTimeout(() => {
        window.location.href = '../index.html'; // Redirect to the home page
    }, 1000);
}

function removeErrorMessage() {
    const errorMessage = document.querySelector('.errorMessage');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showLoadingIndicator() {
    const loading = document.querySelector('.wave');
    loading.style.visibility = 'visible';
}

function hideLoadingIndicator() {
    const loading = document.querySelector('.wave');
    loading.style.visibility = 'hidden';
}

