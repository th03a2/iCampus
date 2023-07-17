import React from "react";
import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBTypography,
  MDBBtn,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import Body from "./card";
import { SETMODEL } from "../../../../../redux/slices/commerce/menus";
import { currencyFormatter } from "../../../../../components/utilities";
export function Cluster({ menu, index, activeIndex, setActiveIndex, page }) {
  const { name, abbreviation, opd } = menu,
    toggleShow = () => setActiveIndex(activeIndex === index ? 0 : index),
    dispatch = useDispatch();

  return (
    <MDBTypography note className="text-dark mb-2">
      <MDBContainer className="d-flex  justify-content-between">
        <MDBCardGroup>
          <strong>{(page - 1) * 6 + index}.</strong>
          <span className="ms-2 me-3">
            {name}|{abbreviation}
          </span>
          <MDBBtn
            onClick={() => dispatch(SETMODEL(menu))}
            size="sm"
            className="shadow-0 ms-3"
          >
            <MDBIcon icon="pen" color="white" />
          </MDBBtn>
        </MDBCardGroup>

        <MDBCardGroup>
          <span> {currencyFormatter(opd)}</span>
          <MDBBtn onClick={toggleShow} size="sm" className="shadow-0 ms-3">
            <MDBIcon
              icon={`caret-${index === activeIndex ? "down" : "left"}`}
              color="white"
            />
          </MDBBtn>
        </MDBCardGroup>
      </MDBContainer>
      <MDBCollapse show={index === activeIndex} className="px-4 mt-2">
        <Body menu={menu} />
      </MDBCollapse>
    </MDBTypography>
  );
}
