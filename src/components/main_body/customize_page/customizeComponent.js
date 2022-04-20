/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CustomizeComponent = (props) => {
    // create later

    const [number, setNumber] = useState(0)
    const [option, setOption] = useState(0)
    const [optionType, setOptionType] = useState(0)

    const change_order_number = () => {

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
            "sections": ["Dough", "Sauce", "Cheese"]
        },
        {
            "option": "Toppings",
            "sections": ["Meat", "Veggie", "Cheese"]
        },
        {
            "option": "Extras",
            "sections": []
        },
        {
            "option": "Instructions",
            "sections": []
        }
    ]

    const dough_option_section = (sections) => {
        if (sections.length > 0) {
            return (
                <div>
                    {sections.map(section => (
                        <input className="section-btn" type="button" value={section} />
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
                        value="-" />
                    <input
                        className="number-display"
                        type="number"
                        value={0} />
                    <input
                        className="increase-btn"
                        type="button"
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
                    {customize_options.map(option => (
                        <input
                            type="button"
                            className="customize-option"
                            value={option.option} />
                    ))}
                </CustomizeOption>
                <OptionTypeDisplay>
                    {dough_option_section(customize_options[option].sections)}
                </OptionTypeDisplay>
                <CustomizeDisplay>

                </CustomizeDisplay>
            </LowerSection>
        </CustomizeComponentWrapper>
    )
}

export { CustomizeComponent }

const OptionTypeDisplay = styled.div``;

const CustomizeDisplay = styled.div``;

const CustomizeComponentWrapper = styled.div`
    width: 100%;
    background-color: antiquewhite;
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
    height: 100px;
    width: 100%;
`


