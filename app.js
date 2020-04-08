let form,
    username,
    password,
    repassword,
    email;

form = document.querySelector('form');
password = document.querySelector('#password');
repassword = document.querySelector('#repassword');
email = document.querySelector('#email');
username = document.querySelector('#username');


function showError(input,error){
    let formControl = input.parentElement;
    formControl.classList.add('error');
    let small = formControl.querySelector('small');
    small.innerText = error;
}

function showSuccess(input) {
    let formControl = input.parentElement;
    formControl.classList.add('success');
}

function isValidEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function checkInput(inputArr) {
    
    inputArr.forEach(input=>{
        if(input.value.trim() === ''){
            showError(input,`${getElement(input.id)} required`);
        }else if(input.id === 'email' && !isValidEmail(input.value)) {
            showError(input,`${getElement(input.id)} not valid`)
        }
        else {
            showSuccess(input);
        }
    })
}

function getElement(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

function checkLength(input,min,max) {
    if(input.value.length < min || input.value.length > max) {
        showError(input,`${getElement(input.id)} must be at least ${min} and max ${max} character`);
    }else {
        showSuccess(input);
    }
}

function checkPassword(input1,input2) {
    if(input1.value !== input2.value) {
        showError(input2,'Passwords do not match');
    }
}

form.addEventListener('submit',function(event){
    event.preventDefault(); //stop submit fully
    
    checkInput([username,email,password,repassword]);
    checkLength(username,3,15);
    checkLength(password,6,20);
    checkLength(repassword,6,20);
    checkPassword(password,repassword)
})
