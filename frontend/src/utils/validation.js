const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const lowerCaseLetters = /[a-z]/g;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;

const validateEmail = (email) => {
    return email.toString()
        .toLowerCase()
        .match(emailRegex);
};

const validatePassword = (password) => {
    if (!password.toString().match(lowerCaseLetters)) {
        return false
    }
    if (!password.toString().match(upperCaseLetters)) {
        return false
    }
    if (!password.toString().match(numbers)) {
        return false
    }
    if (password.toString().length < 8) {
        return false
    }

    return true
}

export {
    validateEmail,
    validatePassword
}