import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import { ModalSearchUsers } from "../../../../templates/assets";
import { useDispatch, useSelector } from "react-redux";
import { properNameFormatter } from "../../../../components/utilities";

export default function Parents({ setForm, form, setActiveItem }) {
  const { catalogs, isSuccess } = useSelector(({ users }) => users),
    [look, setLook] = useState(false),
    [gender, setGender] = useState(true),
    [father, setFather] = useState({}),
    [mother, setMother] = useState({}),
    dispatch = useDispatch();

  const handleSubmit = e => {
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
      setFather(user);
    } else {
      setMother(user);
    }
  };

  const handleSearch = gender => {
    setGender(gender);
    setLook(true);
  };
  console.log(catalogs);
  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <MDBCol md={12} className="mb-5 mb-md-0 ">
          <MDBInput
            type="text"
            label="Father"
            name="father"
            value={
              father?.fullName ? properNameFormatter(father?.fullName) : ""
            }
            onClick={() => handleSearch(true)}
          />
        </MDBCol>

        <MDBCol md={12} className="mt-4 mb-5">
          <MDBInput
            type="text"
            label="Mother"
            name="mother"
            value={
              mother?.fullName ? properNameFormatter(mother?.fullName) : ""
            }
            onClick={() => handleSearch(false)}
          />
        </MDBCol>

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
