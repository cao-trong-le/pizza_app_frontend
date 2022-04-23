/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { CartContainerComponent } from "components/cart";

const CheckoutComponent = (props) => {
    // create later

    const reviewProductSectionContent = () => {
        return (
            <ReviewProductSection className="review-product-section">
                <CartContainerComponent />
            </ReviewProductSection>
        )
    }

    const locationSectionContent = () => {
        return (
            <LocationSection className="location-section"></LocationSection>
        )
    }

    const paymentSectionContent = () => {
        return (
            <PaymentSection className="payment-section"></PaymentSection>
        )
    }

    const receiptSectionContent = () => {
        return (
            <ReceiptSection className="receipt-section"></ReceiptSection>
        )
    }

    let sectionListContent = [
        {
            "title": "Products List",
            "type": "products_list",
            "toggle": true,
            "content": reviewProductSectionContent,
            "valid": true
        },
        {
            "title": "Location",
            "type": "location",
            "toggle": false,
            "content": locationSectionContent,
            "valid": false
        },
        {
            "title": "Payment",
            "type": "payment",
            "toggle": false,
            "content": paymentSectionContent,
            "valid": false
        },
        {
            "title": "Receipt",
            "type": "receipt",
            "toggle": false,
            "content": receiptSectionContent,
            "valid": true
        },
    ]

    const [sectionList, setSectionList] = useState(sectionListContent)

    return (
        <CheckoutWrapper>
            {sectionList.map((section, index) => {
                return (
                    <SectionWrapper className={section.type}>
                        <div
                            key={index}
                            onClick={(e) => {
                                let section_id = e.target.id
                                let sections = [0, 1, 2, 3]
                                let secionIndex = sections.indexOf(section_id)

                                sections.splice(secionIndex, 1)

                                let copiedData = [...sectionList]

                                for (let i = 0; i < sections.length; i++) {
                                    copiedData[sections[i]].toggle = false
                                }

                                let toggleStatus = copiedData[section_id].toggle
                                copiedData[section_id].toggle = !toggleStatus

                                setSectionList(copiedData)
                            }}
                            id={index}
                            className="section-header">
                            <p>{section.title}</p>
                        </div>
                        <div
                            style={{
                                display: section.toggle ? "block" : "none"
                            }}
                            className="section-content">
                            {section.content()}
                        </div>
                    </SectionWrapper>
                )
            })}
        </CheckoutWrapper>
    )
}


export { CheckoutComponent }


const SectionWrapper = styled.div`
    height: auto;

    .section-header {
        height: 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 10px;
        background-color: cyan;

        p {
            pointer-events: none;
        }
    }
`;

const CheckoutWrapper = styled.div`
    height: auto;
    width: 100%;
    display: grid;
    /* flex-direction: column; */
    grid-template-columns: 65% 35%;
    grid-template-rows: auto auto auto;
    grid-template-areas: 
        'products_list receipt'
        'location receipt'
        'payment receipt';

    @media only screen and (max-width: 768px) {
        grid-template-columns: 100%;
        grid-template-rows: auto auto auto auto;
        grid-template-areas: 
            "products_list"
            "location"
            "payment"
            "receipt";
    }

    .products_list {
        grid-area: products_list;
    }

    .location {
        grid-area: location;
    }

    .payment {
        grid-area: payment;
    }

    .receipt {
        grid-area: receipt;
    }
`;

const ReviewProductSection = styled.div`
    grid-area: pro_review;
    height: auto;
    width: 100%;
    background-color: aquamarine;
    padding: 5px;

    .cart-container {
        display: block;
        border-radius: 5px;
        width: 100%;
    }
`;

const LocationSection = styled.div`
    height: 100px;
    width: 100%;
`;

const PaymentSection = styled.div`
    height: 100px;
    width: 100%;
`;

const ReceiptSection = styled.div`
    height: 100px;
    width: 100%;
    background-color: royalblue;
`;