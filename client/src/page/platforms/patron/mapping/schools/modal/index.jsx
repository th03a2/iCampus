import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
  MDBIcon,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
// import { Statement } from "../../../../../../fakeDb";
import { SAVE, UPDATE } from "../../../../../../redux/slices/query";

export default function Modal({
  visibility,
  setVisibility,
  update,
  setIsUpdate,
  isUpdate,
}) {
  const { theme, token } = useSelector(({ auth }) => auth);
  const [form, setForm] = useState({
    name: "",
    companyName: "",
    acronym: "",
    category: "",
    contacts: {
      mobile: "",
      email: "",
    },
    address: {
      region: "",
      province: "",
      city: "",
      barangay: "",
      street: "",
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUpdate) {
      setForm(update);
    }
  }, [isUpdate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleAddress = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      address: {
        ...form.address,
        [name]: value,
      },
    });
  };

  const handleContacts = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      contacts: {
        ...form.contacts,
        [name]: value,
      },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdate) {
      dispatch(
        UPDATE({
          entity: "assets/branches",
          data: form,
          id: form._id,
          token,
        })
      );
    } else {
      dispatch(
        SAVE({
          entity: "assets/branches",
          data: form,
          token,
        })
      );
    }
    // setVisibility(false);
  };

  const handleClose = () => {
    setVisibility(false);
    setIsUpdate(false);
    setForm({
      name: "",
      companyName: "",
      acronym: "",
      category: "",
      contacts: {
        mobile: "",
        email: "",
      },
      address: {
        region: "",
        province: "",
        city: "",
        barangay: "",
        street: "",
      },
    });
  };
  return (
    <MDBModal show={visibility} setShow={setVisibility} staticBackdrop>
      <MDBModalDialog size="xl">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>
              <MDBIcon
                fas
                icon="school"
                color="warning"
                style={{ paddingRight: "20px" }}
              />
              School
            </MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleClose} />
          </MDBModalHeader>
          <MDBModalBody className={`${theme.bg} ${theme.text} gui-viewer`}>
            <form onSubmit={handleSubmit}>
              <MDBRow>
                <MDBCol md={4}>
                  <MDBInput
                    type="text"
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInput
                    type="text"
                    label="Company Name"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    required
                  />
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInput
                    type="text"
                    label="Acronym"
                    name="acronym"
                    value={form.acronym}
                    onChange={handleChange}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4">
                <MDBCol md={4}>
                  <select
                    className="form-control"
                    onChange={handleChange}
                    name="category"
                    required
                    value={form.category}
                  >
                    <option value={""}>Category</option>
                    <option value="elem">Elementary</option>
                    <option value="jhs">Junior High School</option>
                    <option value={"shs"}>Senior High School</option>
                    <option value={"Integrated"}>Integrated</option>
                  </select>
                  {/* <MDBInput
                    type="text"
                    label="Category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  /> */}
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInput
                    type="text"
                    label="Region"
                    name="region"
                    value={form.address?.region}
                    onChange={handleAddress}
                    required
                  />
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInput
                    type="text"
                    label="Province"
                    name="province"
                    value={form.address?.province}
                    onChange={handleAddress}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4">
                <MDBCol md={4}>
                  <MDBInput
                    type="text"
                    label="city"
                    name="city"
                    value={form.address?.city}
                    onChange={handleAddress}
                    required
                  />
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInput
                    type="text"
                    label="Barangay"
                    name="barangay"
                    value={form.address?.barangay}
                    onChange={handleAddress}
                    required
                  />
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInput
                    type="text"
                    label="Street"
                    name="street"
                    value={form.address?.street}
                    onChange={handleAddress}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4">
                <MDBCol md={4}>
                  <MDBInput
                    type="number"
                    label="Mobile"
                    name="mobile"
                    value={form.contacts?.mobile}
                    onChange={handleContacts}
                    required
                  />
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInput
                    type="email"
                    label="Email"
                    name="email"
                    value={form.contacts?.email}
                    onChange={handleContacts}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBContainer className="d-flex justify-content-end mt-4">
                <MDBBtn type="submit">{isUpdate ? "Update" : "Submit"}</MDBBtn>
              </MDBContainer>
            </form>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
