import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  MDBContainer,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCard,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { ENDPOINT } from "../../../../../../../components/utilities";
import {
  GETSECTIONS,
  UPDATE,
} from "../../../../../../../redux/slices/assets/enrollment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
const socket = io("http://localhost:5000");
export default function Credentials({
  information,
  setActiveItem,
  link,
  setLink,
  status,
}) {
  const { handleSections } = useSelector(({ enrollment }) => enrollment),
    { auth } = useSelector(({ auth }) => auth),
    { token, onDuty } = useSelector(({ auth }) => auth),
    [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (handleSections.length === 0) {
      dispatch(
        GETSECTIONS({
          token,
          levelId: information.levelId,
        })
      );
    }
  }, [handleSections, onDuty._id, dispatch]);

  useEffect(() => {
    setOptions(handleSections);
  }, [handleSections]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.success = true;

    setLink(tabs);
  };

  const setLocalStorage = (status, section, issues) => {
    const fakeDb = JSON.parse(localStorage.getItem("messages")) || [];
    const existing = fakeDb
      ? fakeDb.findIndex((data) => data.id === information.student._id)
      : -1;
    if (existing > -1) {
      const { message } = fakeDb[existing];
      const newArray = [...message];

      newArray.push({
        status,
        section: section.name ? section.name : "",
        date: new Date().toLocaleDateString(),
        issues,
      });

      fakeDb[existing].message = newArray;
    } else {
      const enrolleeMessage = {
        id: information.student._id,
        message: [
          {
            status,
            section: section ? section.name : "",
            date: new Date().toLocaleDateString(),
            issues,
          },
        ],
      };

      fakeDb.push(enrolleeMessage);
    }
    localStorage.setItem("messages", JSON.stringify(fakeDb));

    socket.emit(
      "enrollment_desicion",
      existing > 0 ? fakeDb[existing].message : fakeDb.message
    );
  };

  const handleApproved = () => {
    Swal.fire({
      title: "Please select the designated section?",
      input: "select", // Use input option to create a dropdown
      inputOptions: options.reduce((acc, option) => {
        acc[
          option._id
        ] = `${option.name} ${option.studenArr.length}/${option.accumulate}`;
        return acc;
      }, {}),
      inputPlaceholder: "Choose an option",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save Section",
      denyButtonText: `Resection Later`,

      inputValidator: (value) => {
        if (!value) {
          return "Please select an option";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const studentArray = options.find(
          (option) => option._id === result.value
        );
        const newSection = [...studentArray.studenArr];
        newSection.push(information.student?._id);

        dispatch(
          UPDATE({
            item: {
              id: information._id,
              data: {
                status: "approved",
                assessedBy: auth._id,

                section: { id: result.value, newSection },
              },
              token,
            },
          })
        );
        const section = options.find((data) => data._id === result.value);

        setLocalStorage("approved", section, "");

        // You can perform any action you want based on the selected option here
      } else if (result.isDenied) {
        dispatch(
          UPDATE({
            item: {
              id: information._id,
              data: {
                assessedBy: auth._id,
                status: "onprogress",
                section: { id: "", newSection: "" },
              },
              token,
            },
          })
        );
        setLocalStorage("onprogress", " ", "");
      }
    });
  };

  const handleDeny = async () => {
    const { value: textareaValue } = await Swal.fire({
      title: "Reason",
      input: "textarea",
      inputPlaceholder: "Enter your text",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });

    if (textareaValue) {
      const issues = {
        title: textareaValue,
        issueDate: new Date().toLocaleDateString(),
      };

      dispatch(
        UPDATE({
          item: {
            id: information._id,
            data: {
              assessedBy: auth._id,
              status: "deny",
              section: { id: "", newSection: "" },
              issues,
            },
            token,
          },
        })
      );
      setLocalStorage("deny", " ", issues);
    }
  };

  const [selectedOption, setSelectedOption] = useState(false);

  const handleOnchange = (event) => {
    const value = event.target.value;
    const selectedOption = event.target.options[event.target.selectedIndex];
    const key = selectedOption.getAttribute("data-key");
    const imageUrl = selectedOption.getAttribute("data-imageurl");

    if (value) {
      setSelectedOption({
        isUpload: true,
        value,
        key,
        imageUrl,
      });
    } else {
      setSelectedOption({
        isUpload: false,
        value,
        key,
        imageUrl,
      });
    }
  };

  return (
    <MDBContainer className="mt-4" style={{ height: "580px" }}>
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <div className="d-flex justify-content-center">
            <MDBCol md={6}>
              <MDBInputGroup textBefore="Credentials">
                <select className="form-control" onChange={handleOnchange}>
                  <option value={""}>Click me</option>
                  {Object.entries(information.attachments).map(
                    ([key, value]) => {
                      const imageUrl = `${ENDPOINT}/public/enrollment/batch/${information.batch._id}/${information.student?.email}/${key}.png`;
                      return (
                        <option
                          value={value}
                          data-imageurl={imageUrl}
                          key={key}
                          data-key={key}
                        >
                          {key.toLocaleUpperCase()}
                        </option>
                      );
                    }
                  )}
                </select>
              </MDBInputGroup>
            </MDBCol>
          </div>
        </MDBRow>
        <MDBRow className="mt-4">
          {selectedOption &&
            (selectedOption.isUpload ? (
              <MDBCol md="12">
                <MDBCardImage
                  src={selectedOption.imageUrl}
                  style={{ width: "1300px", height: "400px" }}
                />

                <h4 className="text-center mt-3">
                  <strong>{selectedOption?.key.toLocaleUpperCase()}</strong>
                </h4>
              </MDBCol>
            ) : (
              <>
                {selectedOption.key && (
                  <MDBCard className="mb-3">
                    <MDBCardBody>
                      <MDBCardTitle className="text-center">
                        <strong>{`No upload ${selectedOption.key.toLocaleUpperCase()}`}</strong>
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCard>
                )}
              </>
            ))}
        </MDBRow>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "absolute",
            bottom: "35px",
            left: "120px",
            right: "120px",
          }}
        >
          <MDBBtn
            onClick={() => setActiveItem("guardian")}
            type="button"
            color="warning"
            className="shadow-0"
          >
            Previous
          </MDBBtn>
          {status !== "approved" && (
            <div>
              <MDBBtn type="button" onClick={handleApproved} color="primary">
                Approved
              </MDBBtn>
              <MDBBtn
                type="button"
                color="danger"
                onClick={handleDeny}
                className="mx-2"
              >
                Deny
              </MDBBtn>
            </div>
          )}
        </div>
      </form>
    </MDBContainer>
  );
}
