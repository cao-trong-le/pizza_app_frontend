/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, createRef, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const CusLowComponent = (props) => {
    // create later

    // const [number, setNumber] = useState("")
    // const [option, setOption] = useState(0)
    // const [optionType, setOptionType] = useState(0)


    const option = props.option
    const setOption = props.setOption
    const optionType = props.optionType
    const setOptionType = props.setOptionType


    let optionTypeInput = createRef()

    const intructionContent = () => {
        return (
            <input
                type="text"
                placeholder="Any furthur instructions for us? ...."
            />
        )
    }

    const customize_options = [
        {
            "option": "Dough/Sauce/Cheese",
            "content": null,
            "sections": ["Dough", "Sauce", "Cheese"]
        },
        {
            "option": "Toppings",
            "content": null,
            "sections": ["Meat", "Veggie", "Cheese"]
        },
        {
            "option": "Extras",
            "content": null,
            "sections": []
        },
        {
            "option": "Instructions",
            "content": intructionContent,
            "sections": []
        }
    ]

    const dough_option_section = (sections) => {
        if (sections.length > 0) {
            return (
                <div>
                    {sections.map((section, index) => (
                        <input
                            ref={optionTypeInput}
                            className="section-btn"
                            id={index}
                            type="button"
                            key={section}
                            data-index={index}
                            onClick={(e) => {
                                // console.log(optionTypeInput.current.getAttribute("data-index"))
                                console.log(e.target.getAttribute("data-index"))
                                setOptionType(e.target.getAttribute("data-index"))
                            }}
                            value={section} />
                    ))}
                </div>
            )
        } else {
            return <></>
        }
    }

    const renderCustomizeOption = () => {
        let customizeOptions = null

        // console.log(props.customizeOptions)

        if (!props.customizeOptions)
            customizeOptions = customize_options
        else
            customizeOptions = props.customizeOptions

        return customizeOptions.map((option, index) => (
            <input
                type="button"
                className="customize-option"
                key={index}
                data-index={index}
                onClick={(e) => {
                    setOption(e.target.getAttribute("data-index"))
                    setOptionType(0)
                }}
                value={option.option} />
        ))
    }

    return (
        <CusLowComponentWrapper>
            <LowerSection>
                <CustomizeOption>
                    {renderCustomizeOption()}
                </CustomizeOption>
                <OptionTypeDisplay>
                    {dough_option_section(customize_options[option].sections)}
                </OptionTypeDisplay>
                <CustomizeDisplay>
                    <h1>{customize_options[option].sections[optionType]}</h1>
                    {(() => {
                        if (customize_options[option].content !== null) {
                            return (customize_options[option].content)()
                        }
                    })()}
                </CustomizeDisplay>
            </LowerSection>
        </CusLowComponentWrapper>
    )
}

export { CusLowComponent }


const CusLowComponentWrapper = styled.div`
    width: 100%;
    background-color: antiquewhite;
`;

const OptionTypeDisplay = styled.div`
    
`;

const CustomizeDisplay = styled.div`
    height: 500px;
    background-color: blueviolet;
`;

const CustomizeOption = styled.div``

const LowerSection = styled.div`
    background-color: beige;
    height: auto;
    width: 100%;
`


