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
import SaleTable from "./table";
import { useSelector, useDispatch } from "react-redux";
import { sourceColors } from "../../../../../../../../assets/references";
import TrackingNumber from "./modal";

export default function SendoutCard({
  index,
  activeIndex,
  setActiveIndex,
  sale,
}) {
  const { token, onDuty, activeBranch } = useSelector(({ auth }) => auth),
    [visibility, setVisibility] = useState(false),
    [selectedPartner, setSelectedPartner] = useState("");

  const toggleShow = () => setActiveIndex(activeIndex === index ? 0 : index);
  const { source, category, subcon, customerId, deals } = sale;

  return (
    <MDBTypography
      note
      noteColor={subcon ? "warning" : "primary"}
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
          <span>
            {source.companyName}|{source.name}
          </span>
          <MDBBtn onClick={toggleShow} size="sm" className="shadow-0">
            <MDBIcon
              icon={`caret-${index === activeIndex ? "down" : "left"}`}
              color="white"
            />
          </MDBBtn>
        </span>
      </MDBContainer>
      <MDBCollapse show={index === activeIndex} className="px-4 mt-2">
        <SaleTable deals={deals || []} />
      </MDBCollapse>
      <TrackingNumber
        visibility={visibility}
        setVisibility={setVisibility}
        branchId={selectedPartner}
      />
    </MDBTypography>
  );
}
