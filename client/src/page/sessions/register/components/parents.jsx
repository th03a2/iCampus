import React, { useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import Modal from "../modal";
export default function Parents({ setForm, form, setActiveItem }) {
  const [navigate, setNavigate] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...form.tabs };

    tabs.address = true;

    setForm({
      ...form,
      tabs,
    });
    setActiveItem("address");
  };

  const handleSearch = () => {
    setNavigate(true);
  };

  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md={6}>
            <MDBBtn type="button" onClick={handleSearch}>
              Search
            </MDBBtn>
          </MDBCol>
        </MDBRow>

        <div className="text-end">
          <MDBBtn type="submit">Next</MDBBtn>
        </div>
      </form>
      {navigate && <Modal navigate={navigate} setNavigate={setNavigate} />}
    </MDBContainer>
  );
}
