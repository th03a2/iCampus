import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { validateContactNumber } from "../../../../../../components/utilities";
import { useSelector } from "react-redux";
import { nameFormatter } from "../../../../../../components/utilities";

export default function Personnel({
  setForm,
  form,
  setActiveItem,
  link,
  setLink,
}) {
  const { auth } = useSelector(({ auth }) => auth);

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
            <MDBInputGroup textBefore="First Name">
              <input
                type="text"
                value={nameFormatter(auth.fullName)}
                readOnly
                className="form-control"
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Gender">
              <input
                type="text"
                className="form-control"
                value={auth.isMale ? "Male" : "Female"}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Date of Birth">
              <input
                className="form-control"
                type="text"
                value={auth.dob}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Address">
              <input
                type="text"
                className="form-control"
                value={addressFormatter(auth.address)}
                readOnly
              />
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Email">
              <input value={auth.email} className="form-control" readOnly />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Mobile (+63)">
              <input
                value={form.phone}
                className="form-control"
                required
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                onKeyDown={validateContactNumber}
                maxLength={10}
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
