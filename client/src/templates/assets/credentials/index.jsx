import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { ENDPOINT } from "../../../components/utilities";
export function ViewCredentials({
  visibility,
  setVisibility,
  image,
  isEnrolled,
}) {
  const { theme } = useSelector(({ auth }) => auth);
  return (
    <>
      <MDBModal show={visibility} setShow={setVisibility} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={setVisibility(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody
              className={`${theme.bg} ${theme.text} gui-viewer`}
              style={{ minHeight: 500 }}
            >
              <MDBCardImage
                src={
                  isEnrolled
                    ? `${ENDPOINT}/public/products/${image}.png`
                    : image
                }
                className="mx-auto rounded  img-fluid mb-1"
              />
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
