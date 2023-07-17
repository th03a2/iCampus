import React, { useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import { nameFormatter } from "../../../../../../../../components/utilities";
import SendoutTable from "./table";
import { useSelector } from "react-redux";
import { sourceColors } from "../../../../../../../../assets/references";
import Swal from "sweetalert2";
import TrackingNumber from "./modal";

export default function SendoutCard({
  sold,
  index,
  activeIndex,
  setActiveIndex,
}) {
  const { activeBranch } = useSelector(({ auth }) => auth),
    [visibility, setVisibility] = useState(false),
    [selectedPartner, setSelectedPartner] = useState("");

  const toggleShow = () => {
    if (activeIndex === index) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };

  const generateRequest = async () => {
    var inputOptions = {};

    activeBranch.tieup.map(
      (_branch) =>
        (inputOptions[_branch._id] = `${_branch.companyName} / ${_branch.name}`)
    );

    const { value: partner } = await Swal.fire({
      title: "Select a Partner",
      input: "select",
      inputOptions,
      showCancelButton: true,
    });

    if (partner) {
      setSelectedPartner(partner);
      setVisibility(true);
    }
  };

  const { source, category, subcon, customerId, deals } = sold;

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
        <SendoutTable deals={deals || []} />
      </MDBCollapse>
      <TrackingNumber
        visibility={visibility}
        setVisibility={setVisibility}
        branchId={selectedPartner}
      />
    </MDBTypography>
  );
}
