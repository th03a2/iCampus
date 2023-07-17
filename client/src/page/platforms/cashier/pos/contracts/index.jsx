import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Deals from "./deals";
import Menus from "./menus";

export default function PatientTransaction({
  visibility,
  setVisibility,
  usage = "default",
}) {
  const { theme } = useSelector(({ auth }) => auth);

  const handleToggle = () => setVisibility(!visibility);

  return (
    <MDBModal
      staticBackdrop
      tabIndex="-1"
      show={visibility}
      setShow={setVisibility}
    >
      <MDBModalDialog size="fullscreen">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Point of Sale</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleToggle} />
          </MDBModalHeader>
          <MDBModalBody className="text-start">
            <MDBRow>
              <MDBCol size={7} className="p-0 border-end">
                <Menus usage={usage} />
              </MDBCol>
              <MDBCol size={5} className="p-0 border-start">
                <Deals handleToggle={handleToggle} />
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
