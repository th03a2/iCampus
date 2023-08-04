import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { nameFormatter, getAge } from "../../../../../../components/utilities";
import { useState } from "react";
import FatherModal from "../../fatherModal";

export default function Parents({
  parents,
  setParents,
  hasFather,
  setActiveItem,
  link,
  setLink,
  fatherSubmitted,
  setFatherSubmitted,
}) {
  const [visibility, setVisibility] = useState(false);
  const options = { year: "numeric", month: "long", day: "numeric" };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.siblings = true;

    setLink(tabs);
    setActiveItem("siblings");
  };

  const handleSearch = (gender) => {
    setVisibility(true);
  };

  return (
    <MDBContainer className="mt-4" style={{ height: "580px" }}>
      <form onSubmit={handleSubmit}>
        {!hasFather && (
          <MDBRow>
            <div className="d-flex justify-content-center">
              <MDBCol md={6} className="mb-5 mb-md-0 ">
                <MDBInputGroup textBefore="Father">
                  <input
                    type="text"
                    name="father"
                    className="form-control"
                    onClick={() => handleSearch(true)}
                  />
                </MDBInputGroup>
              </MDBCol>
            </div>
          </MDBRow>
        )}
        {hasFather || fatherSubmitted ? (
          <>
            <h5 className="mt-5 text-center">
              <strong>Father</strong>
            </h5>
            <MDBRow className="mt-2">
              <MDBCol md={4}>
                <MDBInputGroup textBefore="Full Name">
                  <input
                    type="text"
                    value={nameFormatter(parents.father.fullName)}
                    className="form-control"
                    readOnly
                  />
                </MDBInputGroup>
              </MDBCol>
              <MDBCol md={4}>
                <MDBInputGroup textBefore="Age">
                  <input
                    type="text"
                    value={getAge(parents.father.dob)}
                    className="form-control"
                    readOnly
                  />
                </MDBInputGroup>
              </MDBCol>{" "}
              <MDBCol md={4}>
                <MDBInputGroup textBefore="Date of Birth">
                  <input
                    className="form-control"
                    readOnly
                    value={new Date(parents.father.dob).toLocaleDateString(
                      undefined,
                      options
                    )}
                  />
                </MDBInputGroup>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mt-3">
              <MDBCol md={4}>
                <MDBInputGroup textBefore="Mobile">
                  <input
                    type="text"
                    value={parents.father?.mobile}
                    className="form-control"
                    readOnly
                  />
                </MDBInputGroup>
              </MDBCol>
              <MDBCol md={4}>
                <MDBInputGroup textBefore="Region">
                  <input
                    type="text"
                    value={parents.father?.address?.region}
                    className="form-control"
                    readOnly
                  />
                </MDBInputGroup>
              </MDBCol>
              <MDBCol md={4}>
                <MDBInputGroup textBefore="Province">
                  <input
                    type="text"
                    value={parents.father.address.province}
                    className="form-control"
                    readOnly
                  />
                </MDBInputGroup>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mt-3">
              <MDBCol md={4}>
                <MDBInputGroup textBefore="City">
                  <input
                    type="text"
                    value={parents.father?.address.city}
                    className="form-control"
                    readOnly
                  />
                </MDBInputGroup>
              </MDBCol>{" "}
              <MDBCol md={4}>
                <MDBInputGroup textBefore="Barangay">
                  <input
                    type="text"
                    value={parents.father?.address.barangay}
                    className="form-control"
                    readOnly
                  />
                </MDBInputGroup>
              </MDBCol>{" "}
            </MDBRow>
          </>
        ) : (
          ""
        )}
        <h5 className="mt-5 text-center">
          <strong>Mother</strong>
        </h5>
        <MDBRow className="mt-2">
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Full Name">
              <input
                type="text"
                value={nameFormatter(parents.mother?.fullName)}
                className="form-control"
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Age">
              <input
                type="text"
                value={getAge(parents.mother?.dob)}
                className="form-control"
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>{" "}
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Date of Birth">
              <input
                className="form-control"
                readOnly
                value={new Date(parents.mother?.dob).toLocaleDateString(
                  undefined,
                  options
                )}
              />
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-3">
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Mobile">
              <input
                type="text"
                value={parents.mother?.mobile}
                className="form-control"
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Region">
              <input
                type="text"
                value={parents.mother?.address?.region}
                className="form-control"
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Province">
              <input
                type="text"
                value={parents.mother?.address.province}
                className="form-control"
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-3">
          <MDBCol md={4}>
            <MDBInputGroup textBefore="City">
              <input
                type="text"
                value={parents.mother?.address.city}
                className="form-control"
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Barangay">
              <input
                type="text"
                value={parents.mother?.address.barangay}
                className="form-control"
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>{" "}
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
            onClick={() => setActiveItem("guardian")}
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
        <FatherModal
          visibility={visibility}
          setVisibility={setVisibility}
          parents={parents}
          setParents={setParents}
          setFatherSubmitted={setFatherSubmitted}
        />
      )}
    </MDBContainer>
  );
}
