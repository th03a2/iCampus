import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
  MDBIcon,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { nameFormatter } from "../../../../../components/utilities";
// import { Statement } from "../../../../../../fakeDb";
import { SAVE, UPDATE } from "../../../../../redux/slices/query";

export default function Modal({ visibility, setVisibility, information }) {
  const { theme, token } = useSelector(({ auth }) => auth);
  const options = { year: "numeric", month: "long", day: "numeric" };

  const [form, setForm] = useState({
    name: "",
    description: "",
    lvl: "",
    stage: "",
  });
  const dispatch = useDispatch();

  const handleClose = () => {
    setVisibility(false);
  };
  return (
    <MDBModal show={visibility} setShow={setVisibility} staticBackdrop>
      <MDBModalDialog size="fullscreen">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>
              <MDBIcon
                fas
                icon="user-graduate"
                style={{ width: "30px" }}
                color="warning"
              />
              {nameFormatter(information.student?.fullName)}
            </MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleClose} />
          </MDBModalHeader>
          <MDBModalBody className={`${theme.bg} ${theme.text} gui-viewer`}>
            <MDBRow>
              <MDBCol md={3}>
                <MDBInput
                  type="text"
                  value={`Grade-${information.level?.lvl}`}
                  label="Level"
                  readOnly
                />
              </MDBCol>
              <MDBCol md={3}>
                <MDBInput
                  type="text"
                  value={information.units}
                  label="Units"
                  readOnly
                />
              </MDBCol>
              <MDBCol md={3}>
                <MDBInput
                  type="text"
                  value={information.phone}
                  label="Phone Number"
                  readOnly
                />
              </MDBCol>
              <MDBCol md={3}>
                <MDBInput
                  type="text"
                  value={information.student?.isMale ? "Male" : "Female"}
                  label="Gender"
                  readOnly
                />
              </MDBCol>
            </MDBRow>
            <h6 className="mt-4">Guardians</h6>
            {information.guardians &&
              information.guardians.map((guardian) => (
                <MDBRow className="mt-3">
                  <MDBCol md={3}>
                    <MDBInput
                      type="text"
                      label="Full Name"
                      value={`${guardian.lname} ${guardian.mname} ${guardian.fname}`}
                      readOnly
                    />
                  </MDBCol>
                  <MDBCol md={3}>
                    <MDBInput
                      type="text"
                      label="Gender"
                      readOnly
                      value={guardian.isMale ? "Male" : "Female"}
                    />
                  </MDBCol>
                  <MDBCol md={3}>
                    <MDBInput
                      type="text"
                      label="Phone Number"
                      readOnly
                      value={guardian.phone}
                    />
                  </MDBCol>
                  <MDBCol md={3}>
                    <MDBInput
                      type="text"
                      label="Date of Birth"
                      readOnly
                      value={new Date(guardian.dob).toLocaleDateString(
                        undefined,
                        options
                      )}
                    />
                  </MDBCol>
                </MDBRow>
              ))}
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
