/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useWindowDimensions } from "hooks";

const NavigatorComponent = (props) => {
    // create later

    const { height, width } = useWindowDimensions()

    const directions = [
        {
            "title": "Home",
            "icon": "",
            "url": "/home/"
        },
        {
            "title": "Menu",
            "icon": "",
            "url": "/menu/"
        },
        {
            "title": "Your order(s)",
            "icon": "",
            "url": "/order/"
        }
    ]

    const navigatorContent = () => {
        console.log(props.burger)

        return directions.map((item) => {
            return (
                <DirectWrapper >
                    <Link to={item.url}>{item.title}</Link>
                </DirectWrapper>
            )
        })
    }

    return (
        <NavigatorWrapper burger={props.burger} windowWidth={width}>
            {navigatorContent()}
        </NavigatorWrapper>
    )
}



const NavigatorWrapper = styled.div`
    display: flex;
    flex-direction: row;
    border: 2px solid black;
    /* display: none; */
    /* visibility: hidden;
    max-height: 0; */
    width: 100%;

    @media only screen and (max-width: 768px) {
        flex-direction: column;
        width: ${props => (props.burger && props.windowWidth <= 768) ? "300px" : "0"};
        height: ${props => (props.burger && props.windowWidth <= 768) ? "auto" : "0"};
        visibility: ${props => (props.burger && props.windowWidth <= 768) ? "visible" : "hidden"};
    }
`;

const DirectWrapper = styled.div`
    width: 100px;
`


export { NavigatorComponent }