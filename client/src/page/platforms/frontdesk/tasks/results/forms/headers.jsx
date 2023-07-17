import React from "react";
import {
  MDBModalHeader,
  MDBModalTitle,
  MDBBtn,
  MDBBadge,
} from "mdb-react-ui-kit";
import {
  nameFormatter,
  getAge,
  getDevelopment,
} from "../../../../../../components/utilities";
import { SETVisibility } from "../../../../../../redux/slices/task/forms";
import { useDispatch, useSelector } from "react-redux";
import { sourceColors } from "../../../../../../assets/references";

export default function Index() {
  const { patron, category } = useSelector(({ task }) => task),
    dispatch = useDispatch();

  return (
    <MDBModalHeader>
      <MDBModalTitle>
        <u style={{ fontSize: "large" }}>
          {nameFormatter(patron?.fullName, false)}
        </u>
        <span
          className="mt-0 text-100"
          style={{
            fontSize: "small",
            color: "blue",
            fontStyle: "italic",
          }}
        >
          {patron?.isMale ? "Male" : "Female"} | {getAge(patron?.dob)} |
          Development: {getDevelopment(patron?.dob)}
        </span>
        <MDBBadge color={sourceColors(category)}>{category}</MDBBadge>
      </MDBModalTitle>
      <MDBBtn
        className="btn-close"
        color="none"
        onClick={() => dispatch(SETVisibility(false))}
      />
    </MDBModalHeader>
  );
}
