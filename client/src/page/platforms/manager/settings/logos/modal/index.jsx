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
import { useDispatch, useSelector } from "react-redux";
import ModalForm from "./form";

export default function LogosModal({
  setVisibility,
  visibility,
  croppedImage,
  uploadBanner,
}) {
  const { theme } = useSelector(({ auth }) => auth),
    [loading, setLoading] = useState(false),
    dispatch = useDispatch();

  const toggleShow = () => setVisibility(!visibility);

  return (
    <MDBModal tabIndex="-1" show={visibility} setShow={setVisibility}>
      <MDBModalDialog centered size="lg" scrollable>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Create Monitoring Temperature</MDBModalTitle>
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
