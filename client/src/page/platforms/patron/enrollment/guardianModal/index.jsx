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
import { Philippines } from "../../../../../fakeDb";
export default function GuardianModal({
  setVisibility,
  visibility,
  setGuardian,
  guardian,
  setNoSubmitted,
}) {
  const { theme, auth } = useSelector(({ auth }) => auth);
  const [datas, setDatas] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [address, setAddress] = useState([]),
    [provinces, setProvinces] = useState([]),
    [cities, setCities] = useState([]),
    [brgys, setBrgys] = useState([]);

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
        }
      });
    }
  }, [isAdd]);

  const handleAddress = (e) => {
    const { name, value, dataset } = e.target;
    const { subname } = dataset;
    var _patron = { ...guardian[name] };
    console.log(subname);
    if (name === "fullName") {
      _patron[subname] = value;
    } else if (name === "address") {
      if (subname === "region") {
        const { code } = Philippines.regions.find(({ name }) => name === value);
        setProvinces(
          Philippines.provinces.filter(
            (province) => province.reg_code === Number(code)
          )
        );
      } else if (subname === "province") {
        const { code } = Philippines.provinces.find(
          ({ name }) => name === value
        );
        setCities(
          Philippines.cities.filter((city) => city.prov_code === Number(code))
        );
      } else if (subname === "city") {
        const { code } = Philippines.cities.find(({ name }) => name === value);
        setBrgys(
          Philippines.barangays.filter((brgy) => brgy.mun_code === Number(code))
        );
      }
      _patron[subname] = value;
    } else {
      _patron = value;
    }
    setGuardian({
      ...guardian,
      [name]: _patron,
    });
  };
  useEffect(() => {
    if (guardian.address) {
      const { region, province, city } = guardian.address;
      if (region) {
        const { code } = Philippines.regions.find(
          ({ name }) => name === region
        );
        setProvinces(
          Philippines.provinces.filter(
            (province) => province.reg_code === Number(code)
          )
        );
      }
      if (province) {
        const { code } = Philippines.provinces.find(
          ({ name }) => name === province
        );
        setCities(
          Philippines.cities.filter((city) => city.prov_code === Number(code))
        );
      }

      if (city) {
        const { code } = Philippines.cities.find(({ name }) => name === city);
        setBrgys(
          Philippines.barangays.filter((brgy) => brgy.mun_code === Number(code))
        );
      }
    }
  }, [address]);

  const addressFormatter = (address) => {
    if (typeof address === "object") {
      const { province, city, barangay, street } = address;

      return `${barangay},${street},${city},${province}`;
    }
  };

  const handleNotHere = () => {
    Swal.fire({
      title:
        "Do you want  to register the information you provided in our database?",
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
      }
    });
  };
  return (
    <>
      <MDBModal show={visibility} setShow={setVisibility} tabIndex="-1">
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
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
                              fname: e.target.value.toUpperCase(),
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
                              mname: e.target.value.toUpperCase(),
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
                              lname: e.target.value.toUpperCase(),
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
                        value={guardian.fullName?.suffix.toUpperCase()}
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
                        value={guardian.mobile}
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
                        value={
                          !guardian.relationship
                            ? auth.guardian.relationship
                            : guardian.relationship
                        }
                        onChange={(e) => {
                          console.log("Typing:", e.target.value); // Add this line
                          setGuardian({
                            ...guardian,
                            relationship: e.target.value,
                          });
                        }}
                      />
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={4}>
                    <MDBInputGroup textBefore="region">
                      <select
                        name="address"
                        data-subname="region"
                        value={guardian.address.region}
                        className={`form-control ${theme.bg} ${theme.text}`}
                        onChange={handleAddress}
                        required
                      >
                        <option value={""}>Select Region</option>
                        {Philippines.regions.map(({ code, name }) => (
                          <option key={`region-${code}`} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mt-3">
                  <MDBCol md={4} size={6} className="mb-1 mb-md-3">
                    <MDBInputGroup textBefore="Province">
                      <select
                        value={guardian.address.province}
                        data-subname="province"
                        name="address"
                        className={`form-control ${theme.bg} ${theme.text}`}
                        onChange={handleAddress}
                        required
                      >
                        <option value={""} />
                        {provinces.map(({ code, name }) => (
                          <option key={`province-${code}`} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={4} size={6} className="mb-1 mb-md-3">
                    <MDBInputGroup textBefore="City">
                      <select
                        name="address"
                        data-subname="city"
                        value={guardian.address.city}
                        className={`form-control ${theme.bg} ${theme.text}`}
                        onChange={handleAddress}
                        required
                      >
                        <option value={""} />
                        {cities.map(({ code, name }) => (
                          <option key={`city-${code}`} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={4} size={6} className="mb-1 mb-md-3">
                    <MDBInputGroup textBefore="Baranggay">
                      <select
                        name="address"
                        data-subname="barangay"
                        value={guardian.address?.barangay}
                        onChange={handleAddress}
                        className={`form-control ${theme.bg} ${theme.text}`}
                        required
                      >
                        <option value={""} />
                        {brgys.map(({ name }, index) => (
                          <option
                            key={`barangay-${index}`}
                            value={name.toUpperCase()}
                          >
                            {name.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <MDBCol className="mt-3">
                  <div className="d-flex justify-content-end">
                    <MDBBtn type="submit">Search</MDBBtn>
                  </div>
                </MDBCol>
              </form>
              {datas.length > 0 && (
                <MDBRow>
                  <MDBCol>
                    <h5>
                      <strong>Is your guardian there?</strong>{" "}
                      <MDBBtn onClick={handleNotHere} size="sm" color="danger">
                        Not here
                      </MDBBtn>
                    </h5>
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
                            {" "}
                            <th></th>
                          </tr>
                          <tr>
                            <th>#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Age</th>
                            <th scope="col" className="text-center">
                              Address
                            </th>
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
                                <td>{addressFormatter(data.address)}</td>
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
