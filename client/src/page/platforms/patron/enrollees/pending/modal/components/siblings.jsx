import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBBtn,
  // MDBCheckbox,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
  // MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  getAge,
  nameFormatter,
} from "../../../../../../../components/utilities";
import { useSelector } from "react-redux";
// import SiblingsModal from "../../siblingsModal";

export default function Siblings({
  setActiveItem,
  link,
  setLink,
  information,
}) {
  const { theme } = useSelector(({ auth }) => auth);
  const [siblings, setSiblings] = useState([]);
  const options = { year: "numeric", month: "long", day: "numeric" };
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
        <MDBRow className="mt-4">
          <MDBCol md={12}>
            <div
              className="table-container"
              style={{ maxHeight: "600px", overflowY: "auto" }}
            >
              <MDBTable>
                <MDBTableHead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Age</th>
                    <th scope="col">Date of Birth</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {information.siblings.map((sibling, index) => (
                    <tr>
                      <td>{1 + index}</td>
                      <td>
                        {nameFormatter(sibling.fullName).toLocaleUpperCase()}
                      </td>
                      <td>
                        {sibling.isMale ? (
                          <MDBIcon fas icon="male" color="warning" size="2x" />
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
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>
          </MDBCol>
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
    </MDBContainer>
  );
}
