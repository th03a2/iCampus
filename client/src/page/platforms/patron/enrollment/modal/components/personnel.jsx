import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
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
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="First name"
              value={nameFormatter(auth.fullName)}
              readOnly
              autoFocus
            />
          </MDBCol>
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="Gender"
              value={auth.isMale ? "Male" : "Female"}
              readOnly
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="Date Of Birth"
              value={auth.dob}
              readOnly
            />
          </MDBCol>
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="Place Of Birth"
              value={addressFormatter(auth.address)}
              readOnly
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="Mobile (+63) "
              value={form.phone}
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
          </MDBCol>
        </MDBRow>
        <div className="d-flex justify-content-between my-4">
          <MDBBtn
            onClick={() => setActiveItem("basic")}
            type="button"
            color="light"
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
