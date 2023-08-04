import React, { useState } from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInputGroup,
  MDBRow,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

import GuardianModal from "../../guardianModal";
import { getAge, nameFormatter } from "../../../../../../components/utilities";
export default function Guardian({
  setActiveItem,
  setGuardian,
  guardian,
  link,
  setLink,
  hasGuardian,
  setNoSubmitted,
  noSubmitted,
  hasFather,
  parents,
}) {
  const { auth } = useSelector(({ auth }) => auth);
  const [visibility, setVisibility] = useState(false);
  const options = { year: "numeric", month: "long", day: "numeric" };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.parents = true;

    setLink(tabs);
    setActiveItem("parents");
  };
  const handleChange = (event) => {
    const value = event.target.value;

    switch (value) {
      case "father":
        const father = { ...parents.father };
        const id = father._id;
        const _father = { ...father, id };
        setGuardian(_father);
        setNoSubmitted(false);
        break;
      case "mother":
        const mother = { ...parents.mother };
        const _id = mother._id;
        const _mother = { ...mother, id: _id };
        setGuardian(_mother);
        setNoSubmitted(false);
        break;
      case "others":
        setVisibility(true);
        break;

      default:
        console.log("error");
        break;
    }
  };
  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <MDBContainer style={{ height: "580px" }}>
          <MDBRow>
            <div className="d-flex justify-content-center">
              <MDBCol md={8}>
                <MDBInputGroup
                  textBefore={
                    hasGuardian
                      ? "Do you want change your guardian?"
                      : "Guardian"
                  }
                >
                  <select
                    className="form-control"
                    onChange={handleChange}
                    required
                  >
                    <option
                      value={hasGuardian || noSubmitted === false ? "done" : ""}
                    ></option>
                    {hasFather && <option value={"father"}>Father</option>}
                    <option value="mother">Mother</option>
                    <option value={"others"}>Others</option>
                  </select>
                </MDBInputGroup>
              </MDBCol>
            </div>
          </MDBRow>
          {hasGuardian || noSubmitted === false ? (
            <>
              <MDBRow className="mt-5">
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Full name">
                    <input
                      className="form-control"
                      readOnly
                      value={nameFormatter(guardian.fullName)}
                    />
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Age">
                    <input
                      className="form-control"
                      readOnly
                      value={getAge(guardian.dob)}
                    />
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Gender">
                    <input
                      className="form-control"
                      readOnly
                      value={guardian.isMale ? "Male" : "Female"}
                    />
                  </MDBInputGroup>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-3">
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Date of Birth">
                    <input
                      className="form-control"
                      readOnly
                      value={new Date(guardian.dob).toLocaleDateString(
                        undefined,
                        options
                      )}
                    />
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Mobile">
                    <input
                      className="form-control"
                      readOnly
                      value={guardian.mobile}
                    />
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Relationship">
                    <input
                      className="form-control"
                      readOnly
                      value={
                        guardian.relationship === ""
                          ? auth.guardian.relationship
                          : guardian.relationship
                      }
                    />
                  </MDBInputGroup>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-3">
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Region">
                    <input
                      type="text"
                      className="form-control"
                      value={guardian.address?.region}
                      readOnly
                    />
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Province">
                    <input
                      type="text"
                      className="form-control"
                      value={guardian.address?.province}
                      readOnly
                    />
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="City">
                    <input
                      type="text"
                      className="form-control"
                      value={guardian.address?.city}
                      readOnly
                    />
                  </MDBInputGroup>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4">
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Baranggay">
                    <input
                      type="text"
                      className="form-control"
                      value={guardian.address?.barangay}
                      readOnly
                    />
                  </MDBInputGroup>
                </MDBCol>
              </MDBRow>
            </>
          ) : (
            ""
          )}
        </MDBContainer>
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
      {visibility && (
        <GuardianModal
          setNoSubmitted={setNoSubmitted}
          setVisibility={setVisibility}
          visibility={visibility}
          guardian={guardian}
          setGuardian={setGuardian}
        />
      )}
    </MDBContainer>
  );
}
