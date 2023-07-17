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
import { browse, save } from "../../../../../../../../redux/sqlbuilder";
import { sourceColors } from "../../../../../../../../assets/references";
import Swal from "sweetalert2";
import TrackingNumber from "./modal";

export default function ResultCard({
  index,
  activeIndex,
  setActiveIndex,
  sale,
}) {
  const { auth, token, onDuty, activeBranch } = useSelector(
      ({ auth }) => auth
    ),
    [doctors, setDoctors] = useState([]),
    [visibility, setVisibility] = useState(false),
    [selectedPartner, setSelectedPartner] = useState(""),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id) {
      const handleDoctors = async () =>
        setDoctors(
          await browse(`branches/${onDuty._id}/doctors`, "", token)
        );

      handleDoctors();
    }
  }, [onDuty, token]);

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

  const { source, subcon, customerId, services } = sale;
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
          <MDBBadge className="text-uppercase" color={sourceColors(source)}>
            {source}
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
        <SaleTable deals={services || []} />
        {!subcon && (
          <div className="d-flex justify-content-end">
            <MDBBtn color="danger" onClick={generateRequest}>
              Generate Tracking Number
            </MDBBtn>
          </div>
        )}
      </MDBCollapse>
      <TrackingNumber
        visibility={visibility}
        setVisibility={setVisibility}
        branchId={selectedPartner}
      />
    </MDBTypography>
  );
}
