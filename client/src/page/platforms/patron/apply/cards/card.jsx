import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardSubTitle,
  MDBCardTitle,
  MDBCol,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { ENDPOINT, PresetUser } from "../../../../../components/utilities";
import ApplicationModal from "./modal";

export default function CompanyCard({ company }) {
  const { theme } = useSelector(({ auth }) => auth),
    [visibility, setVisibility] = useState(false),
    [didHover, setDidHover] = useState(false);

  return (
    <MDBCol size={4} className="mb-4">
      <MDBCard
        onMouseOver={() => setDidHover(true)}
        onMouseOut={() => setDidHover(false)}
        onClick={() => setVisibility(true)}
        className={`h-100 cursor-pointer ${theme.bg} ${theme.text} shadow-${
          didHover ? 5 : 1
        }`}
      >
        <MDBCardBody className="text-center">
          <MDBCardImage
            src={`${ENDPOINT}/public/credentials/${company?.name}/logo.jpg`}
            className="mb-3 img-thumbnail bg-transparent"
            style={{ height: 200, width: "auto" }}
            onError={(e) => (e.target.src = PresetUser)}
          />
          <MDBCardTitle>{company?.name}</MDBCardTitle>
          <MDBCardSubTitle>{company.subName}</MDBCardSubTitle>
        </MDBCardBody>
      </MDBCard>
      <ApplicationModal
        company={company}
        visibility={visibility}
        setVisibility={setVisibility}
      />
    </MDBCol>
  );
}
