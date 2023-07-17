import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInputGroup,
  MDBRow,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import "./index.css";

const BreadCrumbMonthly = () => {
  const { theme, onDuty } = useSelector((state) => state.auth);

  return (
    <MDBContainer
      fluid
      style={{ width: "90%" }}
      className={`custom-sticky-bread transition-all ${theme.skin} font-poppins`}
    >
      <MDBRow>
        <MDBCol md={3} size={2}>
          Services Statistics
        </MDBCol>
        <MDBCol md={6} size={7} className="d-flex align-items-center">
          <MDBInputGroup
            textBefore="Month"
            style={{ width: "175px" }}
            className="me-3"
          >
            <select className="form-control">
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
            </select>
          </MDBInputGroup>
          <MDBInputGroup
            textBefore="Year"
            style={{ width: "150px" }}
            className="ms-3"
          >
            <select className="form-control">
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
            </select>
          </MDBInputGroup>
        </MDBCol>
        <MDBCol size={2} className="text-end">
          <MDBBtn>
            <MDBIcon icon="print" className="me-2" /> print
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default BreadCrumbMonthly;
