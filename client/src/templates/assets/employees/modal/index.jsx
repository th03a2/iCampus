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
  MDBTextArea,
  MDBRow,
  MDBCol,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { UPLOAD } from "../../../../redux/slices/assets/persons/auth.js";
import { Policy } from "../../../../fakeDb";
import { toast } from "react-toastify";
import {
  UPDATE,
  APPLICATION,
} from "../../../../redux/slices/assets/persons/personnels";
import { ENDPOINT, PresetUser } from "../../../../components/utilities.js";
import subjects from "../../../../fakeDb/json/subjects.js";
import Swal from "sweetalert2";
export default function ApplicationModal({
  visibility,
  setVisibility,
  company,
  data,
}) {
  const { theme, auth, token } = useSelector(({ auth }) => auth),
    [application, setApplication] = useState({}),
    dispatch = useDispatch();

  useEffect(() => {
    token &&
      dispatch(
        APPLICATION({
          data: {
            _id: auth._id,
            key: "",
          },
          token,
        })
      );
  }, [dispatch, token, auth]);

  const handleToggle = () => setVisibility(!visibility);

  const handleApplication = (e) => {
    e.preventDefault();
    if (!!company.branches.length) {
      console.log({
        userId: auth._id,
        ...application,
      });
    } else {
      toast.warn("Sorry, there are no available branches for this company.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication({
      ...application,
      [name]: value,
    });
  };

  const handleFile = (e, name) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      dispatch(
        UPLOAD({
          data: {
            path: `public/patron/${auth.email}/${company.name}/Applications`,
            base64: reader.result.split(",")[1],
            name,
          },
          token,
        })
      );
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = () => {
    Swal.fire({
      title: "Please select the designated subject?",
      input: "select", // Use input option to create a dropdown
      inputOptions: subjects.reduce((acc, option) => {
        acc[option.id] = `${option.name}`;
        return acc;
      }, {}),
      inputPlaceholder: "Choose an option",
      showCancelButton: true,
      confirmButtonText: "Save",

      inputValidator: (value) => {
        if (!value) {
          return "Please select an option";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          UPDATE({
            data: { status: "active", specifications: result.value },
            id: data._id,
            token,
          })
        );
      }
    });
  };

  const handleDesignation = (designation) => {
    const foundDesignation = Policy.collection.find(
      (collection) =>
        collection.hasOwnProperty("positions") &&
        collection.positions.find(({ id }) => id === designation)
    );
    if (foundDesignation) {
      const _designation = foundDesignation.positions.find(
        ({ id }) => id === designation
      );
      return _designation?.display_name;
    }
  };

  const handleDepartment = (designation) => {
    const foundDesignation = Policy.collection.find(
      (collection) =>
        collection.hasOwnProperty("positions") &&
        collection.positions.find(({ id }) => id === designation)
    );
    if (foundDesignation) {
      return foundDesignation.department;
    }
  };

  const handleDeny = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to deny this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deny it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          UPDATE({
            data: { status: "deny" },
            id: data._id,
            token,
          })
        );
      }
    });
  };

  const handleReadDataSheet = () => {
    return (
      <>
        <iframe
          src={`${ENDPOINT}/public/patron/${auth.email}/Smart Care/General Tinio Branch/Applications/dataSheet.png`}
          alt={auth.email}
          className="mx-auto rounded img-max img-fluid mb-1"
          onError={(e) => (e.target.src = PresetUser)}
          title="Personal Data"
          style={{ width: "750px", height: "400px" }}
        />
      </>
    );
  };
  return (
    <MDBModal
      staticBackdrop
      tabIndex="-1"
      show={visibility}
      setShow={setVisibility}
    >
      <MDBModalDialog size="fullscreen">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Application Requirements</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleToggle} />
          </MDBModalHeader>
          <form onSubmit={handleApplication}>
            <MDBModalBody className="text-start">
              <MDBRow>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Branch">
                    <input
                      className="form-control"
                      value={data.branch.name}
                      readOnly
                    />
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Department">
                    <input
                      className="form-control"
                      value={handleDepartment(data.designation)}
                      readOnly
                    />
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Designation">
                    <input
                      className="form-control"
                      value={handleDesignation(data.designation)}
                      readOnly
                    />
                  </MDBInputGroup>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={4}>
                  <label
                    htmlFor="upload-personal-data-sheet"
                    className="btn btn-primary btn-xl mt-3"
                    style={{ width: "485px" }}
                  >
                    Personal Data Sheet
                  </label>
                  <input
                    onChange={(e) => handleFile(e, "dataSheet.png")}
                    type="file"
                    id="upload-personal-data-sheet"
                    className="d-none"
                    accept="image/*"
                  />
                </MDBCol>
                <MDBCol md={4}>
                  <label
                    htmlFor="upload-resume"
                    className="btn btn-primary btn-xl mt-3"
                    style={{ width: "485px" }}
                  >
                    Resume
                  </label>
                  <input
                    type="file"
                    id="upload-resume"
                    className="d-none"
                    onChange={(e) => handleFile(e, "Resume.png")}
                    accept=".png"
                  />
                </MDBCol>
                <MDBCol md={4}>
                  <label
                    htmlFor="upload-application"
                    className="btn btn-primary btn-xl mt-3"
                    style={{ width: "485px" }}
                  >
                    Application Letter
                  </label>
                  <input
                    type="file"
                    id="upload-application"
                    className="d-none"
                    onChange={(e) => handleFile(e, "AppLetter.docx")}
                    accept="image/*"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="d-flex justify-content-center">
                <MDBCol md={8} className=" d-flex justify-content-center mt-3">
                  {handleReadDataSheet()}
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12" className="mt-4">
                  <MDBTextArea
                    label="Message"
                    value={data?.message}
                    name="message"
                    onChange={handleChange}
                    readOnly
                  />
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn type="button" color="danger" onClick={handleDeny}>
                Deny
              </MDBBtn>
              <MDBBtn type="submit" color="success" onClick={handleSubmit}>
                Approved
              </MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
