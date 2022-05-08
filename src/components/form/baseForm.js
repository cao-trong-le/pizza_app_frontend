/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link, matchPath } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "axios_instance/axiosInstace";
import { FormValidation } from "./formValidation";
import { FormHelpers } from "./formHelpers";

const BaseFormComponent = (props) => {
    // create later

    const defaultValues = {
        base_name: "",
        base_desc: "",
        base_price: 0,
        base_image: null,
        base_group: [
            {
                default: true,
                name: "dough",
                display: "Dough"
            },
            {
                default: false,
                name: "sauce",
                display: "Sauce"
            },
            {
                default: false,
                name: "cheese",
                display: "Cheese"
            },
            {
                default: false,
                name: "topping",
                display: "Topping"
            },
        ],
        base_type: [
            {
                default: true,
                name: "none",
                display: "None"
            },
            {
                default: false,
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
                name: "cheese",
                display: "Cheese"
            },
        ],
        base_medium_only: false,
        base_instruction: ""
    }
    const intialValues = {
        base_name: "",
        base_desc: "",
        base_price: 0,
        base_image: null,
        base_group: {
            default: true,
            name: "dough",
            display: "Dough"
        },
        base_type: {
            default: true,
            name: "none",
            display: "None"
        },
        base_instruction: ""
    }
    const [formValues, setFormValues] = useState(intialValues);
    const [formDefault, setFormDefault] = useState(defaultValues)
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formHelpers = new FormHelpers();

    const baseFormRef = useRef()

    const handleUploadedImage = (e) => {
        console.log(e.target.files[0])
        setFormValues({ ...formValues, base_image: e.target.files[0] })
    }

    const removeUploadedImage = (e) => {
        const element = baseFormRef.current.querySelector(`#${CSS.escape(e.target.getAttribute("data-id"))}`)
        element.value = ""
        setFormValues({ ...formValues, base_image: null })
    }

    const handleClick = (inputType, base_section, e) => {
        const option_name = e.target.getAttribute("data-option-name")
        let value = null
        let data = []

        if (inputType === "radio") {
            value = formDefault[base_section][e.target.id]

            setFormValues({
                ...formValues,
                [base_section]: value
            })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        const optionName = e.target.getAttribute("name")

        // set errors
        const updatedData = { ...formValues, [name]: value }
        handleValidation(updatedData, true, name, value)
    };

    const handleError = (name, value, validator) => {
        let errorMsg = { ...formErrors }
        let validStatus = null

        switch (name) {
            case "base_name":
                validStatus = validator.isEmptyField(
                    value,
                    `Oops, It is empty!`,
                    "base_name")
                break
            case "base_price":
                validStatus = validator.isEmptyField(
                    value,
                    `You need a specific price`,
                    "base_price"
                )
                break
            default:
                break
        }

        if (!validStatus.status)
            errorMsg[validStatus.type] = validStatus.message

        setFormErrors({ ...formErrors, [validStatus.type]: validStatus.message }, () => {
            console.log(formErrors)
        })

        return validStatus.status
    }

    const handleValidation = (
        updatedData,
        onEachField = false,
        fieldName = null,
        fieldValue = null) => {

        const validator = new FormValidation({ ...updatedData })

        if (onEachField)
            handleError(fieldName, fieldValue, validator)
        else {
            for (let [key, value] of Object.entries(formValues)) {
                // console.log(pair)
                const checkList = ["base_name", "base_price"]
                const searchKey = (i) => i === key
                if (checkList.findIndex(searchKey) !== -1)
                    if (!handleError(key, value, validator)) return false
            }

            return true
        }
    }

    const reorganizeData = () => {
        let data = new FormData()
        for (let [key, value] of Object.entries(formValues)) {
            if (key === "base_group" || key === "base_type")
                data.append(key, value.name)
            if (key === "base_image" && value !== null)
                data.append(key, value, value.name)
            data.append(key, value)
        }
        return data
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (handleValidation({ ...formValues }, false, null, null)) {
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
        }
    }

    return (
        <BaseFormWrapper ref={baseFormRef}>
            {/* {console.log(formValues)} */}
            {console.log(formErrors)}

            <div className="form-title">
                <h1>New Base</h1>
            </div>
            <div className="form-content">
                <div className="form-field">
                    <label htmlFor="base_name">Base Name</label>
                    <input
                        type="text"
                        name="base_name"
                        id="base_name"
                        value={formValues.base_name}
                        onChange={handleChange}
                    // onFocus={handleChange}
                    />
                    {formErrors.base_name && <span>{formErrors.base_name}</span>}
                </div>

                <div className="form-field">
                    <label htmlFor="base_desc">Base Description</label>
                    <input
                        type="text"
                        name="base_desc"
                        id="base_desc"
                        value={formValues.base_desc}
                        onChange={handleChange}
                    />
                    {formErrors.base_desc && <span>{formErrors.base_desc}</span>}
                </div>


                {(() => {
                    if (formValues.base_group !== null) {
                        return (
                            <div className="form-field">
                                <fieldset>
                                    <legend>Product Type</legend>
                                    {formHelpers.renderOptionList(
                                        formDefault.base_group,
                                        "radio",
                                        "base_group",
                                        "base_group",
                                        ["base_group"],
                                        handleClick
                                    )}
                                </fieldset>
                            </div>
                        )
                    }
                })()}

                {(() => {
                    if (formValues.base_group !== null
                        && formValues.base_group.name === "topping") {
                        return (
                            <div className="form-field">
                                <fieldset>
                                    <legend>Product Type</legend>
                                    {formHelpers.renderOptionList(
                                        formDefault.base_type,
                                        "radio",
                                        "base_type",
                                        "base_type",
                                        ["base_type"],
                                        handleClick
                                    )}
                                </fieldset>
                            </div>
                        )
                    }
                })()}

                <div className="form-field">
                    <label htmlFor="base_price">Base Price</label>
                    <input
                        type="number"
                        name="base_price"
                        id="base_price"
                        value={formValues.base_price}
                        onChange={handleChange}
                    />
                    {formErrors.base_price && <span>{formErrors.base_price}</span>}
                </div>

                <div className="form-field">
                    <label htmlFor="base_note">Base Note</label>
                    <input
                        type="text"
                        name="base_note"
                        id="base_note"
                        value={formValues.base_note}
                        onChange={handleChange}
                    />
                    {formErrors.base_note && <span>{formErrors.base_note}</span>}
                </div>

                <div className="form-field">
                    <label htmlFor="base_price">Base Image</label>
                    {formHelpers.renderImage(
                        "base_image",
                        handleUploadedImage,
                        removeUploadedImage,
                        formValues.base_image)}
                </div>

                <button
                    onClick={handleSubmit}
                    type="submit">Submit</button>
            </div>
        </BaseFormWrapper>
    )
}

export { BaseFormComponent }

const BaseFormWrapper = styled.form`
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