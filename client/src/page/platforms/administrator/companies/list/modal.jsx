import React from "react";
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
import Profile from "../../../../../components/profile";

export default function ViewProfile({ visibility, setVisibility, user }) {
  const toggleShow = () => setVisibility(!visibility);

  return (
    <MDBModal show={visibility} setShow={setVisibility} tabIndex="-1">
      <MDBModalDialog size="xl">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Modal title</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleShow}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <Profile auth={user} />
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggleShow}>
              Close
            </MDBBtn>
            <MDBBtn>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
