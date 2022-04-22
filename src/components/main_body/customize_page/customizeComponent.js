/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, createRef, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const CustomizeComponent = (props) => {
    // create later

    const [number, setNumber] = useState("")
    const [option, setOption] = useState(0)
    const [optionType, setOptionType] = useState(0)


    useEffect(() => {
        console.log(`it's changed, ${number}`)
        console.log(`is it a number? ${isNaN(number)}`)

        if (!isNaN(number)) {
            if (parseInt(number) > 100) {
                setNumber(() => { return 100 })
            }

            // eslint-disable-next-line
            if (parseInt(number) == 0) {
                console.log("it is 0")
                setNumber(() => { return 1 })
            }
        } else {
            setNumber("1")
        }
    }, [number]);


    const numberInputRef = useRef()

    let optionTypeInput = createRef()

    const change_order_number = () => {

    }

    const iterableContent = () => {
        return (
            <></>
        )
    }

    const intructionContent = () => {
        return (
            <input
                type="text"
                placeholder="Any furthur instructions for us? ...."
            />
        )
    }

    const sizes_list = [
        {
            "size": "Small",
            "icon": ""
        },
        {
            "size": "Medium",
            "icon": ""
        },
        {
            "size": "Large",
            "icon": ""
        },
        {
            "size": "Ex-large",
            "icon": ""
        },

    ]

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

    return (
        <CustomizeComponentWrapper>
            <UpperSection>
                <div className="pro-img-wrapper">
                </div>
                <div className="number-order-wrapper">
                    <input
                        className="reduce-btn"
                        type="button"
                        onClick={(e) => {
                            console.log()

                            let inputValue = numberInputRef.current.getAttribute("value")

                            if (parseInt(inputValue) > 1) {
                                setNumber((parseInt(inputValue) - 1).toString())
                            } else if (parseInt(inputValue) <= 0 || inputValue === "") {
                                setNumber("1")
                            }

                        }}
                        value="-" />
                    <input
                        ref={numberInputRef}
                        className="number-display"
                        type="text"
                        placeholder="0"
                        value={number}
                        onChange={(e) => {
                            console.log(e.target.value)
                            setNumber(e.target.value)
                            // console.log(e.target.value)
                        }} />
                    <input
                        className="increase-btn"
                        type="button"
                        onClick={(e) => {
                            console.log()

                            let inputValue = numberInputRef.current.getAttribute("value")

                            if (parseInt(inputValue) >= 1 && parseInt(inputValue) < 100) {
                                setNumber((parseInt(inputValue) + 1).toString())
                            } else if (inputValue === "") {
                                setNumber("1")
                            }

                        }}
                        value="+" />
                </div>
                <div className="size-picker-wrapper">
                    {sizes_list.map((size) => (
                        <div className="size-cell">
                            <div className="size-title">{size.size}</div>
                            <div className="size-icon">{size.icon}</div>
                        </div>
                    ))}
                </div>
                <div className="add-cart-wrapper">
                    <input
                        value="Add To Cart"
                        type="button"
                        className="add-to-cart-btn" />
                </div>
            </UpperSection>
            <LowerSection>
                <CustomizeOption>
                    {customize_options.map((option, index) => (
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
                    ))}
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
        </CustomizeComponentWrapper>
    )
}

export { CustomizeComponent }


const CustomizeComponentWrapper = styled.div`
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


const UpperSection = styled.div`
    display: grid;
    width: 95%;
    grid-template-columns: 30% 40% 30%;
    grid-template-rows: minmax(0, auto) minmax(0, auto);
    grid-template-areas: 
        "pro_img number_order add_cart"
        "pro_img size_picker add_cart";

    @media only screen and (min-width: 600px) and (max-width: 768px) {
        grid-template-columns: 45% 55%;
        grid-template-rows: minmax(0, auto) minmax(0, auto) minmax(0, auto); 
        grid-template-areas: 
            "pro_img number_order"
            "pro_img size_picker"
            "pro_img add_cart";
    }

    @media only screen and (max-width: 600px) {
        grid-template-columns: 100%;
        grid-template-rows: auto auto auto auto;
        grid-template-areas: 
            "pro_img"
            "number_order"
            "size_picker"
            "add_cart";
    }

    .pro-img-wrapper {
        grid-area: pro_img;
        height: 200px;
        width: 200px;
        background-color: aqua;
        border-radius: 50%;
        margin: 5px;
    }

    .number-order-wrapper {
        grid-area: number_order;

        .number-display {
            height: 50px;
            width: 50px;
        }
    }

    .size-picker-wrapper {
        grid-area: size_picker;
    }

    .add-cart-wrapper {
        grid-area: add_cart;
    }
`

const LowerSection = styled.div`
    background-color: beige;
    height: auto;
    width: 100%;
`


