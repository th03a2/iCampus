import {
  MDBContainer,
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import {
  getAge,
  nameFormatter,
} from "../../../../../../../components/utilities";

export default function Parents({ setActiveItem, link, setLink, information }) {
  const options = { year: "numeric", month: "long", day: "numeric" };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.siblings = true;

    setLink(tabs);
    setActiveItem("siblings");
  };

  return (
    <MDBContainer className="mt-4" style={{ height: "580px" }}>
      <form onSubmit={handleSubmit}>
        {information.father.fullName.fname?.length > 0 && (
          <>
            <h5 className="text-center">
              <strong>Father</strong>
            </h5>
            <MDBRow className="mt-3">
              <MDBCol md={4}>
                <MDBInputGroup textBefore="Full Name">
                  <input
                    className="form-control"
                    value={nameFormatter(information.father?.fullName)}
                    readOnly
                  />
                </MDBInputGroup>
              </MDBCol>
              <MDBCol md={4}>
                <MDBInputGroup textBefore="Gender">
                  <input
                    className="form-control"
                    value={information.father?.isMale ? "Male" : "Female"}
                    readOnly
                  />
                </MDBInputGroup>
              </MDBCol>
              <MDBCol md={4}>
                <MDBInputGroup textBefore="Age">
                  <input
                    className="form-control"
                    value={getAge(information.father?.dob)}
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
                    value={new Date(information.father?.dob).toLocaleDateString(
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
                    value={information.father?.mobile}
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
                    value={information.father?.address?.region}
                    readOnly
                  />
                </MDBInputGroup>
              </MDBCol>
              <MDBCol md={4}>
                <MDBInputGroup textBefore="Province">
                  <input
                    className="form-control"
                    value={information.father?.address?.province}
                    readOnly
                  />
                </MDBInputGroup>
              </MDBCol>
              <MDBCol md={4}>
                <MDBInputGroup textBefore="City">
                  <input
                    className="form-control"
                    value={information.father?.address?.city}
                    readOnly
                  />
                </MDBInputGroup>
              </MDBCol>
            </MDBRow>
          </>
        )}
        <h5 className="text-center mt-3">
          <strong>Mother</strong>
        </h5>
        <MDBRow className="mt-3">
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Full Name">
              <input
                className="form-control"
                value={nameFormatter(information.mother?.fullName)}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Gender">
              <input
                className="form-control"
                value={information.mother?.isMale ? "Male" : "Female"}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Age">
              <input
                className="form-control"
                value={getAge(information.mother?.dob)}
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
                value={new Date(information.mother?.dob).toLocaleDateString(
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
                value={information.mother?.mobile}
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
                value={information.mother?.address?.region}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={4}>
            <MDBInputGroup textBefore="Province">
              <input
                className="form-control"
                value={information.mother?.address?.province}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={4}>
            <MDBInputGroup textBefore="City">
              <input
                className="form-control"
                value={information.mother?.address?.city}
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
    </MDBContainer>
  );
}
