import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import BreadCrumb from "../../../../../components/breadcrumb";

const path = [
  {
    path: "Objectives",
  },
];

export function Manpower() {
  const { token, maxPage, onDuty, theme } = useSelector(({ auth }) => auth),
    [visibility, setVisibility] = useState(false);

  return (
    <>
      <BreadCrumb
        title="Manpower"
        tooltip="Upload new"
        button={true}
        paths={path}
        handler={() => setVisibility(!visibility)}
      />
      <MDBContainer className="py-5 mt-4"></MDBContainer>
    </>
  );
}
