/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components"
import { useWindowDimensions } from "hooks";

import { NavigatorComponent } from "./navigator";

const HeaderComponent = (props) => {
    const [burger, setBurger] = useState(false)
    const { height, width } = useWindowDimensions()


    // create later
    const logoSection = () => {
        return (
            <LogoSection>

            </LogoSection>
        )
    }

    const navigatorSection = () => {
        console.log(width)

        return (
            <NavigatorSection burger={burger} windowWidth={width}>
                <NavigatorComponent burger={burger} windowWidth={width} />
            </NavigatorSection>
        )
    }

    const mobileNavSection = () => {
        return (
            <MobileNavSection burger={burger} windowWidth={width}>
                <div
                    className="burger-icon-wapper"
                    onClick={() => {
                        setBurger(!burger)

                        console.log(burger)
                    }}>
                </div>
            </MobileNavSection>
        )
    }

    return (
        <HeaderWrapper>
            {logoSection()}
            {navigatorSection()}
            {mobileNavSection()}
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
    display: grid;
    height: auto;
    width: 100%;
    grid-template-columns: 25% 75%;
    grid-template-rows: 1fr;
    grid-template-areas: 
        "logo desktop_nav";

    @media only screen and (max-width: 768px) {
        grid-template-rows: 1fr auto;
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

const NavigatorSection = styled.div`
    grid-area: desktop_nav;
    display: flex;
    height: 100px;
    width: 100%;
    background-color: blue;

    @media only screen and (max-width: 768px) {
        justify-content: flex-end;
        height: ${props => (props.burger && props.windowWidth <= 768) ? "auto" : "0px"};
    }
`;

const MobileNavSection = styled.div`
    grid-area: mobile_nav;
    height: ${props => (props.windowWidth > 768) ? "0px" : "100px"};
    width: 100%;
    background-color: red;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .burger-icon-wapper {
        height: 50px;
        width: 50px;
        border-radius: 5px;
        border: none;
        background-color: aqua;
    }
`;


export { HeaderComponent }