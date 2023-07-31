import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { ENDPOINT } from "../../../../../../../components/utilities";
import { GETSECTIONS } from "../../../../../../../redux/slices/assets/enrollment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
export default function Credentials({
  information,
  setActiveItem,
  link,
  setLink,
}) {
  const { handleSections } = useSelector(({ enrollment }) => enrollment),
    { token, onDuty } = useSelector(({ auth }) => auth),
    [options, setOptions] = useState([]);
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
        const newArray = [...studentArray.studenArr];

        const obj = {
          id: information.student?._id,
          data: { status: "active", section: { id: result.value, newArray } },
        };

        console.log(obj);

        // You can perform any action you want based on the selected option here
      }
    });
  };

  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
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
        <MDBContainer className="d-flex justify-content-between mt-4 ">
          <div>
            <MDBBtn
              onClick={() => setActiveItem("siblings")}
              type="button"
              color="light"
              className="shadow-0"
            >
              Previous
            </MDBBtn>
          </div>

          <div>
            <MDBBtn type="button" onClick={handleApproved} color="warning">
              Approved
            </MDBBtn>
            <MDBBtn type="submit" color="danger" className="mx-2">
              Deny
            </MDBBtn>
          </div>
        </MDBContainer>
      </form>
    </MDBContainer>
  );
}
