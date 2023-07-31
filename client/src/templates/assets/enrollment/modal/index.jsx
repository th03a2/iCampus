import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBInputGroup,
} from "mdb-react-ui-kit";

export default function Modal({ visibility, setVisibility, schoolInfo }) {
  const addressFormatter = (address) => {
    if (typeof address === "object") {
      const { street, barangay, city, province, region } = address;

      return `${street}, ${barangay}, ${city}, ${province}`;
    }
  };
  return (
    <>
      <MDBModal show={visibility} setShow={setVisibility} tabIndex="-1">
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Information</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setVisibility(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow>
                <MDBCol md={4}>
                  <MDBInput
                    type="text"
                    value={schoolInfo.name}
                    readOnly
                    label="Name"
                  />
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInput
                    type="text"
                    value={schoolInfo.acronym}
                    readOnly
                    label="Accronym"
                  />
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInput
                    type="text"
                    value={schoolInfo.schoolId}
                    readOnly
                    label="School Id"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-3">
                <MDBCol md={6}>
                  <MDBInput
                    readOnly
                    label="Address"
                    value={addressFormatter(schoolInfo.address)}
                  ></MDBInput>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setVisibility(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
