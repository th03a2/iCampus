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
  // MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import { toast } from "react-toastify";
import { nameFormatter } from "../../../../../../../components/utilities";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `assets/persons/users/getSiblings?id=${information.student?._id}`
        );
        if (response.data.error) {
          toast.warn(response.data.error);
          throw new Error(response.data.error);
        } else {
          if (response.data[0] === null) {
            setSiblings([]);
          } else {
            setSiblings(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [information]);

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
          {/* {siblings.length > 0 && siblings.map((sibling) => )} */}

          <MDBTable
            align="middle"
            hover
            responsive
            color={theme.color}
            className="table table-hover"
          >
            <MDBTableHead>
              <tr>
                <th>#</th>
                <th scope="col">Name </th>
                <th scope="col">Gender </th>
                <th scope="col">Date of Birth </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {siblings.map((sibling, index) => (
                <tr>
                  <td>{1 + index}</td>
                  <td>{nameFormatter(sibling.fullName)}</td>
                  <td>{sibling.isMale ? "Male" : "Female"}</td>
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
    </MDBContainer>
  );
}
