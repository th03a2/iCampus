import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBInputGroup,
  MDBIcon,
} from "mdb-react-ui-kit";
import SiblingsModal from "../../siblingsModal";
import { useSelector } from "react-redux";
import { nameFormatter, getAge } from "../../../../../../components/utilities";
import Swal from "sweetalert2";

export default function Siblings({
  setActiveItem,
  link,
  setLink,
  yourSiblings,
  setYourSiblings,
}) {
  const [visibility, setVisibility] = useState(false);
  const options = { year: "numeric", month: "long", day: "numeric" };

  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newArray = [...yourSiblings];
        newArray.splice(index, 1);
        setYourSiblings(newArray);
        Swal.fire("Deleted!", "Your sibling has  deleted.", "success");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.credentials = true;

    setLink(tabs);
    setActiveItem("credentials");
  };

  return (
    <MDBContainer className="mt-4" style={{ height: "580px" }}>
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Do you want to add sibling ?">
              <input
                type="text"
                className="form-control"
                onClick={() => setVisibility(true)}
              />
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>
        {yourSiblings.length > 0 && (
          <MDBRow className="mt-4">
            <MDBCol md={12}>
              <div
                className="table-container"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Age</th>
                      <th scope="col">Date of Birth</th>
                      <th>Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {yourSiblings.map((sibling, index) => (
                      <tr>
                        <td>{1 + index}</td>
                        <td>
                          {nameFormatter(sibling.fullName).toLocaleUpperCase()}
                        </td>
                        <td>
                          {sibling.isMale ? (
                            <MDBIcon
                              fas
                              icon="male"
                              color="warning"
                              size="2x"
                            />
                          ) : (
                            <MDBIcon
                              fas
                              icon="female"
                              color="warning"
                              size="2x"
                            />
                          )}
                        </td>
                        <td>{getAge(sibling.dob)}</td>
                        <td>
                          {new Date(sibling.dob).toLocaleDateString(
                            undefined,
                            options
                          )}
                        </td>
                        <td>
                          <MDBBtn
                            size="sm"
                            type="button"
                            onClick={() => handleDelete(index)}
                            color="danger"
                          >
                            <MDBIcon fas icon="trash" />
                          </MDBBtn>
                        </td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </MDBCol>
          </MDBRow>
        )}
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
            onClick={() => setActiveItem("parents")}
            type="button"
            color="warning"
            className="shadow-0"
          >
            Previous
          </MDBBtn>
          <MDBBtn type="submit">Next</MDBBtn>
        </div>
      </form>
      {visibility && (
        <SiblingsModal
          setVisibility={setVisibility}
          visibility={visibility}
          yourSiblings={yourSiblings}
          setYourSiblings={setYourSiblings}
        />
      )}
    </MDBContainer>
  );
}
