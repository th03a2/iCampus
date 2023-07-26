import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
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
            <MDBInput
              type="text"
              label="First name"
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
          </MDBCol>
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="Last name"
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
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="Middle name (Optional)"
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
          </MDBCol>
          <MDBCol md={6}>
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
              <option selected value="">
                Suffix (Optional)
              </option>
              <option value="JR">JR</option>
              <option value="SR">SR</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
            </select>
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="Mothers Maiden Name"
              value={form?.mmn}
              onChange={(e) => {
                setForm({
                  ...form,
                  mmn: e.target.value,
                });
              }}
            />
          </MDBCol>
          <MDBCol md={6}>
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
              <option selected value="">
                Gender
              </option>
              <option value={true}>Male</option>
              <option value={false}>Female</option>
            </select>
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol md={6}>
            <MDBInput
              type="date"
              label="Date of Birth"
              value={form.dob}
              onChange={(e) =>
                setForm({
                  ...form,
                  dob: e.target.value,
                })
              }
              required
            />
          </MDBCol>
          <MDBCol md={6}>
            <MDBInput
              type="text"
              label="Mobile (+63) (Optional)"
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
          </MDBCol>
        </MDBRow>

        <div className="text-end">
          <MDBBtn type="submit">Next</MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
}
