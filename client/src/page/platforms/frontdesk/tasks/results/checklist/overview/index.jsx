import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import { nameFormatter } from "../../../../../../../components/utilities";
import { sourceColors } from "../../../../../../../assets/references";
import CollapseTable from "./deals";

export default function Overview({
  key,
  index,
  activeIndex,
  setActiveIndex,
  sale,
}) {
  const toggleShow = () => setActiveIndex(activeIndex === index ? 0 : index);
  const { source, customerId, category } = sale;

  return (
    <MDBTypography
      key={key}
      note
      noteColor={sale.hasResult ? "primary" : "warning"}
      className="text-dark mb-2"
    >
      <MDBContainer className="d-flex align-items-center justify-content-between">
        <span>
          <strong>{index}.</strong>
          <span className="ms-2 me-3">
            <span className="ms-2 me-3">
              {nameFormatter(customerId?.fullName, false)}
            </span>
            <MDBBadge className="text-uppercase" color={sourceColors(category)}>
              {category}
            </MDBBadge>
          </span>
          {source && (
            <MDBBadge
              className="text-uppercase"
              color={"warning"}
              title={`${source?.name} | ${"subcon"}`}
            >
              {source?.companyName}
            </MDBBadge>
          )}
        </span>
        <MDBBtn onClick={toggleShow} size="sm" className="shadow-0">
          <MDBIcon
            icon={`caret-${index === activeIndex ? "down" : "left"}`}
            color="white"
          />
        </MDBBtn>
      </MDBContainer>
      <MDBCollapse show={index === activeIndex} className="px-4 mt-2">
        <CollapseTable sale={sale} />
      </MDBCollapse>
    </MDBTypography>
  );
}
