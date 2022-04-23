/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components"

const CartContainerComponent = (props) => {
    // create later

    return (
        <CartContainer
            className="cart-container"
            cartToggle={props.cartToggle}
            checkoutCss={props.checkoutCss ? props.checkoutCss : null}>
            {/* {console.log(props.checkoutCss)} */}
            <div className="container-content">
                <div className="item-wrapper"></div>
                <div className="item-wrapper"></div>
                <div className="item-wrapper"></div>
                <div className="item-wrapper"></div>
                <div className="item-wrapper"></div>
            </div>
        </CartContainer>
    )
}



const CartContainer = styled.div`
    width: 500px;
    /* height: 500px; */
    /* visibility: hidden; */
    display: ${(props) => {
        if (props.cartToggle) {
            return "block"
        } else {
            return "none"
        }
    }};
    background-color: whitesmoke;
    border-radius: 10px 0 0 0;
    padding: 5px;
    max-height: 450px;
    overflow: auto;
    border: 1px solid black;

    @media only screen and (max-width: 600px) {
        width: 100%;
    }

    .container-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .item-wrapper {
        height: 100px;
        width: 97%;
        background-color: blueviolet;
        margin-top: 10px;
    }
`;

export { CartContainerComponent }