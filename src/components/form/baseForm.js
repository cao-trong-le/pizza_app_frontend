/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link, matchPath } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "axios_instance/axiosInstace";
import { FormValidation } from "./formValidation";
import { FormHelpers } from "./formHelpers";
import { ValidationHelpers } from "./formHelpers";
// const Compress = require('compress.js')
import Compress from "compress.js";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { F } from "@fortawesome/fontawesome"
import { faCheckSquare, faSquare } from '@fortawesome/fontawesome-free-solid'

const BaseFormComponent = (props) => {
    // create later

    const defaultValues = {
        base_name: "",
        base_description: "",
        base_price: 0,
        base_image: null,
        base_group: [
            {
                default: false,
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
                default: false,
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
        base_note: ""
    }
    const intialValues = {
        base_name: "",
        base_description: "",
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
        base_medium_only: false,
        base_note: ""
    }
    const [formValues, setFormValues] = useState(intialValues);
    const [formDefault, setFormDefault] = useState(defaultValues)
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const isEdit = props.edit
        const item = props.item
        let copied = { ...intialValues }
        const keys = Object.keys(copied)
        let _file = null

        console.log(item)

        if (isEdit) {
            for (let key of keys) {
                if (key === "base_group" || key === "base_type")
                    copied[key] = {
                        default: true,
                        name: item[key],
                        display: item[key].charAt(0).toUpperCase() + item[key].slice(1)
                    }

                else if (key === "base_medium_only") {
                    console.log(typeof item[key] === "boolean")
                    console.log(item[key])
                    copied[key] = item[key]
                }

                else if (key === "base_image") {
                    const url = `http://127.0.0.1:8000${item[key]}`
                    const fileName = url.substring(url.lastIndexOf('/') + 1)

                    fetch(url)
                        .then(response => response.blob())
                        .then(blob => new File([blob], `${fileName}`, {
                            type: blob.type
                        }))
                        .then(file => {
                            setFormValues((formValues) => {
                                return { ...formValues, base_image: file }
                            })
                        })
                }
                else
                    copied[key] = item[key]
            }

            setFormValues((formValues) => {
                return { ...formValues, ...copied }
            })
        }
    }, [])

    const formHelpers = new FormHelpers();

    const baseFormRef = useRef()

    const accessFormValidation = () => {
        const formValidate = new FormValidation({ ...formValues })
        return formValidate
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

    const handleUploadedImage = (e) => {
        const file = e.target.files[0]
        console.log(file)
        const isValidSize = accessFormValidation().isValidImage(file.size, "The uploaded image cannot be bigger than 5mb.")

        if (isValidSize.status) {
            // compress the uploaded image
            // Initialization
            const compress = new Compress()

            // Attach listener
            const files = [...e.target.files]
            compress.compress(files, {
                size: 4,
                quality: .75,
                maxWidth: 350,
                maxHeight: 350,
                resize: true,
                rotate: false,
            }).then((data) => {
                const img1 = data[0]
                const base64str = img1.data
                const imgExt = img1.ext
                // convert image into blob type
                const blob = Compress.convertBase64ToFile(base64str, imgExt)

                // convert blob => a file
                const file = new File([blob], img1.alt, {
                    type: imgExt,
                    lastModified: new Date().getTime()
                })

                console.log(file)
                console.log(img1)
                setFormValues({ ...formValues, base_image: file })
            })
        } else {
            setFormErrors({ ...formErrors, [isValidSize.type]: isValidSize.message })
        }

        setFormValues({ ...formValues, base_image: file })
    }

    const removeUploadedImage = (e) => {
        const element = baseFormRef.current.querySelector(`#${CSS.escape(e.target.getAttribute("data-id"))}`)
        element.value = ""
        setFormValues({ ...formValues, base_image: null })
    }

    const handleTick = (e) => {
        setFormValues({ ...formValues, base_medium_only: !formValues.base_medium_only })
    }

    const handleClick = (inputType, base_section, e) => {
        let value = null

        if (inputType === "radio") {
            value = formDefault[base_section][e.target.id]
            console.log(value)
            value["default"] = true

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

        if (validStatus !== null) {
            errorMsg[validStatus.type] = validStatus.message

            setFormErrors({ ...formErrors, [validStatus.type]: validStatus.message })
            return validStatus.status
        }
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

        let raw_data = {}

        // filter data
        for (let [key, value] of Object.entries(formValues)) {
            if (key === "base_group" || key === "base_type")
                raw_data[key] = value.name
            else
                raw_data[key] = value
        }

        // set data into formData
        for (let [key, value] of Object.entries(raw_data)) {
            if (key === "base_image" && value !== null)
                data.append(key, value, value.name)
            else
                data.append(key, value)
        }
        return data
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (handleValidation({ ...formValues }, false, null, null)) {
            console.log("success!!!")
            console.log(formValues)
            const formData = reorganizeData()

            // add event name
            formData.append("request_event", "add_base")

            axios
                .post("http://127.0.0.1:8000/product/base/", formData, {
                    headers: { 'content-type': 'multipart/form-data' }
                })
                .then((res) => {
                    console.log(res.data)
                })
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        console.log("update running!!!")

        if (handleValidation({ ...formValues }, false, null, null)) {
            console.log("success!!!")
            console.log(formValues)
            const formData = reorganizeData()

            // add event name
            formData.append("request_event", "edit_base")
            formData.append("base_code", props.item.base_code)

            axios
                .post("http://127.0.0.1:8000/product/base/", formData, {
                    headers: { 'content-type': 'multipart/form-data' }
                })
                .then((res) => {
                    console.log(res.data)
                })
        }
    }

    return (
        <BaseFormWrapper ref={baseFormRef}>
            {console.log(formValues)}
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
                        onChange={handleChange} />
                    {formErrors.base_name && <span>{formErrors.base_name}</span>}
                </div>

                <div className="form-field">
                    <label htmlFor="base_desc">Base Description</label>
                    <input
                        type="text"
                        name="base_description"
                        id="base_description"
                        value={formValues.base_description}
                        onChange={handleChange} />
                    {formErrors.base_description && <span>{formErrors.base_description}</span>}
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                    className="form-field">
                    <i
                        style={{
                            width: "25px",
                            height: "25px",
                            fontSize: "16pt",
                            color: "black",
                        }}
                        onClick={handleTick}
                        className={formValues.base_medium_only ? "far fa-check-square" : "far fa-square"}></i>
                    <p>Medium Only</p>
                </div>

                {(() => {
                    let copied = [...defaultValues.base_group]
                    const findDefault = (ele) => ele.name === formValues.base_group.name
                    const idx = copied.findIndex(findDefault)
                    copied.splice(idx, 1, formValues.base_group)

                    // let rewriteDefault = [...]

                    if (formValues.base_group !== null) {
                        return (
                            <div className="form-field">
                                <legend>Ingredient Group</legend>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "left",
                                        alignItems: "center",
                                    }}>
                                    {copied.map((item, index) => {
                                        return (
                                            <div
                                                style={{
                                                    marginRight: "10px",
                                                    display: "flex",
                                                    flexDirection: "center",
                                                    justifyContent: "left",
                                                    alignItems: "center",
                                                    width: "80px"
                                                }} >
                                                <i
                                                    style={{
                                                        marginRight: "2px",

                                                    }}
                                                    key={index}
                                                    id={index}
                                                    className={item.default ? "fas fa-circle" : "far fa-circle"}
                                                    onClick={((e) => { handleClick("radio", "base_group", e) })}></i>

                                                <p>{item.display}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }
                })()}

                {(() => {
                    const findDefault = (ele) => ele.name === formValues.base_type.name
                    let copied = [...defaultValues.base_type]
                    const idx = copied.findIndex(findDefault)
                    copied.splice(idx, 1, formValues.base_type)

                    console.log(idx)
                    console.log(copied[idx])

                    if (formValues.base_group !== null
                        && formValues.base_group.name === "topping") {
                        return (
                            <div className="form-field">

                                <legend>Product Type</legend>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "left",
                                        alignItems: "center",
                                    }}>
                                    {copied.map((item, index) => {
                                        return (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    marginRight: "10px",
                                                    justifyContent: "left",
                                                    alignItems: "center",
                                                    width: "80px",
                                                }}>
                                                <i
                                                    style={{
                                                        marginRight: "2px",
                                                    }}
                                                    key={index}
                                                    id={index}
                                                    className={item.default ? "fas fa-circle" : "far fa-circle"}
                                                    onClick={((e) => { handleClick("radio", "base_type", e) })}></i>

                                                <p>{item.display}</p>
                                            </div>
                                        )
                                    })}

                                </div>

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
                    {formErrors.base_image && <span>{formErrors.base_image}</span>}
                </div>

                <button
                    onClick={props.edit ? handleUpdate : handleSubmit}
                    type="submit">{props.edit ? "Update" : "Create"}</button>
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