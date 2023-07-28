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
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtnGroup,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { nameFormatter, ENDPOINT } from "../../../../../components/utilities";
// import { Statement } from "../../../../../../fakeDb";
import {
  GETSUBJECTS,
  GETSECTIONS,
} from "../../../../../redux/slices/assets/enrollment";

export default function Modal({
  visibility,
  setVisibility,
  information,
  setInformation,
}) {
  const { theme, token, auth } = useSelector(({ auth }) => auth),
    { handleSubjects, handleSections } = useSelector(
      ({ enrollment }) => enrollment
    ),
    [subjects, setSujects] = useState([]),
    [sections, setSections] = useState([]),
    [lesson, setLesson] = useState(""),
    [division, setDvision] = useState(""),
    options = { year: "numeric", month: "long", day: "numeric" },
    dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    if (
      auth._id &&
      handleSubjects.length === 0 &&
      handleSections.length === 0
    ) {
      dispatch(
        GETSUBJECTS({
          token,
        })
      );
      dispatch(
        GETSECTIONS({
          token,
        })
      );
    }
  }, [handleSubjects, auth._id, dispatch, handleSections]);
  useEffect(() => {
    setSujects(handleSubjects);
    setSections(handleSections);
  }, [handleSubjects, handleSections]);

  const addressFormatter = (address) => {
    if (typeof address === "object") {
      const { street, barangay, city, province } = address;

      return `${province},${city},${barangay},${street}`;
    } else {
      return "Unknown";
    }
  };
  const handleClose = () => {
    setVisibility(false);
  };

  const handleLesson = () => {
    setInformation((prev) => {
      const newArray = [...prev.subjects];
      newArray.push({
        section: division,
        subject: lesson,
      });

      return {
        ...prev,
        subjects: newArray,
      };
    });
  };

  const handleRemove = (index) => {
    setInformation((prev) => {
      const newArray = [...information.subjects];
      newArray.splice(index, 1);

      return {
        ...prev,
        subjects: newArray,
      };
    });
  };

  const handleDenied = () => {
    Swal.fire({
      title: "Enter Title and Date",
      html: `
      <div class="form-group">
      <label for="title">Title</label>
      <textarea id="title" class="form-control">${title}</textarea>
    </div>
    <div class="form-group">
      <label for="date">Date</label>
      <input id="date" type="date" class="form-control" value="${date}" />
    </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        setTitle(document.getElementById("title").value);
        setDate(document.getElementById("date").value);
      },
    });
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
            <MDBRow className="mt-3">
              <MDBCol md={3}>
                <MDBInput
                  type="text"
                  label="Date of Birth"
                  readOnly
                  value={new Date(information.student?.dob).toLocaleDateString(
                    undefined,
                    options
                  )}
                />
              </MDBCol>
              <MDBCol md={3}>
                <MDBInput
                  type="text"
                  label="Address"
                  readOnly
                  value={addressFormatter(information.student?.address)}
                />
              </MDBCol>
            </MDBRow>
            <h4 className="mt-4">
              <strong>Guardians</strong>
            </h4>
            {information.guardians &&
              information.guardians.map((guardian) => (
                <>
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
                  <MDBRow className="mt-3">
                    <MDBCol md={3}>
                      <MDBInput
                        type="text"
                        readOnly
                        value={guardian.province}
                        label="Province"
                      />
                    </MDBCol>
                    <MDBCol md={3}>
                      <MDBInput
                        type="text"
                        readOnly
                        value={guardian.muni}
                        label="Municipality"
                      />
                    </MDBCol>
                    <MDBCol md={3}>
                      <MDBInput
                        type="text"
                        readOnly
                        value={guardian.brgy}
                        label="Baranggay"
                      />
                    </MDBCol>
                    <MDBCol md={3}>
                      <MDBInput
                        type="text"
                        readOnly
                        value={guardian.street}
                        label="Street"
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mt-3">
                    <MDBCol md={3}>
                      <MDBInput
                        type="text"
                        readOnly
                        label="Relationship"
                        value={guardian.relationship}
                      />
                    </MDBCol>
                    <MDBCol md={3}>
                      <MDBInput
                        type="text"
                        readOnly
                        label="Ocuupation"
                        value={guardian.occupation}
                      />
                    </MDBCol>
                  </MDBRow>
                </>
              ))}
            <h4 className="mt-3">
              <strong>Credentials</strong>
            </h4>
            <MDBRow className="mt-3">
              {Object.entries(information.attachments).map(([key, value]) => {
                const imageUrl = `${ENDPOINT}/public/enrollment/credentials/${information.student?.email}/${key}.png`;

                return (
                  <MDBCol md={4}>
                    <h5 className="text-center">
                      <strong> {value ? key : `No upload ${key}`}</strong>
                    </h5>
                    <div className="d-flex justify-content-center">
                      <MDBCardImage
                        src={value && imageUrl}
                        className="mx-auto rounded img-max img-fluid mb-1  cursor-pointer"
                      />
                    </div>
                  </MDBCol>
                );
              })}
            </MDBRow>
            <h4 className="mt-4">
              <strong>Sections / Subjects</strong>
            </h4>
            <MDBRow className="mt-4">
              <MDBCol md={6}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <select
                    className="form-control"
                    value={division}
                    onChange={(e) => setDvision(e.target.value)}
                  >
                    <option value="">Sections</option>
                    {sections.length > 0 &&
                      sections.map((section, index) => (
                        <option key={index}>{section.name}</option>
                      ))}
                  </select>
                  <select
                    className="form-control"
                    value={lesson}
                    onChange={(e) => setLesson(e.target.value)}
                  >
                    <option value="">Subjects</option>
                    {subjects.length > 0 &&
                      subjects.map((subject, index) => (
                        <option key={index}>{subject.name}</option>
                      ))}
                  </select>
                  <MDBBtn type="button" onClick={handleLesson}>
                    Add
                  </MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mt-2">
              <MDBCol md={6}>
                <MDBTable align="middle" hover responsive color={theme.color}>
                  <MDBTableHead>
                    <tr>
                      <th>#</th>
                      <th scope="col">Section </th>
                      <th scope="col">Subject </th>

                      <th>Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {information.subjects?.length > 0 ? (
                      information.subjects?.map((book, index) => (
                        <tr key={`temperature-${index}`}>
                          <td>{1 + index}</td>
                          <td>{book.section}</td>
                          <td>{book.subject}</td>
                          <td>
                            <MDBBtnGroup>
                              <MDBBtn
                                color="danger"
                                onClick={() => handleRemove(index)}
                              >
                                <MDBIcon fas icon="trash" />
                              </MDBBtn>
                            </MDBBtnGroup>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="text-center">
                        <td colSpan={3}>No Sections/Subjects.</td>
                      </tr>
                    )}
                  </MDBTableBody>
                </MDBTable>
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn type="submit">Approved</MDBBtn>
            <MDBBtn type="submit" onClick={handleDenied}>
              Denied
            </MDBBtn>
            <MDBBtn type="submit">Missing Documents</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
