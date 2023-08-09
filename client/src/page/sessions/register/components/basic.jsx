import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { validateContactNumber } from "../../../../components/utilities";

export default function BasicInformation({ setForm, form, setActiveItem }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...form.tabs };

    tabs.parents = true;

    setForm({
      ...form,
      tabs,
    });
    setActiveItem("parents");
  };

  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="First Name">
              <input
                type="text"
                className="form-control"
                value={form.fullName?.fname}
                onChange={(e) => {
                  const fullName = { ...form.fullName };
                  fullName.fname = String(e.target.value).toUpperCase();

                  setForm({
                    ...form,
                    fullName,
                  });
                }}
                required
                autoFocus
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Last Name">
              <input
                type="text"
                className="form-control"
                value={form.fullName?.lname}
                onChange={(e) => {
                  const fullName = { ...form.fullName };
                  fullName.lname = String(e.target.value).toUpperCase();

                  setForm({
                    ...form,
                    fullName,
                  });
                }}
                required
              />
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Middle name (Optional)">
              <input
                type="text"
                className="form-control"
                value={form.fullName?.mname}
                onChange={(e) => {
                  const fullName = { ...form.fullName };
                  fullName.mname = String(e.target.value).toUpperCase();

                  setForm({
                    ...form,
                    fullName,
                  });
                }}
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Suffix (Optional)">
              {" "}
              <select
                class="form-select"
                value={form.fullName?.suffix}
                onChange={(e) => {
                  const fullName = { ...form.fullName };
                  fullName.suffix = String(e.target.value).toUpperCase();

                  setForm({
                    ...form,
                    fullName,
                  });
                }}
              >
                <option selected value=""></option>
                <option value="JR">JR</option>
                <option value="SR">SR</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
              </select>
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Mothers Maiden Name">
              <input
                type="text"
                className="form-control"
                value={form?.mmn}
                onChange={(e) => {
                  setForm({
                    ...form,
                    mmn: e.target.value,
                  });
                }}
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Gender">
              <select
                class="form-select"
                value={form?.isMale}
                onChange={(e) => {
                  setForm({
                    ...form,
                    isMale: e.target.value,
                  });
                }}
              >
                <option selected value=""></option>
                <option value={true}>Male</option>
                <option value={false}>Female</option>
              </select>
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol md={5}>
            <MDBInputGroup textBefore="Date of Birth">
              <input
                type="date"
                className="form-control"
                value={form.dob}
                onChange={(e) =>
                  setForm({
                    ...form,
                    dob: e.target.value,
                  })
                }
                required
              />
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={7}>
            <MDBInputGroup textBefore="Mobile (+63) (Optional)">
              <input
                type="text"
                className="form-control"
                value={form.mobile}
                onChange={(e) =>
                  setForm({
                    ...form,
                    mobile: e.target.value,
                  })
                }
                onKeyDown={validateContactNumber}
                maxLength={10}
              />
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>

        <div className="text-end" style={{ marginTop: "100px" }}>
          <MDBBtn type="submit">Next</MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
}
