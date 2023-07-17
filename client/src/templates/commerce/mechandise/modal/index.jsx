import React from "react";

import {
  MDBModal,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalContent,
  MDBBtn,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { ENDPOINT } from "../../../../components/utilities";

const Modal = ({ setVisibility, visibility, theme, image }) => {
  return (
    <MDBModal show={visibility} setShow={setVisibility}>
      <MDBModalDialog size="lg">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>{image}</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => setVisibility(false)}
            />
          </MDBModalHeader>

          <MDBModalBody
            className={`${theme.bg} ${theme.text} gui-viewer`}
            style={{ minHeight: 500 }}
          >
            <MDBCardImage
              src={`${ENDPOINT}/public/products/${image}.png`}
              className="mx-auto rounded  img-fluid mb-1"
            />
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default Modal;
