import React from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";

export default function Address({ setActiveItem, setForm, form }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...form.tabs };

    tabs.credentials = true;

    setForm({
      ...form,
      tabs,
    });
    setActiveItem("credentials");
  };

  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="Region"
              value={form.address?.region}
              onChange={(e) => {
                const address = { ...form.address };
                address.region = e.target.value;

                setForm({
                  ...form,
                  address,
                });
              }}
              required
              autoFocus
            />
          </MDBCol>
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="Province"
              value={form.address?.province}
              onChange={(e) => {
                const address = { ...form.address };
                address.province = e.target.value;

                setForm({
                  ...form,
                  address,
                });
              }}
              required
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="City/Municipality"
              value={form.address?.city}
              onChange={(e) => {
                const address = { ...form.address };
                address.city = e.target.value;

                setForm({
                  ...form,
                  address,
                });
              }}
              required
            />
          </MDBCol>
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="Barangay"
              value={form.address?.barangay}
              onChange={(e) => {
                const address = { ...form.address };
                address.barangay = e.target.value;

                setForm({
                  ...form,
                  address,
                });
              }}
              required
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol md={12}>
            <MDBTextArea
              label="Street (Optional)"
              value={form.address?.street}
              onChange={(e) => {
                const address = { ...form.address };
                address.street = e.target.value;

                setForm({
                  ...form,
                  address,
                });
              }}
            />
          </MDBCol>
        </MDBRow>

        <div className="d-flex justify-content-between">
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
