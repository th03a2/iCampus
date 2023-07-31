import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBRow,
  MDBCol,
  MDBInputGroup,
  MDBIcon,
} from "mdb-react-ui-kit";
import {
  validateContactNumber,
  nameFormatter,
  getAge,
} from "../../../../../components/utilities";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
export default function GuardianModal({
  setVisibility,
  visibility,
  setGuardian,
  guardian,
  setNoSubmitted,
}) {
  const { theme } = useSelector(({ auth }) => auth);
  const [datas, setDatas] = useState([]);
  const [isAdd, setIsAdd] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    let _siblings = guardian.fullName;
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
          setIsAdd(true);
        } else {
          setDatas(res.data);
          setIsAdd(false);
        }
      }
    });
  };

  const handlePick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: " Do you want to register this in your guardian?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, registered it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setGuardian({ ...guardian, id: id });
        setNoSubmitted(false);
        Swal.fire(
          "Registered!",
          "Your guardian has been registered.",
          "success"
        );
      } else {
        setVisibility(false);
      }
    });
  };

  useEffect(() => {
    if (isAdd) {
      Swal.fire({
        title: "Your guardian is not registered in our database",
        text: " Do you want to register this in your guardian?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, registered it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setNoSubmitted(false);
          Swal.fire(
            "Registered!",
            "Your guardian has been registered.",
            "success"
          );
        } else {
          setVisibility(false);
        }
      });
    }
  }, [isAdd]);

  const handleAdd = async () => {
    let _siblings = guardian.fullName;
    if (typeof _siblings === "object") {
      _siblings = `?${Object.keys(_siblings)
        .map((i) => `${i}=${_siblings[i]}`)
        .join("&")}`;
    } else if (_siblings) {
      _siblings = `?key=${_siblings}`;
    }
    await axios
      .get(`assets/persons/users/saveSiblings${_siblings}`)
      .then((res) => {
        if (res.data.error) {
          toast.warn(res.data.error);
          throw new Error(res.data.error);
        } else {
          console.log(res.data);
        }
      });
  };

  return (
    <>
      <MDBModal show={visibility} setShow={setVisibility} tabIndex="-1">
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Guardian</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setVisibility(false)}
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
                        value={guardian.fullName?.fname}
                        onChange={(e) =>
                          setGuardian({
                            ...guardian,
                            fullName: {
                              ...guardian.fullName,
                              fname: e.target.value,
                            },
                          })
                        }
                        required
                      />
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={4}>
                    <MDBInputGroup textBefore="Middle Name(Optional)">
                      <input
                        type="text"
                        className="form-control"
                        value={guardian.fullName?.mname}
                        onChange={(e) =>
                          setGuardian({
                            ...guardian,
                            fullName: {
                              ...guardian.fullName,
                              mname: e.target.value,
                            },
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
                        required
                        value={guardian.fullName.lname}
                        onChange={(e) =>
                          setGuardian({
                            ...guardian,
                            fullName: {
                              ...guardian.fullName,
                              lname: e.target.value,
                            },
                          })
                        }
                      />
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mt-4">
                  <MDBCol md={4}>
                    <MDBInputGroup textBefore="Suffix(Optional)">
                      <select
                        className="form-control"
                        value={guardian.fullName?.suffix}
                        onChange={(e) =>
                          setGuardian({
                            ...guardian,
                            fullName: {
                              ...guardian.fullName,
                              suffix: e.target.value,
                            },
                          })
                        }
                      >
                        <option value={""}></option>
                        <option value="JR">JR</option>
                        <option value="SR">SR</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                        <option value="V">V</option>
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={4}>
                    <MDBInputGroup textBefore="Date of Birth">
                      <input
                        type="date"
                        className="form-control"
                        required
                        value={guardian.dob}
                        onChange={(e) =>
                          setGuardian({ ...guardian, dob: e.target.value })
                        }
                      />
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={4}>
                    <MDBInputGroup textBefore="Gender">
                      <select
                        className="form-control"
                        value={guardian.isMale}
                        required
                        onChange={(e) =>
                          setGuardian({ ...guardian, isMale: e.target.value })
                        }
                      >
                        <option value={""}></option>
                        <option value={true}>Male</option>
                        <option value={false}>Female</option>
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mt-4">
                  <MDBCol md={4}>
                    <MDBInputGroup textBefore="Mobile">
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={guardian.phone}
                        onChange={(e) =>
                          setGuardian({
                            ...guardian,
                            mobile: e.target.value,
                          })
                        }
                        onKeyDown={validateContactNumber}
                        maxLength={10}
                      />
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={4}>
                    <MDBInputGroup textBefore="Relationship">
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={guardian.relationship}
                        onChange={(e) =>
                          setGuardian({
                            ...guardian,
                            relationship: e.target.value,
                          })
                        }
                      />
                    </MDBInputGroup>
                  </MDBCol>
                  {/* <MDBCol md={4}>
                  <MDBInputGroup textBefore="Occupation">
                    <input
                      className="form-control"
                      type="text"
                      required
                      value={guardian.occupation}
                      onChange={(e) =>
                        setGuardian({ ...guardian, occupation: e.target.value })
                      }
                    />
                  </MDBInputGroup>
                </MDBCol> */}

                  <MDBCol className="mt-4">
                    <div className="d-flex justify-content-end">
                      <MDBBtn type="submit">Search</MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </form>
              {datas.length > 0 && (
                <MDBRow>
                  <MDBCol>
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
                          <th scope="col">Name</th>
                          <th scope="col">Gender</th>
                          <th scope="col">Age</th>
                          <th scope="col">Date of Birth</th>
                          <th>Action</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {datas.length > 0 &&
                          datas.map((data, index) => (
                            <tr key={index}>
                              <td>{1 + index}</td>
                              <td>
                                {nameFormatter(data?.fullName).toUpperCase()}
                              </td>
                              <td>
                                {data?.isMale ? (
                                  <MDBIcon
                                    fas
                                    icon="female"
                                    size="2x"
                                    color="warning"
                                  />
                                ) : (
                                  <MDBIcon fas icon="female" />
                                )}
                              </td>
                              <td>{getAge(data.dob)}</td>
                              <td>{data?.dob}</td>
                              <td>
                                <MDBBtn
                                  type="button"
                                  onClick={() => handlePick(data._id)}
                                >
                                  Pick
                                </MDBBtn>
                              </td>
                            </tr>
                          ))}
                      </MDBTableBody>
                    </MDBTable>
                  </MDBCol>
                </MDBRow>
              )}
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
