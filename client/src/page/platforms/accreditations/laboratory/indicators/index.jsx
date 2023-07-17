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
  MDBIcon,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

export default function PatientModal({
  setVisibility,
  visibility,
  indicators,
}) {
  const { theme } = useSelector(({ auth }) => auth),
    [loading, setLoading] = useState(false);

  const toggleShow = () => setVisibility(!visibility);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    const today = new Date();

    const {
      fname,
      mname,
      lname,
      suffix,
      mobile,
      dob,
      region,
      province,
      city,
      barangay,
      street,
    } = e.target;

    const generatedNickname = `${lname.value}${
      fname.value
    }${today.getMinutes()}${today.getSeconds()}`;

    const form = {
      fullName: {
        fname: fname.value,
        mname: mname.value,
        lname: lname.value,
        suffix: suffix.value,
      },
      address: {
        region: region.value,
        province: province.value,
        city: city.value,
        barangay: barangay.value,
        street: street.value,
      },
      username: generatedNickname,
      email: `${generatedNickname}@smartcare.com`,
      password: "password",
      mobile: mobile.value,
      dob: dob.value,
      roles: [
        {
          branchId: "patron",
          role: "patron",
          name: "Patron",
        },
      ],
    };
  };

  return (
    <MDBModal tabIndex="-1" show={visibility} setShow={setVisibility}>
      <MDBModalDialog centered size="xl" scrollable>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Indicators</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
          </MDBModalHeader>
          <MDBModalBody>
            {indicators.map((indicator, index) => (
              <h5>
                {index + 1}. {indicator.descriptions}{" "}
                <MDBIcon icon="search" onClick={() => alert("view the PDF")} />
              </h5>
            ))}
          </MDBModalBody>
          <MDBModalFooter className="py-0">
            <MDBBtn
              type="button"
              className="shadow-0"
              color={theme.color}
              onClick={() => {
                toggleShow();
                document.getElementById("registerBranch").reset();
              }}
              disabled={loading}
            >
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
