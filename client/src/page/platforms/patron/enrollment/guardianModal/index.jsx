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
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { validateContactNumber } from "../../../../../components/utilities";
export default function GuardianModal({
  setVisibility,
  visibility,
  setGuardian,
  guardian,
}) {
  return (
    <>
      <MDBModal show={visibility} setShow={setVisibility} tabIndex="-1">
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Guardian</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setVisibility(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="First Name">
                    <input
                      type="text"
                      className="form-control"
                      value={guardian.fullName?.fname}
                      onChange={(e) =>
                        setGuardian({
                          ...guardian,
                          fullName: {
                            ...guardian.fullName,
                            fname: e.target.value,
                          },
                        })
                      }
                      required
                    />
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Middle Name(Optional)">
                    <input
                      type="text"
                      className="form-control"
                      value={guardian.fullName?.mname}
                      onChange={(e) =>
                        setGuardian({
                          ...guardian,
                          fullName: {
                            ...guardian.fullName,
                            mname: e.target.value,
                          },
                        })
                      }
                    />
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Last Name">
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={guardian.fullName.lname}
                      onChange={(e) =>
                        setGuardian({
                          ...guardian,
                          fullName: {
                            ...guardian.fullName,
                            lname: e.target.value,
                          },
                        })
                      }
                    />
                  </MDBInputGroup>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4">
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Suffix(Optional)">
                    <select
                      className="form-control"
                      value={guardian.fullName?.suffix}
                      onChange={(e) =>
                        setGuardian({
                          ...guardian,
                          fullName: {
                            ...guardian.fullName,
                            suffix: e.target.value,
                          },
                        })
                      }
                    >
                      <option value={""}></option>
                      <option value="JR">JR</option>
                      <option value="SR">SR</option>
                      <option value="III">III</option>
                      <option value="IV">IV</option>
                      <option value="V">V</option>
                    </select>
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Date of Birth">
                    <input
                      type="date"
                      className="form-control"
                      required
                      value={guardian.dob}
                      onChange={(e) =>
                        setGuardian({ ...guardian, dob: e.target.value })
                      }
                    />
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Gender">
                    <select
                      className="form-control"
                      value={guardian.isMale}
                      required
                      onChange={(e) =>
                        setGuardian({ ...guardian, isMale: e.target.value })
                      }
                    >
                      <option value={""}></option>
                      <option value={true}>Male</option>
                      <option value={false}>Female</option>
                    </select>
                  </MDBInputGroup>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4">
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Mobile(Optional)">
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={guardian.phone}
                      onChange={(e) =>
                        setGuardian({
                          ...guardian,
                          mobile: e.target.value,
                        })
                      }
                      onKeyDown={validateContactNumber}
                      maxLength={10}
                    />
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Relationship">
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={guardian.relationship}
                      onChange={(e) =>
                        setGuardian({
                          ...guardian,
                          relationship: e.target.value,
                        })
                      }
                    />
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Occupation">
                    <input
                      className="form-control"
                      type="text"
                      required
                      value={guardian.occupation}
                      onChange={(e) =>
                        setGuardian({ ...guardian, occupation: e.target.value })
                      }
                    />
                  </MDBInputGroup>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setVisibility(false)}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
