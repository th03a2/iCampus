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
import { useDispatch, useSelector } from "react-redux";
import { REVERT, SAVE } from "../../../../../redux/slices/assets/branches";
import ModalForm from "./form";

export default function BranchesModal({ setVisibility, visibility }) {
  const { theme, token, onDuty } = useSelector(({ auth }) => auth),
    { didSave } = useSelector(({ branches }) => branches),
    [loading, setLoading] = useState(false),
    dispatch = useDispatch();

  const toggleShow = () => setVisibility(!visibility);

  useEffect(() => {
    if (didSave) {
      toggleShow();
      setLoading(false);
      document.getElementById("registerBranch").reset();
      dispatch(REVERT());
    }
  }, [didSave]);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    const {
      name,
      mobile,
      email,
      region,
      province,
      city,
      barangay,
      street,
      tin,
      quota,
      classification,
    } = e.target;

    const form = {
      companyId: onDuty.companyId,
      name: name.value,
      address: {
        region: region.value,
        province: province.value,
        city: city.value,
        barangay: barangay.value,
        street: street.value,
      },
      contacts: {
        mobile: mobile.value,
        email: email.value,
      },
      credentials: {
        tin: tin.value,
        quota: quota.value,
        classification: classification.value,
      },
    };

    dispatch(SAVE({ form, token }));
  };

  return (
    <MDBModal tabIndex="-1" show={visibility} setShow={setVisibility}>
      <MDBModalDialog centered size="lg" scrollable>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Register a Branch</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
          </MDBModalHeader>
          <form onSubmit={handleSubmit} autoComplete="off" id="registerBranch">
            <MDBModalBody>
              <ModalForm />
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
              <MDBBtn type="submit" disabled={loading}>
                {loading ? <MDBSpinner size="sm" grow /> : "Submit"}
              </MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
