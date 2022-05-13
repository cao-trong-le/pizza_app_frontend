/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Redirect, matchPath } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Components
// import cart from "../src_v1/components/cart";
import { CheckoutComponent, ProductsComponent } from "components";

import {
  HomePage,
  CartComponent,
  HeaderComponent,
  CustomizeComponent,
  ProductGroupComponent
} from "components";

import HardSet from "redux-persist/lib/stateReconciler/hardSet";

import {
  BaseFormComponent,
  LoginFormComponent,
  RegisterFormComponent,
  ProductFormComponent
} from "components";

import { BaseComponent } from "components";

const App = (props) => {
  const [cartStatus, setCartStatus] = useState(true)

  useEffect(() => {
    const currentURL = window.location.href
    if (checkSimilarityOfUrl(currentURL)) {
      setCartStatus(false)
    } else {
      setCartStatus(true)
    }
  }, [])

  const checkSimilarityOfUrl = (url) => {
    let urlPaths = url.split("/")
    let unnessPos = ['http:', 'localhost:3000']

    for (let i = 0; i < unnessPos.length; i++) {
      let idx = urlPaths.indexOf(unnessPos[i])
      urlPaths.splice(idx, 1)
    }

    const match = matchPath(urlPaths.join("/"), {
      path: [
        "/login/",
        "/checkout/",
        "/register/",
        "/new/base/",
        "/new/product/",
        "/view/base/"
      ],
      exact: true,
      strict: false
    })

    return match ? true : false
  }


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

          <Route exact path="/login/" component={LoginFormComponent} />
          <Route exact path="/register/" component={RegisterFormComponent} />
          <Route exact path="/new/product/" component={ProductFormComponent} />
          <Route exact path="/new/base/" component={BaseFormComponent} />
          <Route exact path="/view/base/" component={BaseComponent} />

          <Route exact path="/checkout/" component={CheckoutComponent} />
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
      {cartStatus && <CartComponent />}
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
      -webkit-text-fill-color: rgb(0, 0, 0);
      box-shadow: 0 0 0px 50px rgba(235, 232, 232, 0) inset;
      transition: background-color 5000s ease-in-out 0s;
  }

  input:-webkit-autofill {
    background-color: transparent !important;
  }
`;
