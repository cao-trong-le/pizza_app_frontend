/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link, matchPath } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "axios_instance/axiosInstace";
import { FormValidation } from "./formValidation";
import { defaultFormat } from "moment";

const ProductFormComponent = (props) => {
    // create later

    const initialValues = {
        product_title: "",
        product_desc: "",
        product_price: {},
        product_image: null,
        product_group: {
            default: true,
            name: "pizza",
            display: "Pizza"
        },
        product_type: null,
        product_size: [],
        product_note: "",
        product_carlos: {},
        product_base: {}
    }

    const defaultValues = {
        product_title: "",
        product_desc: "",
        product_price: {},
        product_image: null,
        product_group: [
            {
                default: true,
                name: "pizza",
                display: "Pizza"
            },
            {
                default: false,
                name: "drink",
                display: "Drink"
            },
        ],
        product_type: {
            pizza: [
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
            ],

            drink: [
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

    const [formDefault, setFormDefault] = useState(defaultValues)
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClick = (inputType, product_section, e) => {
        const option_name = e.target.getAttribute("data-option-name")
        let value = null
        let data = []
        console.log(e.target)
        console.log(product_section)
        console.log(option_name)
        if (inputType === "radio") {
            switch (product_section) {
                case "product_group":
                    // const searchProductGroup = (group) => group.name === option_name;
                    // const index = formDefault[product_section].findIndex(searchProductGroup)
                    // value = formDefault[]

                    value = formDefault[product_section][e.target.id]
                    break
                case "product_type":
                    value = formDefault[product_section][formValues["product_group"].name][e.target.id]
                    console.log(value)
                    break

                default:
                    break
            }

            setFormValues({
                ...formValues,
                [product_section]: value
            })

            console.log(formValues)
        } else {
            switch (product_section) {
                case "product_size":
                    console.log(e.target.checked)
                    value = formDefault.product_size[e.target.id]
                    const searchProductSize = (size => size.name === e.target.getAttribute("data-option-name"))
                    const isExist = formValues.product_size.findIndex(searchProductSize)
                    data = [...formValues.product_size]
                    if (e.target.checked) {
                        if (isExist === -1) {
                            data.push(value)
                        }
                    } else {
                        if (isExist !== -1) {
                            data.splice(isExist, 1)
                        }
                    }
                    // console.log(e.target)
                    break
                default:
                    break
            }

            setFormValues({
                ...formValues,
                [product_section]: [...data]
            })
        }
    }

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

    const handleUploadedImage = (e) => {
        console.log(e.target.files[0])
        setFormValues({ ...formValues, product_image: e.target.files[0] })
    }

    const handleProductPrice = (e) => {
        const value = {
            ...formValues.product_price,
            [e.target.name]: e.target.value
        }
        setFormValues({
            ...formValues,
            product_price: value
        })
    }

    const renderProductPrice = () => {
        return formValues.product_size.map((size, index) => {
            return (
                <React.Fragment key={index}>
                    <label htmlFor={size.name}>{size.display}</label>
                    <input
                        type="number"
                        className="product_price"
                        name={size.name}
                        onChange={handleProductPrice}
                        placeholder={0} />
                </React.Fragment>
            )
        })
    }

    const renderOptionList = (optionList, inputType, optionName, productSection) => {
        return optionList.map((option, index) => {
            return (
                <React.Fragment key={index}>
                    <input
                        key={index}
                        data-option-name={option.name}
                        type={inputType}
                        name={inputType === "checkbox" ? option.name : optionName}
                        id={index}
                        defaultChecked={(() => {
                            if (productSection === "product_group") {
                                return option.default
                            } else {
                                return false
                            }
                        })()}
                        onClick={((e) => { handleClick(inputType, productSection, e) })}
                    />
                    <label for={option.name}>{option.display}</label>
                </React.Fragment>
            )
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axiosInstance
            .post("/user/register/", formValues)
            .then((res) => {
                console.log(res.data)
            })
    }

    return (
        <ProductFormWrapper>
            {console.log(formValues)}

            <div className="form-title">
                <h1>New Product</h1>
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
                        {renderOptionList(
                            formDefault.product_group,
                            "radio",
                            "product_group",
                            "product_group"
                        )}
                    </fieldset>
                </div>

                {(() => {
                    if (formValues.product_group !== null) {
                        return (
                            <div className="form-field">
                                <fieldset>
                                    <legend>Product Type</legend>
                                    {renderOptionList(
                                        formDefault.product_type[formValues.product_group.name],
                                        "radio",
                                        "product_type",
                                        "product_type"
                                    )}
                                </fieldset>
                            </div>
                        )
                    }
                })()}

                {(() => {
                    if (formValues.product_group !== null
                        && formValues.product_group.name === "pizza") {
                        return (
                            <div className="form-field">
                                <fieldset>
                                    <legend>Pick product sizes</legend>
                                    {renderOptionList(
                                        formDefault.product_size,
                                        "checkbox",
                                        "product_size",
                                        "product_size"
                                    )}
                                </fieldset>
                            </div>
                        )
                    }
                })()}

                <div className="form-field">
                    <fieldset>
                        <legend>Product Price</legend>
                        {renderProductPrice()}
                    </fieldset>
                </div>

                <div className="form-field">
                    <label htmlFor="last_name">Product Image</label>
                    <input
                        type="file"
                        name="product_image"
                        id="product_image"
                        // value={formValues.product_desc}
                        onChange={handleUploadedImage}
                    />
                    <div className="preview-section">
                        <img src={(() => {
                            if (formValues.product_image !== null)
                                return URL.createObjectURL(formValues.product_image)
                            else
                                return ""
                        })()} alt="product_image" />
                    </div>
                    {formErrors.product_desc && <span>{formErrors.product_desc}</span>}
                </div>

                <button
                    onClick={handleSubmit}
                    type="submit">Submit</button>
            </div>
        </ProductFormWrapper>
    )
}

export { ProductFormComponent }

const ProductFormWrapper = styled.form`
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