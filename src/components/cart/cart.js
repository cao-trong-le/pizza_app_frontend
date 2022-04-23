/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components"
import { CartContainerComponent } from "./cartContainer";
import { useHistory } from "react-router-dom";


const CartComponent = (props) => {
    // create later

    const [cartToggle, setCartToggle] = useState(false)
    const history = useHistory();

    return (
        <CartComponentWraper>
            <CartWrapper cartToggle={cartToggle}>
                <CartHeader onClick={() => {
                    setCartToggle(!cartToggle)
                }}>
                    <h1>Cart</h1>
                </CartHeader>
                <CartContainerComponent cartToggle={cartToggle} />
                <div className="checkout-btn-wrapper">
                    <input
                        type="button"
                        className="checkout-btn"
                        onClick={() => {
                            history.push("/checkout/")
                        }}
                        value="Go To Checkout" />
                </div>
            </CartWrapper>
        </CartComponentWraper>
    )
}

const CartComponentWraper = styled.div`
    height: auto;
    width: 100%;
    /* border: 2px solid black; */
    background-color: transparent;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: sticky;
    bottom: 0;
    right: 0;
`;

const CartWrapper = styled.div`
    height: auto;
    width: 100%;
    /* border: 2px solid black; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;

    .checkout-btn-wrapper {
        background-color: whitesmoke;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        display: ${(props) => {
        if (props.cartToggle) {
            return "block"
        } else {
            return "none"
        }
    }};
        
        .checkout-btn {
            height: 50px;
            border-radius: 5px;
            width: 98%;
        }
    }
`;

const CartHeader = styled.div`
    height: 60px;
    width: 250px;
    padding-left: 10px;
    border: 1px solid black;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    background-color: brown;
`;

// const CartContainer = styled.div`
//     width: 500px;
//     /* height: 500px; */
//     /* visibility: hidden; */
//     display: ${(props) => {
//         if (props.cartToggle) {
//             return "block"
//         } else {
//             return "none"
//         }
//     }};
//     background-color: whitesmoke;
//     border-radius: 10px 0 0 0;
//     padding: 5px;
//     max-height: 450px;
//     overflow: auto;
//     border: 1px solid black;

//     @media only screen and (max-width: 600px) {
//         width: 100%;
//     }

//     .container-content {
//         width: 100%;
//         display: flex;
//         flex-direction: column;
//         justify-content: center;
//         align-items: center;
//     }

//     .item-wrapper {
//         height: 100px;
//         width: 97%;
//         background-color: blueviolet;
//         margin-top: 10px;
//     }
// `;


export { CartComponent }