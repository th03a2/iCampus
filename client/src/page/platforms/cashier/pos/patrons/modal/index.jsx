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
  MDBSpinner,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {
  INJECT,
  UPDATE,
} from "../../../../../../redux/slices/assets/persons/users";
import ModalForm from "./form";
import {
  nameFormatter,
  register,
} from "../../../../../../components/utilities";
import { toast } from "react-toastify";

export default function RegistrationModal({
  setVisibility,
  visibility,
  search,
  handleAction,
  model,
}) {
  const { theme, token } = useSelector(({ auth }) => auth),
    [loading, setLoading] = useState(false),
    [isMale, setIsMale] = useState(true),
    dispatch = useDispatch();

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

    let form = {
      fullName: {
        fname: fname.value,
        mname: mname.value,
        lname: lname.value,
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
      isMale,
    };

    suffix.value && (form.fullName.suffix = suffix.value);

    if (model._id) {
      dispatch(UPDATE({ data: form, id: model?._id, token }));
      toggleShow();
      handleAction(model, "create");
    } else {
      register(form)
        .then(res => {
          if (res) {
            toggleShow();
            dispatch(INJECT(res));
            handleAction(res, "create");
            toast.success(
              `${String(
                nameFormatter(form.fullName)
              ).toUpperCase()}, added successfully!`
            );
            setLoading(false);
            document.getElementById("registerPatient").reset();
          }
        })
        .catch(console.log);
    }
  };

  return (
    <MDBModal tabIndex="-1" show={visibility} setShow={setVisibility}>
      <MDBModalDialog centered size="xl" scrollable>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>
              {model?._id ? "Update" : "Register a"} Patron
            </MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
          </MDBModalHeader>
          <form onSubmit={handleSubmit} autoComplete="off" id="registerPatron">
            <MDBModalBody>
              <ModalForm
                search={search}
                isMale={isMale}
                setIsMale={setIsMale}
                model={model}
              />
            </MDBModalBody>
            <MDBModalFooter className="py-0">
              <MDBBtn
                type="button"
                className="shadow-0"
                color={theme.color}
                onClick={() => {
                  toggleShow();
                  document.getElementById("registerPatron").reset();
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
