import React, { useState, useEffect } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import { nameFormatter } from "../../../../../../../../components/utilities";
import SubconTable from "./table";
import { sourceColors } from "../../../../../../../../assets/references";
import { currencyFormatter } from "../../../../../../../../components/utilities";
// import Swal from "sweetalert2";
// import { toast } from "react-toastify";

export default function ResultCard({
  index,
  sale,
  activeIndex,
  setActiveIndex,
}) {
  const toggleShow = () => {
    if (activeIndex === index) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };

  const receiveSpecimen = () => {
    alert("receive");
  };

  const { category, hasArrived, customerId, deals, amount } = sale;
  return (
    <MDBTypography
      note
      noteColor={hasArrived ? "primary" : "warning"}
      className="text-dark mb-2"
    >
      <MDBContainer className="d-flex align-items-center justify-content-between">
        <span>
          <strong>{index}.</strong>
          <span className="ms-2 me-3">
            {nameFormatter(customerId?.fullName, false)}
          </span>
          <MDBBadge className="text-uppercase" color={sourceColors(category)}>
            {category}
          </MDBBadge>
        </span>
        <span>
          {currencyFormatter(amount)}
          <MDBBtn onClick={toggleShow} size="sm" className="shadow-0">
            <MDBIcon
              icon={`caret-${index === activeIndex ? "down" : "left"}`}
              color="white"
            />
          </MDBBtn>
        </span>
      </MDBContainer>
      <MDBCollapse show={index === activeIndex} className="px-4 mt-2">
        <SubconTable deals={deals || []} />
        {!hasArrived && (
          <div className="d-flex justify-content-end">
            <MDBBtn color="info" onClick={receiveSpecimen}>
              Receive Specimen (Task)
            </MDBBtn>
          </div>
        )}
      </MDBCollapse>
    </MDBTypography>
  );
}
