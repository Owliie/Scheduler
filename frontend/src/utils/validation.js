const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const lowerCaseLetters = /[a-z]/g;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;

const validateEmail = (email) => {
    return email.toString()
        .toLowerCase()
        .match(emailRegex) || email.toString() === "";
};

const validatePassword = (password) => {
    if (password.toString() === "") {
        return true
    }
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

const validateName = (name) => {
    return name.toString().length > 1
}

const validateDescription = (description) => {
    return description.toString().length > 19
}

const validateAddress = (address) => {
    return address.toString().length > 9
}

const validatePhoneNumber = (phoneNumber) => {
    const firstChars = phoneNumber.toString().substr(0, 3)
    return phoneNumber.toString().length === 10 && +phoneNumber.toString()[0] === 0 && (firstChars === "087" || firstChars === "089" || firstChars === "088" || +phoneNumber.toString()[1] === 2)
}

const validateConfirmPassword = (password, confirmPassword) => {
    return password.toString() === confirmPassword.toString()
}

export {
    validateEmail,
    validatePassword,
    validateName,
    validateDescription,
    validateAddress,
    validatePhoneNumber,
    validateConfirmPassword
}