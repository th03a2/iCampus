import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { nameFormatter } from "../../../../../../../components/utilities";

export default function Personnel({
  information,
  setActiveItem,
  link,
  setLink,
}) {
  const options = { year: "numeric", month: "long", day: "numeric" };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.guardian = true;

    setLink(tabs);
    setActiveItem("guardian");
  };

  const addressFormatter = (address) => {
    if (typeof address === "object") {
      const { province, city, barangay, street } = address;

      return `${barangay},${street},${city},${province}`;
    }
  };
  return (
    <MDBContainer className="mt-4" style={{ height: "580px" }}>
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Full Name">
              <input
                type="text"
                className="form-control"
                value={nameFormatter(information.student?.fullName)}
                readOnly
                autoFocus
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Gender">
              <input
                type="text"
                className="form-control"
                value={information.student?.isMale ? "Male" : "Female"}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Date of Birth">
              <input
                type="text"
                value={new Date(information.student?.dob).toLocaleDateString(
                  undefined,
                  options
                )}
                readOnly
                className="form-control"
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Address">
              <input
                type="text"
                className="form-control"
                value={addressFormatter(information.student?.address)}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Email">
              <input
                type="text"
                className="form-control"
                value={information.student?.email}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Mobile">
              <input
                type="text"
                className="form-control"
                value={information.student?.mobile}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "absolute",
            bottom: "35px",
            left: "120px",
            right: "120px",
          }}
        >
          <MDBBtn
            onClick={() => setActiveItem("basic")}
            type="button"
            color="warning"
            className="shadow-0"
          >
            Previous
          </MDBBtn>
          <MDBBtn type="submit">Next</MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
}
