import React from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { validateContactNumber } from "../../../../../../components/utilities";

export default function Guardian({
  setActiveItem,
  setGuardian,
  guardian,
  link,
  setLink,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.parents = true;

    setLink(tabs);
    setActiveItem("parents");
  };

  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="First Name"
              value={guardian.fname}
              onChange={(e) =>
                setGuardian({ ...guardian, fname: e.target.value })
              }
              required
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Middle Name(Optional)"
              value={guardian.mname}
              onChange={(e) =>
                setGuardian({ ...guardian, mname: e.target.value })
              }
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Last Name"
              required
              value={guardian.lname}
              onChange={(e) =>
                setGuardian({ ...guardian, lname: e.target.value })
              }
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Suffix"
              onChange={(e) =>
                setGuardian({ ...guardian, suffix: e.target.value })
              }
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="date"
              label="Date Of birth"
              required
              value={guardian.dob}
              onChange={(e) =>
                setGuardian({ ...guardian, dob: e.target.value })
              }
            />
          </MDBCol>
          <MDBCol md={4}>
            <select
              className="form-control"
              value={guardian.isMale}
              required
              onChange={(e) =>
                setGuardian({ ...guardian, isMale: e.target.value })
              }
            >
              <option value={""}>Gender</option>
              <option value={true}>Male</option>
              <option value={false}>Female</option>
            </select>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Mobile (+63) (Optional)"
              required
              value={guardian.phone}
              onChange={(e) =>
                setGuardian({
                  ...guardian,
                  phone: e.target.value,
                })
              }
              onKeyDown={validateContactNumber}
              maxLength={10}
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Province"
              required
              value={guardian.province}
              onChange={(e) =>
                setGuardian({ ...guardian, province: e.target.value })
              }
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Municipality"
              required
              value={guardian.muni}
              onChange={(e) =>
                setGuardian({ ...guardian, muni: e.target.value })
              }
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Barangay"
              required
              value={guardian.brgy}
              onChange={(e) =>
                setGuardian({ ...guardian, brgy: e.target.value })
              }
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Street"
              value={guardian.street}
              required
              onChange={(e) =>
                setGuardian({ ...guardian, street: e.target.value })
              }
            />
          </MDBCol>
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Relationship"
              required
              value={guardian.relationship}
              onChange={(e) =>
                setGuardian({ ...guardian, relationship: e.target.value })
              }
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol md={4}>
            <MDBInput
              type="text"
              label="Occupation"
              required
              value={guardian.occupation}
              onChange={(e) =>
                setGuardian({ ...guardian, occupation: e.target.value })
              }
            />
          </MDBCol>
        </MDBRow>
        <div className="d-flex justify-content-between mt-4">
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
