/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link, matchPath } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "axios_instance/axiosInstace";
import { FormValidation } from "./formValidation";

const ProductFormComponent = (props) => {
    // create later

    const defaultValues = {
        product_title: "",
        product_desc: "",
        product_price: {},
        product_image: "",
        product_group: null,
        product_type: null,
        product_size: [],
        product_note: "",
        product_carlos: {},
        product_base: {}
    }

    const intialValues = {
        product_title: "",
        product_desc: "",
        product_price: {},
        product_image: "",
        product_group: [
            {
                name: "pizza",
                display: "Pizza"
            },
            {
                name: "drink",
                display: "Drink"
            },
        ],
        product_type: {
            pizza: {
                group: "pizza",
                types: [
                    {
                        name: "meat",
                        display: "Meat"
                    },
                    {
                        name: "veggie",
                        display: "Veggie"
                    },
                    {
                        name: "Cheese",
                        display: "Cheese"
                    },
                ]
            },
            drink: {
                group: "drink",
                types: [
                    {
                        name: "tea",
                        display: "Tea"
                    },
                    {
                        name: "soft_drink",
                        display: "Soft Drink"
                    },
                    {
                        name: "milk",
                        display: "Milk"
                    },
                    {
                        name: "smoothie",
                        display: "Smoothie"
                    },
                ]
            }
        },
        product_size: [
            {
                name: "small",
                display: "Small"
            },
            {
                name: "medium",
                display: "Medium"
            },
            {
                name: "large",
                display: "Large"
            },
            {
                name: "ex_large",
                display: "Extra Large"
            },
        ],
        product_note: "",
        product_carlos: {},
        product_base: {}
    }
    const [defautlValues, setDefaultValues] = useState(defaultValues)
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    // useEffect(() => {


    //     setFormValues(intialValues)
    //     // setFormErrors({})
    // }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        // set errors

        let errorMsg = {}

        const validator = new FormValidation({ ...formValues, [name]: value })
        let validStatus = null

        switch (name) {
            case "first_name":
                validStatus = validator.checkFirstNameField(1, 100)
                break
            case "last_name":
                validStatus = validator.checkLastNameField(1, 100)
                break
            case "username":
                validStatus = validator.checkUsernameField(8, 100)
                break
            case "email":
                validStatus = validator.checkEmailField()
                break
            case "password":
                validStatus = validator.checkPasswordField(8, 100, true)
                break
            case "re_password":
                validStatus = validator.checkConfirmPasswordField()
                break
            default:
                break
        }

        console.log(validStatus)

        if (!validStatus.status)
            errorMsg[validStatus.type] = validStatus.message
        // Object.assign(errorMsg, { [validStatus.type]: validStatus.message })

        setFormErrors({ ...formErrors, [validStatus.type]: validStatus.message })

        console.log(formErrors)

    };

    const handleSubmit = (e) => {
        e.preventDefault()

        axiosInstance
            .post("/user/register/", formValues)
            .then((res) => {
                console.log(res.data)
            })
    }

    const renderOptionList = (optionList) => {
        return optionList.map((size, index) => {
            return (
                <React.Fragment key={index}>
                    <input
                        type="checkbox"
                        name={size.name}
                        id={size.name} />
                    <label for={size.name}>{size.display}</label>
                </React.Fragment>
            )
        })
    }

    return (
        <RegisterFormWrapper>
            {console.log(formValues)}

            <div className="form-title">
                <h1>Register</h1>
            </div>
            <div className="form-content">
                <div className="form-field">
                    <label htmlFor="first_name">Product Title</label>
                    <input
                        type="text"
                        name="product_title"
                        id="product_title"
                        value={formValues.product_title}
                        onChange={handleChange}
                    />
                    {formErrors.product_title && <span>{formErrors.product_title}</span>}
                </div>

                <div className="form-field">
                    <label htmlFor="last_name">Product Description</label>
                    <input
                        type="text"
                        name="product_desc"
                        id="product_desc"
                        value={formValues.product_desc}
                        onChange={handleChange}
                    />
                    {formErrors.product_desc && <span>{formErrors.product_desc}</span>}
                </div>

                <div className="form-field">
                    <fieldset>
                        <legend>Product Group</legend>
                        {renderOptionList(formValues.product_group)}
                    </fieldset>
                </div>

                <div className="form-field">
                    <fieldset>
                        <legend>Product Type</legend>

                        {renderOptionList(formValues.product_type)}
                    </fieldset>
                </div>

                <div className="form-field">
                    <fieldset>
                        <legend>Pick product sizes</legend>
                        {renderOptionList()}
                    </fieldset>
                </div>

                <div className="form-field">
                    <label htmlFor="re_password">Confirm Password</label>
                    <input
                        type="password"
                        name="re_password"
                        id="re_password"
                        value={formValues.re_password}
                        onChange={handleChange}
                    />
                    {formErrors.re_password && <span>{formErrors.re_password}</span>}
                </div>

                <button
                    onClick={handleSubmit}
                    type="submit">Submit</button>
            </div>
        </RegisterFormWrapper>
    )
}

export { RegisterFormComponent }

const RegisterFormWrapper = styled.form`
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