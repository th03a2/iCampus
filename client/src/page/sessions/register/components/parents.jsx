import React, { useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { ModalSearchUsers } from "../../../../templates/assets";
import { useSelector } from "react-redux";
import { properNameFormatter } from "../../../../components/utilities";

export default function Parents({ setForm, form, setActiveItem }) {
  const { catalogs } = useSelector(({ users }) => users),
    [look, setLook] = useState(false),
    [gender, setGender] = useState(true);

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

  const handleParents = (user, isMale) => {
    if (isMale) {
      // setFather(user);
      setForm((prev) => ({ ...prev, father: user }));
    } else {
      setForm((prev) => ({ ...prev, mother: user }));
    }
  };

  const handleSearch = (gender) => {
    setGender(gender);
    setLook(true);
  };
  console.log(catalogs);
  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <MDBCol md={12} className="mb-5 mb-md-0 ">
          <MDBInputGroup textBefore="Father">
            <input
              type="text"
              className="form-control"
              name="father"
              value={
                form.father?.fullName
                  ? properNameFormatter(form.father?.fullName)
                  : ""
              }
              onClick={() => handleSearch(true)}
            />
          </MDBInputGroup>
        </MDBCol>

        <MDBCol md={12} className="mt-4 mb-5">
          <MDBInputGroup textBefore="Mother">
            <input
              type="text"
              className="form-control"
              name="mother"
              value={
                form.mother?.fullName
                  ? properNameFormatter(form.mother?.fullName)
                  : ""
              }
              required
              onClick={() => handleSearch(false)}
            />
          </MDBInputGroup>
        </MDBCol>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "absolute",
            bottom: "23px",
            left: "10px",
            right: "25px",
          }}
        >
          <MDBBtn
            onClick={() => setActiveItem("basic")}
            type="button"
            color="light"
            className="shadow-0"
          >
            Previous
          </MDBBtn>
          <MDBBtn type="submit">Submit</MDBBtn>
        </div>
      </form>
      {look && (
        <ModalSearchUsers
          visibility={look}
          setVisibility={setLook}
          gender={gender}
          handleParents={handleParents}
        />
      )}
    </MDBContainer>
  );
}
