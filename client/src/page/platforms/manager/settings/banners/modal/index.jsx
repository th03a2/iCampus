import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import ModalForm from "./form";

export default function BannerModal({
  setVisibility,
  visibility,
  croppedImage,
  uploadBanner,
}) {
  const { theme } = useSelector(({ auth }) => auth);
  const toggleShow = () => setVisibility(!visibility);

  return (
    <MDBModal tabIndex="-1" show={visibility} setShow={setVisibility}>
      <MDBModalDialog centered size="xl" scrollable>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Crop Image</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
          </MDBModalHeader>
          <form
            autoComplete="off"
            id="createMonitoringTemperature"
            enctype="multipart/form-data"
          >
            <MDBModalBody>
              <ModalForm croppedImage={croppedImage} />
            </MDBModalBody>
            <MDBModalFooter className="py-0">
              <MDBBtn type="button" onClick={uploadBanner}>
                Download
              </MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
