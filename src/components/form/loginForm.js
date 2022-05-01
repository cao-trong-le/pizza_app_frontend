/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link, matchPath } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "axios_instance/axiosInstace";
import { FormValidation } from "./formValidation";

const LoginFormComponent = (props) => {
    // create later

    const intialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setFormValues({ email: "", password: "" })
        setFormErrors({})
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        // set errors

        // let errorMsg = {}

        // const validator = new FormValidation({ ...formValues, [name]: value })
        // const emailStatus = validator.isValidEmail()
        // const passwordStatus = validator.isValidPassword()
        // const statuses = [
        //     emailStatus,
        //     passwordStatus
        // ]

        // console.log(statuses)

        // statuses.forEach((status, index) => {
        //     if (!status.status)
        //         Object.assign(errorMsg, { [status.type]: status.message })
        // })

        // setFormErrors({ ...errorMsg })

        // console.log(formErrors)

    };

    const handleSubmit = (e) => {
        e.preventDefault()

        axiosInstance
            .post("api/token/", formValues)
            .then((res) => {
                console.log(res.data)
            })
    }

    return (
        <LoginFormWrapper autoComplete="off">
            {console.log(formValues)}

            <div className="form-title">
                <h1>Login</h1>
            </div>
            <div className="form-content">
                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formValues.email}
                        autoComplete="off"
                        onChange={handleChange}
                    />
                    {formErrors.email && <span>{formErrors.email}</span>}
                </div>

                <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formValues.password}
                        autoComplete="off"
                        onChange={handleChange}
                    />
                    {formErrors.password && <span>{formErrors.password}</span>}
                </div>

                <button
                    onClick={handleSubmit}
                    type="submit">Sign In</button>

                <Link to="/register/">Don't have an account yet?</Link>
            </div>
        </LoginFormWrapper>
    )
}

export { LoginFormComponent }

const LoginFormWrapper = styled.form`
    display: flex;
    flex-direction: column;

    .form-content {
        display: flex;
        flex-direction: column;
    }

    .form-field {
        display: flex;
        flex-direction: column;
    }
`