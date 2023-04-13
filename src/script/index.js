'use strict';

'use strict';

// Utility functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function getElement(selector, parent = document) {
    return parent.getElementById(selector);
}


const loginBtn = getElement('login');
let msg = select('.message');
const login = [
    { email: 'abcd@gmail.com', password: 'ABCD' },
];
localStorage.setItem('login', JSON.stringify(login));
const loginDetails = JSON.parse(localStorage.getItem('login'));



function validate() {

    let email = select('.email').value.trim();
    let password = select('.password').value.trim();

    let message = '';
    let valid = true;

    for(const details of loginDetails) {
        const validEmail = `${details.email}`
        const validPassword = `${details.password}`
        
        if (email.length === 0) {
            message += 'Email is required';
            valid = false; 
        } else if (password.length === 0) {
            message += 'Password is required';
            valid = false;
        } else if (email !== validEmail || password !== validPassword) {
            message += 'Email or Password is invalid';
            valid = false;
        } else {
            valid = true;
        }

        if (!valid) {
            msg.classList.add('is-visible');
            msg.innerHTML = message;
        } else {
            password = '';
            email = '';
            window.location.replace("home.html");
        }
    }
}

onEvent('click', loginBtn, () => {
    validate();
})
