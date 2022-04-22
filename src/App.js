/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Components
// import cart from "../src_v1/components/cart";
import { ProductsComponent } from "components";

import {
  HomePage,
  CartComponent,
  HeaderComponent,
  CustomizeComponent,
  ProductGroupComponent
} from "components";
import HardSet from "redux-persist/lib/stateReconciler/hardSet";


const App = (props) => {
  const router = () => {
    return (
      <AnimatePresence>
        <Switch>
          {/* How to set default index page */}
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/home/" />
            }}
          />
          <Route exact path="/test/" component={ProductsComponent} />
          <Route exact path="/pizza/checkout/" />
          <Route exact path="/home/" component={HomePage} />
          <Route exact path="/menu/" component={ProductGroupComponent} />
          <Route exact path="/menu/:productGroup/:productType/" component={ProductsComponent} />
          <Route exact path="/menu/:productGroup/:productType/:productName/" component={CustomizeComponent} />
        </Switch>
      </AnimatePresence>
    )
  }

  return (
    <AppSection className="App">
      {/* <Header /> */}
      <HeaderComponent />
      <Body>
        {router()}
      </Body>
      <CartComponent />
    </AppSection>

  )
}

export default App


const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  
  @media only screen and (max-width: 1050px) {
    width: 100%;
  }
`;

const AppSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
      -webkit-text-fill-color: rgb(235,235,235);
      box-shadow: 0 0 0px 50px rgba(28,28,28,1) inset;
      transition: background-color 5000s ease-in-out 0s;
  }

  input:-webkit-autofill {
    background-color: transparent !important;
  }
`;
