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
} from "mdb-react-ui-kit";

export default function Modal({ navigate, setNavigate }) {
  return (
    <>
      <MDBModal show={navigate} setShow={setNavigate} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setNavigate(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>Search you want</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setNavigate(false)}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
