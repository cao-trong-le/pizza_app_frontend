/* eslint-disable no-unused-vars */
/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link, matchPath } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "axios_instance/axiosInstace";
import { FormValidation } from "./formValidation";
import { defaultFormat } from "moment";
import { FormHelpers } from "./formHelpers";
import { ValidationHelpers } from "./formHelpers";


const ProductFormComponent = (props) => {
    // create later

    const formHelpers = new FormHelpers()

    const initialValues = {
        product_name: "",
        product_desc: "",
        product_price: {
            small: 0,
            medium: 0,
            large: 0,
            ex_large: 0
        },
        product_discount: {
            small: 0,
            medium: 0,
            large: 0,
            ex_large: 0
        },
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
        product_name: "",
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
                    default: true,
                    name: "meat",
                    display: "Meat"
                },
                {
                    default: false,
                    name: "veggie",
                    display: "Veggie"
                },
                {
                    default: false,
                    name: "Cheese",
                    display: "Cheese"
                },
            ],

            drink: [
                {
                    default: true,
                    name: "tea",
                    display: "Tea"
                },
                {
                    default: false,
                    name: "soft_drink",
                    display: "Soft Drink"
                },
                {
                    default: false,
                    name: "milk",
                    display: "Milk"
                },
                {
                    default: false,
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

    let errors = {
        product_price: {
            small: "",
            medium: "",
            large: "",
            ex_large: ""
        },
        product_discount: {
            small: "",
            medium: "",
            large: "",
            ex_large: ""
        }
    }

    let validationTargets = [
        { name: "product_name", nested: false, function: null, params: [] },
        { name: "product_price", nested: true, function: null, params: [] },
        { name: "product_discount", nested: true, function: null, params: [] }
    ]

    const [formDefault, setFormDefault] = useState(defaultValues)
    const [formValues, setFormValues] = useState(initialValues)
    const [validateCards, setValidateCards] = useState(validationTargets)
    const [formErrors, setFormErrors] = useState(errors);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setFormValues((formValues) => ({
            ...formValues,
            product_type: formDefault.product_type[formValues.product_group.name][0]
        }))
    }, [formValues.product_group])

    // const setDefaultType = () => {

    // }

    useEffect(() => {
        if (formValues.product_group.name === "pizza") {
            setFormValues((formValues) => ({
                ...formValues,
                product_price: {
                    small: 0,
                    medium: 0,
                    large: 0,
                    ex_large: 0
                },
                product_discount: {
                    small: 0,
                    medium: 0,
                    large: 0,
                    ex_large: 0
                },
            }))

            setFormErrors((formErrors) => ({
                ...formErrors,
                product_price: {
                    small: "",
                    medium: "",
                    large: "",
                    ex_large: ""
                },
                product_discount: {
                    small: "",
                    medium: "",
                    large: "",
                    ex_large: ""
                }
            }))

            setValidateCards((validateCards) => {
                return validateCards.map((card, index) => {
                    if (index === 1 || index === 2)
                        return { ...card, nested: true }
                })
            })
        } else {
            setFormValues((formValues) => ({
                ...formValues,
                product_price: 0,
                product_discount: 0
            }))

            setFormErrors((formErrors) => ({
                ...formErrors,
                product_price: "",
                product_discount: ""
            }))

            setValidateCards((validateCards) => {
                return validateCards.map((card, index) => {
                    if (index === 1 || index === 2)
                        return { ...card, nested: false }
                })
            })
        }
    }, [formValues.product_group])

    const productFormRef = useRef()

    const handleUploadedImage = (e) => setFormValues({ ...formValues, product_image: e.target.files[0] })

    const removeUploadedImage = (e) => {
        const element = productFormRef.current.querySelector(`#${CSS.escape(e.target.getAttribute("data-id"))}`)
        element.value = ""
        setFormValues({ ...formValues, product_image: null })
    }

    const handleClick = (inputType, product_section, e) => {
        const option_name = e.target.getAttribute("data-option-name")
        let value = null
        let data = []

        if (inputType === "radio") {
            switch (product_section) {
                case "product_group":
                    value = formDefault[product_section][e.target.id]
                    break
                case "product_type":
                    value = formDefault[product_section][formValues["product_group"].name][e.target.id]
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

    // const handleSingleValidation = (data, name, value) => {
    //     const validationStatus = handleValidation(
    //         data,
    //         true,
    //         name,
    //         value,
    //         false,
    //         null)

    //     console.log(validationStatus)

    //     setFormErrors({
    //         ...formErrors,
    //         [validationStatus.type]: validationStatus.status ? "" : validationStatus.message
    //     })

    // }

    // const handleMultiValidation = (data, name, value, m_key) => {
    //     const validationStatus = handleValidation(
    //         data,
    //         true,
    //         name,
    //         value,
    //         true,
    //         m_key)
    //     setFormErrors({
    //         ...formErrors,
    //         product_price: {
    //             ...formErrors.product_price,
    //             [validationStatus.type]: validationStatus.status ? "" : validationStatus.message
    //         }
    //     })
    // }

    // const handleProductPrice = (e) => {
    //     const { name, value } = e.target

    //     const data = {
    //         ...formValues.product_price,
    //         [name]: value
    //     }

    //     setFormValues({
    //         ...formValues,
    //         product_price: data
    //     })

    //     const updatedData = { ...formValues, product_price: { ...data } }

    //     handleValidation(updatedData, true, name, value, true, "product_price")

    //     handleMultiValidation(updatedData, name, value, "product_price")
    // }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log(name, value)
    //     setFormValues({ ...formValues, [name]: value });
    //     handleSingleValidation({ ...formValues, [name]: value }, name, value)
    //     // set errors
    // };

    const handleError = (name, value, validator, nested = false, m_key = null) => {
        let validStatus = null

        console.log(name, value)

        if (!nested) {
            switch (name) {
                case "product_name":
                    validStatus = validator.isEmptyField(
                        value,
                        `Oops, It is empty!`,
                        name)
                    break
                case "product_price":
                    validStatus = validator.isEmptyField(
                        value,
                        `Oops, It is empty!`,
                        name)
                    break
                case "product_discount":
                    validStatus = validator.isEmptyField(
                        value,
                        `Oops, It is empty!`,
                        name)
                    break
                default:
                    break
            }
        } else {
            switch (m_key) {
                case "product_price":
                    validStatus = validator.isEmptyField(
                        value,
                        `You need a specific price`,
                        name)
                    break
                case "product_discount":
                    validStatus = validator.isEmptyField(
                        value,
                        `You need a specific discount value`,
                        name)
                    break
                default:
                    break
            }
        }

        return validStatus
    }


    const accessValidationHelpers = () => {
        const validationHelpers = new ValidationHelpers(
            validateCards,
            { ...formValues },
            handleError,
            formValues,
            formErrors,
            setFormValues,
            setFormErrors
        )

        return validationHelpers
    }

    const reorganizeData = () => {
        let data = new FormData()
        for (let [key, value] of Object.entries(formValues)) {
            if (key === "product_group")
                data.append(key, value.name)
            if (key === "product_image" && value !== null)
                data.append(key, value, value.name)
            data.append(key, value)
        }
        return data
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (handleValidation({ ...formValues }, false, null, null, false, null)) {
            console.log("success!!!")
            console.log(formValues)

            for (let [key, value] of reorganizeData().entries()) {
                console.log(key, value)
            }

            // axiosInstance
            //     .post("/user/register/", formValues)
            //     .then((res) => {
            //         console.log(res.data)
            //     })
        } else {
            console.log("fail!!!")
        }
    }

    const renderProductPrice = () => {
        console.log(formValues.product_size)
        if (formValues.product_group.name === "pizza") {
            return formValues.product_size.map((size, index) => {
                return (
                    <React.Fragment key={index}>
                        <label htmlFor={size.name}>{size.display}</label>
                        <input
                            type="number"
                            className="product_price"
                            name={size.name}
                            onChange={(e) => { accessValidationHelpers().handleNestedChange(e, "product_price", size.name) }}
                            value={formValues.product_price[size.name]}
                            placeholder={0} />
                        {(Object.keys(formErrors.product_price).length !== 0) && <span>{formErrors.product_price[size.name]}</span>}
                    </React.Fragment>
                )
            })
        } else {
            return (
                <React.Fragment>
                    <input
                        type="number"
                        className="product_price"
                        name="product_price"
                        onChange={(e) => { accessValidationHelpers().handleChange(e) }}
                        value={formValues.product_price}
                        placeholder={0} />
                    {formErrors.product_price && <span>{formErrors.product_price}</span>}
                </React.Fragment>
            )
        }
    }

    const renderProductDiscount = () => {
        if (formValues.product_group.name === "pizza") {
            return formValues.product_size.map((size, index) => {
                return (
                    <React.Fragment key={index}>
                        <label htmlFor={size.name}>{size.display}</label>
                        {console.log(size)}
                        <input
                            type="number"
                            className="product_discount"
                            name={size.name}
                            onChange={(e) => { accessValidationHelpers().handleNestedChange(e, "product_discount", size.name) }}
                            value={formValues.product_discount[size.name]}
                            placeholder={0} />
                        {(Object.keys(formErrors.product_discount).length !== 0) && <span>{formErrors.product_discount[size.name]}</span>}
                    </React.Fragment>
                )
            })
        } else {
            return (
                <React.Fragment>
                    <input
                        type="number"
                        className="product_discount"
                        name="product_discount"
                        onChange={(e) => { accessValidationHelpers().handleChange(e) }}
                        value={formValues.product_discount}
                        placeholder={0} />
                    {formErrors.product_discount && <span>{formErrors.product_discount}</span>}
                </React.Fragment>
            )
        }
    }

    return (
        <ProductFormWrapper ref={productFormRef}>
            {console.log(formValues)}
            {console.log(formErrors)}

            <div className="form-title">
                <h1>New Product</h1>
            </div>
            <div className="form-content">
                <div className="form-field">
                    <label htmlFor="product_name">Product Title</label>
                    <input
                        type="text"
                        name="product_name"
                        id="product_name"
                        value={formValues.product_name}
                        onChange={(e) => { accessValidationHelpers().handleChange(e) }}
                    />
                    {formErrors.product_name && <span>{formErrors.product_name}</span>}
                </div>

                <div className="form-field">
                    <label htmlFor="last_name">Product Description</label>
                    <input
                        type="text"
                        name="product_desc"
                        id="product_desc"
                        value={formValues.product_desc}
                        onChange={(e) => { accessValidationHelpers().handleChange(e) }}
                    />
                    {formErrors.product_desc && <span>{formErrors.product_desc}</span>}
                </div>

                <div className="form-field">
                    <fieldset>
                        <legend>Product Group</legend>
                        {formHelpers.renderOptionList(
                            formDefault.product_group,
                            "radio",
                            "product_group",
                            "product_group",
                            ["product_group"],
                            handleClick
                        )}

                    </fieldset>
                </div>


                <div className="form-field">
                    <fieldset>
                        <legend>Product Type</legend>
                        {formHelpers.renderOptionList(
                            formDefault.product_type[formValues.product_group.name],
                            "radio",
                            "product_type",
                            "product_type",
                            ["product_type"],
                            handleClick
                        )}
                    </fieldset>
                </div>


                {(() => {
                    if (formValues.product_group !== null
                        && formValues.product_group.name === "pizza") {
                        return (
                            <div className="form-field">
                                <fieldset>
                                    <legend>Pick product sizes</legend>
                                    {formHelpers.renderOptionList(
                                        formDefault.product_size,
                                        "checkbox",
                                        "product_size",
                                        "product_size",
                                        null,
                                        handleClick
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
                    <fieldset>
                        <legend>Product Discount</legend>
                        {renderProductDiscount()}
                    </fieldset>
                </div>

                <div className="form-field">
                    <label htmlFor="last_name">Product Image</label>
                    {formHelpers.renderImage(
                        "product_image",
                        handleUploadedImage,
                        removeUploadedImage,
                        formValues.product_image
                    )}
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