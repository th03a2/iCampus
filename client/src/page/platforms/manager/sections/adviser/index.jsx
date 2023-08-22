import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBCol,
  MDBRow,
  MDBInputGroup,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "axios";
import { toast } from "react-toastify";
import { getAge, nameFormatter } from "../../../../../components/utilities";
import { useSelector } from "react-redux";

export default function AdviserModal({
  look,
  setLook,
  fullName,
  setFullname,
  setIsDone,
  setForm,
  form,
}) {
  const [datas, setDatas] = useState([]);
  const { theme } = useSelector(({ auth }) => auth);

  const handleSearch = async (e) => {
    e.preventDefault();
    let _siblings = fullName;
    if (typeof _siblings === "object") {
      _siblings = `?${Object.keys(_siblings)
        .map((i) => `${i}=${_siblings[i]}`)
        .join("&")}`;
    } else if (_siblings) {
      _siblings = `?key=${_siblings}`;
    }
    await axios.get(`assets/persons/users/search${_siblings}`).then((res) => {
      if (res.data.error) {
        toast.warn(res.data.error);
        throw new Error(res.data.error);
      } else {
        if (res.data.length === 0) {
          setDatas([]);
        } else {
          setDatas(res.data);
        }
      }
    });
  };

  const handlePick = (data) => {
    setFullname(data.fullName);
    setForm({ ...form, adviser: data._id });
    setIsDone(true);
    setLook(false);
  };

  const addressFormatter = (address) => {
    if (typeof address === "object") {
      const { province, city, barangay, street } = address;

      return `${barangay},${street},${city},${province}`;
    }
  };

  return (
    <>
      <MDBModal show={look} setShow={setLook} tabIndex="-1">
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                <strong>Adviser</strong>
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setLook(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={handleSearch}>
                <MDBRow>
                  <MDBCol md={4}>
                    <MDBInputGroup textBefore="First Name">
                      <input
                        type="text"
                        className="form-control"
                        value={fullName.fname}
                        onChange={(e) =>
                          setFullname({
                            ...fullName,
                            fname: e.target.value.toUpperCase(),
                          })
                        }
                        required
                      />
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={4}>
                    <MDBInputGroup textBefore="Middle Name">
                      <input
                        type="text"
                        className="form-control"
                        value={fullName.mname}
                        onChange={(e) =>
                          setFullname({
                            ...fullName,
                            mname: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={4}>
                    <MDBInputGroup textBefore="Last Name">
                      <input
                        type="text"
                        className="form-control"
                        value={fullName.lname}
                        onChange={(e) =>
                          setFullname({
                            ...fullName,
                            lname: e.target.value.toUpperCase(),
                          })
                        }
                        required
                      />
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <MDBCol className="text-end mt-3">
                  <MDBBtn type="submit">Search</MDBBtn>
                </MDBCol>
              </form>

              <MDBRow className="mt-3">
                <MDBCol>
                  {datas.length > 0 && (
                    <div
                      className="table-container"
                      style={{ maxHeight: "300px", overflowY: "auto" }}
                    >
                      <MDBTable
                        align="middle"
                        hover
                        responsive
                        color={theme.color}
                      >
                        <MDBTableHead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Gender</th>
                            <th scope="col" className="text-center">
                              Address
                            </th>
                            <th scope="col">Action</th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {datas.map((data, index) => (
                            <tr key={index}>
                              <td>{1 + index}</td>
                              <td>{nameFormatter(data.fullName)}</td>
                              <td>{getAge(data.dob)}</td>
                              <td>
                                {data.isMale ? (
                                  <MDBIcon
                                    fas
                                    icon="male"
                                    size="2x"
                                    color="warning"
                                  />
                                ) : (
                                  <MDBIcon
                                    fas
                                    icon="female"
                                    size="2x"
                                    color="warning"
                                  />
                                )}
                              </td>
                              <td>{addressFormatter(data.address)}</td>
                              <td>
                                <MDBBtn onClick={() => handlePick(data)}>
                                  Pick
                                </MDBBtn>
                              </td>
                            </tr>
                          ))}
                        </MDBTableBody>
                      </MDBTable>
                    </div>
                  )}
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
