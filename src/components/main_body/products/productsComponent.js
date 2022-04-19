/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProductsComponent = (props) => {
    // create later

    const renderProducts = () => {
        return (
            <React.Fragment>
                <div className="pro-img-wrap">sdfsdfsdf</div>
                <div className="pro-des-wrap"></div>
                <div className="pro-order-wrap">
                    <button>Add To Card</button>
                    <button>Customize</button>
                </div>
            </React.Fragment>
        )
    }

    return (
        <ProductsWrapper>
            <h1>gdfgdfg</h1>
            {renderProducts()}
        </ProductsWrapper>
    )
}

export { ProductsComponent }

const ProductsWrapper = styled.div`
    height: auto;
    width: 100%;
    border: 2px solid firebrick;
    /* display: grid;
    background-color: antiquewhite;
    grid-template-columns: 30% 70%;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 
        "pro_img pro_des"
        "pro_order pro_order";

    .pro-img-wrap {
        grid-area: pro_img;
        height: 100%;
        width: 30%;
        background-color: gray;
    }

    .pro-des-wrap {
        grid-area: pro_des;
        height: 100%;
        width: 70%;
        background-color: gray;
    }

    .pro-order-wrap{
        grid-area: pro_order;
    } */
`;


