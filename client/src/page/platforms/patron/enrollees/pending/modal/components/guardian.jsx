import React from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBInputGroup,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import {
  getAge,
  nameFormatter,
  validateContactNumber,
} from "../../../../../../../components/utilities";

export default function Guardian({
  setActiveItem,
  link,
  setLink,
  information,
}) {
  const options = { year: "numeric", month: "long", day: "numeric" };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.parents = true;

    setLink(tabs);
    setActiveItem("parents");
  };

  return (
    <MDBContainer className="mt-4" style={{ height: "580px" }}>
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Full Name">
              <input
                className="form-control"
                value={nameFormatter(information.guardian?.fullName)}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Gender">
              <input
                className="form-control"
                value={information.guardian?.isMale ? "Male" : "Female"}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Age">
              <input
                className="form-control"
                value={getAge(information.guardian?.dob)}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>

        <MDBRow className="mt-3">
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Date of Birth">
              <input
                className="form-control"
                value={new Date(information.guardian?.dob).toLocaleDateString(
                  undefined,
                  options
                )}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Mobile">
              <input
                className="form-control"
                value={information.guardian?.mobile}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>

          <MDBCol md={4}>
            <MDBInputGroup textBefore="Relationship">
              <input
                className="form-control"
                value={information?.student?.guardian?.relationship}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-3">
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Region">
              <input
                className="form-control"
                value={information.guardian?.address?.region}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Province">
              <input
                className="form-control"
                value={information.guardian?.address?.province}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={4}>
            <MDBInputGroup textBefore="City">
              <input
                className="form-control"
                value={information.guardian?.address?.city}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-3">
          {" "}
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Barangay">
              <input
                className="form-control"
                value={information.guardian?.address?.barangay}
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
            onClick={() => setActiveItem("personnel")}
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
