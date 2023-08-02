import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCard,
} from "mdb-react-ui-kit";
import { ENDPOINT } from "../../../../../../../components/utilities";
import {
  GETSECTIONS,
  UPDATE,
} from "../../../../../../../redux/slices/assets/enrollment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../credentialModal";
export default function Credentials({
  information,
  setActiveItem,
  link,
  setLink,
}) {
  const { handleSections } = useSelector(({ enrollment }) => enrollment),
    { auth } = useSelector(({ auth }) => auth),
    { token, onDuty } = useSelector(({ auth }) => auth),
    [options, setOptions] = useState([]),
    [image, setImage] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (onDuty._id && handleSections.length === 0) {
      dispatch(
        GETSECTIONS({
          token,
        })
      );
    }
  }, [handleSections, onDuty._id]);

  useEffect(() => {
    setOptions(handleSections);
  }, [handleSections]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.success = true;

    setLink(tabs);
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
      // cancelButtonText: "",

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
      }
    });
  };

  const handleModal = (image, name) => {
    setVisibility(true);
    setName(name);
    setImage(image);
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
      dispatch(
        UPDATE({
          item: {
            id: information._id,
            data: {
              assessedBy: auth._id,
              status: "deny",
              section: { id: "", newSection: "" },
              issues: {
                title: textareaValue,
                issueDate: new Date().toLocaleDateString(),
              },
            },
            token,
          },
        })
      );
    }
  };

  return (
    <MDBContainer className="mt-4" style={{ height: "580px" }}>
      <form onSubmit={handleSubmit}>
        <MDBRow className="mt-3">
          {Object.entries(information.attachments).map(([key, value]) => {
            const imageUrl = `${ENDPOINT}/public/enrollment/batch/${onDuty._id}/${information.student?.email}/${key}.png`;
            return (
              <MDBCol md="4" key={key}>
                <MDBCard className="mb-3">
                  <MDBCardImage
                    src={value && imageUrl}
                    className="mx-auto rounded img-max img-fluid mb-1  cursor-pointer"
                    onClick={() => handleModal(imageUrl, key)}
                  />
                  <MDBCardBody>
                    <MDBCardTitle className="text-center">
                      <strong>{value ? key : `No upload ${key}`}</strong>
                    </MDBCardTitle>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            );
          })}
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
        </div>
      </form>
      {visibility && (
        <Modal
          visibility={visibility}
          setVisibility={setVisibility}
          image={image}
          name={name}
        />
      )}
    </MDBContainer>
  );
}
