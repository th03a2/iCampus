import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInputGroup,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { SAVE, GETSCHOOLS } from "../../../../../redux/slices/assets/employees";
import { useDispatch, useSelector } from "react-redux";

export default function Modal({ visibility, setVisibility }) {
  const [academy, setAcademy] = useState(""),
    [position, setPosition] = useState(""),
    [levels, setLevels] = useState([]),
    [branchId, setBranchId] = useState(""),
    [companies, setCompanies] = useState([]),
    { token } = useSelector(({ auth }) => auth),
    { schools } = useSelector(({ employees }) => employees),
    { auth } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GETSCHOOLS({
        token,
      })
    );
  }, []);

  useEffect(() => {
    if (schools.length > 0) {
      const newArray = schools.reduce((accumulator, currentValue) => {
        const schoolName = currentValue.companyId.name;
        if (!accumulator[schoolName]) {
          accumulator[schoolName] = [currentValue];
        } else {
          accumulator[schoolName].push(currentValue);
        }
        return accumulator;
      }, {});
      setCompanies(newArray);
    }
  }, [schools]);

  useEffect(() => {
    if (academy) {
      const newArray = Object.entries(companies).find(
        ([key]) => key === academy
      );

      setLevels([...newArray[1]]);
    }
  }, [academy, companies]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure you are employee?",
      text: "If you are not employee and you are submit this you will be punished !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          SAVE({
            form: { user: auth._id, branchId, position, status: "pending" },
            token,
          })
        );
      }
    });
  };

  return (
    <>
      <MDBModal show={visibility} setShow={setVisibility} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Apply</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setVisibility(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={handleSubmit}>
              <MDBModalBody>
                <MDBRow>
                  <MDBCol>
                    <MDBInputGroup textBefore="School">
                      <select
                        className="form-control"
                        value={academy}
                        onChange={(e) => setAcademy(e.target.value)}
                      >
                        <option value={""}></option>
                        {Object.entries(companies).map(([key]) => (
                          <option value={key}>{key}</option>
                        ))}
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mt-3">
                  <MDBCol>
                    <MDBInputGroup textBefore="Levels">
                      <select
                        className="form-control"
                        value={branchId}
                        onChange={(e) => setBranchId(e.target.value)}
                      >
                        <option value={""}></option>
                        {levels.map((data) => (
                          <option value={data._id}>{data.name}</option>
                        ))}
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mt-3">
                  <MDBCol>
                    <MDBInputGroup textBefore="Position:">
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                      />
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn
                  type="button"
                  color="secondary"
                  onClick={() => setVisibility(false)}
                >
                  Close
                </MDBBtn>
                <MDBBtn type="submit">Submit</MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
