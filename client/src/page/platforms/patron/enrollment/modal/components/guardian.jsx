import React, { useEffect, useState } from "react";
import { MDBBtn, MDBCol, MDBContainer, MDBInputGroup } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

import GuardianModal from "../../guardianModal";
import { nameFormatter } from "../../../../../../components/utilities";
import axios from "axios";
import { toast } from "react-toastify";
export default function Guardian({
  setActiveItem,
  setGuardian,
  guardian,
  link,
  setLink,
}) {
  const { auth } = useSelector(({ auth }) => auth);
  const [visibility, setVisibility] = useState(false);
  const [hasGuardian, setHasGuardian] = useState(false);
  const [noSubmitted, setNoSubmitted] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.parents = true;

    setLink(tabs);
    setActiveItem("parents");
  };

  const handleModal = () => {
    setVisibility(true);
  };
  useEffect(() => {
    const hasNoAttributes = Object.keys(auth.guardian).length === 0;
    if (hasNoAttributes) {
      setHasGuardian(false);
    } else {
      setHasGuardian(true);
      setGuardian(auth.yourGuardian);
    }
  }, [auth.guardian]);

  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <MDBContainer className="d-flex justify-content-center">
          <MDBCol md={8}>
            <MDBInputGroup textBefore="Guardian">
              {hasGuardian ? (
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  onClick={handleModal}
                  value={nameFormatter(guardian.fullName)}
                />
              ) : (
                <input
                  type="text"
                  className="form-control"
                  onClick={handleModal}
                  value={noSubmitted ? "" : nameFormatter(guardian.fullName)}
                  required
                />
              )}
            </MDBInputGroup>
          </MDBCol>
        </MDBContainer>
        <div className="d-flex justify-content-between mt-4">
          <MDBBtn
            onClick={() => setActiveItem("basic")}
            type="button"
            color="light"
            className="shadow-0"
          >
            Previous
          </MDBBtn>
          <MDBBtn type="submit">Next</MDBBtn>
        </div>
      </form>
      {visibility && (
        <GuardianModal
          setNoSubmitted={setNoSubmitted}
          setVisibility={setVisibility}
          visibility={visibility}
          guardian={guardian}
          setGuardian={setGuardian}
        />
      )}
    </MDBContainer>
  );
}
