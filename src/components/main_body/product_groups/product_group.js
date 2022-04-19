/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"

const ProductGroupComponent = (props) => {
    // create later

    const product_group_items = [
        {
            "title": "Pizzas",
            "group": "pizza",
            "icon": "",
            "types": ["meat", "veggie", "cheese"],
            // "url": "/menu/:productGroup/:productName/"
        },
        {
            "title": "Drinks",
            "group": "drink",
            "icon": "",
            "types": ["soft", "tea"],
        }
    ]

    const renderProductTypes = (group, types) => {
        if (types.length > 0) {
            return types.map((type) => {
                return (
                    <Link to={`/menu/${group}/${type}/`}>{type}</Link>
                )
            })
        }
    }

    const renderProductGroupItems = () => {
        return product_group_items.map(item => {
            return (
                <ProductGroupItemWrapper className={item.group}>
                    <h1>{item.title}</h1>
                    <div className="product-group-type-wrapper">
                        {renderProductTypes(item.group, item.types)}
                    </div>
                </ProductGroupItemWrapper>
            )
        })
    }

    return (
        <ProductGroupWrapper>
            {renderProductGroupItems()}
        </ProductGroupWrapper>
    )
}

export { ProductGroupComponent }

const ProductGroupWrapper = styled.div`
    height: auto;
    width: 100%;
    border: 1px solid black;
`;

const ProductGroupItemWrapper = styled.div`
    height: auto;

    .product-group-type-wrapper {
        display: flex;
        flex-direction: column;
    }
`;
