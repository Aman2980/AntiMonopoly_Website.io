document.addEventListener('DOMContentLoaded', () => {
    const username = sessionStorage.getItem('username');
    if (username) {
        // User is logged in
        const headingWelcome = document.querySelector('.headingWelcome');
        if (headingWelcome) {
            headingWelcome.textContent = `WELCOME ${username}`.toUpperCase();
        } else {
            // Create and insert the headingWelcome element
            const main = document.querySelector('main');
            const newHeadingWelcome = document.createElement('h2');
            newHeadingWelcome.classList.add('headingWelcome');
            newHeadingWelcome.textContent = `WELCOME ${username}`.toUpperCase();
            main.insertBefore(newHeadingWelcome, main.firstChild);
        }
    } else {
        const headingWelcome = document.querySelector('.headingWelcome');
        if (headingWelcome) {
            headingWelcome.style.display = 'none'; // Hide the element
        }
    }
});
