import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import { validateContactNumber } from "../../../../../../components/utilities";
import { useDispatch, useSelector } from "react-redux";
import { nameFormatter } from "../../../../../../components/utilities";
import { BROWSE } from "../../../../../../redux/slices/query";

export default function BasicInformation({
  setForm,
  form,
  setActiveItem,
  link,
  setLink,
}) {
  const { auth, token } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [levels, setLevels] = useState([]),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      BROWSE({
        entity: "assets/levels",
        data: "",
        token,
      })
    );
  }, [catalogs]);

  useEffect(() => {
    setLevels(catalogs);
  }, [catalogs]);

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
              label="Unit"
              value={form?.units}
              onChange={(e) => {
                setForm({
                  ...form,
                  units: e.target.value,
                });
              }}
              required
            />
          </MDBCol>
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
        <MDBRow>
          <MDBCol md={6}>
            <select
              className="form-control"
              required
              value={form.level}
              onChange={(e) =>
                setForm({
                  ...form,
                  level: e.target.value,
                })
              }
            >
              <option value={""}> Grade Levels</option>

              {catalogs.map((data) => (
                <option value={data._id}> {data.lvl}</option>
              ))}
            </select>
          </MDBCol>
        </MDBRow>

        <div className="text-end">
          <MDBBtn type="submit">Next</MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
}
