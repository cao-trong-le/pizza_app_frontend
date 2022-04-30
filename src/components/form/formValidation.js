/* eslint-disable no-unused-vars */
/* eslint-disable */


class FormValidation {
    constructor(data) {
        this.data = data
        this.returnValue = {
            strenth: 0,
            type: "",
            status: false,
            message: "",
            backend_check: false
        }
    }

    zip = (a, b) => Array(Math.max(b.length, a.length)).fill().map((_, i) => [a[i], b[i]])

    findBoolean = (array) => {
        let i = 0
        while (i < array.length) {
            if (array[i])
                i += 1

            else
                break
        }
        return i
    }

    // Email Validation
    isValidEmail = () => {
        console.log("hello")

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.returnValue.type = "email"

        if (re.test(String(this.data.email).toLowerCase())) {
            this.returnValue.status = true
            this.returnValue.backend_check = true
        } else {
            this.returnValue.status = false
            this.returnValue.message = "Your email is invalid."
        }

        return { ...this.returnValue }
    }

    // Password Validate
    isValidPassword = () => {
        this.returnValue.type = "password"

        let validConditions = {
            lower_char: {
                status: true,
                message: "Your password has to contain at least 1 lower character.",
                hind: ""
            },
            upper_char: {
                status: true,
                message: "Your password has to contain at least 1 upper character.",
                hind: ""
            },
            numeric_char: {
                status: true,
                message: "Your password has to contain at least 1 number.",
                hind: ""
            },
            special_char: {
                status: true,
                message: "Your password has to contain at least 1 special character.",
                hind: `!@#$%^&*()_+-=[]{};':"\|,.<>/?`
            },
            limit_char: {
                status: true,
                message: "The length of your password has to be at least in range from 6 to 50 characters",
                hind: ``
            }
        }

        const lower_regex = /[a-z]+/
        const upper_regex = /[A-Z]+/
        const numberic_regex = /[0-9]+/
        const special_regex = /(?=.*[!@#$%^&*])/

        console.log(special_regex.test(this.data.password))

        let statuses = [
            lower_regex.test(this.data.password),
            upper_regex.test(this.data.password),
            numberic_regex.test(this.data.password),
            special_regex.test(this.data.password),
            (this.data.password.length > 6 && this.data.password.length < 50)
        ]

        let titles = [
            "lower_char",
            "upper_char",
            "numeric_char",
            "special_char",
            "limit_char"
        ]

        console.log("running")

        console.log(statuses)


        if (!statuses.every(i => i)) {
            let index = this.findBoolean(statuses)

            console.log(index)

            validConditions[titles[index]].status = false

            this.returnValue = {
                ...this.returnValue,
                ...validConditions[titles[index]]
            }
        }

        return { ...this.returnValue }
    }

    // Check Password Similarity
    isMatchedPasswordValid = () => {
        this.returnValue.type = "re_password"

        if (this.data.re_password === this.data.password) {
            this.returnValue.status = true
        } else {
            this.returnValue.status = false
            this.returnValue.message = "Your retyped password doesn't match."
        }

        return { ...this.returnValue }
    }

    // Address Validation
    isPostalValid = () => {
        var regex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i);

        this.returnValue.type = "postal"

        if (regex.test(this.data.postal)) {
            this.returnValue.status = true
        } else {
            this.returnValue.status = false
            this.returnValue.message = "Your postal code is invalid."
        }

        return { ...this.returnValue }
    }

}

export { FormValidation }

