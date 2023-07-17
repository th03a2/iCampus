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
// import { Services } from "../../../../../../../../fakeDb";
import { useSelector, useDispatch } from "react-redux";
import { browse } from "../../../../../../../../redux/sqlbuilder";
// import { UPDATE } from "../../../../../../../../redux/slices/commerce/sales";
import { sourceColors } from "../../../../../../../../assets/references";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { toast } from "react-toastify";

export default function ResultCard({
  index,
  activeIndex,
  setActiveIndex,
  sale,
}) {
  const { auth, token, onDuty } = useSelector(({ auth }) => auth),
    [doctors, setDoctors] = useState([]),
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

  const receiveSpecimen = () => {
    alert("receive");
  };

  const { source, hasArrived, customerId, _id, physicianId, services } = sale;
  return (
    <MDBTypography
      note
      noteColor={hasArrived ? "primary" : "warning"}
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
        {!hasArrived && (
          <div className="d-flex justify-content-end">
            <MDBBtn color="info" onClick={receiveSpecimen}>
              Receive Specimen (Task)
            </MDBBtn>
          </div>
        )}
      </MDBCollapse>
    </MDBTypography>
  );
}
