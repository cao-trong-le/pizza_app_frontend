/* eslint-disable no-unused-vars */
/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { MultiFuncComponent } from "../multi_functions";

const BaseComponent = (props) => {
    // create later

    // fetch base data
    return (
        <React.Fragment>
            <MultiFuncComponent link={"http://127.0.0.1:8000/product/base/all/"} />
        </React.Fragment>
    )
}

export { BaseComponent }




