/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components"

const HomePage = (props) => {
    // create later
    const scrollBanner = () => {
        return
    }

    const specialDailyMenu = () => {
        return (
            <SpecialMenuWrapper>
                <h1>Special Products</h1>
            </SpecialMenuWrapper>
        )
    }

    const discountProductMenu = () => {
        return (
            <DiscountProductWrapper>
                <h1>Discount Products</h1>
            </DiscountProductWrapper>
        )
    }

    const pizzaMenu = () => {
        return (
            <PizzaMenuWrapper>
                <h1>Pizzas</h1>
            </PizzaMenuWrapper>
        )
    }

    const drinkMenu = () => {
        return (
            <DrinkMenuWrapper>
                <h1>Drinks</h1>
            </DrinkMenuWrapper>
        )
    }

    return (
        <HomePageWraper>
            {specialDailyMenu()}
            {discountProductMenu()}
            {pizzaMenu()}
            {drinkMenu()}
        </HomePageWraper>
    )
}

const DiscountProductWrapper = styled.div`
    height: 100px;
    width: 100%;
    border: 1px solid black;
`;

const SpecialMenuWrapper = styled.div`
    height: 100px;
    width: 100%;
    border: 1px solid black;
`;

const HomePageWraper = styled.div`
    height: auto;
    width: 100%;
    border: 1px solid black;
`;

const PizzaMenuWrapper = styled.div`
    height: 100px;
    width: 100%;
    border: 1px solid black;
`;

const DrinkMenuWrapper = styled.div`
    height: 100px;
    width: 100%;
    border: 1px solid black;
`;

export { HomePage }