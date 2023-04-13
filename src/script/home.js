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

function create(element, parent = document) {
    return parent.createElement(element);
}

const logout = select('.logout');
const logoutBtn = select('.logout a');
const profile = select('.profile');


const userbox = select('.other-users');
const url = 'https://randomuser.me/api/?nat=CA&results=10';

const options = {
    method: 'GET',
    mode: 'cors'
};

async function getUsers() {
    try {
        const response = await fetch(url, options);

        if(response.status >= 200 && response.status < 400) {
            const data = await response.json();
            const users = data.results;
            getProfileData(users);
        }
    } catch(error) {
        console.log(error);
    }
}
getUsers();

function getProfileData(el) {
    el.forEach(element => {
        let userImage = create('div');
        let userStorage = create('div');
        let userInfo = create('div');
        
        userInfo.classList.add('userinfo');
        userImage.classList.add('image');
        userStorage.classList.add('user');
        
        userImage.innerHTML = `<img src= "${element.picture.medium}" max-width="100%" max-height="100%" + 
                                border-radius="50%" >`;

        userInfo.innerHTML = `<p>${element.name.first} ${element.name.last}</p>` +
                             `<p>${element.location.city}</p>`

        userStorage.append(userImage, userInfo);
        
        userbox.append(userStorage);
    });
}

onEvent('click', profile, () => {
    logout.classList.toggle('is-visible');
})

onEvent('click', logoutBtn, () => {
    window.location.replace("index.html");
})


















// Classes
class User {

    #id;
    #name;
    #userName;
    #email

    constructor (id, name, userName, email) {
        this.#id = id;
        this.#name = name;
        this.#userName = userName;
        this.#email = email;
    }

    get id(){
        return this.#id;
    }

    get name(){
        return this.#name;
    }

    get userName(){
        return this.#userName;
    }

    get email(){
        return this.#email
    }

    getInfo() {
        return [
          this.#id,
          this.#name,
          this.#userName,
          this.#email,
        ]
    }
}


class Subscriber extends User {
    #pages;
    #groups;
    #canMonetize;

    constructor (id, name, userName, email, pages, groups, canMonetize) {
      super(id, name, userName, email);
      this.#pages = pages;
      this.#groups = groups;
      this.#canMonetize = canMonetize;
    }

    get pages() {
        return this.#pages
    }

    get groups(){
        return this.#groups
    }

    get canMonetize() {
        return this.#canMonetize
    }

    getInfo() {
        return  `Pages: ${this.pages}\nGroups: ${this.groups}\nMonetized: ${this.canMonetize}\n`;
    }
}


// Variables
const text = select('textarea');
const postBtn = select('.post-btn');
const file = document.getElementById('file-read');
const div = select('.fb');
const me = new Subscriber
    ( 12345, 'Shiyu Li', 'Shiyu', 'shiyuli@email.com', 'FakeBook', 'MITT Student', true);
const avatarURL = 'url(../assets/img/self.jpg)';
const message = select('.message');

// Post Content
onEvent('click', postBtn, () => {
    if (isValid()) {
      createPost();
      clearForm();
    }
});

function isValid() {
    return (text.value.trim() !== '' || file.value !== '')
}

function clearForm() {
    text.value = '';
    file.value = ''; 
    message.innerText = '';
}
  
function createPost() {
    const newPost = newPostTemplate();
    const postContent = createPostContent();
    const newTime = getTime();
    postContent.append(newTime);
    newPost.append(postContent);
  
    newPost.classList.add('post');
    addPostToDiv(newPost);
}

function newPostTemplate() {
    const newPost = create('div');
    const today = new Date();
    let img = select('.profile').innerHTML;

    newPost.innerHTML = 
    `
    <div class='content-header'>
        ${img}
        <h2>${me.userName}</h2>
        <p>${today.toDateString()}</p>
    </div>
    `;
    return newPost
}

function createPostContent() {
    const postContent = create('div');
    const postText = create('p');
    const postImg = create('figure');
  
    getImgData(postImg);
    postContent.classList.add('content');
    postText.innerText = text.value.trim();
    postContent.append(postText, postImg);
  
    return postContent
}

function addPostToDiv(newPost) {
    div.prepend(newPost);
}

function getImgData(postImg) {
    const files = file.files[0];
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function () {
        postImg.innerHTML = `<img src='${this.result}'>`;
      });    
    }
  }
  
function getTime() {
    const Time = create('div');
    let currentTime = new Date();
    let currentHours = currentTime.getHours().toString();
    let currentMinutes = currentTime.getMinutes().toString().padStart('2', 0)
    let ampm = currentHours >= 12 ? 'pm' : 'am';
    Time.innerHTML = 
    `<h4>${currentHours}: ${currentMinutes} ${ampm}</h4>`;
    return Time;
}
document.getElementById('file-read').onchange = function() {
    message.innerText = `${document.getElementById('file-read').files[0].name}`
}
