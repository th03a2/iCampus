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
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { nameFormatter, getAge } from "../../../../../../components/utilities";

export default function Siblings({ setActiveItem, link, setLink }) {
  const { auth } = useSelector(({ auth }) => auth);
  const [visibility, setVisibility] = useState(false);
  const [siblings, setSiblings] = useState([]);
  const options = { year: "numeric", month: "long", day: "numeric" };

  useEffect(() => {
    if (auth.yourSiblings.length > 0) {
      setSiblings(auth.yourSiblings);
    } else {
      setSiblings([]);
    }
  }, [auth.yourSiblings]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.credentials = true;

    setLink(tabs);
    setActiveItem("credentials");
  };

  return (
    <MDBContainer className="mt-4">
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
        <MDBRow className="mt-4">
          <MDBCol md={12}>
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
                {siblings.map((sibling, index) => (
                  <tr>
                    <td>{1 + index}</td>
                    <td>
                      {nameFormatter(sibling.fullName).toLocaleUpperCase()}
                    </td>
                    <td>
                      {sibling.isMale ? (
                        <MDBIcon fas icon="male" color="warning" size="2x" />
                      ) : (
                        <MDBIcon fas icon="female" color="warning" size="2x" />
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
          </MDBCol>
        </MDBRow>
        <div className="d-flex justify-content-between mt-4">
          <MDBBtn
            onClick={() => setActiveItem("parents")}
            type="button"
            color="light"
            className="shadow-0"
          >
            Previous
          </MDBBtn>
          <MDBBtn type="submit">Next</MDBBtn>
        </div>
      </form>
      {visibility && (
        <SiblingsModal setVisibility={setVisibility} visibility={visibility} />
      )}
    </MDBContainer>
  );
}
