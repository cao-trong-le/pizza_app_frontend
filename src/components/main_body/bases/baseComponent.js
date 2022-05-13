/* eslint-disable no-unused-vars */
/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const BaseComponent = (props) => {
    // create later

    const [bases, setBases] = useState([])
    const [selectedMode, setSelectedMode] = useState(false)
    const [selectedBases, setSelectedBases] = useState([])

    useEffect(() => {
        fetchBaseData()
    }, [])

    // fetch base data
    const fetchBaseData = () => {
        axios
            .get("http://127.0.0.1:8000/product/base/all/")
            .then((res) => {
                console.log(res.data.data.data)
                const return_data = res.data.data.data
                setBases((bases) => {
                    return [...return_data]
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const selectBase = (e) => {
        setSelectedBases([...selectedBases, e.target.id])
    }

    const selectAllBases = (e) => {

    }

    const editBase = (e) => {

    }

    const deleteBase = (e) => {

    }

    const deleteBases = (e) => {

    }

    const deleteAllBases = (e) => {

    }

    const renderBases = () => {
        return bases.map((base, index) => {
            console.log(index)

            const baseDescriptionSections = [
                {
                    name: "base_name",
                    display: "Name",
                    value: base.base_name
                },
                {
                    name: "base_price",
                    display: "Price",
                    value: base.base_price
                },
                {
                    name: "base_medium_only",
                    display: "Medium Only",
                    value: base.base_medium_only ? "True" : "False"
                },
                {
                    name: "base_description",
                    display: "Description",
                    value: base.base_description === "" ? "None" : base.base_description
                },
                {
                    name: "base_note",
                    display: "Note",
                    value: base.base_note === "" ? "None" : base.base_note
                },
            ]

            console.log(baseDescriptionSections)

            return (
                <BaseWrapper key={index}>
                    {selectedMode &&
                        <input
                            type="checkbox"
                            id={index}
                            defaultChecked={false}
                            onClick={selectBase} />}

                    <div className="base_image">
                        <img src={`http://127.0.0.1:8000${base.base_image}/`} alt="base image" />
                    </div>

                    <div className="base_description">
                        {baseDescriptionSections.map((section, index) => {
                            return (
                                <React.Fragment>
                                    <p className="title" key={index}>
                                        <b>{section.display}</b>
                                    </p>
                                    <p className="content">
                                        {section.value}
                                    </p>
                                </React.Fragment>
                            )
                        })}
                    </div>
                    <div className="base_functions">
                        <input
                            className="base_edit"
                            id={index}
                            type="button"
                            value="Edit"
                            onClick={(e) => {
                                editBase
                            }} />
                        <input
                            className="base_delete"
                            id={index}
                            type="button"
                            value="Delete"
                            onClick={(e) => {
                                deleteBases
                            }} />
                    </div>
                </BaseWrapper>
            )
        })
    }

    return (
        <BaseComponentWrapper>
            <h1>Pizza Ingredients</h1>
            <BaseFunctions>
                <input
                    type="button"
                    value="Refresh"
                    onClick={fetchBaseData} />
                <input
                    type="button"
                    value="Select"
                    onClick={() => { setSelectedMode(!selectedMode) }} />
                <input
                    type="button"
                    value="Select All"
                    onClick={selectAllBases} />
            </BaseFunctions>
            <BaseRender>
                {renderBases()}
            </BaseRender>
        </BaseComponentWrapper>
    )
}

export { BaseComponent }

const BaseComponentWrapper = styled.div`
    height: auto;
    width: 100%;
    border: 2px solid firebrick;
`;

const BaseRender = styled.div``;

const BaseFunctions = styled.div``;

const BaseWrapper = styled.div`
    height: auto;
    display: flex;
    flex-direction: row;
    background-color: aqua;
    margin: 5px;

    .base_image {
        img {
            height: 150px;
            width: 150px;
        }
    }
`;



