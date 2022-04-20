/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { useWindowDimensions } from "hooks";

import { NavigatorComponent } from "./navigator";
import { F } from "caniuse-lite/data/agents";

const HeaderComponent = (props) => {
    const [burger, setBurger] = useState(false)
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

    // create later

    const listItemsInMenu = directions.map((item) => (
        <DirectWrapper >
            <Link to={item.url}>{item.title}</Link>
        </DirectWrapper>
    ))

    return (
        <HeaderWrapper burger={burger} windowWidth={width}>
            {console.log(burger)}
            <LogoSection></LogoSection>
            {(width > 768) && <DesktopNavSection>
                {listItemsInMenu}
            </DesktopNavSection>}

            {(() => {
                if (width > 768) {
                    return (
                        <DesktopNavSection>
                            {listItemsInMenu}
                        </DesktopNavSection>
                    )
                } else if (width < 768 && burger) {
                    return (
                        <DesktopNavSection>
                            {listItemsInMenu}
                        </DesktopNavSection>
                    )
                } else if (width < 768 && !burger) {
                    return <React.Fragment></React.Fragment>
                }
            })()}

            {(width < 768) && <MobileNavSection>
                <div
                    className="burger-icon-wapper"
                    onClick={() => {
                        setBurger(!burger)
                    }}>
                </div>
            </MobileNavSection>}
        </HeaderWrapper>
    )
}

export { HeaderComponent }

const HeaderWrapper = styled.div`
    display: grid;
    height: auto;
    width: 100%;
    grid-template-columns: 25% 75%;
    grid-template-rows: auto;
    grid-template-areas: 
        "logo desktop_nav";
    grid-auto-flow: row;
    background-color: blanchedalmond;

    @media only screen and (max-width: 768px) {
        grid-template-rows: minmax(0, 1fr) minmax(0, auto);
        grid-template-areas: 
            "logo mobile_nav"
            "desktop_nav desktop_nav";

    }
`;

const LogoSection = styled.div`
    grid-area: logo;
    height: 100px;
    width: 100%;
    background-color: orange;
`;

const DesktopNavSection = styled.div`
    grid-area: desktop_nav;
    display: flex;
    height: 100px;
    width: 100%;
    background-color: blue;
    
    @media only screen and (max-width: 768px) {
        justify-content: left;
        height: auto;
        flex-direction: column;
        /* justify-content: center; */
        align-items: center;
        /* position: absolute; */
        /* height: ${props => (props.burger && props.windowWidth <= 768) ? "auto" : "0px"}; */
    }
`;

const MobileNavSection = styled.div`
    grid-area: mobile_nav;
    height: 100px;
    /* height: ${props => (props.windowWidth > 768) ? "0px" : "100px"}; */
    width: 100%;
    background-color: red;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /* border: 5px solid black; */

    .burger-icon-wapper {
        height: 50px;
        width: 50px;
        border-radius: 5px;
        border: none;
        background-color: aqua;
    }
`;

// const NavigatorWrapper = styled.div`
//     display: flex;
//     flex-direction: row;
//     border: 2px solid black;
//     /* display: none; */
//     /* visibility: hidden;
//     max-height: 0; */
//     width: 100%;

//     @media only screen and (max-width: 768px) {
//         flex-direction: column;
//         width: ${props => (props.burger && props.windowWidth <= 768) ? "300px" : "0"};
//         height: ${props => (props.burger && props.windowWidth <= 768) ? "auto" : "0"};
//         visibility: ${props => (props.burger && props.windowWidth <= 768) ? "visible" : "hidden"};
//     }
// `;

const DirectWrapper = styled.div`
    width: 100px;
`


