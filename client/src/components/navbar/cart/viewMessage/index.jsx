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
import { nameFormatter, properNameFormatter } from "../../../utilities";
import { useSelector } from "react-redux";

export default function Modal({ setVisibiliy, visibility, schoolMessage }) {
  const { auth } = useSelector(({ auth }) => auth);
  const handleMessage = () => {
    switch (schoolMessage.status) {
      case "approved":
        return `Congratulations ${nameFormatter(
          auth.fullName
        )} your journey with us promises new friendships, exciting opportunities, and meaningful learning experiences. As part of  ${
          schoolMessage.section
        }, you'll discover a supportive environment where you can grow both academically and personally.   Were here to guide you every step of the way and can't wait to see you flourish. Welcome to ${
          schoolMessage.school
        }!`;
      case "deny":
        return schoolMessage.issues?.title;

      default:
        return `Dear ${nameFormatter(
          auth.fullName
        )}, we are pleased to inform you that your enrollment request has been approved. However, please note that the sections for the course are not yet available. Kindly wait for further communication regarding section assignments.`;
    }
  };
  return (
    <>
      <MDBModal show={visibility} setShow={setVisibiliy} tabIndex="-1">
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                {schoolMessage.email} {schoolMessage.date}
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setVisibiliy(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>{handleMessage()}</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setVisibiliy(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
