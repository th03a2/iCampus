import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBCard,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

export default function Modal({ visibility, setVisibility, model, key }) {
  const { theme } = useSelector(({ auth }) => auth);

  return (
    <MDBModal show={visibility} setShow={setVisibility}>
      <MDBModalDialog size="lg">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Add</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => setVisibility(false)}
            />
          </MDBModalHeader>
          <MDBModalBody>
            <MDBCard
              className={`${theme.bg} ${theme.text} gui-viewer`}
              style={{ minHeight: 500 }}
            >
              <MDBCardHeader className="p-0">New</MDBCardHeader>
              <MDBInput
                id={fk}
                style={{ color, fontWeight: "bold" }}
                className="text-center"
                type="number"
                contrast={theme.dark}
                value={value || ""}
                onChange={packageHandler}
              />
            </MDBCard>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
