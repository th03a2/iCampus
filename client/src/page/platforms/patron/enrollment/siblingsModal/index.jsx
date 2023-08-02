import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBInputGroup,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { nameFormatter } from "../../../../../components/utilities";
export default function SiblingsModal({
  visibility,
  setVisibility,
  yourSiblings,
  setYourSiblings,
}) {
  const { theme } = useSelector(({ auth }) => auth);
  const [siblings, setSiblings] = useState({
    fullName: {
      fname: "",
      mname: "",
      lname: "",
    },
    isMale: "",
    dob: "",
  });

  const [datas, setDatas] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const handleSearch = async (e) => {
    e.preventDefault();

    let _siblings = siblings.fullName;
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

  useEffect(() => {
    if (isAdd) {
      Swal.fire({
        title: "Your sibling is not registered in our database",
        text: " Do you want to add this in your siblings",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // handleAdd();
          const newArray = [...yourSiblings];
          newArray.push(siblings);
          setYourSiblings(newArray);
          Swal.fire("Added!", "Your siblings has been added.", "success");
        } else {
          setIsAdd(false);
        }
      });
    }
  }, [isAdd]);

  const handlePick = (sibling) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this in your siblings",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newArray = [...yourSiblings];
        newArray.push(sibling);
        setYourSiblings(newArray);
        Swal.fire("Added!", "Your siblings has been added.", "success");
      } else {
        setVisibility(false);
      }
    });
  };
  return (
    <>
      <MDBModal show={visibility} setShow={setVisibility} tabIndex="-1">
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                <strong>Sibling</strong>
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setVisibility(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={handleSearch}>
                <MDBRow>
                  <MDBCol md={6}>
                    <MDBInputGroup textBefore="First Name">
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={siblings.fullName.fname}
                        onChange={(e) =>
                          setSiblings({
                            ...siblings,
                            fullName: {
                              ...siblings.fullName,
                              fname: e.target.value.toLowerCase(),
                            },
                          })
                        }
                      />
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={6}>
                    <MDBInputGroup textBefore="Middle Name(Optional)">
                      <input
                        type="text"
                        className="form-control"
                        value={siblings.fullName.mname}
                        onChange={(e) =>
                          setSiblings({
                            ...siblings,
                            fullName: {
                              ...siblings.fullName,
                              mname: e.target.value.toLowerCase(),
                            },
                          })
                        }
                      />
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mt-3">
                  <MDBCol md={6}>
                    <MDBInputGroup textBefore="Last Name">
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={siblings.fullName.lname}
                        onChange={(e) =>
                          setSiblings({
                            ...siblings,
                            fullName: {
                              ...siblings.fullName,
                              lname: e.target.value.toLowerCase(),
                            },
                          })
                        }
                      />
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={6}>
                    <MDBInputGroup textBefore="Date of Birth">
                      <input
                        type="date"
                        required
                        className="form-control"
                        value={siblings.dob}
                        onChange={(e) =>
                          setSiblings({ ...siblings, dob: e.target.value })
                        }
                      />
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mt-3">
                  <MDBCol md={6}>
                    <MDBInputGroup textBefore="Gender">
                      <select
                        className="form-control"
                        required
                        value={siblings.isMale}
                        onChange={(e) =>
                          setSiblings({ ...siblings, isMale: e.target.value })
                        }
                      >
                        <option value={""}></option>
                        <option value={true}>Male</option>
                        <option value={false}>Female</option>
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <div className="d-flex justify-content-end">
                  <MDBBtn type="submit">Search</MDBBtn>
                </div>
              </form>

              {datas.length > 0 && (
                <MDBRow className="mt-2">
                  <MDBCol>
                    <div
                      className="table-container"
                      style={{ maxHeight: "300px", overflowY: "auto" }}
                    >
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
                                <td>{data?.dob}</td>
                                <td>
                                  <MDBBtn
                                    type="button"
                                    onClick={() => handlePick(data)}
                                  >
                                    Pick
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
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
