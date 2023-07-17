import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import { nameFormatter } from "../../../../../../../../components/utilities";
import SaleTable from "./table";
import { sourceColors } from "../../../../../../../../assets/references";

export default function InhouseCard({
  index,
  activeIndex,
  setActiveIndex,
  sold,
}) {
  const toggleShow = () => setActiveIndex(activeIndex === index ? 0 : index);
  const { category, renderedBy, customerId, deals } = sold;
  return (
    <MDBTypography
      note
      noteColor={renderedBy ? "primary" : "warning"}
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
        <MDBBtn onClick={toggleShow} size="sm" className="shadow-0">
          <MDBIcon
            icon={`caret-${index === activeIndex ? "down" : "left"}`}
            color="white"
          />
        </MDBBtn>
      </MDBContainer>
      <MDBCollapse show={index === activeIndex} className="px-4 mt-2">
        <SaleTable deals={deals || []} />
      </MDBCollapse>
    </MDBTypography>
  );
}
