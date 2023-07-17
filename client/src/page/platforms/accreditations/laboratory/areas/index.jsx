import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import Parameters from "../parameters";
import { useSelector } from "react-redux";
import { sourceColors } from "../../../../../assets/references";

export default function ResultCard({
  index,
  activeIndex,
  setActiveIndex,
  area,
  showHandler,
}) {
  // const { token } = useSelector(({ auth }) => auth);

  const toggleShow = () => {
    if (activeIndex === index) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };

  const { description, title, parameters } = area;
  return (
    <MDBTypography note noteColor="primary" className="text-dark mb-2">
      <MDBContainer className="d-flex align-items-center justify-content-between">
        <span>
          <strong>{index + 1}.</strong>
          <span className="ms-2 me-3">{title}</span>
          <MDBBadge
            className="text-uppercase"
            color={sourceColors(description)}
          >
            {description}
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
        <Parameters parameters={parameters} showHandler={showHandler} />
      </MDBCollapse>
    </MDBTypography>
  );
}
