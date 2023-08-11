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
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {
  validateContactNumber,
  properNameFormatter,
} from "../../../../components/utilities";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Philippines } from "../../../../fakeDb";
export function ModalSearchUsers({
  visibility,
  setVisibility,
  gender,
  handleParents,
}) {
  const [user, setUser] = useState({ gender: gender }),
    { theme } = useSelector(({ auth }) => auth),
    [users, setUsers] = useState([]),
    [isNotRegister, setIsNotRegister] = useState(false);
  const [address, setAddress] = useState([]),
    [provinces, setProvinces] = useState([]),
    [cities, setCities] = useState([]),
    [brgys, setBrgys] = useState([]);

  const handleSearch = async () => {
    let _users = { ...user.fullName };
    console.log(typeof _users);
    if (typeof _users === "object") {
      _users = `?${Object.keys(_users)
        .map((i) => `${i}=${_users[i]}`)
        .join("&")}`;
    } else if (_users) {
      _users = `?key=${_users}`;
    }
    await axios.get(`assets/persons/users/parents${_users}`).then((res) => {
      if (res.data.error) {
        toast.warn(res.data.error);
        throw new Error(res.data.error);
      } else {
        if (res.data.length > 0) {
          setUsers(res.data);
          setIsNotRegister(false);
        } else {
          setIsNotRegister(true);
        }
      }
    });
    // setLook(true);
  };

  useEffect(() => {
    if (isNotRegister) {
      Swal.fire({
        title: `Your ${
          gender ? "father" : "mother"
        } is not registered in our database`,
        text: " Do you want to register this in your parents?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, registered it!",
      }).then((result) => {
        if (result.isConfirmed) {
          handleParents(user, gender);
          Swal.fire(
            "Registered!",
            `Your  ${gender ? "father" : "mother"}  has been registered.`,
            "success"
          );
        } else {
          setIsNotRegister(false);
        }
      });
    }
  }, [isNotRegister]);

  const handleOnchange = (e, checker) => {
    const { name, value } = e.target;
    if (checker === "fullName") {
      setUser({
        ...user,
        fullName: { ...user.fullName, [name]: value.toUpperCase() },
      });
    } else {
      setUser({ ...user, [name]: value.toUpperCase() });
    }
  };

  useEffect(() => {
    if (user.address) {
      const { region, province, city } = user.address;
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

  const handleAddress = (e) => {
    const { name, value, dataset } = e.target;
    const { subname } = dataset;
    var _patron = { ...user[name] };
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
    setUser((prev) => ({ ...prev, [name]: _patron }));
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
        handleParents(user, gender);
        Swal.fire(
          "Registered!",
          `Your ${gender ? "Father" : "Mother"} has been registered.`,
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
              <MDBModalTitle>Search User</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setVisibility(false)}
              ></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <MDBRow className="mb-3">
                <MDBCol md={4} className=" mb-md-0 ">
                  <MDBInput
                    type="text"
                    label="Name"
                    name="fname"
                    value={user?.fullName?.fname}
                    onChange={(e) => handleOnchange(e, "fullName")}
                  />
                </MDBCol>

                <MDBCol md={4} className="mb-md-0 ">
                  <MDBInput
                    type="text"
                    label="Middle Name (Optional)"
                    name="mname"
                    value={user?.fullName?.mname}
                    onChange={(e) => handleOnchange(e, "fullName")}
                  />
                </MDBCol>
                <MDBCol md={4} className=" mb-md-0 ">
                  <MDBInput
                    type="text"
                    label="Last Name"
                    name="lname"
                    value={user?.fullName?.lname}
                    onChange={(e) => handleOnchange(e, "fullName")}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-2">
                <MDBCol md={4} className=" mb-md-0 ">
                  <select
                    class="form-select"
                    name="suffix"
                    value={user?.fullName?.suffix}
                    onChange={(e) => handleOnchange(e, "fullName")}
                  >
                    <option selected value="">
                      Suffix (Optional)
                    </option>
                    <option value="JR">JR</option>
                    <option value="SR">SR</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                    <option value="V">V</option>
                  </select>
                </MDBCol>
                <MDBCol md={4} className="mb-md-0 ">
                  <MDBInput
                    type="date"
                    label="Birthday"
                    name="dob"
                    value={user.dob}
                    onChange={(e) => handleOnchange(e)}
                  />
                </MDBCol>
                <MDBCol md={4} className="mb-md-0 ">
                  <MDBInput
                    type="text"
                    label="Mobile (+63) (Optional)"
                    name="mobile"
                    value={user.phone}
                    onChange={(e) => handleOnchange(e)}
                    onKeyDown={validateContactNumber}
                    maxLength={10}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-3">
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="region">
                    <select
                      name="address"
                      data-subname="region"
                      value={address.region}
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
                <MDBCol md={4} size={6} className="mb-1 mb-md-3">
                  <MDBInputGroup textBefore="Province">
                    <select
                      value={address.province}
                      name="address"
                      data-subname="province"
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
                      value={address.city}
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
              </MDBRow>
              <MDBRow className="mt-1">
                <MDBCol md={4} size={6} className="mb-1 mb-md-3">
                  <MDBInputGroup textBefore="Baranggay">
                    <select
                      name="address"
                      data-subname="barangay"
                      value={address?.barangay}
                      className={`form-control ${theme.bg} ${theme.text}`}
                      onChange={handleAddress}
                      required
                    >
                      <option value={""} />
                      {brgys.map(({ name }) => (
                        <option key={`brgy-${name}`} value={name.toUpperCase()}>
                          {name.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </MDBInputGroup>
                </MDBCol>
              </MDBRow>

              <div className="text-end">
                <MDBBtn
                  color="secondary"
                  onClick={() => {
                    handleSearch();
                  }}
                >
                  Search
                </MDBBtn>
              </div>

              {users.length > 0 && (
                <>
                  <h5>
                    <strong>{`Is your ${
                      gender ? "father" : "mother"
                    } here?`}</strong>{" "}
                    <MDBBtn onClick={handleNotHere} size="sm" color="danger">
                      Not here
                    </MDBBtn>
                  </h5>
                  <MDBTable
                    align="middle"
                    hover
                    responsive
                    small
                    className="mt-3"
                  >
                    <MDBTableHead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Birthday</th>
                        <th>Phone</th>
                        <th>Action</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {users.map((u, i) => (
                        <tr>
                          <td>{1 + i}</td>
                          <td>{properNameFormatter(u.fullName)}</td>
                          <td>{u.dob}</td>
                          <td>(+63) {u.mobile}</td>
                          <td>
                            <MDBBtn
                              onClick={() => {
                                handleParents(u, gender);
                                setVisibility(false);
                              }}
                            >
                              Pick
                            </MDBBtn>
                          </td>
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                </>
              )}
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
