import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

export default function Modal({ visibility = false, setVisibility }) {
  const { theme, auth } = useSelector(({ auth }) => auth),
    [form, setForm] = useState({
      ceo: "",
      name: "",
      subName: "",
      category: "supplier",
      tagline: "",
    });

  const handleChange = (key, value) =>
    setForm({
      ...form,
      [key]: value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      ...form,
      ceo: auth._id,
    });
  };

  return (
    <MDBModal staticBackdrop show={visibility} tabIndex="-1">
      <MDBModalDialog centered>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <form onSubmit={handleSubmit}>
            <MDBModalHeader>
              <MDBModalTitle>Create your own Company!</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow>
                <MDBCol size={6}>
                  <MDBInput
                    type="text"
                    label="Name"
                    value={form.name}
                    onChange={(e) =>
                      handleChange("name", e.target.value.toUpperCase())
                    }
                    required
                  />
                </MDBCol>
                <MDBCol size={6}>
                  <MDBInput
                    type="text"
                    label="Sub Name"
                    value={form.subName}
                    onChange={(e) => handleChange("subName", e.target.value)}
                  />
                </MDBCol>
              </MDBRow>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="form-control mt-3"
              >
                {[
                  "supplier",
                  "laboratory",
                  "outsource",
                  "insource",
                  "support",
                  "clinic",
                  "infirmary",
                ].map((cat, index) => (
                  <option
                    key={`cat-${index}`}
                    value={cat}
                    className="text-capitalize"
                  >
                    {cat}
                  </option>
                ))}
              </select>
              <MDBTextArea
                label="Tagline"
                className="mt-3"
                value={form.tagline}
                onChange={(e) => handleChange("tagline", e.target.value)}
              />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                type="button"
                color={theme.color}
                className="shadow-0"
                onClick={setVisibility}
              >
                Close
              </MDBBtn>
              <MDBBtn color="success">Submit</MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
